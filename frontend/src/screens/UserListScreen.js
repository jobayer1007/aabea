import React, { useEffect } from 'react';
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
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
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
          // id='sidebar-wrapper'
        >
          <Card className='text-center' border='primary'>
            <Card.Body>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/'>
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/dashboardScreen'>
                    <Nav.Link>DashboardScreen</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
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
          <Card className='text-center' border='primary'>
            <Card.Header as='h2'>Users</Card.Header>

            <Card.Body>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>IMAGE</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ADMIN</th>
                      {userInfo && userInfo.userRole === 'admin' && (
                        <th>EDIT/DELETE</th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>
                          {' '}
                          <Image src={user.image} thumbnail />
                        </td>
                        <td> {user.userName}</td>
                        <td>
                          <a href={`mailto: ${user.email}`}> {user.email}</a>
                        </td>
                        <td>
                          {user.userRole === 'admin' ? (
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
                            <LinkContainer to={`/users/${user.userId}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'></i>
                              </Button>
                            </LinkContainer>

                            <Button
                              variant='danger'
                              className='btn-sm'
                              onClick={() => deleteHandler(user.id)}
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
      </Row>
    </>
  );
};

export default UserListScreen;
