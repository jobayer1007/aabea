import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Image, Row, Col } from 'react-bootstrap';
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
    <Row>
      <Col sm={3}  >
        <Button variant='outline-primary' size={'lg'} block>
          Payment
        </Button>{' '}
        <Button variant='outline-secondary' size={'lg'} block>
          Donate
        </Button>{' '}
        <Button variant='outline-success' size={'lg'} block>
          Training
        </Button>{' '}
        <Button variant='outline-warning' size={'lg'} block>
          Committiees
        </Button>{' '}
        <Button variant='outline-info' block>
          Any other button
        </Button>{' '}
        <Link
          className='btn btn-outline-warning btn-sm btn-block my-5 rounded'
          to=''
        >
          another button
        </Link>
      </Col>
      <Col sm={9}>
        <h1>Users</h1>
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
                {userInfo && userInfo.isAdmin && <th>EDIT/DELETE</th>}
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {' '}
                    <Image src={user.image} thumbnail />
                  </td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto: ${user.email}`}> {user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  {userInfo.isAdmin && (
                    <td>
                      <LinkContainer to={`/users/${user.id}/edit`}>
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
      </Col>
    </Row>
  );
};

export default UserListScreen;
