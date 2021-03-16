import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { verifyUserEmail } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import swal from 'sweetalert';
import { USER_EMAIL_VERIFY_RESET } from '../../constants/userConstants';

const EmailActivationScreen = ({ location, match, history }) => {
  const { hash } = match.params;

  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userEmailVerify = useSelector((state) => state.userEmailVerify);
  const { loading, error, success } = userEmailVerify;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  useEffect(() => {
    if (!hash) {
      history.push(redirect);
    } else {
      dispatch(verifyUserEmail(hash));
      //   history.push(redirect);
      // }
      if (success) {
        console.log(success);
        swal('Success!', success, 'success').then((value) => {
          dispatch({ type: USER_EMAIL_VERIFY_RESET });
          history.push(redirect);
        });
      } else if (error) {
        console.log(error);
        swal('Error!', error, 'error');
        dispatch({ type: USER_EMAIL_VERIFY_RESET });
        history.push(redirect);
      }
    }
  }, [history, hash, error, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch Verify
    dispatch(verifyUserEmail(hash));
    console.log(`hash: ${hash} `);
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
          Verify Your Account
        </Card.Header>
        <Card.Body>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success ? (
            <Message variant='info'>{success}</Message>
          ) : null
          // <Form onSubmit={submitHandler}>
          //   {/* <Form.Group controlId='email'>
          //     <Form.Label>Please Confirm Your Email Address</Form.Label>
          //     <Form.Control
          //       type='email'
          //       placeholder='Enter Email..'
          //       value={email}
          //       onChange={(e) => setEmail(e.target.value)}
          //     ></Form.Control>
          //   </Form.Group> */}

          //   <Button type='submit' variant='info' block>
          //     Verify
          //   </Button>
          // </Form>
          }
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

export default EmailActivationScreen;
