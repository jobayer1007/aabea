import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAnnouncementById } from '../../actions/announcementAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';
import {
  eventAllContact,
  getEventById,
  getEventContactById,
  newEventContact,
  publishEvent,
  unpublishEvent,
  updateEventContactById,
  deleteEventContact,
  updateEventById,
} from '../../actions/eventActions';
import {
  EVENT_CONTACT_BY_ID_RESET,
  EVENT_CONTACT_NEW_RESET,
  EVENT_CONTACT_UPDATE_BY_ID_RESET,
  EVENT_PUBLISH_RESET,
  EVENT_UNPUBLISH_RESET,
} from '../../constants/eventConstants';
import swal from 'sweetalert';

const EventByIdScreen = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const [addEventContact, setAddEventContact] = useState(false);
  const [editEventContact, setEditEventContact] = useState(false);
  const [eventContactId, setEventContactId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [positionName, setPositionName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  // const [id, setId] = useState('');

  const [editEvent, setEditEvent] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [adultFee, setAdultFee] = useState(0);
  const [minorFee, setMinorFee] = useState(0);
  const [cap, setCap] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const eventById = useSelector((state) => state.eventById);
  const { loading, error, event } = eventById;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const {
    loading: eventUpdateLoading,
    error: eventUpdateError,
    success: eventUpdateSuccess,
    event: updatedEvent,
  } = eventUpdate;

  const eventContactNew = useSelector((state) => state.eventContactNew);
  const {
    loading: eventContactNewLoading,
    error: eventContactNewError,
    success,
  } = eventContactNew;

  const eventContactAll = useSelector((state) => state.eventContactAll);
  const {
    loading: eventContactsLoading,
    error: eventContactsError,
    eventContacts,
  } = eventContactAll;

  const eventContactById = useSelector((state) => state.eventContactById);
  const { success: eventContactByIdSuccess, eventContact } = eventContactById;

  const eventContactUpdate = useSelector((state) => state.eventContactUpdate);
  const { success: eventContactUpdateSuccess } = eventContactUpdate;

  const eventContactDelete = useSelector((state) => state.eventContactDelete);
  const { success: successDelete } = eventContactDelete;

  const eventPublish = useSelector((state) => state.eventPublish);
  const {
    loading: eventPublishLoading,
    error: eventPublishError,
    success: eventPublishSuccess,
  } = eventPublish;

  const eventUnpublish = useSelector((state) => state.eventUnpublish);
  const {
    loading: eventUnpublishLoading,
    error: eventUnpublishError,
    success: eventUnpublishSuccess,
  } = eventUnpublish;

  useEffect(() => {
    dispatch(getEventById(id));
    dispatch(eventAllContact(id));

    if (userInfo) {
      dispatch({ type: EVENT_CONTACT_NEW_RESET });
    }
    // else {
    //   history.push('/login');
    // }

    // if (eventUpdateSuccess) {
    //   setEventName(updatedEvent.eventName);
    //   setEventDescription(updatedEvent.eventDescription);
    //   setEventStartDate(new Date(updatedEvent.eventDate[0].value));
    //   setEventEndDate(new Date(updatedEvent.eventDate[1].value));
    //   // setEventStartTime();
    //   // setEventEndTime();
    //   setEventAddress(updatedEvent.eventAddress);
    //   setAdultFee(updatedEvent.adultFee);
    //   setMinorFee(updatedEvent.minorFee);
    //   setCap(updatedEvent.cap);
    // }

    if (success || eventContactUpdateSuccess) {
      setAddEventContact(false);
      setEditEventContact(false);

      setEventContactId('');
      setMemberId('');
      setPositionName('');
      setContactEmail('');
      setContactPhone('');
      dispatch({ type: EVENT_CONTACT_BY_ID_RESET });
    }

    if (eventPublishSuccess || eventUnpublishSuccess) {
      swal(
        'Success!',
        eventPublishSuccess || eventUnpublishSuccess,
        'success'
      ).then((value) => {
        history.push('/events');
        dispatch({ type: EVENT_PUBLISH_RESET });
        dispatch({ type: EVENT_UNPUBLISH_RESET });
      });
    } else if (eventPublishError || eventUnpublishError) {
      swal('Error!', eventPublishError || eventUnpublishError, 'error');
    }

    if (eventContactByIdSuccess) {
      setAddEventContact(true);
      setEditEventContact(true);
      setEventContactId(eventContact.eventContactId);
      setMemberId(eventContact.memberId);
      setPositionName(eventContact.positionName);
      setContactEmail(eventContact.contactEmail);
      setContactPhone(eventContact.contactPhone);

      // setId(announcement.announcementId);
    }
  }, [
    dispatch,
    history,
    id,
    success,
    eventUpdateSuccess,
    eventContactByIdSuccess,
    eventContactUpdateSuccess,
    successDelete,
    eventPublishSuccess,
    eventUnpublishSuccess,
    eventUnpublishSuccess,
    eventUnpublishError,
  ]);

  const addNewEventContact = (e) => {
    e.preventDefault();

    setAddEventContact(!addEventContact);
    setMemberId('');
    setPositionName('');
    setContactEmail('');
    setContactPhone('');
    setEditEventContact(false);
    dispatch({ type: EVENT_CONTACT_BY_ID_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editEventContact) {
      dispatch(
        updateEventContactById(
          eventContactId,
          memberId,
          positionName,
          contactEmail,
          contactPhone
        )
      );
    } else {
      // setId(userInfo.memberId);
      // console.log(id);
      dispatch(
        newEventContact(id, memberId, positionName, contactEmail, contactPhone)
      );
    }
  };

  const editEventContactHandler = (id) => {
    dispatch({ type: EVENT_CONTACT_UPDATE_BY_ID_RESET });
    // console.log(rowIndex);
    console.log(id);
    dispatch(getEventContactById(id));
  };

  const deleteEventContactHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteEventContact(id));
    }
  };

  const editEventHandler = (e) => {
    e.preventDefault();

    setEditEvent(!editEvent);

    setEventName(event.eventName);
    setEventDescription(event.eventDescription);
    setEventStartDate(new Date(event.eventDate[0].value));
    setEventEndDate(new Date(event.eventDate[1].value));
    setEventStartTime();
    setEventEndTime();
    setEventAddress(event.eventAddress);
    setAdultFee(event.adultFee);
    setMinorFee(event.minorFee);
    setCap(event.cap);
    // dispatch({ type: EVENT_CONTACT_UPDATE_BY_ID_RESET });
    // console.log(rowIndex);
    // console.log(id);
    // dispatch(getEventContactById(id));
  };

  const updateEventHandler = (e) => {
    e.preventDefault();

    setEditEvent(!editEvent);
    console.log(eventName);
    const eventDate = [
      { value: new Date(eventStartDate) },
      { value: new Date(eventEndDate) },
    ];
    console.log(eventDate);

    dispatch(
      updateEventById(
        id,
        eventName,
        eventDescription,
        // eventStartDate,
        // eventEndDate,
        // eventStartTime,
        // eventEndTime,
        eventDate,
        eventAddress,
        adultFee,
        minorFee,
        cap
      )
    );
  };

  const publishEventHandler = (e) => {
    e.preventDefault();

    dispatch(publishEvent(id));
  };

  const unpublishEventHandler = (e) => {
    e.preventDefault();

    dispatch(unpublishEvent(id));
  };

  return (
    <Container>
      {userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin') ? (
        <Link
          className='btn btn-light my-3 btn-sm btn-outline-info'
          to='/events'
        >
          Go Back
        </Link>
      ) : (
        <Link className='btn btn-light my-3 btn-sm btn-outline-info' to='/'>
          Go Back
        </Link>
      )}

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
                        {userInfo &&
                        (userInfo.userRole === 'systemAdmin' ||
                          userInfo.userRole === 'admin') &&
                        editEvent ? (
                          <Form.Group as={Col} controlId='eventName'>
                            <Form.Control
                              required
                              type='text'
                              placeholder='Event Name'
                              value={eventName}
                              onChange={(e) => setEventName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        ) : (
                          <Col>{event.eventName}</Col>
                        )}
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Description:</Col>
                        {userInfo &&
                        (userInfo.userRole === 'systemAdmin' ||
                          userInfo.userRole === 'admin') &&
                        editEvent ? (
                          <Form.Group as={Col} controlId='eventDescription'>
                            <Form.Control
                              required
                              type='text'
                              placeholder='Event Description'
                              value={eventDescription}
                              onChange={(e) =>
                                setEventDescription(e.target.value)
                              }
                            ></Form.Control>
                          </Form.Group>
                        ) : (
                          <Col>{event.eventDescription}</Col>
                        )}
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Date:</Col>
                        <Col>
                          <ListGroup variant='flush'>
                            <ListGroup.Item className='p-0'>
                              <Row>
                                {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') &&
                                editEvent ? (
                                  <Form.Group
                                    as={Col}
                                    // md='5'
                                    controlId='eventStartDate'
                                  >
                                    <Form.Label>Start Date:</Form.Label>
                                    <Form.Control
                                      required
                                      type='text'
                                      placeholder='Enter Your Start Date'
                                      value={eventStartDate}
                                      onChange={(e) =>
                                        setEventStartDate(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                ) : (
                                  <>
                                    <Col md={4}>Start Date :</Col>
                                    {event.eventDate &&
                                    event.eventDate.length !== 0 ? (
                                      <Col>{event.eventDate[0].value}</Col>
                                    ) : null}
                                  </>
                                )}
                              </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className='p-0'>
                              <Row>
                                {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') &&
                                editEvent ? (
                                  <Form.Group
                                    as={Col}
                                    // md='5'
                                    controlId='eventEndDate'
                                  >
                                    <Form.Label>End Date:</Form.Label>
                                    <Form.Control
                                      required
                                      type='text'
                                      placeholder='Enter The End Date'
                                      value={eventEndDate}
                                      onChange={(e) =>
                                        setEventEndDate(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                ) : (
                                  <>
                                    <Col md={4}>End Date :</Col>
                                    {event.eventDate &&
                                    event.eventDate.length !== 0 ? (
                                      <Col>{event.eventDate[1].value}</Col>
                                    ) : null}
                                  </>
                                )}
                              </Row>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Event Location:</Col>
                        {userInfo &&
                        (userInfo.userRole === 'systemAdmin' ||
                          userInfo.userRole === 'admin') &&
                        editEvent ? (
                          <Form.Group as={Col} controlId='eventAddress'>
                            <Form.Control
                              required
                              type='text'
                              placeholder='Enter Location Address'
                              value={eventAddress}
                              onChange={(e) => setEventAddress(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        ) : (
                          <Col>{event.eventAddress}</Col>
                        )}
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Adult Fee:</Col>
                        {userInfo &&
                        (userInfo.userRole === 'systemAdmin' ||
                          userInfo.userRole === 'admin') &&
                        editEvent ? (
                          <Form.Group as={Col} controlId='adultFee'>
                            <Form.Control
                              required
                              type='number'
                              min='0'
                              placeholder='Set Audult Fee'
                              value={adultFee}
                              onChange={(e) => setAdultFee(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        ) : (
                          <Col>$ {event.adultFee}</Col>
                        )}
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Minor Fee:</Col>
                        {userInfo &&
                        (userInfo.userRole === 'systemAdmin' ||
                          userInfo.userRole === 'admin') &&
                        editEvent ? (
                          <Form.Group as={Col} controlId='minorFee'>
                            <Form.Control
                              required
                              type='number'
                              min='0'
                              placeholder='Set Minor Fee'
                              value={minorFee}
                              onChange={(e) => setMinorFee(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                        ) : (
                          <Col>$ {event.minorFee}</Col>
                        )}
                      </Row>
                    </ListGroup.Item>

                    {userInfo &&
                      (userInfo.userRole === 'systemAdmin' ||
                        userInfo.userRole === 'admin') && (
                        <>
                          <ListGroup.Item>
                            <Row>
                              <Col md={3}>Cap:</Col>
                              {editEvent ? (
                                <Form.Group as={Col} controlId='cap'>
                                  <Form.Control
                                    required
                                    type='number'
                                    min='0'
                                    placeholder='Set cap'
                                    value={cap}
                                    onChange={(e) => setCap(e.target.value)}
                                  ></Form.Control>
                                </Form.Group>
                              ) : (
                                <Col>{event.cap}</Col>
                              )}
                            </Row>
                          </ListGroup.Item>
                        </>
                      )}
                  </ListGroup>
                </Card>
              </Col>

              <Col md={4} className='m-0 p-1'>
                <Card>
                  {userInfo &&
                    (userInfo.userRole === 'systemAdmin' ||
                      userInfo.userRole === 'admin') && (
                      <>
                        <Card.Header className='text-center' as='h5'>
                          <Link
                            className='btn btn-outline-info btn-sm btn-block  rounded'
                            onClick={addNewEventContact}
                          >
                            Create new contact for event
                          </Link>
                        </Card.Header>

                        <Card.Body>
                          {addEventContact
                            ? (eventContactNewError && (
                                <Message variant='danger'>
                                  {eventContactNewError}
                                </Message>
                              )) ||
                              (eventContactNewLoading && <Loader />) ||
                              (success ? (
                                <Message variant='success'>{success}</Message>
                              ) : (
                                <Form onSubmit={submitHandler}>
                                  <Form.Group controlId='title'>
                                    <Form.Label>Position Name</Form.Label>
                                    <Form.Control
                                      type='text'
                                      placeholder='Position Name'
                                      value={positionName}
                                      onChange={(e) =>
                                        setPositionName(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='title'>
                                    <Form.Label>Member Id</Form.Label>
                                    <Form.Control
                                      type='text'
                                      placeholder='ID'
                                      value={memberId}
                                      onChange={(e) =>
                                        setMemberId(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='title'>
                                    <Form.Label>Contact Email</Form.Label>
                                    <Form.Control
                                      type='email'
                                      placeholder='Email'
                                      value={contactEmail}
                                      onChange={(e) =>
                                        setContactEmail(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='title'>
                                    <Form.Label>Contact Phone</Form.Label>
                                    <Form.Control
                                      type='text'
                                      placeholder='Phone Number'
                                      value={contactPhone}
                                      onChange={(e) =>
                                        setContactPhone(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  {editEventContact ? (
                                    <Button
                                      type='submit'
                                      variant='info'
                                      block
                                      // onClick={() =>
                                      //   updateAnnouncementHandler(
                                      //     announcement.announcementId
                                      //   )
                                      // }
                                    >
                                      <i className='fas fa-plus' /> Update
                                    </Button>
                                  ) : (
                                    <Button type='submit' variant='info' block>
                                      <i className='fas fa-plus' /> Add
                                    </Button>
                                  )}
                                </Form>
                              ))
                            : null}
                        </Card.Body>
                      </>
                    )}

                  <Card.Header className='text-info text-center'>
                    Contacts:
                  </Card.Header>

                  {eventContactsLoading ? (
                    <Loader />
                  ) : eventContactsError ? (
                    <Message variant='danger'>{eventContactsError}</Message>
                  ) : (
                    <>
                      <ListGroup variant='flush'>
                        {eventContacts && eventContacts.length !== 0
                          ? eventContacts.map((eventContact) => (
                              <>
                                <ListGroup.Item
                                  key={eventContact.eventContactId}
                                >
                                  <Row>
                                    <Col md={4}>Position :</Col>
                                    <Col>{eventContact.positionName}</Col>
                                  </Row>

                                  <Row>
                                    <Col md={4}>Name :</Col>
                                    <Col>{eventContact.contactName}</Col>
                                  </Row>

                                  <Row>
                                    <Col md={4}>Email :</Col>
                                    <Col>{eventContact.contactEmail}</Col>
                                  </Row>

                                  <Row>
                                    <Col md={4}>Phone :</Col>
                                    <Col>{eventContact.contactPhone}</Col>
                                  </Row>

                                  {userInfo &&
                                    (userInfo.userRole === 'systemAdmin' ||
                                      userInfo.userRole === 'admin') && (
                                      <div className='text-center'>
                                        <span
                                          onClick={() =>
                                            editEventContactHandler(
                                              eventContact.eventContactId
                                            )
                                          }
                                        >
                                          <i className='far fa-edit action mr-2'></i>
                                        </span>

                                        <span
                                          onClick={() =>
                                            deleteEventContactHandler(
                                              eventContact.eventContactId
                                            )
                                          }
                                        >
                                          <i className='fas fa-trash action'></i>
                                        </span>
                                      </div>
                                    )}
                                </ListGroup.Item>
                              </>
                            ))
                          : null}{' '}
                      </ListGroup>
                    </>
                  )}
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Row>
                  {userInfo &&
                  (userInfo.userRole === 'systemAdmin' ||
                    userInfo.userRole === 'admin') ? (
                    <>
                      <Col className='m-0 p-1'>
                        {/* <Card.Footer className='text-muted'> */}
                        {editEvent ? (
                          <Link
                            className='btn btn-outline-info btn-sm btn-block  rounded'
                            onClick={updateEventHandler}
                          >
                            Update
                          </Link>
                        ) : (
                          <Link
                            className='btn btn-outline-info btn-sm btn-block  rounded'
                            onClick={editEventHandler}
                          >
                            Edit
                          </Link>
                        )}

                        {/* </Card.Footer> */}
                      </Col>
                      <Col className='m-0 p-1'>
                        {/* <Card.Footer className='text-muted'> */}
                        {editEvent ? (
                          <Link
                            className='btn btn-outline-danger btn-sm btn-block  rounded'
                            onClick={editEventHandler}
                          >
                            Cancel
                          </Link>
                        ) : !event.eventStatus ? (
                          <Link
                            className='btn btn-outline-warning btn-sm btn-block rounded'
                            onClick={publishEventHandler}
                          >
                            Publish
                          </Link>
                        ) : (
                          <Link
                            className='btn btn-outline-warning btn-sm btn-block rounded'
                            onClick={unpublishEventHandler}
                          >
                            Un-Publish
                          </Link>
                        )}

                        {/* </Card.Footer> */}
                      </Col>
                    </>
                  ) : event && event.eventStatus ? (
                    <Col className='m-0 p-1'>
                      <Link
                        className='btn btn-outline-info btn-sm btn-block  rounded'
                        to={`/event/register/${event.eventId}`}
                      >
                        Register
                      </Link>
                    </Col>
                  ) : null}
                </Row>
              </Col>
            </Row>
          </>
        )
      ) : null}
    </Container>
  );
};

export default EventByIdScreen;
