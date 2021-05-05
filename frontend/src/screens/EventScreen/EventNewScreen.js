import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { USER_REGISTER_RESET } from '../../constants/userConstants';
import swal from 'sweetalert';
import { newEvent } from '../../actions/eventActions';
import { EVENT_NEW_RESET } from '../../constants/eventConstants';

const EventNewScreen = ({ location, history }) => {
  // const [username, setUsername] = useState('');

  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);

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
  const [startDate, setStartDate] = useState('');
  // const [certificate, setCertificate] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const eventNew = useSelector((state) => state.eventNew);
  const { loading, error, success, newCreatedEvent } = eventNew;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (
      userInfo &&
      !(userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      history.push('/login');
    }
    if (success) {
      // console.log(success);
      swal('Success!', 'New event createed successfully', 'success').then(
        (value) => {
          history.push(`/event/${newCreatedEvent.eventId}`);
          dispatch({ type: EVENT_NEW_RESET });
        }
      );
    } else if (error) {
      console.log(error);
      swal('Error!', error, 'error');
    }
  }, [dispatch, history, success, error]);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     };

  //     const { data } = await axios.post('/api/upload', formData, config);
  //     setCertificate(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Dispatch Register
      // setStartDate(eventStartDate + 'T' + eventStartTime);
      const eventDate = [
        { value: new Date(eventStartDate + 'T' + eventStartTime) },
        { value: new Date(eventEndDate + 'T' + eventEndTime) },
      ];

      // console.log(startDate);
      console.log(eventStartDate);
      console.log(eventStartTime);
      console.log(eventDate);

      dispatch(
        newEvent(
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
    }

    setValidated(true);
  };

  return (
    <Container>
      <Link className='btn btn-light my-3 btn-sm btn-outline-info' to='/events'>
        Cancel
      </Link>
      {/* Card Start */}
      <Card border='info'>
        <Card.Header className='text-center text-info' as='h5'>
          New Event
        </Card.Header>
        <Card.Body>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success ? (
            <Message variant='success'>{success}</Message>
          ) : (
            <>
              <Form noValidate validated={validated} onSubmit={submitHandler}>
                <>
                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Event Name</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} controlId='eventName'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Event Name'
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Description</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} controlId='eventDescription'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Event Description'
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Date</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md='5' controlId='eventStartDate'>
                      <Form.Label>Start Date:</Form.Label>
                      <Form.Control
                        required
                        type='date'
                        placeholder='Enter Your Start Date'
                        value={eventStartDate}
                        onChange={(e) => setEventStartDate(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md='5' controlId='eventEndDate'>
                      <Form.Label>End Date:</Form.Label>
                      <Form.Control
                        required
                        type='date'
                        placeholder='Enter The End Date'
                        value={eventEndDate}
                        onChange={(e) => setEventEndDate(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={{ span: 5, offset: 2 }}
                      controlId='eventStartTime'
                    >
                      <Form.Label>Start Time:</Form.Label>
                      <Form.Control
                        required
                        type='time'
                        placeholder='Enter Start time'
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md='5' controlId='eventEndTime'>
                      <Form.Label>Start Time:</Form.Label>
                      <Form.Control
                        required
                        type='time'
                        placeholder='Enter End time'
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Event Location</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md='10' controlId='eventAddress'>
                      <Form.Control
                        required
                        type='text'
                        placeholder='Enter Location Address'
                        value={eventAddress}
                        onChange={(e) => setEventAddress(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Adult Fee</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md='10' controlId='adultFee'>
                      <Form.Control
                        required
                        type='number'
                        min='0'
                        placeholder='Set Audult Fee'
                        value={adultFee}
                        onChange={(e) => setAdultFee(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Minor Fee</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md='10' controlId='minorFee'>
                      <Form.Control
                        required
                        type='number'
                        min='0'
                        placeholder='Set Minor Fee'
                        value={minorFee}
                        onChange={(e) => setMinorFee(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} md='2'>
                      <Form.Label>Cap</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} md='10' controlId='cap'>
                      <Form.Control
                        required
                        type='number'
                        min='0'
                        placeholder='Set cap'
                        value={cap}
                        onChange={(e) => setCap(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>
                </>

                <Form.Group as={Row}>
                  <Col md={{ span: 10, offset: 2 }}>
                    <Button type='submit' variant='info' block>
                      Create Event
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </>
          )}
        </Card.Body>
        {/* <Card.Footer className='text-muted text-right'>
          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                <span className='text-info'>Login</span>
              </Link>
            </Col>
          </Row>
        </Card.Footer> */}
      </Card>
      {/* Card End */}
    </Container>
  );
};

export default EventNewScreen;
