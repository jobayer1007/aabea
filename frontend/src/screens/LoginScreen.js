import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import swal from 'sweetalert';
import { USER_LOGOUT } from '../constants/userConstants';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  useEffect(() => {
    if (userInfo && userInfo.userRole !== 'systemAdmin') {
      history.push(redirect);
    } else if (userInfo && userInfo.userRole === 'systemAdmin') {
      history.push('/systemAdmin');
    } else if (error) {
      console.log(error);
      swal('Error!', error, 'error');
      dispatch({ type: USER_LOGOUT });
    }
  }, [history, userInfo, redirect, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch Login
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {/* Card start */}
      <Card border='info'>
        <Card.Header
          className='text-center'
          as='h2'
          style={{ color: '#033c73' }}
        >
          LOGIN
        </Card.Header>
        <Card.Body>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
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

            <Button type='submit' variant='info' block>
              Log In
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className='text-muted'>
          <Row className='py-3'>
            <Col>
              New ?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      {/* card above */}
    </FormContainer>
  );
};

export default LoginScreen;
