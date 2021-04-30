import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import * as S from './ChapterScreen.Styles';
import {
  deleteChapter,
  listChapters,
  registerChapter,
} from '../../actions/chapterActions';
import {
  CHAPTER_LIST_RESET,
  CHAPTER_REGISTER_RESET,
} from '../../constants/chapterConstants';
import Sidebar from '../../components/Sidebar/Sidebar';

const ChapterScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addChapter, setAddChapter] = useState(false);
  const [chapterName, setChapterName] = useState('');
  const [chapterEmail, setChapterEmail] = useState('');
  const [chapterAddress, setChapterAddress] = useState('');
  const [chapterPhone, setChapterPhone] = useState('');

  const chapterList = useSelector((state) => state.chapterList);
  const { loading, error, chapters } = chapterList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterRegister = useSelector((state) => state.chapterRegister);
  const {
    loading: registerLoading,
    error: registerError,
    success,
  } = chapterRegister;

  const chapterDelete = useSelector((state) => state.chapterDelete);
  const { success: successDelete } = chapterDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listChapters());
      dispatch({ type: CHAPTER_LIST_RESET });
      dispatch({ type: CHAPTER_REGISTER_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      setAddChapter((addChapter) => !addChapter);
      setChapterName('');
      setChapterEmail('');
      setChapterAddress('');
      setChapterPhone('');
    }
  }, [dispatch, history, userInfo, success, successDelete]);

  const deleteChapterHandler = (chapterId) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteChapter(chapterId));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      registerChapter(chapterEmail, chapterName, chapterAddress, chapterPhone)
    );
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
            {/* 1st card section : member Status~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card border='info'>
                  <Card.Header className='text-center' as='h2'>
                    <Link
                      className='btn btn-outline-info btn-sm btn-block rounded'
                      onClick={() => setAddChapter(!addChapter)}
                    >
                      Add New Chapter
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    {addChapter
                      ? (registerError && (
                          <Message variant='danger'>{registerError}</Message>
                        )) ||
                        (registerLoading && <Loader />) ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='chapterName'>
                              <Form.Label>Chapter Name</Form.Label>
                              <Form.Control
                                type='chapterName'
                                placeholder='Please Enter New Chapter Name..'
                                value={chapterName}
                                onChange={(e) => setChapterName(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='chapterEmail'>
                              <Form.Label>Chapter Email</Form.Label>
                              <Form.Control
                                type='chapterEmail'
                                placeholder='Please Enter Admin Email Address for the New Chapter'
                                value={chapterEmail}
                                onChange={(e) =>
                                  setChapterEmail(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='chapterAddress'>
                              <Form.Label>Chapter Address</Form.Label>
                              <Form.Control
                                type='chapterAddress'
                                placeholder='Please Enter Address..'
                                value={chapterAddress}
                                onChange={(e) =>
                                  setChapterAddress(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='chapterPhone'>
                              <Form.Label>Chapter Phone</Form.Label>
                              <Form.Control
                                type='chapterPhone'
                                placeholder='Please Enter Phone..'
                                value={chapterPhone}
                                onChange={(e) =>
                                  setChapterPhone(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='info' block>
                              <i className='fas fa-plus' /> Add
                            </Button>
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
              {/* 1st card section end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {/* 5th card section : All Chapter List ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='info'>
                  <Card.Header as='h5'>All Chapter List</Card.Header>

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
                              {/* <td>{chapter.chapterId}</td> */}
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
                  </>
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
