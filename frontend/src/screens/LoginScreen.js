import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { login, logout, resendVerifyEmail } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import swal from 'sweetalert';
import {
  USER_LOGOUT,
  USER_PASSWORD_RESET_RESET,
} from '../constants/userConstants';

const LoginScreen = ({ location, history }) => {
  const [userRole, setUserRole] = useState('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error: errorLogin, userInfo } = userLogin;

  const userVerifyEmailResend = useSelector(
    (state) => state.userVerifyEmailResend
  );
  const { error: veResendError, success } = userVerifyEmailResend;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  useEffect(() => {
    dispatch({ type: USER_PASSWORD_RESET_RESET });

    if (userInfo && userInfo.userRole !== 'systemAdmin') {
      history.push(redirect);
    } else if (userInfo && userInfo.userRole === 'systemAdmin') {
      history.push('/systemAdmin');
    } else if (errorLogin) {
      // console.log(errorLogin);
      if (errorLogin === 'Invalid User' || errorLogin === 'Invalid Password!') {
        swal('Error!', errorLogin, 'error');
        dispatch({ type: USER_LOGOUT });
      } else if (
        errorLogin ===
        'Your application is under review. You will be notified once it is reviewed!'
      ) {
        swal('Error!', errorLogin, 'error');
        dispatch({ type: USER_LOGOUT });
      } else if (success) {
        console.log(success);
        swal('Success!', success, 'success').then(() => {
          dispatch(logout());
        });
      } else if (veResendError) {
        console.log(veResendError);
        swal('Error!', veResendError, 'error').then(() => {
          dispatch(logout());
        });
      } else {
        swal('Error!', errorLogin, {
          buttons: {
            catch: {
              text: 'Resend Verification Link',
              value: 'resend',
            },

            ok: true,
          },
        }).then((value) => {
          switch (value) {
            case 'ok':
              swal.close();
              dispatch(logout());
              break;

            case 'resend':
              dispatch(resendVerifyEmail(email, password));

              break;

            default:
              swal.close();
          }
        });
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    email,
    password,
    redirect,
    errorLogin,
    veResendError,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch Login
    dispatch(login(userRole, email, password));
  };

  return (
    <FormContainer>
      {/* Card start */}
      <Card border='success'>
        <Card.Header
          className='text-center'
          as='h2'
          style={{ color: '#033c73' }}
        >
          LOGIN
        </Card.Header>
        <Card.Body>
          {errorLogin && <Message variant='danger'>{errorLogin}</Message>}
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

            <Form.Group controlId='userRole'>
              <Form.Label>Sign In As: </Form.Label>
              <Form.Control
                as='select'
                // onChange={qtyChangeHandler}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value='member'>Member</option>
                <option value='admin'>Admin</option>
                <option value='systemAdmin'>System Admin</option>
              </Form.Control>
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

            <Col>
              <Link to={'/password/recover'}>Forgot your password?</Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      {/* card above */}
    </FormContainer>
  );
};

export default LoginScreen;
