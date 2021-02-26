import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  Image,
  Row,
  Col,
  Card,
  CardDeck,
  Nav,
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserPaymentDetails, payUser } from '../../actions/userActions';
import {
  USER_PAYMENT_DETAILS_RESET,
  USER_PAY_RESET,
} from '../../constants/userConstants';
// import { listUsers, deleteUser } from '../actions/userActions';

const PaymentScreen = ({ location, history }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userPaymentDetails = useSelector((state) => state.userPaymentDetails);
  const {
    loading: paymentLoading,
    error: paymentErrors,
    payments,
  } = userPaymentDetails;

  const userPay = useSelector((state) => state.userPay);
  const { loading: loadingPay, success: successPay } = userPay;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      // dispatch(getUserPaymentDetails());
      // dispatch({ type: USER_PAYMENT_DETAILS_RESET });

      const addPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };

      if (!payments || successPay) {
        dispatch({ type: USER_PAY_RESET });
        dispatch(getUserPaymentDetails());
        // dispatch({ type: USER_PAYMENT_DETAILS_RESET });
      }
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [history, dispatch, userInfo, successPay, payments]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payUser(userInfo.memberId, paymentResult));
  };

  return (
    <>
      <Row className='content'>
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          // id='sidebar-wrapper'
        >
          <Card className='text-center' border='primary'>
            <Card.Body>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/donate'>
                    <Nav.Link>Donate</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/training'>
                    <Nav.Link>Training</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/committiees'>
                    <Nav.Link>Committiees</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <LinkContainer to='/committiees'>
                  <Button variant='outline-info' block>
                    Committiees
                  </Button>
                </LinkContainer>
              </Card.Title>
            </Card.Body>
            <Card.Footer className='text-muted'>
              <Link
                className='btn btn-outline-warning btn-sm btn-block my-5 rounded'
                to=''
              >
                another button
              </Link>
            </Card.Footer>
          </Card>{' '}
        </Col>
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <Card className='text-center' border='primary'>
            <Card.Header as='h2'>Payment Screen</Card.Header>
            {paymentLoading ? (
              <Loader />
            ) : paymentErrors ? (
              <Message variant='danger'>{paymentErrors}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.paymentType}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.paymentDate.substring(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <ListGroup variant='flush'>
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={25.0}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaymentScreen;
