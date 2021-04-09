import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  Image,
  Row,
  Col,
  Card,
  ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  listUsers,
  deleteUser,
  getUserProfile,
  getUserDonationDetails,
} from '../../actions/userActions';
import * as S from './DashboardScreen.Styles';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [lastDonation, setLastDonation] = useState('');

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, user, error: userError } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userDonateDetails = useSelector((state) => state.userDonateDetails);
  const {
    loading: donateLoading,
    error: donateErrors,
    donations,
  } = userDonateDetails;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
      dispatch(getUserProfile());

      dispatch(getUserDonationDetails());
      setLastDonation(donations.pop());

      console.log(lastDonation);
      //   console.log(lastDonation);

      // if (donations.length > 0) {
      //   setLastDonation(donations.pop());
      // }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <Row className='content'>
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          id='sidebar-wrapper'
          className='mb-2'
        >
          <Sidebar />
        </Col>
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <S.CardDeck>
            {/* <CardColumns> */}
            {/* 1st card section : member Status~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Row>
              <Col
                md={{ span: 6, order: 1 }}
                lg={{ span: 6, order: 1 }}
                id='member-status'
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card border='primary'>
                  {userInfo ? (
                    <>
                      <Card.Img
                        variant='top'
                        src={user.profilePicture}
                        alt='Profile Picture'
                        style={{ height: '171px', width: '180px' }}
                        roundedCircle
                      />
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col sm={4}>Name:</Col>
                            <Col>{userInfo.userName}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col sm={4}>Email:</Col>
                            <Col>{userInfo.email}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row className='text-info'>
                            <Col md={4}>Phone:</Col>
                            <Col>{user.primaryPhone}</Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row className='text-info'>
                            <Col md={4}>Address:</Col>
                            <Col>
                              {user.address1}
                              {'; '}
                              {user.city}
                              {'; '}
                              {user.state}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>

                      <Card.Footer className='text-muted'>
                        <Link
                          className='btn btn-outline-info btn-sm btn-block rounded'
                          to='/profile'
                        >
                          View Full Profile
                        </Link>
                      </Card.Footer>
                    </>
                  ) : null}
                </Card>
              </Col>
              {/* 1st card section end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* 2nd card section : Profile Information ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 6, order: 2 }}
                lg={{ span: 6, order: 2 }}
                className='mb-2'
                id='profile-information'
              >
                <Card border='primary'>
                  <Card.Header as='h5'>Profile Summery </Card.Header>
                  {userInfo ? (
                    <>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>User Type:</Col>
                            <Col>{userInfo.userRole}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row className='text-info'>
                            <Col md={4}>Status:</Col>
                            {user &&
                              (user.status === 'active' ? (
                                <Col>
                                  <i
                                    className='fas fa-user'
                                    style={{ color: '#63D471' }}
                                  ></i>{' '}
                                  {user.status}
                                </Col>
                              ) : (
                                <Col className='text-danger'>
                                  <i
                                    className='fas fa-user'
                                    style={{ color: '#A40606' }}
                                  ></i>
                                  {user.status}
                                </Col>
                              ))}
                          </Row>
                        </ListGroup.Item>
                        {user &&
                          (user.status !== 'active' ? (
                            <ListGroup.Item>
                              <Link
                                className='btn btn-outline-warning btn-sm btn-block rounded'
                                to='/payment'
                              >
                                Please Pay your registration fee to activate
                                your account
                              </Link>
                            </ListGroup.Item>
                          ) : (
                            <ListGroup.Item>
                              <Row>
                                <Col md={4}>Next Payment Due In:</Col>
                                <Col>{user.nextPaymentDueIn}</Col>
                              </Row>{' '}
                            </ListGroup.Item>
                          ))}

                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>Last Training Taken:</Col>
                            <Col>None</Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col md={4}>Last Donation:</Col>

                            <Col>
                              {donateLoading ? (
                                <Loader />
                              ) : donateErrors ? (
                                <Message variant='danger'>
                                  {donateErrors}
                                </Message>
                              ) : donations ? (
                                // new Date(
                                //   Math.max.apply(
                                //     null,
                                //     donations.map(function (e) {
                                //       return new Date(donations.donationDate);
                                //     })
                                //   )
                                // )
                                donations
                                  .map(function (e) {
                                    return e.donationDate;
                                  })
                                  .sort()
                                  .reverse()[0]
                              ) : (
                                // donations.map((a, index) => (
                                //   <Col key={index}>{a.donationDate}</Col>
                                // ))
                                'None'
                              )}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </>
                  ) : null}
                </Card>
              </Col>
              {/* 2nd card section : Profile Information ~End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
