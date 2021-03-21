import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import * as S from './MissionScreen.Styles';
import {
  allMission,
  deleteMission,
  getMissionById,
  newMission,
} from '../../actions/missionActions';

const MissionScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addMission, setAddMission] = useState(false);
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
  const {
    loading: missionByIdLoading,
    error: missionByIdError,
    success: missionByIdSuccess,
    mission,
  } = missionById;

  const missionUpdate = useSelector((state) => state.missionUpdate);
  const {
    loading: missionUpdateLoading,
    error: missionUpdateError,
    success: missionUpdateSuccess,
    mission: missionUpdated,
  } = missionUpdate;

  const missionDelete = useSelector((state) => state.missionDelete);
  const { success: successDelete } = missionDelete;

  useEffect(() => {
    if (userInfo) {
      setId(userInfo.memberId);
      console.log(addMission);
      dispatch(allMission());
      // dispatch({ type: CHAPTER_LIST_RESET });
      // dispatch({ type: ANNOUNCEMENT_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || missionUpdateSuccess) {
      setAddMission(!addMission);
      setTitle('');
      setBody('');
      // setId('');
    }
    if (missionByIdSuccess) {
      setAddMission(true);
      setTitle(mission.title);
      setBody(mission.body);
      // setId(announcement.announcementId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    missionByIdSuccess,
    // missions,
    missionUpdateSuccess,
    successDelete,
  ]);

  const editMissionHandler = (id) => {
    dispatch(getMissionById(id));
  };

  const deleteMissionHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteMission(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setId(userInfo.memberId);
    console.log(id);
    dispatch(newMission(title, body, id));
  };
  console.log(addMission);
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
                      onClick={() => setAddMission(!addMission)}
                    >
                      Update Mission
                    </Link>
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
                              <Form.Control
                                type='text'
                                placeholder='Please Enter The Mission'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='info' block>
                              <i className='fas fa-plus' /> Add
                            </Button>
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
                  <Card.Header as='h5'>Mission</Card.Header>

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
                              <td> {mission.body}</td>
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

export default MissionScreen;
