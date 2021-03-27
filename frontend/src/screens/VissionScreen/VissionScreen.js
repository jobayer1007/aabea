import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  allVission,
  deleteVission,
  getVissionById,
  newVission,
  updateVissionById,
} from '../../actions/vissionActions';
import * as S from './VissionScreen.Styles';
import {
  VISSION_BY_ID_RESET,
  VISSION_NEW_RESET,
  VISSION_UPDATE_BY_ID_RESET,
} from '../../constants/vissionConstants';

const VissionScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addVission, setAddVission] = useState(false);
  const [editVission, setEditVission] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vissionAll = useSelector((state) => state.vissionAll);
  const { loading, error, vissions } = vissionAll;

  const vissionNew = useSelector((state) => state.vissionNew);
  const {
    loading: vissionNewLoading,
    error: vissionNewError,
    success,
  } = vissionNew;

  const vissionById = useSelector((state) => state.vissionById);
  const {
    loading: vissionByIdLoading,
    error: vissionByIdError,
    success: vissionByIdSuccess,
    vission,
  } = vissionById;

  const vissionUpdate = useSelector((state) => state.vissionUpdate);
  const {
    loading: vissionUpdateLoading,
    error: vissionUpdateError,
    success: vissionUpdateSuccess,
    mission: vissionUpdated,
  } = vissionUpdate;

  const vissionDelete = useSelector((state) => state.vissionDelete);
  const { success: successDelete } = vissionDelete;

  useEffect(() => {
    if (userInfo) {
      setId(userInfo.memberId);
      console.log(addVission);
      dispatch(allVission());
      // dispatch({ type: CHAPTER_LIST_RESET });
      dispatch({ type: VISSION_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || vissionUpdateSuccess) {
      setAddVission(!addVission);
      setEditVission(false);
      setTitle('');
      setBody('');
      dispatch({ type: VISSION_BY_ID_RESET });
    }
    if (vissionByIdSuccess) {
      setAddVission(true);
      setEditVission(true);
      setTitle(vission.title);
      setBody(vission.body);
      setId(vission.chapterId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    vissionByIdSuccess,
    // missions,
    vissionUpdateSuccess,
    successDelete,
  ]);

  const editVissionHandler = (id) => {
    dispatch({ type: VISSION_UPDATE_BY_ID_RESET });
    setEditVission(!editVission);
    setAddVission(!addVission);
    dispatch(getVissionById(id));
  };

  const deleteVissionHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteVission(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editVission) {
      dispatch(updateVissionById(id, title, body));
    } else {
      setId(userInfo.memberId);
      console.log(id);
      dispatch(newVission(title, body, id));
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
                    {vissions && vissions.length !== 0 ? (
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => editVissionHandler(userInfo.chapterId)}
                      >
                        Update Vission
                      </Link>
                    ) : (
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => setAddVission(!addVission)}
                      >
                        Add Vission
                      </Link>
                    )}
                  </Card.Header>
                  <Card.Body>
                    {addVission
                      ? (vissionNewError && (
                          <Message variant='danger'>{vissionNewError}</Message>
                        )) ||
                        (vissionNewLoading && <Loader />) ||
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
                              <Form.Label>Vission</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter The Vission'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                            {editVission ? (
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
                  <Card.Header as='h5'>Vission</Card.Header>

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
                          {vissions.map((vission) => (
                            <tr key={vission.chapterId}>
                              {/* // <td>{announcement.chapterId}</td> */}
                              {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                              <td> {vission.title}</td>
                              <td> {vission.body}</td>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    <Button
                                      variant='light'
                                      className='btn-sm'
                                      onClick={() =>
                                        editVissionHandler(vission.chapterId)
                                      }
                                    >
                                      <i className='fas fa-edit'></i>
                                    </Button>

                                    <Button
                                      variant='danger'
                                      className='btn-sm'
                                      onClick={() =>
                                        deleteVissionHandler(vission.chapterId)
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

export default VissionScreen;
