import React, { useEffect, useState } from 'react';
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

const PaymentTypeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addPaymentType, setAddPaymentType] = useState(false);

  const [paymentTypeName, setPaymentTypeName] = useState('');
  const [paymentTypeAmount, setPaymentTypeAmount] = useState('');
  const [paymentTypeDescription, setPaymentTypeDescription] = useState('');

  const paymentTypeList = useSelector((state) => state.paymentTypeList);
  const { loading, error, paymentTypes } = paymentTypeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paymentTypeDelete = useSelector((state) => state.paymentTypeDelete);
  const { success: successPaymentTypeDelete } = paymentTypeDelete;

  const paymentTypeRegister = useSelector((state) => state.paymentTypeRegister);
  const {
    loading: registerLoading,
    error: registerError,
    success,
  } = paymentTypeRegister;

  useEffect(() => {
    if (userInfo) {
      dispatch(listPaymentTypes());
      dispatch({ type: PAYMENT_TYPE_LIST_RESET });
      dispatch({ type: PAYMENT_TYPE_REGISTER_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      setAddPaymentType((addPaymentType) => !addPaymentType);
      setPaymentTypeName('');
      setPaymentTypeAmount('');
      setPaymentTypeDescription('');
    }
  }, [
    dispatch,
    history,
    userInfo,
    successPaymentTypeDelete,
    // paymentTypes,
    success,
  ]);

  const addNewPaymentType = (e) => {
    e.preventDefault();

    setAddPaymentType(!addPaymentType);
  };

  const deletePaymentTypeHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deletePaymentType(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      registerPaymentType(
        paymentTypeName,
        paymentTypeAmount,
        paymentTypeDescription
      )
    );
  };
  // console.log(addPaymentType);

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
                        onClick={addNewPaymentType}
                        to=''
                      >
                        Add New Payment Type
                      </Link>
                    </Card.Header>
                    <Card.Body>
                      {addPaymentType
                        ? (registerError && (
                            <Message variant='danger'>{registerError}</Message>
                          )) ||
                          (registerLoading && <Loader />) ||
                          (success ? (
                            <Message variant='success'>{success}</Message>
                          ) : (
                            <Form onSubmit={submitHandler}>
                              <Form.Group controlId='firstName'>
                                <Form.Label>Payment type</Form.Label>
                                <Form.Control
                                  type='paymentTypeName'
                                  placeholder='Please Enter Payment Type Name..'
                                  value={paymentTypeName}
                                  onChange={(e) =>
                                    setPaymentTypeName(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group>

                              <Form.Group controlId='lastName'>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                  type='paymentTypeAmount'
                                  placeholder='Please Enter an amount for this payment type'
                                  value={paymentTypeAmount}
                                  onChange={(e) =>
                                    setPaymentTypeAmount(e.target.value)
                                  }
                                ></Form.Control>
                              </Form.Group>

                              <Form.Group controlId='Description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                  type='paymentTypeDescription'
                                  placeholder='Please Enter Description..'
                                  value={paymentTypeDescription}
                                  onChange={(e) =>
                                    setPaymentTypeDescription(e.target.value)
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
                    All Payment Types
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
                            <th>AMOUNT</th>

                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>ACTION</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {paymentTypes.map((paymentType) => (
                            <tr key={paymentType.paymentTypeId}>
                              {/* <td>{paymentType.paymentTypeId}</td> */}

                              <td> {paymentType.paymentTypeName}</td>

                              <td> {paymentType.paymentTypeAmount}</td>

                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    {/* <LinkContainer
                                    to={`/paymentType/${paymentType.paymentTypeId}/edit`}
                                  >
                                    <Button variant='light' className='btn-sm'>
                                      <i className='fas fa-edit'></i>
                                    </Button>
                                  </LinkContainer> */}

                                    <span
                                      onClick={() =>
                                        deletePaymentTypeHandler(
                                          paymentType.paymentTypeId
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

export default PaymentTypeScreen;
