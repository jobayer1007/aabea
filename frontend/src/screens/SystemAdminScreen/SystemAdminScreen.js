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
import {
  listUsers,
  deleteUser,
  listPendingUsers,
  deletePendingUser,
  createAdminUser,
  deleteAdminUser,
} from '../../actions/userActions';
import * as S from './SystemAdminScreen.Styles';
import { deleteChapter, listChapters } from '../../actions/chapterActions';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const SystemAdminScreen = ({ history }) => {
  const dispatch = useDispatch();

  const chapterList = useSelector((state) => state.chapterList);
  const { loading, error, chapters } = chapterList;

  const userPendingList = useSelector((state) => state.userPendingList);
  const {
    loading: pendingUsersLoading,
    error: pendingUsersError,
    pendingUsers,
  } = userPendingList;

  const userList = useSelector((state) => state.userList);
  const { loading: userListLoading, error: userListError, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterDelete = useSelector((state) => state.chapterDelete);
  const { success: successDelete } = chapterDelete;

  const userCreateAdmin = useSelector((state) => state.userCreateAdmin);
  const { success: successAdmin } = userCreateAdmin;

  const userDeleteAdmin = useSelector((state) => state.userDeleteAdmin);
  const { success: successDeleteAdmin } = userDeleteAdmin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listChapters());
      dispatch(listPendingUsers());
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successAdmin,
    successDeleteAdmin,
  ]);

  const deleteChapterHandler = (chapterId) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteChapter(chapterId));
    }
  };

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
          <AdminSidebar />
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
                      userInfo.status === 'active' ? (
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
              {/* 5th card section : All Chapter List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>All Chapter List</Card.Header>

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
                            {/* <th>IMAGE</th> */}
                            <th>CHAPTER NAME</th>
                            <th>CHAPTER EMAIL</th>
                            <th>CHAPTER PHONE</th>
                            <th>CHAPTER ADDRESS</th>
                            {userInfo &&
                              userInfo.userRole === 'systemAdmin' && (
                                <th>EDIT/DELETE</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {chapters.map((chapter) => (
                            <tr key={chapter.chapterId}>
                              <td>{chapter.chapterId}</td>
                              {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                              <td> {chapter.chapterName}</td>
                              <td>
                                <a href={`mailto: ${chapter.chapterEmail}`}>
                                  {' '}
                                  {chapter.chapterEmail}
                                </a>
                              </td>
                              <td> {chapter.chapterPhone}</td>
                              <td> {chapter.chapterAddress}</td>
                              {/* <td>
                                {user.userRole === 'systemAdmin' ? (
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
                              </td> */}
                              {/* <td>
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
                              </td> */}
                              {userInfo && userInfo.userRole === 'systemAdmin' && (
                                <td>
                                  <LinkContainer
                                    to={`/chapter/${chapter.chapterId}/edit`}
                                  >
                                    <Button variant='light' className='btn-sm'>
                                      <i className='fas fa-edit'></i>
                                    </Button>
                                  </LinkContainer>

                                  <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() =>
                                      deleteChapterHandler(chapter.chapterId)
                                    }
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
              {/* 5th card section : All Chapter List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* 6th card section : All Pending User List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Member Pending List</Card.Header>

                  <Card.Body>
                    {pendingUsersLoading ? (
                      <Loader />
                    ) : pendingUsersError ? (
                      <Message variant='danger'>{pendingUsersError}</Message>
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

                              {/* <td>
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
                              </td> */}
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
                    )}
                  </Card.Body>
                </Card>
              </Col>
              {/* 6th card section : All Pending User List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

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
                              {(userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
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
                                    onClick={() =>
                                      deleteUserHandler(user.memberId)
                                    }
                                  >
                                    <i className='fas fa-trash'></i>
                                  </Button>
                                </td>
                              )}

                              {userInfo.userRole === 'systemAdmin' &&
                              user.userRole === 'member' ? (
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

export default SystemAdminScreen;
