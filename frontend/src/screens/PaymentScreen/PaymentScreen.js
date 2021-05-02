import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import { PayPalButton } from 'react-paypal-button-v2';

import { Table, Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getUserPaymentDetails,
  getUserProfile,
  payUser,
} from '../../actions/userActions';
import { USER_PAY_RESET } from '../../constants/userConstants';
// import { listUsers, deleteUser } from '../actions/userActions';
import { listPaymentTypes } from '../../actions/paymentTypeActions';
import Sidebar from '../../components/Sidebar/Sidebar';

const PaymentScreen = ({ history }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const [paymentTypeName, setPaymentTypeName] = useState('');
  const [paymentTypeAmount, setPaymentTypeAmount] = useState('');
  const [qty, setQty] = useState(1);
  const [totalPayment, setTotalPayment] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userPaymentDetails = useSelector((state) => state.userPaymentDetails);
  const {
    loading: paymentLoading,
    error: paymentErrors,
    payments,
  } = userPaymentDetails;

  const paymentTypeList = useSelector((state) => state.paymentTypeList);
  const {
    loading: loadingPaymentTypes,
    error: errorPaymentTypes,
    paymentTypes,
  } = paymentTypeList;

  const userPay = useSelector((state) => state.userPay);
  const { success: successPay, error: errorPay } = userPay;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserProfile());

      dispatch(listPaymentTypes());
      dispatch(getUserPaymentDetails());

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

      if (successPay) {
        swal('Success!', successPay, 'success').then(() => {
          dispatch({ type: USER_PAY_RESET });
        });
      } else if (errorPay) {
        console.log(errorPay);
        swal('Error!', errorPay, 'error').then(() => {
          dispatch({ type: USER_PAY_RESET });
        });
      }
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [history, dispatch, userInfo, successPay, errorPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payUser(userInfo.memberId, paymentTypeName, qty, paymentResult));
  };

  const paymentTypeChangeHandler = (e) => {
    // e.preventDefault();

    // setPaymentTypeName(e.target.value);
    setPaymentTypeName(e.target.value.split(',')[0]);
    setPaymentTypeAmount(e.target.value.split(',')[1]);
    // setTotalPayment(paymentTypeAmount * qty);
  };

  const qtyChangeHandler = (e) => {
    // e.preventDefault();

    setQty(e.target.value);
    setTotalPayment(paymentTypeAmount * qty);
  };
  console.log(paymentTypeAmount);
  console.log(paymentTypeName);
  console.log(qty);
  console.log(totalPayment);

  return (
    <>
      <Row className='content'>
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          className='m-0 p-1'
        >
          <Sidebar />
        </Col>

        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
          className='m-0 p-0'
        >
          <>
            <Row>
              <Col md={8} className='mb-2 p-1'>
                <Card>
                  <h3 className='text-info text-center'>Payment</h3>
                  {loadingPaymentTypes ? (
                    <Loader />
                  ) : errorPaymentTypes ? (
                    <Message variant='danger'>{paymentErrors}</Message>
                  ) : (
                    <>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <label>Payment Type</label>
                          <Form.Control
                            as='select'
                            onChange={paymentTypeChangeHandler}
                          >
                            <option>Select Payment Type</option>
                            {paymentTypes.map((paymentType, index) => (
                              <option
                                key={index}
                                value={[
                                  paymentType.paymentTypeName,
                                  paymentType.paymentTypeAmount,
                                ]}
                              >
                                {paymentType.paymentTypeName}
                              </option>
                            ))}
                          </Form.Control>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          {paymentTypeName === 'nominationFee' ? (
                            <>
                              {user && user.status === 'inactive' ? (
                                <Message variant='danger'>
                                  Please Pay your registration fee first to
                                  activate your account
                                </Message>
                              ) : (
                                <>
                                  <label>Please Select Year</label>
                                  <Form.Control
                                    as='select'
                                    value={qty}
                                    onChange={qtyChangeHandler}
                                    // onChange={(e) => setQty(e.target.value)}
                                  >
                                    <option>
                                      Select Number of Years for Payment
                                    </option>

                                    <option value={1}>1</option>
                                  </Form.Control>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <label>Number of Years</label>
                              <Form.Control
                                as='select'
                                // type='number'
                                // min='1'
                                placeholder='Please enter number of years of payment'
                                value={qty}
                                onChange={qtyChangeHandler}
                                // onChange={(e) => setQty(e.target.value)}
                              >
                                <option>
                                  Select Number of Years for Payment
                                </option>

                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                              </Form.Control>
                            </>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </>
                  )}
                  <>
                    <Card.Header as='h5' className='text-info text-center'>
                      Payments
                    </Card.Header>
                    {paymentLoading ? (
                      <Loader />
                    ) : paymentErrors ? (
                      <Message variant='danger'>{paymentErrors}</Message>
                    ) : (
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((payment, index) => (
                            <tr key={index}>
                              <td>{payment.paymentId}</td>
                              <td>{payment.paymentType}</td>
                              <td>{payment.amount}</td>
                              <td>{payment.paymentDate.substring(0, 10)}</td>
                              <td>{payment.year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </>
                </Card>
              </Col>

              <Col md={4} className='mb-2 p-1'>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h5 className='text-info'>Payment Summary</h5>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Payment Type:</Col>
                        <Col>{paymentTypeName}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Payment Year</Col>
                        <Col>{qty}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${paymentTypeAmount * qty}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={paymentTypeAmount * qty}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        </Col>
        {/* Payment History End */}
      </Row>
    </>
  );
};

export default PaymentScreen;
