import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsById, updateUser } from '../actions/userActions';
import {
  USER_DETAILS_BY_ID_RESET,
  USER_UPDATE_RESET,
} from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserEditScreen = ({ match, history }) => {
  const id = match.params.id;

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
  const [certificates, setCertificates] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetailsById = useSelector((state) => state.userDetailsById);
  const { loading, error, user } = userDetailsById;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch({ type: USER_DETAILS_BY_ID_RESET });
        history.push('/members');
      } else {
        if (!user.memberId) {
          dispatch(getUserDetailsById(id));
        } else {
          setFirstName(user.firstName);
          setMInit(user.mInit);
          setLastName(user.lastName);
          setAddress1(user.address1);
          setAddress2(user.address2);
          setCity(user.city);
          setState(user.state);
          setZipcode(user.zipcode);
          setPrimaryPhone(user.primaryPhone);
          setAlternatePhone(user.alternatePhone);
          setDegree(user.degree);
          setDegreeYear(new Date(user.degreeYear).getFullYear());
          setMajor(user.major);
          setCollegeName(user.collegeName);
          setEmail(user.primaryEmail);
          setAlternateEmail(user.alternateEmail);
          setProfilePicture(user.profilePicture);
          setCertificates(user.certificates);
        }
      }
    } else {
      history.push('/login');
    }

    // }
    // }
  }, [dispatch, userInfo, id, history, user, successUpdate]);

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
      setProfilePicture(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id,
        firstName,
        mInit,
        lastName,
        address1,
        address2,
        city,
        state,
        zipcode,
        alternateEmail,
        primaryPhone,
        alternatePhone,
        degree,
        degreeYear,
        major,
        collegeName,
        certificates,
        profilePicture,
      })
    );
  };

  return (
    <>
      {userInfo && userInfo.userRole === 'systemAdmin' ? (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/members'
        >
          Go Back
        </Link>
      ) : (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/members'
        >
          Go Back
        </Link>
      )}

      <>
        <Card border='primary'>
          <Card.Header className='text-center' as='h2'>
            Edit Profile
          </Card.Header>
          <Card.Body>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Row>
                <Col md={8}>
                  <Form onSubmit={submitHandler}>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col md={3}>Name:</Col>
                          <Col>
                            <ListGroup variant='flush'>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>M. Initial: </Col>
                                  <Col>
                                    <Form.Group controlId='mInit'>
                                      <Form.Control
                                        type='mInit'
                                        placeholder=' Please Enter Your M. Initial: Mr / Ms'
                                        value={mInit}
                                        onChange={(e) =>
                                          setMInit(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>First Name: </Col>
                                  <Col>
                                    <Form.Group controlId='firstName'>
                                      <Form.Control
                                        type='firstName'
                                        placeholder='Please Enter Your First Name..'
                                        value={firstName}
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Last Name: </Col>
                                  <Col>
                                    <Form.Group controlId='lastName'>
                                      <Form.Control
                                        type='lastName'
                                        placeholder='Please Enter Your Last Name..'
                                        value={lastName}
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </ListGroup>
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
                                  <Col>
                                    {' '}
                                    <Form.Group controlId='degree'>
                                      <Form.Control
                                        type='degree'
                                        placeholder='Enter Your Last Degree Received..'
                                        value={degree}
                                        onChange={(e) =>
                                          setDegree(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>College/University Name :</Col>
                                  <Col>
                                    {' '}
                                    <Form.Group controlId='collegeName'>
                                      <Form.Control
                                        type='collegeName'
                                        placeholder='Enter Your University/College Name..'
                                        value={collegeName}
                                        onChange={(e) =>
                                          setCollegeName(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Year the Degree Earned :</Col>
                                  <Col>
                                    <Form.Group controlId='degreeYear'>
                                      <Form.Control
                                        type='degreeYear'
                                        placeholder='Enter The Year of Degree Awarded..'
                                        value={degreeYear}
                                        onChange={(e) =>
                                          setDegreeYear(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Major :</Col>
                                  <Col>
                                    <Form.Group controlId='major'>
                                      <Form.Control
                                        type='major'
                                        placeholder='Enter Your Major..'
                                        value={major}
                                        onChange={(e) =>
                                          setMajor(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
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
                                  <Col>
                                    {' '}
                                    <Form.Group controlId='address1'>
                                      <Form.Label>Primary Address</Form.Label>
                                      <Form.Control
                                        type='address1'
                                        placeholder='Please Enter Address..'
                                        value={address1}
                                        onChange={(e) =>
                                          setAddress1(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='address2'>
                                      <Form.Label>
                                        Alternative Address
                                      </Form.Label>
                                      <Form.Control
                                        type='address2'
                                        placeholder='Please Enter Address..'
                                        value={address2}
                                        onChange={(e) =>
                                          setAddress2(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>State :</Col>
                                  <Col>
                                    <Form.Group controlId='state'>
                                      <Form.Control
                                        type='state'
                                        placeholder='Enter State..'
                                        value={state}
                                        onChange={(e) =>
                                          setState(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>City :</Col>
                                  <Col>
                                    <Form.Group controlId='city'>
                                      <Form.Control
                                        type='city'
                                        placeholder='Enter City..'
                                        value={city}
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Zipcode :</Col>
                                  <Col>
                                    <Form.Group controlId='zipcode'>
                                      <Form.Control
                                        type='zipcode'
                                        placeholder='Enter Zipcode..'
                                        value={zipcode}
                                        onChange={(e) =>
                                          setZipcode(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Phone Number :</Col>
                                  <Col>
                                    <Form.Group controlId='primaryPhone'>
                                      <Form.Label>
                                        Primary Phone Number
                                      </Form.Label>
                                      <Form.Control
                                        type='primaryPhone'
                                        placeholder='Enter Your Phone Number..'
                                        value={primaryPhone}
                                        onChange={(e) =>
                                          setPrimaryPhone(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='alternatePhone'>
                                      <Form.Label>
                                        Alternate Phone Number
                                      </Form.Label>
                                      <Form.Control
                                        type='alternatePhone'
                                        placeholder='Enter additional Phone Number..'
                                        value={alternatePhone}
                                        onChange={(e) =>
                                          setAlternatePhone(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={4}>Email :</Col>
                                  <Col>
                                    <Form.Group controlId='email'>
                                      <Form.Label>Email Address</Form.Label>
                                      <Form.Control
                                        type='email'
                                        placeholder='Enter Email..'
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        readOnly
                                      ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='alternateEmail'>
                                      <Form.Label>
                                        Alternate Email Address
                                      </Form.Label>
                                      <Form.Control
                                        type='alternateEmail'
                                        placeholder='Enter another Email..'
                                        value={alternateEmail}
                                        onChange={(e) =>
                                          setAlternateEmail(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>{' '}
                              </ListGroup.Item>
                            </ListGroup>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col md={3}>Profile Picture:</Col>
                          <Col>
                            <Form.Group controlId='profilePicture'>
                              <Form.Control
                                type='text'
                                placeholder='Enter image url..'
                                value={profilePicture}
                                onChange={(e) =>
                                  setProfilePicture(e.target.value)
                                }
                              ></Form.Control>
                              <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                              ></Form.File>
                              {uploading && <Loader />}
                            </Form.Group>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {/* <ListGroup.Item>
                        <Row>
                          <Col md={3}>Certificates:</Col>
                          <Col>
                            <Form.Group controlId='certificates'>
                              <Form.Control
                                type='text'
                                placeholder='Enter image url..'
                                value={certificates}
                                onChange={(e) =>
                                  setCertificates(e.target.value)
                                }
                              ></Form.Control>
                              <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                              ></Form.File>
                              {uploading && <Loader />}
                            </Form.Group>
                          </Col>
                        </Row>
                      </ListGroup.Item>
 */}
                      <Button type='submit' variant='primary' block>
                        Update
                      </Button>
                    </ListGroup>
                  </Form>
                </Col>
                <Col md={4}>
                  <Card.Header>Profile Picture</Card.Header>
                  <Card.Img src={user.profilePicture} variant='top' />

                  <Card.Header>Certificate</Card.Header>
                  <Card.Img src={user.certificates} variant='top' />
                  {/* <Document
                        src={samplePDF}
                        // src={require('/uploads/image-1616636214274.pdf')}
                      ></Document> */}
                  {/* <Image
                      src={pendingUser.certificate}
                      alt={pendingUser.firstName}
                    /> */}
                </Col>
              </Row>
            )}
          </Card.Body>
          {/* <Card.Footer className='text-muted'>2 days ago</Card.Footer> */}
        </Card>
      </>
    </>
  );
};

export default UserEditScreen;
