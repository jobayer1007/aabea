import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  allHistory,
  deleteHistory,
  getHistoryById,
  newHistory,
  updateHistoryById,
} from '../../actions/historyActions';
import * as S from './HistoryScreen.Styles';
import {
  HISTORY_BY_ID_RESET,
  HISTORY_NEW_RESET,
  HISTORY_UPDATE_BY_ID_RESET,
} from '../../constants/historyConstants';

const HistoryScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addHistory, setAddHistory] = useState(false);
  const [editHistory, setEditHistory] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const historyAll = useSelector((state) => state.historyAll);
  const { loading, error, histories } = historyAll;

  const historyNew = useSelector((state) => state.historyNew);
  const {
    loading: historyNewLoading,
    error: historyNewError,
    success,
  } = historyNew;

  const historyById = useSelector((state) => state.historyById);
  const { success: historyByIdSuccess, historyId } = historyById;

  const historyUpdate = useSelector((state) => state.historyUpdate);
  const { success: historyUpdateSuccess } = historyUpdate;

  const historyDelete = useSelector((state) => state.historyDelete);
  const { success: successDelete } = historyDelete;

  useEffect(() => {
    if (userInfo) {
      setId(userInfo.memberId);
      // console.log(addVission);
      dispatch(allHistory());
      // dispatch({ type: CHAPTER_LIST_RESET });
      dispatch({ type: HISTORY_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || historyUpdateSuccess) {
      setAddHistory(!addHistory);
      setEditHistory(false);
      setTitle('');
      setBody('');
      dispatch({ type: HISTORY_BY_ID_RESET });
    }
    if (historyByIdSuccess) {
      setAddHistory(true);
      setEditHistory(true);
      setTitle(historyId.title);
      setBody(historyId.body);
      setId(historyId.chapterId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    historyByIdSuccess,
    // missions,
    historyUpdateSuccess,
    successDelete,
  ]);

  const editHistoryHandler = (id) => {
    dispatch({ type: HISTORY_UPDATE_BY_ID_RESET });
    setEditHistory(!editHistory);
    setAddHistory(!addHistory);
    dispatch(getHistoryById(id));
  };

  const deleteHistoryHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteHistory(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editHistory) {
      dispatch(updateHistoryById(id, title, body));
    } else {
      setId(userInfo.memberId);
      console.log(id);
      dispatch(newHistory(title, body, id));
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
                    {histories && histories.length !== 0 ? (
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => editHistoryHandler(userInfo.chapterId)}
                      >
                        Update History
                      </Link>
                    ) : (
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => setAddHistory(!addHistory)}
                      >
                        Add History
                      </Link>
                    )}
                  </Card.Header>
                  <Card.Body>
                    {addHistory
                      ? (historyNewError && (
                          <Message variant='danger'>{historyNewError}</Message>
                        )) ||
                        (historyNewLoading && <Loader />) ||
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
                              <Form.Label>History</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter The History'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                            {editHistory ? (
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
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>History</Card.Header>

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
                            <th>Title</th>
                            <th>Vission</th>
                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>EDIT/DELETE</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {histories.map((history) => (
                            <tr key={history.chapterId}>
                              {/* // <td>{announcement.chapterId}</td> */}
                              {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                              <td> {history.title}</td>
                              <td> {history.body}</td>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    <Button
                                      variant='light'
                                      className='btn-sm'
                                      onClick={() =>
                                        editHistoryHandler(history.chapterId)
                                      }
                                    >
                                      <i className='fas fa-edit'></i>
                                    </Button>

                                    <Button
                                      variant='danger'
                                      className='btn-sm'
                                      onClick={() =>
                                        deleteHistoryHandler(history.chapterId)
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
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default HistoryScreen;
