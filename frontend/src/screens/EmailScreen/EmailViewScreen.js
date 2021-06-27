import React, { useEffect } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmailById } from '../../actions/emailActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import parse from 'html-react-parser';

const EmailViewScreen = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const emailById = useSelector((state) => state.emailById);
  const { loading, error, success, email } = emailById;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    dispatch(getEmailById(id));
  }, [dispatch, history, id]);

  const SentEmails = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values &&
          values.map((sentEmail, idx) => {
            return (
              <span key={idx} className='badge'>
                {sentEmail}
              </span>
            );
          })}
      </>
    );
  };

  const SentAttachments = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values &&
          values.map((SentAttachment, idx) => {
            return (
              // <span key={idx} className='badge'>
              //   {SentAttachment}
              // </span>
              <a href={SentAttachment} className='badge' target='_blank'>
                {SentAttachment.split('/image-')[1]}
              </a>
            );
          })}
      </>
    );
  };

  return (
    <Container>
      {userInfo &&
        (userInfo.userRole === 'admin' ||
          userInfo.userRole === 'systemAdmin') && (
          <>
            <Link
              className='btn btn-light my-3 btn-sm btn-outline-info'
              to='/emails'
            >
              Go Back
            </Link>

            <Card border='info'>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                email && (
                  <>
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Title:</Col>
                                <Col>{email.title}</Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Sent By:</Col>
                                <Col>{email.sendBy}</Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Receipent:</Col>
                                <Col>
                                  <SentEmails values={email.sentTo} />
                                </Col>
                              </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Email Body:</Col>
                                <Col>{parse(`<div>${email.body}</div>`)}</Col>
                              </Row>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col md={4}>
                          <Card.Header>Attachment/s:</Card.Header>
                          <SentAttachments values={email.attachments} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </>
                )
              )}
            </Card>
          </>
        )}
    </Container>
  );
};

export default EmailViewScreen;
