import React, { useEffect, useState } from 'react';
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
import {
  listUsers,
  deleteUser,
  listPendingUsers,
  deletePendingUser,
  createAdminUser,
  deleteAdminUser,
  getUserProfile,
} from '../../actions/userActions';
import * as S from './MembersScreen.Styles';
import { deleteChapter, listChapters } from '../../actions/chapterActions';
import Sidebar from '../../components/Sidebar/Sidebar';
import { USER_PENDING_LIST_RESET } from '../../constants/userConstants';

const MembersScreen = ({ history }) => {
  const dispatch = useDispatch();

  // const [admins, setAdmins] = useState('');

  // const chapterList = useSelector((state) => state.chapterList);
  // const { loading, error, chapters } = chapterList;

  const userPendingList = useSelector((state) => state.userPendingList);
  const {
    loading: pendingUsersLoading,
    error: pendingUsersError,
    pendingUsers,
  } = userPendingList;

  const userList = useSelector((state) => state.userList);
  const {
    loading: userListLoading,
    error: userListError,
    success,
    users,
  } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterDelete = useSelector((state) => state.chapterDelete);
  const { success: successDelete } = chapterDelete;

  const userCreateAdmin = useSelector((state) => state.userCreateAdmin);
  const { success: successAdmin } = userCreateAdmin;

  const userDeleteAdmin = useSelector((state) => state.userDeleteAdmin);
  const { success: successDeleteAdmin } = userDeleteAdmin;

  // var admins = [];
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      dispatch(listChapters());
      dispatch(listPendingUsers());
      dispatch(listUsers());

      // if (success) {
      //   setAdmins(users.filter((user) => user.userRole === 'admin'));
      // }
      // console.log(success);
      // console.log(admins);
    } else {
      history.push('/login');
    }
  }, [
    dispatch,
    history,
    userInfo,
    // users,
    successDelete,
    successAdmin,
    successDeleteAdmin,
  ]);

  const deleteUserHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteUser(id));
    }
  };

  const deletePendingUserHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deletePendingUser(id));
    }
  };

  const createAdminHandler = (memberId) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(createAdminUser(memberId));
    }
  };

  const deleteAdminHandler = (userId) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteAdminUser(userId));
    }
  };
  return (
    <>
      <Row className='content'>
        {/* Sidebar */}
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
            <Row>
              {/* 5th card section : All Email Verified Pending User List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {userInfo &&
              (userInfo.userRole === 'admin' ||
                userInfo.userRole === 'systemAdmin') ? (
                pendingUsersLoading ? (
                  <Loader />
                ) : pendingUsersError ? (
                  <Message variant='danger'>{pendingUsersError}</Message>
                ) : pendingUsers && pendingUsers.length !== 0 ? (
                  <Col
                    md={{ span: 12, order: 12 }}
                    lg={{ span: 12, order: 12 }}
                    className='mb-2'
                    id='all-chapter'
                  >
                    <Card className='text-center' border='primary'>
                      <Card.Header as='h5'>Member Pending List</Card.Header>

                      <Card.Body>
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
                              {/* <th>IMAGE</th> */}
                              <th>FIRST NAME</th>
                              <th>EMAIL</th>
                              <th>EMAIL VERIFIED</th>
                              <th>PHONE</th>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <>
                                    <th>APPROVE</th>
                                    <th>DELETE</th>
                                  </>
                                )}
                            </tr>
                          </thead>

                          <tbody>
                            {pendingUsers.map((pendingUser) => (
                              <tr key={pendingUser.pendingId}>
                                <td>{pendingUser.pendingId}</td>
                                {/* <td>
                                  {' '}
                                  <Image src={user.image} thumbnail />
                                </td> */}
                                <td> {pendingUser.firstName}</td>
                                <td>
                                  <a href={`mailto: ${pendingUser.email}`}>
                                    {' '}
                                    {pendingUser.email}
                                  </a>
                                </td>
                                <td>
                                  {pendingUser.emailVerified === true ? (
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
                                <td> {pendingUser.primaryPhone}</td>

                                {(userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <>
                                    <td>
                                      <LinkContainer
                                        to={`/users/${pendingUser.pendingId}/pending`}
                                      >
                                        <Button
                                          variant='light'
                                          className='btn-sm'
                                        >
                                          <i className='fas fa-edit'></i>
                                        </Button>
                                      </LinkContainer>
                                    </td>
                                    <td>
                                      <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() =>
                                          deletePendingUserHandler(
                                            pendingUser.pendingId
                                          )
                                        }
                                      >
                                        <i className='fas fa-trash'></i>
                                      </Button>
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : null
              ) : null}

              {/* 5th card section : All Email Verified Pending User List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* 6th card section : Admin List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-member'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Admins</Card.Header>

                  <Card.Body>
                    {userListLoading ? (
                      <Loader />
                    ) : userListError ? (
                      <Message variant='danger'>{userListError}</Message>
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
                            <th>ACTIVE STATUS</th>
                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>EDIT/DELETE</th>
                              )}

                            {userInfo &&
                              userInfo.userRole === 'systemAdmin' && (
                                <th>Assign As Admin / Member</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {users &&
                            users.map((user, index) => (
                              <tr key={index}>
                                {(user.userRole === 'admin' ||
                                  user.userRole === 'systemAdmin') && (
                                  <>
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
                                    {(userInfo.userRole === 'systemAdmin' ||
                                      userInfo.userRole === 'admin') && (
                                      <td>
                                        <LinkContainer
                                          to={`/users/${user.memberId}/edit`}
                                        >
                                          <Button
                                            variant='light'
                                            className='btn-sm'
                                          >
                                            <i className='fas fa-edit'></i>
                                          </Button>
                                        </LinkContainer>

                                        <Button
                                          variant='danger'
                                          className='btn-sm'
                                          onClick={() =>
                                            deleteUserHandler(user.memberId)
                                          }
                                        >
                                          <i className='fas fa-trash'></i>
                                        </Button>
                                      </td>
                                    )}

                                    {userInfo.userRole === 'systemAdmin' &&
                                      (user.userRole === 'member' ? (
                                        <td>
                                          <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() =>
                                              createAdminHandler(user.memberId)
                                            }
                                          >
                                            {' '}
                                            Set As ADMIN
                                            {/* <i className='fas fa-trash'></i> */}
                                          </Button>{' '}
                                        </td>
                                      ) : (
                                        <td>
                                          <Button
                                            variant='success'
                                            className='btn-sm'
                                            onClick={() =>
                                              deleteAdminHandler(user.memberId)
                                            }
                                          >
                                            {' '}
                                            Set As Member
                                            {/* <i className='fas fa-trash'></i> */}
                                          </Button>
                                        </td>
                                      ))}
                                  </>
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              {/* 6th card section : Admin List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* 7th card section : All Member List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-member'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>All Members List</Card.Header>

                  <Card.Body>
                    {userListLoading ? (
                      <Loader />
                    ) : userListError ? (
                      <Message variant='danger'>{userListError}</Message>
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
                            <th>ACTIVE STATUS</th>
                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>EDIT/DELETE</th>
                              )}

                            {userInfo &&
                              userInfo.userRole === 'systemAdmin' && (
                                <th>Assign As Admin</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {users.map((user, index) => (
                            <tr key={index}>
                              {user.userRole === 'member' && (
                                <>
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
                                  {(userInfo.userRole === 'systemAdmin' ||
                                    userInfo.userRole === 'admin') && (
                                    <td>
                                      <LinkContainer
                                        to={`/users/${user.memberId}/edit`}
                                      >
                                        <Button
                                          variant='light'
                                          className='btn-sm'
                                        >
                                          <i className='fas fa-edit'></i>
                                        </Button>
                                      </LinkContainer>

                                      <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() =>
                                          deleteUserHandler(user.memberId)
                                        }
                                      >
                                        <i className='fas fa-trash'></i>
                                      </Button>
                                    </td>
                                  )}

                                  {userInfo.userRole === 'systemAdmin' &&
                                    (user.userRole === 'member' ? (
                                      <td>
                                        <Button
                                          variant='danger'
                                          className='btn-sm'
                                          onClick={() =>
                                            createAdminHandler(user.memberId)
                                          }
                                        >
                                          {' '}
                                          Set As ADMIN
                                          {/* <i className='fas fa-trash'></i> */}
                                        </Button>{' '}
                                      </td>
                                    ) : (
                                      <td>
                                        <Button
                                          variant='success'
                                          className='btn-sm'
                                          onClick={() =>
                                            deleteAdminHandler(user.memberId)
                                          }
                                        >
                                          {' '}
                                          Set As Member
                                          {/* <i className='fas fa-trash'></i> */}
                                        </Button>
                                      </td>
                                    ))}
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              {/* 7th card section : All Member List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* </CardColumns> */}
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default MembersScreen;
