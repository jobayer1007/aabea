import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { passwordUpdate } from '../../actions/userActions';

const PasswordUpdateScreen = ({ location, match, history }) => {
  const { id, token } = match.params;

  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userPasswordUpdate = useSelector((state) => state.userPasswordUpdate);
  const { loading, error, success } = userPasswordUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Submited');
    // Dispatch Login
    dispatch(passwordUpdate(password, id, token));
  };

  return (
    <FormContainer>
      <Card border='info'>
        <Card.Header
          className='text-center'
          as='h2'
          style={{ color: '#033c73' }}
        >
          Set New password
        </Card.Header>

        <Card.Body className='text-center'>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success ? (
            <>
              <Message variant='success'>{success}</Message>
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
              <Form.Group controlId='password'>
                <Form.Control
                  required
                  type='password'
                  placeholder='Enter password..'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Control
                  required
                  type='password'
                  placeholder='Confirm password..'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={password !== confirmPassword}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='info' block>
                Set New Password
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

export default PasswordUpdateScreen;
