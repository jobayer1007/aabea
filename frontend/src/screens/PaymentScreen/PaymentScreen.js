import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

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
  Form,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getUserPaymentDetails,
  getUserProfile,
  payUser,
} from '../../actions/userActions';
import {
  USER_PAYMENT_DETAILS_RESET,
  USER_PAY_RESET,
} from '../../constants/userConstants';
// import { listUsers, deleteUser } from '../actions/userActions';
import { listPaymentTypes } from '../../actions/paymentTypeActions';
import PaymentDropdown from '../../components/PaymentDropdown/PaymentDropdown';
import DatePicker from '../../components/PaymentDropdown/DatePicker';
import Sidebar from '../../components/Sidebar/Sidebar';

const PaymentScreen = ({ location, history }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const [paymentTypeName, setPaymentTypeName] = useState('');
  const [paymentTypeAmount, setPaymentTypeAmount] = useState('');
  const [qty, setQty] = useState(1);
  const [totalPayment, setTotalPayment] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, user, error: userError } = userDetails;

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
  const { loading: loadingPay, success: successPay, error: errorPay } = userPay;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserProfile());

      // setPaymentTypeAmount('');
      // setPaymentTypeName('');
      // setTotalPayment(paymentTypeAmount * qty);
      dispatch(listPaymentTypes());
      dispatch(getUserPaymentDetails());
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

        console.log(userInfo.memberSince);
      };

      if (!payments || successPay) {
        if (successPay) {
          swal('Success!', successPay, 'success').then((value) => {
            dispatch({ type: USER_PAY_RESET });
          });
        } else if (errorPay) {
          console.log(errorPay);
          swal('Error!', errorPay, 'error').then((value) => {
            dispatch({ type: USER_PAY_RESET });
          });
        }
        // dispatch(getUserPaymentDetails());
        // dispatch({ type: USER_PAYMENT_DETAILS_RESET });
      }
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    if (paymentTypeName === 'nominationFee' && user.status === 'inactive') {
      swal(
        'Error!',
        'Please Pay your registration fee first to activate your account',
        'error'
      );
    }
  }, [
    history,
    dispatch,
    userInfo,
    successPay,
    errorPay,
    // qty,
    // paymentTypeAmount,
    // paymentTypeName,
  ]);

  const duesHandler = (e) => {
    e.preventDefault();

    console.log('dues selected');
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payUser(userInfo.memberId, paymentTypeName, qty, paymentResult));
  };

  // if (userInfo) {
  //   const thisYear = new Date(userInfo.memberSince).getFullYear();
  //   console.log(thisYear);
  //   const options = [];

  //   for (let i = 0; i <= 10; i++) {
  //     const year = thisYear + i;
  //     console.log(year);
  //     options.push(<option value={year}>{year}</option>);
  //   }
  // }

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
          // id='sidebar-wrapper'
        >
          <Sidebar />
        </Col>

        {/* Payment Start */}
        {/* Payment End */}
        {/* Payment  History start */}
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          {/* {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalButton amount={25.0} onSuccess={successPaymentHandler} />
          )} */}

          {/* Payment */}
          <Row>
            <Col md={8}>
              <h1>Payment</h1>
              {loadingPaymentTypes ? (
                <Loader />
              ) : errorPaymentTypes ? (
                <Message variant='danger'>{paymentErrors}</Message>
              ) : (
                <>
                  <label>Payment Type</label>
                  <Form.Control
                    as='select'
                    // onChange={(e) => {
                    //   setPaymentTypeName(e.target.value.split(',')[0]);
                    //   setPaymentTypeAmount(e.target.value.split(',')[1]);
                    // }}
                    onChange={paymentTypeChangeHandler}
                  >
                    <option>Select Payment Type</option>
                    {paymentTypes.map((paymentType) => (
                      <option
                        key={paymentType.paymentTypeId}
                        value={[
                          paymentType.paymentTypeName,
                          paymentType.paymentTypeAmount,
                        ]}
                      >
                        {paymentType.paymentTypeName}
                      </option>
                    ))}{' '}
                  </Form.Control>

                  {paymentTypeName === 'Dues' ? (
                    <>
                      <label>Number of Years</label>
                      <Form.Control
                        as='select'
                        onChange={qtyChangeHandler}
                        // onChange={(e) => setQty(e.target.value)}
                      >
                        <option>Select Number of Years for Payment</option>

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
                        {/* {paymentTypes.map((paymentType) => (
                    <option
                      key={paymentType.paymentTypeId}
                      value={paymentType.paymentTypeAmount}
                    >
                      {paymentType.paymentTypeName}
                    </option>
                  ))}{' '} */}
                      </Form.Control>
                    </>
                  ) : paymentTypeName === 'nominationFee' ? (
                    <>
                      {user && user.status === 'inactive' ? (
                        <Message variant='danger'>
                          Please Pay your registration fee first to activate
                          your account
                        </Message>
                      ) : (
                        <>
                          <label>Please Select Year</label>
                          <Form.Control
                            as='select'
                            onChange={qtyChangeHandler}
                            // onChange={(e) => setQty(e.target.value)}
                          >
                            <option>Select Number of Years for Payment</option>

                            <option value={1}>1</option>
                          </Form.Control>
                        </>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </Col>
            <Col md={4}>
              {' '}
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Payment Summary</h2>
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
          {/* Payment end */}
          {/* PaymentDropdown */}
          {/* <PaymentDropdown />
          <DatePicker /> */}
          {/* PaymentDropdown End */}
          <Card className='text-center' border='primary'>
            <Card.Header as='h2'>Payments</Card.Header>
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
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.paymentId}>
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
          </Card>
        </Col>
        {/* Payment History End */}
      </Row>
    </>
  );
};

export default PaymentScreen;
