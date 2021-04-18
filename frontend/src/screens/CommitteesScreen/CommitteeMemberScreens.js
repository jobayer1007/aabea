import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';
import { getCMemberById } from '../../actions/committeeActions';

const CommitteeMemberScreen = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const cMemberById = useSelector((state) => state.cMemberById);
  const { loading, error, cMember } = cMemberById;

  useEffect(() => {
    console.log(id);
    dispatch(getCMemberById(id));
  }, [dispatch, history, id]);

  return (
    <Container>
      <Link className='btn btn-light my-3 btn-sm btn-outline-info' to='/'>
        Go Back
      </Link>

      <Card>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          cMember && (
            <>
              {' '}
              {cMember.position ? (
                <>
                  <Card.Header className='text-info' as='h2'>
                    {cMember.position.toUpperCase()}
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Name:</Col>
                              <Col>
                                {cMember.member.mInit}{' '}
                                {cMember.member.firstName}{' '}
                                {cMember.member.lastName}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Tenure:</Col>
                              <Col>
                                {new Date(
                                  cMember.tenure[0].value
                                ).getFullYear()}{' '}
                                -
                                {new Date(
                                  cMember.tenure[1].value
                                ).getFullYear()}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Bio:</Col>
                              <Col>{parse(`<div>${cMember.bio}</div>`)}</Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col md={4}>
                        <Card.Img
                          src={cMember.member.profilePicture}
                          variant='top'
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              ) : null}
            </>
          )
        )}
      </Card>
    </Container>
  );
};

export default CommitteeMemberScreen;
