import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as S from './AnnouncementScreen.Styles';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  allAnnouncements,
  deleteAnnouncement,
  getAnnouncementById,
  newAnnouncement,
  updateAnnouncementById,
} from '../../actions/announcementAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  ANNOUNCEMENT_BY_ID_RESET,
  ANNOUNCEMENT_NEW_RESET,
  ANNOUNCEMENT_UPDATE_BY_ID_RESET,
} from '../../constants/announcementConstants';

const AnnouncementScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addAnnouncement, setAddAnnouncement] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const announcementAll = useSelector((state) => state.announcementAll);
  const { loading, error, announcements } = announcementAll;

  const announcementNew = useSelector((state) => state.announcementNew);
  const {
    loading: announcementNewLoading,
    error: announcementNewError,
    success,
  } = announcementNew;

  const announcementById = useSelector((state) => state.announcementById);
  const { success: announcementByIdSuccess, announcement } = announcementById;

  const announcementUpdate = useSelector((state) => state.announcementUpdate);
  const { success: announcementUpdateSuccess } = announcementUpdate;

  const announcementDelete = useSelector((state) => state.announcementDelete);
  const { success: successDelete } = announcementDelete;

  useEffect(() => {
    if (userInfo) {
      setId(userInfo.memberId);
      dispatch(allAnnouncements());
      dispatch({ type: ANNOUNCEMENT_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || announcementUpdateSuccess) {
      setAddAnnouncement(false);
      setEditAnnouncement(false);

      setTitle('');
      setBody('');
      dispatch({ type: ANNOUNCEMENT_BY_ID_RESET });
    }
    if (announcementByIdSuccess) {
      setAddAnnouncement(true);
      setEditAnnouncement(true);
      setTitle(announcement.title);
      setBody(announcement.body);
      setId(announcement.announcementId);

      // setId(announcement.announcementId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    announcementByIdSuccess,
    announcement,
    announcementUpdateSuccess,
    successDelete,
  ]);

  const editAnnouncementHandler = (id) => {
    dispatch({ type: ANNOUNCEMENT_UPDATE_BY_ID_RESET });

    dispatch(getAnnouncementById(id));
  };

  const deleteAnnouncementHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteAnnouncement(id));
    }
  };

  const addNewAnnouncement = (e) => {
    e.preventDefault();

    setAddAnnouncement(!addAnnouncement);
    setTitle('');
    setBody('');
    setEditAnnouncement(false);
    dispatch({ type: ANNOUNCEMENT_BY_ID_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editAnnouncement) {
      dispatch(updateAnnouncementById(id, title, body));
    } else {
      setId(userInfo.memberId);
      // console.log(id);
      dispatch(newAnnouncement(title, body, id));
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
        {/* Sidebar End */}
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <S.CardDeck>
            {/* <CardColumns> */}

            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card border='primary'>
                  <Card.Header className='text-center' as='h2'>
                    <Link
                      className='btn btn-outline-info btn-sm btn-block rounded'
                      // onClick={() => setAddAnnouncement(!addAnnouncement)}
                      onClick={addNewAnnouncement}
                    >
                      New Announcement
                    </Link>
                  </Card.Header>

                  <Card.Body>
                    {addAnnouncement
                      ? (announcementNewError && (
                          <Message variant='danger'>
                            {announcementNewError}
                          </Message>
                        )) ||
                        (announcementNewLoading && <Loader />) ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='title'>
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter A Title..'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='body'>
                              <Form.Label>Announcement</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter The Announcement'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            {editAnnouncement ? (
                              <Button
                                type='submit'
                                variant='info'
                                block
                                // onClick={() =>
                                //   updateAnnouncementHandler(
                                //     announcement.announcementId
                                //   )
                                // }
                              >
                                <i className='fas fa-plus' /> Update
                              </Button>
                            ) : (
                              <Button type='submit' variant='info' block>
                                <i className='fas fa-plus' /> Add
                              </Button>
                            )}
                          </Form>
                        ))
                      : null}
                    {/* {message && <Message variant='danger'>{message}</Message>} */}
                    {/* {registerError && (
                        <Message variant='danger'>{registerError}</Message>
                      )}
                      {registerLoading && <Loader />}
                      {} */}
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Announcements</Card.Header>

                  <>
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
                            <th>Title</th>
                            <th>Announcement</th>
                            <th>Date</th>
                            {/* <th>CHAPTER ADDRESS</th> */}
                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>EDIT/DELETE</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {announcements.map((announcement) => (
                            <tr key={announcement.announcementId}>
                              {/* // <td>{announcement.chapterId}</td> */}
                              {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                              <td> {announcement.title}</td>
                              <td> {announcement.body}</td>
                              <td>
                                {' '}
                                {announcement.createdAt.substring(0, 10)}
                              </td>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    <Button
                                      variant='light'
                                      className='btn-sm'
                                      onClick={() =>
                                        editAnnouncementHandler(
                                          announcement.announcementId
                                        )
                                      }
                                    >
                                      <i className='fas fa-edit'></i>
                                    </Button>

                                    <Button
                                      variant='danger'
                                      className='btn-sm'
                                      onClick={() =>
                                        deleteAnnouncementHandler(
                                          announcement.announcementId
                                        )
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
                  </>
                </Card>
              </Col>
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default AnnouncementScreen;
