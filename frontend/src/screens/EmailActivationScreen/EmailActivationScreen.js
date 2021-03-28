import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { verifyUserEmail } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const EmailActivationScreen = ({ location, match, history }) => {
  const { hash } = match.params;

  // const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userEmailVerify = useSelector((state) => state.userEmailVerify);
  const { loading, error, success } = userEmailVerify;

  const redirect = location.search ? location.search.split('=')[1] : '/login';

  useEffect(() => {
    if (!hash) {
      history.push(redirect);
    } else {
      dispatch(verifyUserEmail(hash));
      //   history.push(redirect);
      // }
    }
  }, [dispatch, history, hash, redirect]);

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   // Dispatch Verify
  //   dispatch(verifyUserEmail(hash));
  //   console.log(`hash: ${hash} `);
  // };

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
            <>
              <Message variant='info'>{success}</Message>
            </>
          ) : null}
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
