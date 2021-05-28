import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  deletePaymentType,
  listPaymentTypes,
  registerPaymentType,
} from '../../actions/paymentTypeActions';
import {
  PAYMENT_TYPE_LIST_RESET,
  PAYMENT_TYPE_REGISTER_RESET,
} from '../../constants/paymentTypeConstants';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  deleteDonationType,
  listDonationTypes,
  registerDonationType,
} from '../../actions/donationTypeAction';
import {
  DONATION_TYPE_LIST_RESET,
  DONATION_TYPE_REGISTER_RESET,
} from '../../constants/donationTypeConstant';

const DonationTypeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addDonationType, setAddDonationType] = useState(false);

  const [donationTypeName, setDonationTypeName] = useState('');
  // const [donationTypeAmount, setDonationTypeAmount] = useState('');
  const [donationTypeDescription, setDonationTypeDescription] = useState('');

  const donationTypeList = useSelector((state) => state.donationTypeList);
  const { loading, error, donationTypes } = donationTypeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationTypeDelete = useSelector((state) => state.donationTypeDelete);
  const { success: successDonationTypeDelete } = donationTypeDelete;

  const donationTypeRegister = useSelector(
    (state) => state.donationTypeRegister
  );
  const {
    loading: registerLoading,
    error: registerError,
    success,
  } = donationTypeRegister;

  useEffect(() => {
    if (userInfo) {
      dispatch(listDonationTypes());
      dispatch({ type: DONATION_TYPE_LIST_RESET });
      dispatch({ type: DONATION_TYPE_REGISTER_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      setAddDonationType((addDonationType) => !addDonationType);
      setDonationTypeName('');
      // setDonationTypeAmount('');
      setDonationTypeDescription('');
    }
  }, [dispatch, history, userInfo, successDonationTypeDelete, success]);

  const deleteDonationTypeHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteDonationType(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      registerDonationType(
        donationTypeName,
        // donationTypeAmount,
        donationTypeDescription
      )
    );
  };

  return (
    <>
      <Row className='content'>
        {/* Sidebar */}
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          id='sidebar-wrapper'
          className='m-0 p-1'
        >
          <Sidebar />
        </Col>
        {/* Sidebar End */}
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
          className='m-0 p-0'
        >
          <>
            <Row>
              <Col
                md={{ span: 6, order: 1 }}
                lg={{ span: 6, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2 p-1'
              >
                <>
                  {/* Card Start */}
                  <Card border='info'>
                    <Card.Header className='text-center' as='h2'>
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => setAddDonationType(!addDonationType)}
                      >
                        Add New Donation Type
                      </Link>
                    </Card.Header>
                    <Card.Body>
                      {addDonationType
                        ? (registerError && (
                            <Message variant='danger'>{registerError}</Message>
                          )) ||
                          (registerLoading && <Loader />) ||
                          (success ? (
                            <Message variant='success'>{success}</Message>
                          ) : (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId='donationType'>
                                <Form.Label>Donation type</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Please Enter donation cause..'
                                  value={donationTypeName}
                                  onChange={(e) =>
                                    setDonationTypeName(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group>

                              {/* <Form.Group controlId='amount'>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                  type='number'
                                  placeholder='Please Enter an amount for this payment type'
                                  value={paymentTypeAmount}
                                  onChange={(e) =>
                                    setPaymentTypeAmount(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group> */}

                              <Form.Group controlId='Description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Please Enter Description..'
                                  value={donationTypeDescription}
                                  onChange={(e) =>
                                    setDonationTypeDescription(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group>

                              <Button type='submit' variant='info' block>
                                <i className='fas fa-plus' /> Add
                              </Button>
                            </Form>
                          ))
                        : null}
                    </Card.Body>
                  </Card>
                  {/* Card End */}
                </>
              </Col>
              {/* 1st card section end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              <Col
                md={{ span: 6, order: 12 }}
                lg={{ span: 6, order: 12 }}
                className='mb-2 p-1'
                id='all-chapter'
              >
                <Card className='text-center' border='info'>
                  <Card.Header as='h5' className='text-info'>
                    All Donation Causes
                  </Card.Header>

                  <Card.Body>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
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
                            {/* <th>IMAGE</th> */}
                            <th>NAME</th>
                            <th>DESCRIPTION</th>

                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>ACTION</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {donationTypes.map((donationType) => (
                            <tr key={donationType.donationTypeId}>
                              {/* <td>{donationType.donationTypeId}</td> */}

                              <td> {donationType.donationTypeName}</td>

                              <td> {donationType.donationTypeDescription}</td>

                              {(userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <td>
                                  {/* <LinkContainer
                                    to={`/donationType/${donationType.donationTypeId}/edit`}
                                  >
                                    <Button variant='light' className='btn-sm'>
                                      <i className='fas fa-edit'></i>
                                    </Button>
                                  </LinkContainer> */}

                                  <span
                                    onClick={() =>
                                      deleteDonationTypeHandler(
                                        donationType.donationTypeId
                                      )
                                    }
                                  >
                                    <i
                                      className='fas fa-trash action ml-2'
                                      style={{ color: 'red' }}
                                    ></i>
                                  </span>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              {/* 5th card section : All Chapter List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* </CardColumns> */}
            </Row>
          </>
        </Col>
      </Row>
    </>
  );
};

export default DonationTypeScreen;
