import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import swal from 'sweetalert';
import { PayPalButton } from 'react-paypal-button-v2';
import { registerEvent, getEventById } from '../../actions/eventActions';

const EventRegisterScreen = ({ match, history }) => {
  const { id } = match.params;

  const [sdkReady, setSdkReady] = useState(false);
  const [mInit, setMInit] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [eventName, setEventName] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfMinors, setNumberOfMinors] = useState(0);

  const dispatch = useDispatch();

  const eventRegister = useSelector((state) => state.eventRegister);
  const { error: eventRegisterError, success: eventRegisterSuccess } =
    eventRegister;

  const eventById = useSelector((state) => state.eventById);
  const { loading, error, event } = eventById;

  const checkChapter = window.location.host;

  useEffect(() => {
    // console.log(id);
    dispatch(getEventById(id));

    if (eventRegisterSuccess) {
      console.log(eventRegisterSuccess);
      swal('Success!', eventRegisterSuccess, 'success').then(() => {
        history.push('/');
      });
    } else if (eventRegisterError) {
      swal('Error!', eventRegisterError, 'error');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        `/api/chapters/paypal/${checkChapter}`,
        config
      );
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, id, history, eventRegisterSuccess, eventRegisterError]);

  // const submitHandler = (paymentResult) => {

  // };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(
      registerEvent(
        id,
        event.eventName,
        mInit,
        firstName,
        lastName,
        isMember,
        memberId,
        email,
        phone,
        numberOfAdults,
        numberOfMinors,
        paymentResult
      )
    );
  };

  return (
    <Container>
      <>
        <Card border='info'>
          <Card.Header className='text-center text-info' as='h5'>
            Event Registration
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8}>
                <Form>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Form.Row>
                        <Form.Group as={Col} md='2'>
                          <Form.Label>Name</Form.Label>
                        </Form.Group>
                        <Col>
                          <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>M. Initial: </Col>
                                <Col>
                                  <Form.Group controlId='mInit'>
                                    <Form.Control
                                      required
                                      as='select'
                                      type='text'
                                      value={mInit}
                                      onChange={(e) => setMInit(e.target.value)}
                                    >
                                      <option value='Mr'>Mr</option>
                                      <option value='Mrs'>Mrs</option>
                                      <option value='Miss'>Ms</option>
                                    </Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>First Name: </Col>
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
                                <Col md={3}>Last Name: </Col>
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
                      </Form.Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Member ? :</Col>
                        <Col>
                          <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <Row>
                                <Col>
                                  <Form.Control
                                    required
                                    as='select'
                                    type='text'
                                    value={isMember}
                                    onChange={(e) =>
                                      setIsMember(e.target.value)
                                    }
                                  >
                                    <option value='false'>No</option>
                                    <option value='true'>Yes</option>
                                  </Form.Control>
                                </Col>
                              </Row>
                            </ListGroup.Item>

                            {isMember ? (
                              <ListGroup.Item>
                                <Row>
                                  <Col>
                                    <Form.Group controlId='memberId'>
                                      <Form.Control
                                        required
                                        type='text'
                                        placeholder='Please Enter the member Id..'
                                        value={memberId}
                                        onChange={(e) =>
                                          setMemberId(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            ) : (
                              <ListGroup.Item>
                                <Row>
                                  <Col>
                                    <Form.Group controlId='memberId'>
                                      <Form.Control
                                        required
                                        type='text'
                                        placeholder='Please enter a referrel Member Id..'
                                        value={memberId}
                                        onChange={(e) =>
                                          setMemberId(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            )}
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
                                <Col md={3}>Phone Number :</Col>
                                <Col>
                                  <Form.Group controlId='phone'>
                                    <Form.Control
                                      required
                                      type='phone'
                                      placeholder='Enter Your Phone Number..'
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Email :</Col>
                                <Col>
                                  <Form.Group controlId='email'>
                                    <Form.Control
                                      required
                                      type='email'
                                      placeholder='Enter Email..'
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
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
                        <Col md={3}>Number Of Participants:</Col>
                        <Col>
                          <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Adults :</Col>
                                <Col>
                                  <Form.Group controlId='numberOfAdults'>
                                    <Form.Control
                                      required
                                      type='number'
                                      min='1'
                                      placeholder='Enter number of adults'
                                      value={numberOfAdults}
                                      onChange={(e) =>
                                        setNumberOfAdults(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <Row>
                                <Col md={3}>Minors :</Col>
                                <Col>
                                  <Form.Group controlId='minors'>
                                    <Form.Control
                                      required
                                      type='number'
                                      min='0'
                                      placeholder='Enter number of minors..'
                                      value={numberOfMinors}
                                      onChange={(e) =>
                                        setNumberOfMinors(e.target.value)
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

                    {/* <Button type='submit' variant='primary' block>
                      Update
                    </Button> */}
                  </ListGroup>
                </Form>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h5 className='text-info'>Registration Summary</h5>
                    </ListGroup.Item>

                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : event ? (
                      event && (
                        <>
                          <ListGroup.Item>
                            <Row>
                              <Col>Event Name:</Col>
                              <Col>{event.eventName}</Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>No. Of Adults:</Col>
                              <Col>{numberOfAdults}</Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>No. Of Minors:</Col>
                              <Col>{numberOfMinors}</Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>Total Payment</Col>
                              <Col>
                                $
                                {numberOfAdults * event.adultFee +
                                  numberOfMinors * event.minorFee}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col>
                                Please make the payment to complete registration
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {!sdkReady ? (
                              <Loader />
                            ) : (
                              <PayPalButton
                                amount={
                                  numberOfAdults * event.adultFee +
                                  numberOfMinors * event.minorFee
                                }
                                onSuccess={successPaymentHandler}
                              />
                            )}
                          </ListGroup.Item>
                        </>
                      )
                    ) : null}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          {/* <Card.Footer className='text-muted'>2 days ago</Card.Footer> */}
        </Card>
      </>
    </Container>
  );
};

export default EventRegisterScreen;

// ///// Register attributes
// {

//   "firstName": "jobayer", done
//   "mInit": "Mr.", done
//   "lastName": "Ahmad", done
//   "address1": "30 long Island Steet, NY,USA", Done
//   "address2": "31 long Island Steet, NY,USA", //////////////// not in from register
//   "city": "Newyork", Done
//   "state": "NY",
//   "zipcode": "123456",
//   "email": "jobayer@example.com",
//   "password": "123456",
//   "alternateEmail": "jobayer_alter@example.com",
//   "primaryPhone": "1234567890",
//   "alternatePhone": "1234567890",
//   "degree": "B.Sc",
//   "degreeYear": "2000",
//   "major": "EEE",
//   "collegeName": "AIUB",
//   "status": "active",
//   "balance": "10000.05"

// state,
// zipcode,
//
//
// primaryPhone,
//  degree,
//   degreeYear,
//   major,
//   collegeName

// }
