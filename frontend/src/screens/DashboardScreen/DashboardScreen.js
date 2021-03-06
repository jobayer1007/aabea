import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  Image,
  Row,
  Col,
  Card,
  CardColumns,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listUsers, deleteUser } from '../../actions/userActions';
import * as S from './DashboardScreen.Styles';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
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
                <Button variant='outline-info' block>
                  Committiees
                </Button>
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
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5' className='text-info'>
                    {userInfo ? (
                      userInfo.status == 'active' ? (
                        <span>
                          Memeber Status:{' '}
                          <i
                            className='fas fa-user'
                            style={{ color: '#63D471' }}
                          ></i>{' '}
                          {userInfo.status.toUpperCase()}
                        </span>
                      ) : userInfo.status === 'pending' ? (
                        <span>
                          Memeber Status:{' '}
                          <i
                            className='fas fa-user'
                            style={{ color: '29539B' }}
                          ></i>{' '}
                          {userInfo.status}
                        </span>
                      ) : (
                        <span className='text-danger'>
                          Memeber Status:{' '}
                          <i
                            className='fas fa-user'
                            style={{ color: '#A40606' }}
                          >
                            {' '}
                          </i>{' '}
                          {'  '} {userInfo.status.toUpperCase()}
                        </span>
                      )
                    ) : (
                      <span>No User </span>
                    )}
                  </Card.Header>
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
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Profile Information </Card.Header>
                </Card>
              </Col>
              {/* 2nd card section : Profile Information ~End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* 3rd card section : Last Donation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 6, order: 3 }}
                lg={{ span: 6, order: 3 }}
                className='mb-2'
                id='last-donation'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Last Donation</Card.Header>
                </Card>
              </Col>
              {/* 3rd card section : Last Donation End ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* 4th card section : Training Taken ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 6, order: 4 }}
                lg={{ span: 6, order: 4 }}
                className='mb-2'
                id='training-taken'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Training Taken</Card.Header>
                </Card>
              </Col>
              {/* 4th card section : Training Taken End ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* 5th card section : All Member List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-member'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>All Members List</Card.Header>

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
                            <th>ID</th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>STATUS</th>
                            {userInfo && userInfo.userRole === 'admin' && (
                              <th>EDIT/DELETE</th>
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {users.map((user) => (
                            <tr key={user.memberId}>
                              <td>{user.memberId}</td>
                              <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td>
                              <td> {user.userName}</td>
                              <td>
                                <a href={`mailto: ${user.email}`}>
                                  {' '}
                                  {user.email}
                                </a>
                              </td>
                              <td>
                                {user.userRole === 'admin' ||
                                user.userRole === 'systemAdmin' ? (
                                  <i
                                    className='fas fa-check'
                                    style={{ color: 'green' }}
                                  ></i>
                                ) : (
                                  <i
                                    className='fas fa-times'
                                    style={{ color: 'red' }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                {user.member.status === 'active' ? (
                                  <i
                                    className='fas fa-check'
                                    style={{ color: 'green' }}
                                  ></i>
                                ) : (
                                  <i
                                    className='fas fa-times'
                                    style={{ color: 'red' }}
                                  ></i>
                                )}
                              </td>
                              {userInfo.userRole === 'admin' && (
                                <td>
                                  <LinkContainer
                                    to={`/users/${user.memberId}/edit`}
                                  >
                                    <Button variant='light' className='btn-sm'>
                                      <i className='fas fa-edit'></i>
                                    </Button>
                                  </LinkContainer>

                                  <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user.memberId)}
                                  >
                                    <i className='fas fa-trash'></i>
                                  </Button>
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
              {/* 5th card section : All Member List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* </CardColumns> */}
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
