import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { passwordReset } from '../../actions/userActions';

const PasswordResetScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, error, success } = userPasswordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Submited');
    dispatch(passwordReset(email));
  };

  return (
    <FormContainer>
      <Card border='info'>
        <Card.Header
          className='text-center'
          as='h2'
          style={{ color: '#033c73' }}
        >
          Reset your password
        </Card.Header>

        <Card.Body className='text-center'>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success ? (
            <>
              <Card.Text>
                If that account is in our system, we emailed you a link to reset
                your password.
              </Card.Text>
              <Card.Body className='text-muted'>
                {/* <Row className='py-3'>
                  <Col> */}
                <Link to='/login' className='btn btn-info'>
                  Return to sign in
                </Link>
                {/* </Col>
                </Row> */}
              </Card.Body>
            </>
          ) : (
            // <div className='reset-password-form-wrapper'>
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

              <Button type='submit' variant='info' block>
                Send password reset email
              </Button>
            </Form>
          )}
        </Card.Body>

        <Card.Footer className='text-muted'>
          <Row className='py-3'>
            <Col>
              <Link to='/login'>I remember my password</Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </FormContainer>
  );
};

export default PasswordResetScreen;
