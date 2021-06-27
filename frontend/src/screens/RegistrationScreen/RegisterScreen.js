import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { USER_REGISTER_RESET } from '../../constants/userConstants';
import swal from 'sweetalert';

const RegisterScreen = ({ location, history }) => {
  // const [username, setUsername] = useState('');

  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('Mr');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [degree, setDegree] = useState('');
  const [degreeYear, setDegreeYear] = useState('');
  const [major, setMajor] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [certificate, setCertificate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  const reRef = useRef();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const checkChapter = window.location.host;

  useEffect(() => {
    if (success) {
      swal('Success!', success, 'success').then((value) => {
        dispatch({ type: USER_REGISTER_RESET });
        history.push(redirect);
      });
    } else if (error) {
      console.log(error);
      swal('Error!', error, 'error').then((value) => {
        dispatch({ type: USER_REGISTER_RESET });
      });
    }
  }, [dispatch, history, success, redirect, error]);

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
      setCertificate(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // const captcha = document.querySelector('#g-recaptcha-response').value;

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (password !== confirmPassword) {
        setMessage('password do not match');
        swal('Error!', message, 'error');
      } else {
        const captcha = await reRef.current.getValue();
        console.log(captcha);
        // Dispatch Register
        dispatch(
          register(
            captcha,
            email,
            password,
            firstName,
            mInit,
            lastName,
            address1,
            city,
            state,
            zipcode,
            primaryPhone,
            degree,
            degreeYear,
            major,
            collegeName,
            certificate,
            checkChapter
          )
        );
        await reRef.current.reset();
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      {/* Card Start */}
      <Card border='info'>
        <Card.Header className='text-center text-info' as='h2'>
          Sign Up
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
                <Form.Row>
                  {/* <Row> */}
                  <Form.Group as={Col} md='2'>
                    <Form.Label>Name</Form.Label>
                  </Form.Group>
                  {/* <Col md={10}> */}
                  {/* <Row> */}
                  {/* <Col md={2}> */}
                  <Form.Group as={Col} md='2' controlId='mInit'>
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
                  {/* </Col> */}
                  {/* <Col md={5}> */}
                  <Form.Group as={Col} md='4' controlId='firstName'>
                    <Form.Control
                      required
                      type='text'
                      placeholder='First Name'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength='20'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* </Col> */}
                  {/* <Col md={5}> */}
                  <Form.Group as={Col} md='4' controlId='lastName'>
                    <Form.Control
                      required
                      placeholder='Last Name'
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength='20'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* </Col> */}
                  {/* </Row> */}
                  {/* </Col> */}
                  {/* </Row> */}

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Address</Form.Label>
                  </Form.Group>

                  <Form.Group as={Col} md='10' controlId='address1'>
                    <Form.Control
                      required
                      type='text'
                      placeholder='1234 Main St...'
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      maxLength='50'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md={{ span: 10, offset: 2 }}
                    controlId='state'
                  >
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter State..'
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      maxLength='20'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md={{ span: 10, offset: 2 }}
                    controlId='city'
                  >
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter City..'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      maxLength='30'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md={{ span: 10, offset: 2 }}
                    controlId='zipcode'
                  >
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter Zipcode..'
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      maxLength='15'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Phone Number</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md='10' controlId='primaryPhone'>
                    <Form.Control
                      required
                      type='number'
                      placeholder='Enter Your Phone Number..'
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      maxLength='20'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Education</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md='5' controlId='degree'>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter Your Last Degree Received..'
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      maxLength='50'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md='5' controlId='degreeYear'>
                    <Form.Control
                      required
                      type='number'
                      placeholder='Enter The Year of Degree Awarded..'
                      value={degreeYear}
                      onChange={(e) => setDegreeYear(e.target.value)}
                      maxLength='4'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md={{ span: 5, offset: 2 }}
                    controlId='major'
                  >
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter Your Major..'
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      maxLength='30'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md='5' controlId='collegeName'>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter Your University/College Name..'
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      maxLength='50'
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Certificate</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md='10' controlId='certificate'>
                    <Form.File
                      id='image-file'
                      // label='Choose File'
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                    {/* <Form.Control
                      required
                      type='text'
                      // placeholder='Enter your last certificate url..'
                      value={certificate}
                      onChange={(e) => setCertificate(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Email Address</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md='10' controlId='email'>
                    <Form.Control
                      required
                      type='email'
                      placeholder='Enter Email..'
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md={{ span: 5, offset: 2 }}
                    controlId='password'
                  >
                    <Form.Control
                      required
                      type='password'
                      placeholder='Enter password..'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md={{ span: 5 }}
                    controlId='confirmPassword'
                  >
                    <Form.Control
                      required
                      type='password'
                      placeholder='Confirm password..'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={password !== confirmPassword}
                      // validated={password === confirmPassword}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      **Required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Row>
                  <Col md={{ span: 10, offset: 2 }}>
                    {/* <div
                      className='g-recaptcha'
                      data-sitekey='6LeVuS0bAAAAANZ8QwazNTaMGFPl3kXkR7aP0uR4'
                    ></div> */}
                    <ReCAPTCHA
                      sitekey='6LeVuS0bAAAAANZ8QwazNTaMGFPl3kXkR7aP0uR4'
                      ref={reRef}
                      id='widgetId2'
                    />
                  </Col>
                </Row>

                <Form.Group as={Row}>
                  <Col md={{ span: 10, offset: 2 }}>
                    <Button type='submit' variant='info' block>
                      Register
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </>
          )}
        </Card.Body>
        <Card.Footer className='text-muted text-right'>
          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                <span className='text-info'>Login</span>
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      {/* Card End */}
    </Container>
  );
};

export default RegisterScreen;

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
