import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { approveUser, getPendingUserDetails } from '../../actions/userActions';
import { USER_APPROVE_RESET } from '../../constants/userConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserPendingApproveScreen = ({ match, history }) => {
  const pendingId = match.params.id;

  const dispatch = useDispatch();

  const userPendingDetails = useSelector((state) => state.userPendingDetails);
  const { loading, error, pendingUser } = userPendingDetails;

  const userApprove = useSelector((state) => state.userApprove);
  const {
    loading: loadingApprove,
    error: errorApprove,
    success: successApprove,
  } = userApprove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (successApprove) {
        dispatch({ type: USER_APPROVE_RESET });
        history.push('/systemAdmin');
      } else {
        if (!pendingUser.pendingId || pendingUser.pendingId !== pendingId) {
          console.log(pendingId);
          dispatch(getPendingUserDetails(pendingId));
        }
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, pendingUser, pendingId, successApprove]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(approveUser(pendingId));
    // history.push('/systemAdmin');
  };

  return (
    <Container>
      {userInfo && userInfo.userRole === 'systemAdmin' ? (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-info'
          to='/systemAdmin'
        >
          Go Back
        </Link>
      ) : (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-info'
          to='/dashboard'
        >
          Go Back
        </Link>
      )}

      <>
        <Card border='info'>
          <Card.Header className='text-center text-info' as='h3'>
            Approve User
          </Card.Header>
          {loadingApprove && <Loader />}
          {errorApprove && <Message variant='danger'>{errorApprove}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col md={3}>Name:</Col>
                          <Col>
                            {pendingUser.mInit} {pendingUser.firstName}{' '}
                            {pendingUser.lastName}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col md={3}>Education:</Col>
                          <Col>
                            <ListGroup variant='flush'>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Highest degree Earned :</Col>
                                  <Col>{pendingUser.degree}</Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>College/University Name :</Col>
                                  <Col>{pendingUser.collegeName}</Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Year the Degree Earned :</Col>
                                  <Col>{pendingUser.degreeYear}</Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Major :</Col>
                                  <Col>{pendingUser.major}</Col>
                                </Row>{' '}
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col md={3}>Contact Details:</Col>
                          <Col>
                            <ListGroup variant='flush'>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Address :</Col>
                                  <Col>{pendingUser.address1}</Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>State :</Col>
                                  <Col>{pendingUser.state}</Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>City :</Col>
                                  <Col>{pendingUser.city}</Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Zipcode :</Col>
                                  <Col>{pendingUser.zipcode}</Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Phone Number :</Col>
                                  <Col>{pendingUser.primaryPhone}</Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Email :</Col>
                                  <Col>{pendingUser.email}</Col>
                                </Row>{' '}
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={4}>
                    <Card.Title className='text-info'>Certificate</Card.Title>
                    <Card.Img src={pendingUser.certificate} variant='top' />
                    {/* <Image
                      src={pendingUser.certificate}
                      alt={pendingUser.firstName}
                    /> */}
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer className='text-muted'>
                <Link
                  className='btn btn-outline-info btn-sm btn-block rounded'
                  onClick={submitHandler}
                >
                  APPROVE
                </Link>
              </Card.Footer>
              <Card.Footer className='text-muted'>
                Email Verified at: {pendingUser.updatedAt}
              </Card.Footer>
            </>
          )}
        </Card>
      </>
    </Container>
  );
};

export default UserPendingApproveScreen;
