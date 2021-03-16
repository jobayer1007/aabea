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
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDonationDetails, donateUser } from '../../actions/userActions';
import {
  USER_DONATE_RESET,
  USER_PAYMENT_DETAILS_RESET,
  USER_PAY_RESET,
} from '../../constants/userConstants';
import Sidebar from '../../components/Sidebar/Sidebar';
// import { listUsers, deleteUser } from '../actions/userActions';

const DonateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [addDonation, setAddDonation] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [donateAmount, setDonateAmount] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDonateDetails = useSelector((state) => state.userDonateDetails);
  const {
    loading: donateLoading,
    error: donateErrors,
    donations,
  } = userDonateDetails;

  const userDonate = useSelector((state) => state.userDonate);
  const {
    loading: loadingDonate,
    success: successDonate,
    error: errorDonate,
  } = userDonate;

  useEffect(() => {
    // if (!userInfo) {
    //   history.push('/login');
    // } else {
    dispatch(getUserDonationDetails());
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

    if (!donations || successDonate) {
      dispatch({ type: USER_DONATE_RESET });
      // dispatch({ type: USER_PAYMENT_DETAILS_RESET });
    }
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
    // }
  }, [history, dispatch, userInfo, successDonate]);

  const successDonationHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(donateUser(userInfo.memberId, paymentResult));
    setAddDonation(!addDonation);
  };

  return (
    <>
      <Row className='content'>
        {userInfo ? (
          <>
            <Col
              md={{ span: 3, order: 1 }}
              lg={{ span: 3, order: 1 }}
              // id='sidebar-wrapper'
            >
              <Sidebar />
            </Col>
            <Col
              md={{ span: 9, order: 12 }}
              lg={{ span: 9, order: 12 }}
              id='page-content-wrapper'
            >
              <Card className='text-center' border='primary'>
                <Card.Header as='h2'>Donation</Card.Header>
                {donateLoading ? (
                  <Loader />
                ) : donateErrors ? (
                  <Message variant='danger'>{donateErrors}</Message>
                ) : (
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Donation Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation.id}>
                          <td>{donation.id}</td>
                          <td>{donation.donationType}</td>
                          <td>{donation.amount}</td>
                          <td>{donation.donationDate.substring(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <Card border='primary'>
                  <Card.Header className='text-center' as='h2'>
                    <Link
                      className='btn btn-outline-info btn-sm btn-block rounded'
                      onClick={() => setAddDonation(!addDonation)}
                    >
                      Make Donation
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    {addDonation
                      ? (errorDonate && (
                          <Message variant='danger'>{errorDonate}</Message>
                        )) ||
                        (loadingDonate && <Loader />) ||
                        (successDonate ? (
                          <Message variant='success'>{successDonate}</Message>
                        ) : (
                          <Row>
                            <Col md={8}>
                              <Form>
                                <Form.Group controlId='mInit'>
                                  <Form.Label>Mr / Mrs ? </Form.Label>
                                  <Form.Control
                                    as='select'
                                    onChange={(e) => setMInit(e.target.value)}
                                  >
                                    <option value='Mr'>Mr</option>
                                    <option value='Mrs'>Mrs</option>
                                  </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='firstName'>
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder='Please Enter Your First Name..'
                                    value={firstName}
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='lastName'>
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder='Please Enter Your Last Name'
                                    value={lastName}
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    type='email'
                                    placeholder='Please Enter Address..'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='donateAmount'>
                                  <Form.Label>Donate Amount</Form.Label>
                                  <Form.Control
                                    type='number'
                                    placeholder='Please Enter Donation Amount'
                                    value={donateAmount}
                                    onChange={(e) =>
                                      setDonateAmount(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>

                                {/* <Button type='submit' variant='info' block>
                                  <i className='fas fa-plus' /> Add
                                </Button> */}
                              </Form>
                            </Col>
                            <Col md={4}>
                              <ListGroup variant='flush'>
                                <ListGroup.Item>
                                  <Row>
                                    <Col>Donation Amount</Col>
                                    <Col>${donateAmount}</Col>
                                  </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  {loadingDonate && <Loader />}
                                  {!sdkReady ? (
                                    <Loader />
                                  ) : (
                                    <PayPalButton
                                      amount={donateAmount}
                                      onSuccess={successDonationHandler}
                                    />
                                  )}
                                </ListGroup.Item>
                              </ListGroup>
                            </Col>
                          </Row>
                        ))
                      : null}
                    {/* {message && <Message variant='danger'>{message}</Message>} */}
                    {/* {registerError && (
                        <Message variant='danger'>{registerError}</Message>
                      )}
                      {registerLoading && <Loader />}
                      {} */}
                  </Card.Body>
                </Card>
              </Card>
            </Col>
          </>
        ) : (
          <Col id='page-content-wrapper'>
            <Card className='text-center' border='primary'>
              <Card.Header as='h2'>Welcome to Donation Page</Card.Header>
              <Row>
                <Col md={8}>
                  <Form>
                    <Form.Group controlId='firstName'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Please Enter Your First Name..'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='mInit'>
                      <Form.Label>Mr / Mrs ? </Form.Label>
                      <Form.Control
                        as='select'
                        onChange={(e) => setMInit(e.target.value)}
                      >
                        <option value='Mr'>Mr</option>
                        <option value='Mrs'>Mrs</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='lastName'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Please Enter Your Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Please Enter Address..'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='donateAmount'>
                      <Form.Label>Donate Amount</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Please Enter Donation Amount'
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    {/* <Button type='submit' variant='info' block>
                                  <i className='fas fa-plus' /> Add
                                </Button> */}
                  </Form>
                </Col>
                <Col md={4}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Donation Amount</Col>
                        <Col>${donateAmount}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {loadingDonate && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={donateAmount}
                          onSuccess={successDonationHandler}
                        />
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default DonateScreen;
