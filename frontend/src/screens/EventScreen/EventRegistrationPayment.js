import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import swal from 'sweetalert';
import { PayPalButton } from 'react-paypal-button-v2';
import { registerEvent } from '../../actions/eventActions';

const EventRegistrationPayment = ({ match, history }) => {
  // const { id } = match.params;

  const [sdkReady, setSdkReady] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // // const [eventName, setEventName] = useState('');
  // const [isMember, setIsMember] = useState(false);
  // const [memberId, setMemberId] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [numberOfAdults, setNumberOfAdults] = useState(1);
  // const [numberOfMinors, setNumberOfMinors] = useState(0);

  const dispatch = useDispatch();

  const eventRegister = useSelector((state) => state.eventRegister);
  const { error: eventRegisterError, success: eventRegisterSuccess } =
    eventRegister;

  const eventById = useSelector((state) => state.eventById);
  const { loading, error, event } = eventById;

  const eventContactAll = useSelector((state) => state.eventContactAll);
  const {
    loading: eventContactsLoading,
    error: eventContactsError,
    eventContacts,
  } = eventContactAll;

  const cart = useSelector((state) => state.cart);
  const { success, cartItems, error: cartError } = cart;

  const checkChapter = window.location.host;

  useEffect(() => {
    // console.log(id);
    // dispatch(getEventById(id));

    if (eventRegisterSuccess) {
      console.log(eventRegisterSuccess);
      swal('Success!', 'Registration successfull', 'success').then(() => {
        setSuccessRegistration(true);
        // history.push('/');
      });
    } else if (eventRegisterError || cartError) {
      swal('Error!', eventRegisterError || cartError, 'error');
    }

    if (success) {
      // history.push(`/event/register/${id}/payment`);
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
  }, [
    dispatch,
    // id,
    history,
    checkChapter,
    eventRegisterSuccess,
    eventRegisterError,
    success,
    cartError,
  ]);

  // const submitHandler = (paymentResult) => {

  // };

  const successPaymentHandler = (paymentResult) => {
    console.log(
      cartItems.eventId,
      event.eventName,
      cartItems.mInit,
      cartItems.firstName,
      cartItems.lastName,
      cartItems.isMember,
      cartItems.memberId,
      cartItems.email,
      cartItems.phone,
      cartItems.numberOfAdults,
      cartItems.numberOfMinors
    );
    // setSuccessRegistration(true);

    console.log(paymentResult);
    dispatch(
      registerEvent(
        cartItems.eventId,
        event.eventName,
        cartItems.mInit,
        cartItems.firstName,
        cartItems.lastName,
        cartItems.isMember,
        cartItems.memberId,
        cartItems.email,
        cartItems.phone,
        cartItems.numberOfAdults,
        cartItems.numberOfMinors,
        paymentResult
      )
    );
  };

  return (
    <Container>
      <>
        <Card border='info'>
          {!successRegistration ? (
            <>
              <Card.Header className='text-center text-info' as='h5'>
                Event Registration Payment
              </Card.Header>
              <Card.Body>
                {cartItems && (
                  <Form>
                    <Row>
                      <Col md={8}>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Member Id / Reference :</Col>
                              <Col>{cartItems.memberId}</Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Name:</Col>
                              <Col>
                                {cartItems.mInit} {cartItems.firstName}{' '}
                                {cartItems.lastName}
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
                                      <Col>{cartItems.phone}</Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col md={3}>Email :</Col>
                                      <Col>{cartItems.email}</Col>
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
                                      <Col>{cartItems.numberOfAdults}</Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col md={3}>Minors :</Col>
                                      <Col>{cartItems.numberOfMinors}</Col>
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
                      </Col>
                      <Col md={4}>
                        <Card>
                          <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <h5 className='text-info'>
                                Registration Summary
                              </h5>
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
                                      <Col>{cartItems.numberOfAdults}</Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col>No. Of Minors:</Col>
                                      <Col>{cartItems.numberOfMinors}</Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col>Total Payment</Col>
                                      <Col>
                                        $
                                        {cartItems.numberOfAdults *
                                          event.adultFee +
                                          cartItems.numberOfMinors *
                                            event.minorFee}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col>
                                        Please proceed to payment to complete
                                        the registration
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                  <ListGroup.Item>
                                    {!sdkReady ? (
                                      <Loader />
                                    ) : (
                                      <PayPalButton
                                        amount={
                                          cartItems.numberOfAdults *
                                            event.adultFee +
                                          cartItems.numberOfMinors *
                                            event.minorFee
                                        }
                                        onSuccess={successPaymentHandler}
                                      />
                                    )}
                                    {/* <Button type='submit' variant='info' block>
                                  Procced to payment
                                </Button> */}
                                  </ListGroup.Item>
                                </>
                              )
                            ) : null}
                          </ListGroup>
                        </Card>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Card.Body>
            </>
          ) : (
            <>
              <Card.Header className='text-center text-info' as='h5'>
                Registration Complete
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : event ? (
                  event && (
                    <>
                      <Row>
                        <Col md={8} className='m-0 p-1'>
                          <Card>
                            <ListGroup variant='flush'>
                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>Event Name:</Col>

                                  <Col>{event.eventName}</Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>Description:</Col>

                                  <Col>{event.eventDescription}</Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>Date:</Col>
                                  <Col>
                                    <ListGroup variant='flush'>
                                      <ListGroup.Item className='p-0'>
                                        <Row>
                                          <>
                                            <Col md={4}>Start Date :</Col>
                                            {event.eventDate &&
                                            event.eventDate.length !== 0 &&
                                            event.eventDate[0].value ? (
                                              <Col>
                                                {event.eventDate[0].value.substring(
                                                  0,
                                                  10
                                                )}
                                              </Col>
                                            ) : null}
                                          </>
                                        </Row>
                                      </ListGroup.Item>

                                      <ListGroup.Item className='p-0'>
                                        <Row>
                                          <>
                                            <Col md={4}>End Date :</Col>
                                            {event.eventDate &&
                                            event.eventDate.length !== 0 &&
                                            event.eventDate[1].value ? (
                                              <Col>
                                                {event.eventDate[1].value.substring(
                                                  0,
                                                  10
                                                )}
                                              </Col>
                                            ) : null}
                                          </>
                                        </Row>
                                      </ListGroup.Item>
                                    </ListGroup>
                                  </Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>Event Location:</Col>

                                  <Col>{event.eventAddress}</Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>Adult Fee:</Col>

                                  <Col>$ {event.adultFee}</Col>
                                </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>Minor Fee:</Col>

                                  <Col>$ {event.minorFee}</Col>
                                </Row>
                              </ListGroup.Item>
                            </ListGroup>
                          </Card>
                        </Col>

                        <Col md={4} className='m-0 p-1'>
                          <Card>
                            <Card.Header className='text-info text-center'>
                              Contacts:
                            </Card.Header>

                            {eventContactsLoading ? (
                              <Loader />
                            ) : eventContactsError ? (
                              <Message variant='danger'>
                                {eventContactsError}
                              </Message>
                            ) : (
                              <>
                                <ListGroup variant='flush'>
                                  {eventContacts && eventContacts.length !== 0
                                    ? eventContacts.map(
                                        (eventContact, index) => (
                                          <>
                                            <ListGroup.Item key={index}>
                                              <Row>
                                                <Col md={4}>Position :</Col>
                                                <Col>
                                                  {eventContact.positionName}
                                                </Col>
                                              </Row>

                                              <Row>
                                                <Col md={4}>Name :</Col>
                                                <Col>
                                                  {eventContact.contactName}
                                                </Col>
                                              </Row>

                                              <Row>
                                                <Col md={4}>Email :</Col>
                                                <Col>
                                                  {eventContact.contactEmail}
                                                </Col>
                                              </Row>

                                              <Row>
                                                <Col md={4}>Phone :</Col>
                                                <Col>
                                                  <a
                                                    href={`tel: ${eventContact.contactPhone}`}
                                                  >
                                                    {eventContact.contactPhone}
                                                  </a>
                                                </Col>
                                              </Row>
                                            </ListGroup.Item>
                                          </>
                                        )
                                      )
                                    : null}{' '}
                                </ListGroup>
                              </>
                            )}
                          </Card>
                        </Col>
                      </Row>
                    </>
                  )
                ) : null}
              </Card.Body>

              <Card.Header>Registration Summary</Card.Header>
              <Card.Body>
                {cartItems && (
                  <Form>
                    <Row>
                      <Col md={8}>
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Member Id / Reference :</Col>
                              <Col>{cartItems.memberId}</Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Name:</Col>
                              <Col>
                                {cartItems.mInit} {cartItems.firstName}{' '}
                                {cartItems.lastName}
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
                                      <Col>{cartItems.phone}</Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col md={3}>Email :</Col>
                                      <Col>{cartItems.email}</Col>
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
                                      <Col>{cartItems.numberOfAdults}</Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col md={3}>Minors :</Col>
                                      <Col>{cartItems.numberOfMinors}</Col>
                                    </Row>
                                  </ListGroup.Item>
                                </ListGroup>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col md={4}>
                        <Card>
                          <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <h5 className='text-info'>Payment Summary</h5>
                            </ListGroup.Item>

                            {eventRegisterSuccess && (
                              <>
                                <ListGroup.Item>
                                  <Row>
                                    <Col>Registration Id:</Col>
                                    <Col>
                                      {eventRegisterSuccess.registrationId}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                  <Row>
                                    <Col>Amount Paid:</Col>
                                    <Col>{eventRegisterSuccess.amount}</Col>
                                  </Row>
                                </ListGroup.Item>
                              </>
                            )}
                          </ListGroup>
                        </Card>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Card.Body>
            </>
          )}

          {/* <Card.Footer className='text-muted'>2 days ago</Card.Footer> */}
        </Card>
      </>
    </Container>
  );
};

export default EventRegistrationPayment;

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
