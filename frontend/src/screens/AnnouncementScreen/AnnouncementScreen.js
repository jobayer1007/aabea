import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

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
import ColumnFilter from '../../components/Table/ColumnFilter';
import RTable from '../../components/Table/RTable';

const AnnouncementScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addAnnouncement, setAddAnnouncement] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  const announcementsRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const announcementAll = useSelector((state) => state.announcementAll);
  const { loading, error, announcements } = announcementAll;

  announcementsRef.current = announcements;

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

  const checkChapter = window.location.host.split('.')[0];

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      setId(userInfo.memberId);
      dispatch(allAnnouncements(checkChapter));
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
    checkChapter,
    success,
    announcementByIdSuccess,
    announcement,
    announcementUpdateSuccess,
    successDelete,
  ]);

  const editAnnouncementHandler = (rowIndex) => {
    const id = announcementsRef.current[rowIndex].announcementId;
    dispatch({ type: ANNOUNCEMENT_UPDATE_BY_ID_RESET });
    // console.log(rowIndex);
    // console.log(id);
    dispatch(getAnnouncementById(id));
  };

  const deleteAnnouncementHandler = (rowIndex) => {
    const id = announcementsRef.current[rowIndex].announcementId;

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

  const columnsAdmin = [
    {
      Header: 'Title',
      accessor: 'title',
      Filter: ColumnFilter,
    },
    // {
    //   Header: 'Name',
    //   accessor: 'userName',
    // },
    {
      Header: 'Announcement',
      accessor: 'body',
      Filter: ColumnFilter,
      Cell: ({ value }) => {
        return parse(value);
      },
    },
    {
      Header: 'Date',
      accessor: 'createdAt',
      Filter: ColumnFilter,
      Cell: ({ value }) => {
        return format(new Date(value), 'dd/mm/yyyy');
      },
    },

    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props) => {
        const rowIdx = props.row.id;
        return (
          <div>
            <span onClick={() => editAnnouncementHandler(rowIdx)}>
              <i className='far fa-edit action mr-2'></i>
            </span>

            <span onClick={() => deleteAnnouncementHandler(rowIdx)}>
              <i className='fas fa-trash action'></i>
            </span>
          </div>
        );
      },
    },
  ];

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
          className='m-0 p-1'
        >
          <>
            {/* <CardColumns> */}

            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2 p-0'
              >
                <Card border='info'>
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
                              <CKEditor
                                editor={ClassicEditor}
                                data={body}
                                onChange={(e, editor) => {
                                  const data = editor.getData();
                                  setBody(data);
                                }}
                              />
                              {/* <Form.Control
                                as='textarea'
                                rows='3'
                                placeholder='Please Enter The Announcement'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                              ></Form.Control> */}
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
                className='mb-2 p-0'
                id='all-chapter'
              >
                <Card border='info'>
                  <Card.Header as='h5' className='text-center text-info'>
                    Announcements
                  </Card.Header>

                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <RTable users={announcements} COLUMNS={columnsAdmin} />
                      </>
                    )}
                  </>
                </Card>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    </>
  );
};

export default AnnouncementScreen;
