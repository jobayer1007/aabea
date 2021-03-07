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
import * as S from './ChapterScreen.Styles';
import { deleteChapter, listChapters } from '../../actions/chapterActions';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const ChapterScreen = ({ history }) => {
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
        {/* Sidebar End */}
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
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5' className='text-info'>
                    <Link
                      className='btn btn-outline-info btn-sm btn-block  rounded'
                      to=''
                    >
                      Add New Chapter
                    </Link>
                  </Card.Header>
                </Card>
              </Col>
              {/* 1st card section end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

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
                              {userInfo.userRole === 'systemAdmin' && (
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

              {/* </CardColumns> */}
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default ChapterScreen;
