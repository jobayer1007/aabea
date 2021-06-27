import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import { Table, Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Donations from '../../components/Chapter/Donations';

import {
  getUserDonationDetails,
  donateUser,
  donateUserGuest,
  getUserProfile,
} from '../../actions/userActions';
import { USER_DONATE_RESET } from '../../constants/userConstants';
import Sidebar from '../../components/Sidebar/Sidebar';
import swal from 'sweetalert';
import { listDonationTypes } from '../../actions/donationTypeAction';

const DonateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);
  const [addDonation, setAddDonation] = useState(false);

  const [guest, setGuest] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [mInit, setMInit] = useState('Mr');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [donationTypeName, setDonationTypeName] = useState('');
  const [donateAmount, setDonateAmount] = useState(5);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

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
    donateResulte,
  } = userDonate;

  const donationTypeList = useSelector((state) => state.donationTypeList);
  const {
    loading: loadingDonationTypes,
    error: errorDonationTypes,
    donationTypes,
  } = donationTypeList;

  const checkChapter = window.location.host;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      dispatch(getUserDonationDetails());
    } else {
      setFirstName('');
      setMInit('');
      setLastName('');
      setEmail('');
      setDonateAmount(5);
    }

    dispatch(listDonationTypes());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        `/api/chapters/paypal/${checkChapter}`,
        config
      );
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (donateResulte) {
      swal('Success!', donateResulte, 'success').then(() => {
        dispatch({ type: USER_DONATE_RESET });
        setDonateAmount(0);
        setDonationTypeName('');
      });
    }
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
    // }
  }, [history, dispatch, userInfo, checkChapter, donateResulte]);

  const donationTypeChangeHandler = (e) => {
    // e.preventDefault();

    setDonationTypeName(e.target.value);
  };

  const successDonationHandler = (paymentResult) => {
    // console.log(paymentResult);
    dispatch(donateUser(userInfo.memberId, donationTypeName, paymentResult));
    setAddDonation(!addDonation);
  };

  const successDonationHandlerGuest = (paymentResult) => {
    console.log(paymentResult);

    dispatch(
      donateUserGuest(
        checkChapter,
        guest,
        email,
        firstName,
        mInit,
        lastName,
        donationTypeName,
        paymentResult
      )
    );
  };

  return (
    <Row className='content'>
      {userInfo ? (
        <>
          <Col
            md={{ span: 3, order: 1 }}
            lg={{ span: 3, order: 1 }}
            // id='sidebar-wrapper'
            className='m-0 p-1'
          >
            <Sidebar />
          </Col>
          <Col
            md={{ span: 9, order: 12 }}
            lg={{ span: 9, order: 12 }}
            id='page-content-wrapper'
            className='m-0 p-1'
          >
            {userInfo.userRole === 'admin' ||
            userInfo.userRole === 'systemAdmin' ? (
              <>
                <Donations />
              </>
            ) : (
              <>
                <Card border='info' className='mb-2'>
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
                                <ListGroup variant='flush'>
                                  <ListGroup.Item>
                                    <Row>
                                      <Col md={3}>Name:</Col>
                                      <Col>
                                        {user.mInit} {user.firstName}{' '}
                                        {user.lastName}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                    <Row>
                                      <Col md={3}>E-mail:</Col>

                                      <Col>{user.primaryEmail}</Col>
                                    </Row>
                                  </ListGroup.Item>
                                </ListGroup>
                                {loadingDonationTypes ? (
                                  <Loader />
                                ) : errorDonationTypes ? (
                                  <Message variant='danger'>
                                    {errorDonationTypes}
                                  </Message>
                                ) : (
                                  donationTypes &&
                                  donationTypes.length !== 0 && (
                                    <Form.Group>
                                      <label>Donation Cause</label>
                                      <Form.Control
                                        as='select'
                                        onChange={donationTypeChangeHandler}
                                      >
                                        <option>Select cause</option>
                                        {donationTypes.map(
                                          (donationType, index) => (
                                            <option
                                              key={index}
                                              value={
                                                donationType.donationTypeName
                                              }
                                            >
                                              {donationType.donationTypeName}
                                            </option>
                                          )
                                        )}
                                      </Form.Control>
                                    </Form.Group>
                                  )
                                )}

                                <Form.Group controlId='donateAmount'>
                                  <Form.Label>Donate Amount</Form.Label>
                                  <Form.Control
                                    type='number'
                                    placeholder='Please Enter Donation Amount'
                                    min='5'
                                    value={donateAmount}
                                    onChange={(e) =>
                                      setDonateAmount(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>
                              </Form>
                            </Col>
                            <Col md={4}>
                              <ListGroup variant='flush'>
                                <ListGroup.Item>
                                  <Row>
                                    <Col>Donation Cause</Col>
                                    <Col>{donationTypeName}</Col>
                                  </Row>
                                </ListGroup.Item>
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
                  </Card.Body>
                </Card>
                <Card className='text-center' border='info'>
                  <Card.Header as='h3' className='text-info'>
                    Donation
                  </Card.Header>
                  {donateLoading ? (
                    <Loader />
                  ) : donateErrors ? (
                    <Message variant='danger'>{donateErrors}</Message>
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
                          {/* <th>ID</th> */}
                          <th>Donation Type</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donations.map((donation, index) => (
                          <tr key={index}>
                            {/* <td>{donation.memberId}</td> */}
                            <td>{donation.donationType}</td>
                            <td>{donation.amount}</td>
                            <td>{donation.donationDate.substring(0, 10)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card>
              </>
            )}
          </Col>
        </>
      ) : (
        <Col id='page-content-wrapper'>
          <Card border='info'>
            <Card.Header as='h4' className='text-center text-info'>
              Donation
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} md='2'>
                        <Form.Label>Member ?</Form.Label>
                      </Form.Group>

                      <Form.Group as={Col} md='4' controlId='guest'>
                        <Form.Control
                          required
                          as='select'
                          type='text'
                          value={guest}
                          onChange={(e) => setGuest(e.target.value)}
                        >
                          <option value='false'>No</option>
                          <option value='true'>Yes</option>
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md='2'>
                        <Form.Label>Name</Form.Label>
                      </Form.Group>

                      <Form.Group as={Col} md='10'>
                        <Form.Group controlId='mInit'>
                          <Form.Control
                            required
                            as='select'
                            type='text'
                            value={mInit}
                            onChange={(e) => setMInit(e.target.value)}
                          >
                            <option value='Mr'>Mr</option>
                            <option value='Mrs'>Mrs</option>
                            <option value='Miss'>Ms</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='firstName'>
                          <Form.Control
                            required
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='lastName'>
                          <Form.Control
                            required
                            placeholder='Last Name'
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} md='2'>
                        <Form.Label>Email Address</Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} md='10' controlId='email'>
                        <Form.Control
                          required
                          type='email'
                          placeholder='Enter Email..'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Form.Row>

                    {loadingDonationTypes ? (
                      <Loader />
                    ) : errorDonationTypes ? (
                      <Message variant='danger'>{errorDonationTypes}</Message>
                    ) : (
                      donationTypes &&
                      donationTypes.length !== 0 && (
                        <Form.Row>
                          <Form.Group as={Col} md='2'>
                            <Form.Label>Donation Cause</Form.Label>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md='10'
                            controlId='donationTypeName'
                          >
                            <Form.Control
                              as='select'
                              onChange={donationTypeChangeHandler}
                            >
                              <option>Select cause</option>
                              {donationTypes.map((donationType, index) => (
                                <option
                                  key={index}
                                  value={donationType.donationTypeName}
                                >
                                  {donationType.donationTypeName}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Form.Row>
                      )
                    )}

                    <Form.Row>
                      <Form.Group as={Col} md='2'>
                        <Form.Label>Donate Amount</Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} md='10' controlId='donateAmount'>
                        <Form.Control
                          required
                          type='number'
                          min='5'
                          placeholder='Please Enter Donation Amount'
                          value={donateAmount}
                          onChange={(e) => setDonateAmount(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Donation cause</Col>
                        <Col>{donationTypeName}</Col>
                      </Row>
                    </ListGroup.Item>
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
                          onSuccess={successDonationHandlerGuest}
                        />
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default DonateScreen;
