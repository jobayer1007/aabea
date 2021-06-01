import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ColumnFilter from '../../components/Table/ColumnFilter';
import RTable from '../../components/Table/RTable';
import {
  CHAPTER_DETAILS_RESET,
  CHAPTER_REGISTER_REQUEST,
  CHAPTER_UPDATE_RESET,
} from '../../constants/chapterConstants';
import {
  deleteChapter,
  getChapterById,
  listChapters,
  registerChapter,
  updateChapterById,
} from '../../actions/chapterActions';

const ChapterScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addChapter, setAddChapter] = useState(false);
  const [editChapter, setEditChapter] = useState(false);
  const [chapterName, setChapterName] = useState('');
  const [chapterEmail, setChapterEmail] = useState('');
  const [chapterAddress, setChapterAddress] = useState('');
  const [chapterPhone, setChapterPhone] = useState('');
  const [subDomain, setSubDomain] = useState('');
  const [id, setId] = useState('');

  const chaptersRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterAll = useSelector((state) => state.chapterAll);
  const { loading, error, chapters } = chapterAll;

  chaptersRef.current = chapters;

  const chapterRegister = useSelector((state) => state.chapterRegister);
  const {
    loading: chapterRegisterLoading,
    error: chapterRegisterError,
    success,
  } = chapterRegister;

  const chapterById = useSelector((state) => state.chapterById);
  const { success: chapterByIdSuccess, chapter } = chapterById;

  const chapterUpdate = useSelector((state) => state.chapterUpdate);
  const { success: chapterUpdateSuccess } = chapterUpdate;

  const chapterDelete = useSelector((state) => state.chapterDelete);
  const { success: successDelete } = chapterDelete;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      dispatch(listChapters());
      dispatch({ type: CHAPTER_REGISTER_REQUEST });
    } else {
      history.push('/login');
    }
    if (success || chapterUpdateSuccess) {
      setAddChapter(false);
      setEditChapter(false);

      setChapterName('');
      setChapterEmail('');
      setChapterAddress('');
      setChapterPhone('');
      setSubDomain('');
      setId('');
      dispatch({ type: CHAPTER_DETAILS_RESET });
    }
    if (chapterByIdSuccess) {
      setAddChapter(true);
      setEditChapter(true);
      setChapterName(chapter.chapterName);
      setChapterEmail(chapter.chapterEmail);
      setChapterAddress(chapter.chapterAddress);
      setChapterPhone(chapter.chapterPhone);
      setSubDomain(chapter.subDomain);

      setId(chapter.chapterId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    chapterByIdSuccess,
    chapter,
    chapterUpdateSuccess,
    successDelete,
  ]);

  const editChapterHandler = (rowIndex) => {
    const id = chaptersRef.current[rowIndex].chapterId;
    dispatch({ type: CHAPTER_UPDATE_RESET });
    // console.log(rowIndex);
    // console.log(id);
    dispatch(getChapterById(id));
  };

  const deleteChapterHandler = (rowIndex) => {
    const id = chaptersRef.current[rowIndex].chapterId;

    if (window.confirm('Are You Sure?')) {
      dispatch(deleteChapter(id));
    }
  };

  const addNewChapter = (e) => {
    e.preventDefault();

    setAddChapter(!addChapter);
    setChapterName('');
    setChapterEmail('');
    setChapterAddress('');
    setChapterPhone('');
    setSubDomain('');
    setEditChapter(false);
    dispatch({ type: CHAPTER_DETAILS_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editChapter) {
      dispatch(
        updateChapterById(
          id,
          chapterName,
          chapterAddress,
          chapterEmail,
          chapterPhone,
          subDomain
        )
      );
    } else {
      // setId(userInfo.memberId);
      // console.log(id);
      dispatch(
        registerChapter(
          chapterEmail,
          chapterName,
          chapterAddress,
          chapterPhone,
          subDomain
        )
      );
    }
  };

  const columnsAdmin = [
    {
      Header: 'CHAPTER NAME',
      accessor: 'chapterName',
      Filter: ColumnFilter,
    },
    // {
    //   Header: 'Name',
    //   accessor: 'userName',
    // },
    {
      Header: 'CHAPTER EMAIL',
      accessor: 'chapterEmail',
      Filter: ColumnFilter,
    },
    {
      Header: 'CHAPTER PHONE',
      accessor: 'chapterPhone',
      Filter: ColumnFilter,
    },
    {
      Header: 'SUBDOAMIN',
      accessor: 'subDomain',
      Filter: ColumnFilter,
    },
    {
      Header: 'CHAPTER ADDRESS',
      accessor: 'chapterAddress',
      Filter: ColumnFilter,
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props) => {
        const rowIdx = props.row.id;
        return (
          <div>
            <span onClick={() => editChapterHandler(rowIdx)}>
              <i className='far fa-edit action mr-2'></i>
            </span>

            <span onClick={() => deleteChapterHandler(rowIdx)}>
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
                      onClick={addNewChapter}
                    >
                      New Chapter
                    </Link>
                  </Card.Header>

                  <Card.Body>
                    {addChapter
                      ? (chapterRegisterError && (
                          <Message variant='danger'>
                            {chapterRegisterError}
                          </Message>
                        )) ||
                        // (chapterRegisterLoading && <Loader />)
                        //  ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='chapterName'>
                              <Form.Label>Chapter Name</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter A chapter name..'
                                value={chapterName}
                                onChange={(e) => setChapterName(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='chapterPhone'>
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter phone number..'
                                value={chapterPhone}
                                onChange={(e) =>
                                  setChapterPhone(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='chapterEmail'>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type='email'
                                placeholder='Please Enter email address..'
                                value={chapterEmail}
                                onChange={(e) =>
                                  setChapterEmail(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='subDomain'>
                              <Form.Label>SubDomain</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter subdomain..'
                                value={subDomain}
                                onChange={(e) => setSubDomain(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='chapterAddress'>
                              <Form.Label>Chapter Address</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter chapter address..'
                                value={chapterAddress}
                                onChange={(e) =>
                                  setChapterAddress(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            {editChapter ? (
                              <Button type='submit' variant='info' block>
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
                    Chapters
                  </Card.Header>

                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <RTable users={chapters} COLUMNS={columnsAdmin} />
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

export default ChapterScreen;
