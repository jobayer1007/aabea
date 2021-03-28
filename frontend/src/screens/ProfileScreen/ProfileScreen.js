import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const ProfileScreen = ({ history }) => {
  // const [firstName, setFirstName] = useState('');
  // const [mInit, setMInit] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [address1, setAddress1] = useState('');
  // const [address2, setAddress2] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [zipcode, setZipcode] = useState('');
  // const [primaryPhone, setPrimaryPhone] = useState('');
  // const [alternatePhone, setAlternatePhone] = useState('');
  // const [degree, setDegree] = useState('');
  // const [degreeYear, setDegreeYear] = useState('');
  // const [major, setMajor] = useState('');
  // const [collegeName, setCollegeName] = useState('');
  // const [email, setEmail] = useState('');
  // const [alternateEmail, setAlternateEmail] = useState('');
  // const [image, setImage] = useState('');
  // const [userRole, setUserRole] = useState('');
  // const [status, setStatus] = useState('');
  // const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, user, error: userError } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('Edit clicked');
    // dispatch(approveUser(pendingId));
    // history.push('/systemAdmin');
  };

  return (
    <>
      {userInfo && (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-success'
          to='/dashboard'
        >
          Go Back
        </Link>
      )}

      <>
        <Card border='success'>
          <Card.Header className='text-center' as='h2'>
            {userInfo && userInfo.userName}
          </Card.Header>

          {userLoading ? (
            <Loader />
          ) : userError ? (
            <Message variant='danger'>{userError}</Message>
          ) : (
            user && (
              <>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col md={3}>Name:</Col>
                            <Col>
                              {user.mInit} {user.firstName} {user.lastName}
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
                                    <Col>{user.degree}</Col>
                                  </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>College/University Name :</Col>
                                    <Col>{user.collegeName}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>Year the Degree Earned :</Col>
                                    <Col>{user.degreeYear}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>Major :</Col>
                                    <Col>{user.major}</Col>
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
                                    <Col>{user.address1}</Col>
                                  </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>State :</Col>
                                    <Col>{user.state}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>City :</Col>
                                    <Col>{user.city}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>Zipcode :</Col>
                                    <Col>{user.zipcode}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>Phone Number :</Col>
                                    <Col>{user.primaryPhone}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col md={4}>Email :</Col>
                                    <Col>{user.primaryEmail}</Col>
                                  </Row>{' '}
                                </ListGroup.Item>
                              </ListGroup>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={4}>
                      <Card.Header>Profile Picture</Card.Header>
                      <Card.Img src={user.certificates} variant='top' />

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
                </Card.Body>

                <Card.Footer className='text-muted'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    onClick={submitHandler}
                  >
                    Edit
                  </Link>
                </Card.Footer>
              </>
            )
          )}
        </Card>
      </>
    </>
  );
};

export default ProfileScreen;
