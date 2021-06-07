import React, { useEffect, useRef, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
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
import { listChapters } from '../../actions/chapterActions';
import Sidebar from '../../components/Sidebar/Sidebar';
// import { COLUMNS } from './MemberColumns';
import RTable from '../../components/Table/RTable';
import ColumnFilter from '../../components/Table/ColumnFilter';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { USER_DELETE_RESET } from '../../constants/userConstants';

const MembersScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [columnsAdmin, setColumnsAdmin] = useState([]);
  const usersRef = useRef();

  // const chapterList = useSelector((state) => state.chapterList);
  // const { loading, error, chapters } = chapterList;

  const userPendingList = useSelector((state) => state.userPendingList);
  const {
    loading: pendingUsersLoading,
    error: pendingUsersError,
    pendingUsers,
  } = userPendingList;

  const userList = useSelector((state) => state.userList);
  const { loading: userListLoading, error: userListError, users } = userList;

  usersRef.current = users;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete } = userDelete;

  const userPendingDelete = useSelector((state) => state.userPendingDelete);
  const { error: errorUserPendingDelete, success: successUserPendingDelete } =
    userPendingDelete;

  const userCreateAdmin = useSelector((state) => state.userCreateAdmin);
  const { success: successAdmin } = userCreateAdmin;

  const userDeleteAdmin = useSelector((state) => state.userDeleteAdmin);
  const { success: successDeleteAdmin } = userDeleteAdmin;

  const checkChapter = window.location.host;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      // dispatch(listChapters());
      dispatch(listPendingUsers(checkChapter));
      dispatch(listUsers(checkChapter));

      if (
        userInfo.userRole === 'admin' ||
        userInfo.userRole === 'systemAdmin'
      ) {
        setColumnsAdmin([
          {
            Header: 'Id',
            accessor: 'memberId',
            Filter: ColumnFilter,
          },
          // {
          //   Header: 'Name',
          //   accessor: 'userName',
          // },
          {
            Header: 'First Name',
            accessor: 'member.firstName',
            Filter: ColumnFilter,
          },
          {
            Header: 'Last Name',
            accessor: 'member.lastName',
            Filter: ColumnFilter,
          },
          {
            Header: 'City',
            accessor: 'member.city',
            Filter: ColumnFilter,
          },
          {
            Header: 'State',
            accessor: 'member.state',
            Filter: ColumnFilter,
          },

          {
            Header: 'Actions',
            accessor: 'actions',
            Cell: (props) => {
              const rowIdx = props.row.id;
              return (
                <>
                  <span onClick={() => editUserHandler(rowIdx)}>
                    <i
                      className='far fa-edit action'
                      style={{ color: '#4285F4' }}
                    ></i>
                  </span>

                  <Link
                    className='btn btn-outline-warning btn-sm ml-2 rounded'
                    onClick={() => createAdminHandler(rowIdx)}
                  >
                    Make admin
                  </Link>

                  <span onClick={() => deleteUserHandler(rowIdx)}>
                    <i
                      className='fas fa-trash action ml-2'
                      style={{ color: 'red' }}
                    ></i>
                  </span>
                </>
              );
            },
          },
        ]);
      } else {
        setColumnsAdmin([
          {
            Header: 'Id',
            accessor: 'memberId',
            Filter: ColumnFilter,
          },
          // {
          //   Header: 'Name',
          //   accessor: 'userName',
          // },
          {
            Header: 'First Name',
            accessor: 'member.firstName',
            Filter: ColumnFilter,
          },
          {
            Header: 'Last Name',
            accessor: 'member.lastName',
            Filter: ColumnFilter,
          },
          {
            Header: 'City',
            accessor: 'member.city',
            Filter: ColumnFilter,
          },
          {
            Header: 'State',
            accessor: 'member.state',
            Filter: ColumnFilter,
          },
        ]);
      }

      if (successDelete) {
        swal('Success!', successDelete, 'success').then((value) => {
          dispatch({ type: USER_DELETE_RESET });
        });
      }
    } else {
      history.push('/login');
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successUserPendingDelete,
    successAdmin,
    successDeleteAdmin,
  ]);
  const editUserHandler = (rowIndex) => {
    const id = usersRef.current[rowIndex].memberId;
    // console.log(rowIndex);

    history.push(`/admin/users/${id}/edit`);
    // props.history.push("/tutorials/" + id);
    console.log(id);
  };

  const deleteUserHandler = (rowIndex) => {
    const id = usersRef.current[rowIndex].memberId;
    if (window.confirm('Are you sure about deleting this User?')) {
      dispatch(deleteUser(id));
      // console.log(`User deleted: with id: ${id}`);
    }
  };

  const deletePendingUserHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePendingUser(id));
      // console.log('pending user deleted');
    }
  };

  const createAdminHandler = (rowIndex) => {
    const id = usersRef.current[rowIndex].memberId;
    if (window.confirm('Are you sure about making this user as Admin?')) {
      dispatch(createAdminUser(id));
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
          <>
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
                    md={{ span: 12, order: 1 }}
                    lg={{ span: 12, order: 1 }}
                    className='mb-2 p-0'
                    id='all-chapter'
                  >
                    <Card className='text-center' border='info'>
                      <Card.Header as='h3' className='text-info'>
                        Member Pending List
                      </Card.Header>

                      <>
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
                                {/* <td>{pendingUser.pendingId}</td> */}
                                {/* <td>
                                  {' '}
                                  <Image src={user.image} thumbnail />
                                </td> */}
                                <td>
                                  {pendingUser.firstName} {pendingUser.lastName}
                                </td>
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
                                        {/* <Button
                                          variant='light'
                                          className='btn-sm'
                                        >
                                          <i className='fas fa-edit'></i>
                                        </Button> */}
                                        <span>
                                          <i
                                            className='far fa-edit action'
                                            style={{ color: '#4285F4' }}
                                          ></i>
                                        </span>
                                      </LinkContainer>
                                    </td>
                                    <td>
                                      {/* <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() =>
                                          deletePendingUserHandler(
                                            pendingUser.pendingId
                                          )
                                        }
                                      >
                                        <i
                                          className='fas fa-trash action ml-2'
                                          style={{ color: 'red' }}
                                        ></i>
                                      </Button> */}

                                      <span
                                        onClick={() =>
                                          deletePendingUserHandler(
                                            pendingUser.pendingId
                                          )
                                        }
                                      >
                                        <i
                                          className='fas fa-trash action ml-2'
                                          style={{ color: 'red' }}
                                        ></i>
                                      </span>
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </>
                    </Card>
                  </Col>
                ) : null
              ) : null}

              {/* 5th card section : All Email Verified Pending User List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* 6th card section : Admin List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2 p-0'
                id='all-member'
              >
                <Card className='text-center' border='info'>
                  <Card.Header as='h3' className='text-info'>
                    Admins
                  </Card.Header>

                  <>
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
                            <th>Name</th>
                            {/* <th>Last Name</th> */}
                            <th>EMAIL</th>
                            <th>Phone</th>

                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <>
                                  {/* <th>EDIT/DELETE</th> */}
                                  <th>Action</th>
                                </>
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
                                    {/* <td>
                                      {' '}
                                      <Image src={user.member.firstName} />
                                    </td> */}
                                    <td> {user.userName}</td>
                                    <td>
                                      <a href={`mailto: ${user.email}`}>
                                        {' '}
                                        {user.email}
                                      </a>
                                    </td>
                                    <td>{user.member.primaryPhone}</td>
                                    {/* {(userInfo.userRole === 'systemAdmin' ||
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
                                    )} */}
                                    {(userInfo.userRole === 'systemAdmin' ||
                                      userInfo.userRole === 'admin') &&
                                      (user.userRole === 'member' ? (
                                        <td>
                                          <Button
                                            variant='warning'
                                            className='btn-sm'
                                            onClick={() =>
                                              createAdminHandler(user.memberId)
                                            }
                                          >
                                            {' '}
                                            Make ADMIN
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
                                            Remove Admin
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
                  </>
                </Card>
              </Col>
              {/* 6th card section : Admin List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* 7th card section : All Member List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2 p-0'
                id='all-member'
              >
                <Card className='text-center' border='info'>
                  <Card.Header as='h3' className='text-info'>
                    Chapter Members
                  </Card.Header>

                  <>
                    {userListLoading ? (
                      <Loader />
                    ) : userListError ? (
                      <Message variant='danger'>{userListError}</Message>
                    ) : (
                      <>
                        {users && users.length !== 0 && (
                          <RTable users={users} COLUMNS={columnsAdmin} />
                        )}
                      </>
                    )}
                  </>
                </Card>
              </Col>
              {/* 7th card section : All Member List End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* </CardColumns> */}
            </Row>
          </>
        </Col>
      </Row>
    </>
  );
};

export default MembersScreen;
