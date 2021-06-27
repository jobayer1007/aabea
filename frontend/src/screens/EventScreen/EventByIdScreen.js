import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
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

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
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
import RTable from '../../components/Table/RTable';
import ColumnFilter from '../../components/Table/ColumnFilter';
import { listUsers } from '../../actions/userActions';

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
  // const [eventStartTime, setEventStartTime] = useState('');
  // const [eventEndTime, setEventEndTime] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [adultFee, setAdultFee] = useState(0);
  const [minorFee, setMinorFee] = useState(0);
  const [cap, setCap] = useState(0);

  const [columnsAdmin, setColumnsAdmin] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading: userListLoading, error: userListError, users } = userList;

  const eventById = useSelector((state) => state.eventById);
  const { loading, error, event } = eventById;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { success: eventUpdateSuccess } = eventUpdate;

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
  const { error: eventContactUpdateError, success: eventContactUpdateSuccess } =
    eventContactUpdate;

  const eventContactDelete = useSelector((state) => state.eventContactDelete);
  const { success: successDelete } = eventContactDelete;

  const eventPublish = useSelector((state) => state.eventPublish);
  const { error: eventPublishError, success: eventPublishSuccess } =
    eventPublish;

  const eventUnpublish = useSelector((state) => state.eventUnpublish);
  const { error: eventUnpublishError, success: eventUnpublishSuccess } =
    eventUnpublish;

  const checkChapter = window.location.host;

  useEffect(() => {
    dispatch(getEventById(id));
    dispatch(eventAllContact(id));

    if (userInfo) {
      dispatch({ type: EVENT_CONTACT_NEW_RESET });
      dispatch({ type: EVENT_CONTACT_UPDATE_BY_ID_RESET });

      if (
        userInfo.userRole === 'admin' ||
        userInfo.userRole === 'systemAdmin'
      ) {
        dispatch(listUsers(checkChapter));

        setColumnsAdmin([
          {
            Header: 'Registration Id',
            accessor: 'registrationId',
            Filter: ColumnFilter,
          },

          {
            Header: 'First Name',
            accessor: 'firstName',
            Filter: ColumnFilter,
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            Filter: ColumnFilter,
          },
          {
            Header: 'Email',
            accessor: 'email',
            Filter: ColumnFilter,
          },
          {
            Header: 'Phone',
            accessor: 'phone',
            Filter: ColumnFilter,
          },
          {
            Header: 'Member Id',
            accessor: 'memberId',
            Filter: ColumnFilter,
          },
          {
            Header: 'Adult/s',
            accessor: 'numberOfAdults',
            Filter: ColumnFilter,
          },
          {
            Header: 'Minor/s',
            accessor: 'numberOfMinors',
            Filter: ColumnFilter,
          },
          {
            Header: 'Payment',
            accessor: 'eventPayment.amount',
            Filter: ColumnFilter,
          },
        ]);
      }
    }

    if (success || eventContactUpdateSuccess) {
      swal('Success!', success || eventContactUpdateSuccess, 'success').then(
        (value) => {
          setAddEventContact(false);
          setEditEventContact(false);

          setEventContactId('');
          setMemberId('');
          setPositionName('');
          setContactEmail('');
          setContactPhone('');
          dispatch({ type: EVENT_CONTACT_NEW_RESET });

          dispatch({ type: EVENT_CONTACT_BY_ID_RESET });
        }
      );
    } else if (eventContactNewError || eventContactUpdateError) {
      swal('Error!', eventContactNewError || eventContactUpdateError, 'error');
    }

    if (eventPublishSuccess || eventUnpublishSuccess) {
      swal(
        'Success!',
        eventPublishSuccess || eventUnpublishSuccess,
        'success'
      ).then(() => {
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
    userInfo,
    checkChapter,
    id,
    success,
    eventUpdateSuccess,
    eventContactNewError,
    eventContactUpdateError,
    eventContactByIdSuccess,
    eventContact,
    eventContactUpdateSuccess,
    successDelete,
    eventPublishSuccess,
    eventUnpublishSuccess,
    eventPublishError,
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
    dispatch({ type: EVENT_CONTACT_NEW_RESET });
  };

  const memberIdHandler = (e) => {
    e.preventDefault();

    setMemberId(e.target.value.split(',')[0]);
    setContactEmail(e.target.value.split(',')[1]);
    setContactPhone(e.target.value.split(',')[2]);
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

    setEventAddress(event.eventAddress);
    setAdultFee(event.adultFee);
    setMinorFee(event.minorFee);
    setCap(event.cap);
  };

  const updateEventHandler = (e) => {
    e.preventDefault();

    setEditEvent(!editEvent);
    const eventDate = [
      { value: new Date(eventStartDate) },
      { value: new Date(eventEndDate) },
    ];

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
            <Card className='mb-2'>
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
                                        min={
                                          new Date().toISOString().split('T')[0]
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  ) : (
                                    <>
                                      <Col md={4}>Start Date :</Col>
                                      {event.eventDate &&
                                      event.eventDate.length !== 0 &&
                                      event.eventDate[0].value ? (
                                        // <Col>{event.eventDate[0].value}</Col>
                                        <Moment>
                                          {event.eventDate[0].value}
                                        </Moment>
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
                                        min={eventStartDate}
                                      ></Form.Control>
                                    </Form.Group>
                                  ) : (
                                    <>
                                      <Col md={4}>End Date :</Col>
                                      {event.eventDate &&
                                      event.eventDate.length !== 0 &&
                                      event.eventDate[1].value ? (
                                        // <Col>{event.eventDate[1].value}</Col>
                                        <Moment>
                                          {event.eventDate[1].value}
                                        </Moment>
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
                                onChange={(e) =>
                                  setEventAddress(e.target.value)
                                }
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

                  {/* Buttons */}
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
                                        required
                                        type='text'
                                        placeholder='Position Name'
                                        value={positionName}
                                        onChange={(e) =>
                                          setPositionName(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='memberId'>
                                      <Form.Label>Member Id</Form.Label>
                                      <Form.Control
                                        as='select'
                                        onChange={memberIdHandler}
                                      >
                                        <option>Select member Id</option>
                                        {users &&
                                          users.length !== 0 &&
                                          users.map((user, index) => (
                                            <option
                                              key={index}
                                              value={[
                                                user.memberId,
                                                user.email,
                                                user.member.primaryPhone,
                                              ]}
                                            >
                                              {user.memberId}
                                            </option>
                                          ))}
                                      </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='title'>
                                      <Form.Label>Contact Email</Form.Label>
                                      <Form.Control
                                        required
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
                                        required
                                        type='tel'
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
                                      <Button
                                        type='submit'
                                        variant='info'
                                        block
                                      >
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
                            ? eventContacts.map((eventContact, index) => (
                                <ListGroup.Item key={index}>
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
                                    <Col>
                                      <a
                                        href={`mailTo: ${eventContact.contactEmail}`}
                                      >
                                        {eventContact.contactEmail}
                                      </a>
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
                              ))
                            : null}{' '}
                        </ListGroup>
                      </>
                    )}
                  </Card>
                </Col>
              </Row>
            </Card>

            {userInfo &&
            (userInfo.userRole === 'systemAdmin' ||
              userInfo.userRole === 'admin') ? (
              <Card className='text-center p-0'>
                <Card.Header as='h5' className='text-info'>
                  Member Register List
                </Card.Header>
                <Row>
                  <Col className='p-0'>
                    {event.eventRegistrations &&
                    event.eventRegistrations.length !== 0 ? (
                      <RTable
                        users={event.eventRegistrations}
                        COLUMNS={columnsAdmin}
                      />
                    ) : (
                      <span>No registration found</span>
                    )}
                  </Col>
                </Row>
              </Card>
            ) : null}
          </>
        )
      ) : null}
    </Container>
  );
};

export default EventByIdScreen;
