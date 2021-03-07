import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import swal from 'sweetalert';

const RegisterScreen = ({ location, history }) => {
  // const [username, setUsername] = useState('');

  const [message, setMessage] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('');
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // if (success) {
    //   dispatch({ type: USER_REGISTER_RESET });
    //   history.push(redirect);
    // }

    if (success) {
      console.log(success);
      swal('Success!', success, 'success').then((value) => {
        dispatch({ type: USER_REGISTER_RESET });
        history.push(redirect);
      });
    } else if (error) {
      console.log(error);
      swal('Error!', error, 'error');
    }
  }, [history, success, redirect, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('password do not match');
    } else {
      // Dispatch Register
      dispatch(
        register(
          // username,
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
          collegeName
        )
      );
    }
  };

  return (
    <FormContainer>
      {/* Card Start */}
      <Card border='primary'>
        <Card.Header className='text-center' as='h2'>
          Sign Up
        </Card.Header>
        <Card.Body>
          {/* {message && <Message variant='danger'>{message}</Message>} */}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success ? (
            <Message variant='success'>{success}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              {/* <Form.Group controlId='username'>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type='username'
                placeholder='Enter User Name..'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

              <Form.Group controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='firstName'
                  placeholder='Please Enter Your First Name..'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='mInit'>
                <Form.Label>M. Initial</Form.Label>
                <Form.Control
                  type='mInit'
                  placeholder=' Please Enter Your M. Initial: Mr / Ms'
                  value={mInit}
                  onChange={(e) => setMInit(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='lastName'
                  placeholder='Please Enter Your Last Name..'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='address1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='address1'
                  placeholder='Please Enter Address..'
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='city'
                  placeholder='Enter City..'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='state'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type='state'
                  placeholder='Enter State..'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='zipcode'>
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type='zipcode'
                  placeholder='Enter Zipcode..'
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='primaryPhone'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='primaryPhone'
                  placeholder='Enter Your Phone Number..'
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='degree'>
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type='degree'
                  placeholder='Enter Your Last Degree Received..'
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='degreeYear'>
                <Form.Label>Degree Year</Form.Label>
                <Form.Control
                  type='degreeYear'
                  placeholder='Enter The Year of Degree Awarded..'
                  value={degreeYear}
                  onChange={(e) => setDegreeYear(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='major'>
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type='major'
                  placeholder='Enter Your Major..'
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='collegeName'>
                <Form.Label>College Name</Form.Label>
                <Form.Control
                  type='collegeName'
                  placeholder='Enter Your University/College Name..'
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email..'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password..'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password..'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' block>
                Register
              </Button>
            </Form>
          )}
        </Card.Body>
        <Card.Footer className='text-muted'>
          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      {/* Card End */}
    </FormContainer>
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
