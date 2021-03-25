import axios from 'axios';
import { Document } from 'react-pdf';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Card,
  ListGroup,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import {
  approveUser,
  getPendingUserDetails,
  getUserDetails,
  updateUser,
} from '../../actions/userActions';
import {
  USER_APPROVE_RESET,
  USER_UPDATE_RESET,
} from '../../constants/userConstants';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserPendingApproveScreen = ({ match, history }) => {
  const pendingId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [degree, setDegree] = useState('');
  const [degreeYear, setDegreeYear] = useState('');
  const [major, setMajor] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [email, setEmail] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [image, setImage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

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
        if (!pendingUser.pendingId) {
          console.log(pendingId);
          dispatch(getPendingUserDetails(pendingId));
        }
        // else {
        //   setFirstName(pendingUser.firstName);
        //   setMInit(pendingUser.mInit);
        //   setLastName(pendingUser.lastName);
        //   setAddress1(pendingUser.address1);
        //   setAddress2(pendingUser.address2);
        //   setCity(pendingUser.city);
        //   setState(pendingUser.state);
        //   setZipcode(pendingUser.zipcode);
        //   setPrimaryPhone(pendingUser.primaryPhone);
        //   setAlternatePhone(pendingUser.alternatePhone);
        //   setDegree(pendingUser.degree);
        //   setDegreeYear(new Date(pendingUser.degreeYear).getFullYear());
        //   setMajor(pendingUser.major);
        //   setCollegeName(pendingUser.collegeName);
        //   setEmail(pendingUser.email);
        //   setAlternateEmail(pendingUser.alternateEmail);
        //   setImage(pendingUser.image);
        //   setUserRole(pendingUser.userRole);
        //   setStatus(pendingUser.status);
        // }
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, pendingUser, pendingId, successApprove]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(approveUser(pendingId));
    // history.push('/systemAdmin');
  };

  return (
    <>
      {userInfo && userInfo.userRole === 'systemAdmin' ? (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/systemAdmin'
        >
          Go Back
        </Link>
      ) : (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/dashboard'
        >
          Go Back
        </Link>
      )}

      <>
        <Card border='primary'>
          <Card.Header className='text-center' as='h2'>
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
                    <Card.Title>Certificate</Card.Title>
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
    </>
  );
};

export default UserPendingApproveScreen;
