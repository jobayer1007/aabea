import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import * as S from './MissionScreen.Styles';
import {
  allMission,
  deleteMission,
  getMissionById,
  newMission,
  updateMissionById,
} from '../../actions/missionActions';
import {
  MISSION_BY_ID_RESET,
  MISSION_NEW_RESET,
  MISSION_UPDATE_BY_ID_RESET,
} from '../../constants/missionConstants';

const MissionScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addMission, setAddMission] = useState(false);
  const [editMission, setEditMission] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const missionAll = useSelector((state) => state.missionAll);
  const { loading, error, missions } = missionAll;

  const missionNew = useSelector((state) => state.missionNew);
  const {
    loading: missionNewLoading,
    error: missionNewError,
    success,
  } = missionNew;

  const missionById = useSelector((state) => state.missionById);
  const { success: missionByIdSuccess, mission } = missionById;

  const missionUpdate = useSelector((state) => state.missionUpdate);
  const { success: missionUpdateSuccess } = missionUpdate;

  const missionDelete = useSelector((state) => state.missionDelete);
  const { success: successDelete } = missionDelete;

  useEffect(() => {
    if (userInfo) {
      setId(userInfo.memberId);
      dispatch(allMission());
      dispatch({ type: MISSION_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || missionUpdateSuccess) {
      setAddMission(false);
      setEditMission(false);
      setTitle('');
      setBody('');
      dispatch({ type: MISSION_BY_ID_RESET });
    }
    if (missionByIdSuccess) {
      setAddMission((addMission) => !addMission);
      setEditMission((editMission) => !editMission);
      setTitle(mission.title);
      setBody(mission.body);
      setId(mission.chapterId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    missionByIdSuccess,
    mission,
    missionUpdateSuccess,
    successDelete,
  ]);

  const editMissionHandler = (id) => {
    dispatch({ type: MISSION_UPDATE_BY_ID_RESET });

    dispatch(getMissionById(id));
  };

  const deleteMissionHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteMission(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editMission) {
      dispatch(updateMissionById(id, title, body));
    } else {
      setId(userInfo.memberId);
      dispatch(newMission(title, body, id));
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
                    {missions && missions.length !== 0 ? (
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => editMissionHandler(userInfo.chapterId)}
                      >
                        Update Mission
                      </Link>
                    ) : (
                      <Link
                        className='btn btn-outline-info btn-sm btn-block rounded'
                        onClick={() => setAddMission(!addMission)}
                      >
                        Add Mission
                      </Link>
                    )}
                  </Card.Header>
                  <Card.Body>
                    {addMission
                      ? (missionNewError && (
                          <Message variant='danger'>{missionNewError}</Message>
                        )) ||
                        (missionNewLoading && <Loader />) ||
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
                              <Form.Label>Mission</Form.Label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={body}
                                onChange={(e, editor) => {
                                  const data = editor.getData();
                                  setBody(data);
                                }}
                              />
                            </Form.Group>
                            {editMission ? (
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
                    Mission
                  </Card.Header>

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
                            <th>Title</th>
                            <th>Mission</th>
                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>EDIT/DELETE</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {missions.map((mission) => (
                            <tr key={mission.chapterId}>
                              {/* // <td>{announcement.chapterId}</td> */}
                              {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                              <td> {mission.title}</td>
                              <td> {parse(mission.body)}</td>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    <Button
                                      variant='light'
                                      className='btn-sm'
                                      onClick={() =>
                                        editMissionHandler(mission.chapterId)
                                      }
                                    >
                                      <i className='fas fa-edit'></i>
                                    </Button>

                                    <Button
                                      variant='danger'
                                      className='btn-sm'
                                      onClick={() =>
                                        deleteMissionHandler(mission.chapterId)
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
          </>
        </Col>
      </Row>
    </>
  );
};

export default MissionScreen;
