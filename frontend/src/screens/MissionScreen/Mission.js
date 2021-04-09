import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';
import { getMissionById } from '../../actions/missionActions';

const Mission = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const missionById = useSelector((state) => state.missionById);
  const { loading, error, mission } = missionById;

  useEffect(() => {
    dispatch(getMissionById(id));
  }, [dispatch, history, id]);

  return (
    <>
      <Link className='btn btn-light my-3 btn-sm btn-outline-success' to='/'>
        Go Back
      </Link>
      <Row className='content'>
        <Col id='page-content-wrapper'>
          <Card border='primary'>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              mission && (
                <>
                  <Card.Header className='text-center' as='h2'>
                    {mission.title}
                  </Card.Header>
                  {/* <Card.Title className='text-center'>
                  {' '}
                  Published Date:
                  {format(new Date(announcement.createdAt), 'dd/mm/yyyy')}
                </Card.Title> */}
                  <Card.Body> {parse(`<div>${mission.body}</div>`)}</Card.Body>
                </>
              )
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Mission;
