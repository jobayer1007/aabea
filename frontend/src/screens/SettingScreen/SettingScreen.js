import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getChapterSettings,
  newChapterSettings,
  updateChapterSettings,
} from '../../actions/chapterActions';
import {
  CHAPTER_SETTINGS_NEW_RESET,
  CHAPTER_SETTINGS_UPDATE_RESET,
} from '../../constants/chapterConstants';
import swal from 'sweetalert';

const SettingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [newSettings, setNewSettings] = useState(false);
  const [editSettings, setEditSettings] = useState(false);
  const [chapterAddress, setChapterAddress] = useState('');
  const [chapterEmail, setChapterEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chapterPhone, setChapterPhone] = useState('');
  const [chapterPaymentId, setChapterPaymentId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterSettingsNew = useSelector((state) => state.chapterSettingsNew);
  const { success: chapterSettingsNewSuccess } = chapterSettingsNew;

  const chapterSettingsAll = useSelector((state) => state.chapterSettingsAll);
  const {
    loading: chapterSettingsLoading,
    error: chapterSettingsError,
    chapterSettings,
  } = chapterSettingsAll;

  const chapterSettingsUpdate = useSelector(
    (state) => state.chapterSettingsUpdate
  );
  const { success: chapterSettingsUpdateSuccess } = chapterSettingsUpdate;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      dispatch(getChapterSettings());
    } else {
      history.push('/login');
    }
    if (chapterSettingsNewSuccess || chapterSettingsUpdateSuccess) {
      swal(
        'Success!',
        chapterSettingsNewSuccess || chapterSettingsUpdateSuccess,
        'success'
      ).then(() => {
        dispatch({ type: CHAPTER_SETTINGS_NEW_RESET });
        dispatch({ type: CHAPTER_SETTINGS_UPDATE_RESET });

        setNewSettings(false);
        setEditSettings(false);
      });
    }
  }, [
    dispatch,
    history,
    userInfo,
    chapterSettingsNewSuccess,
    chapterSettingsUpdateSuccess,
  ]);

  const addNewSettings = (e) => {
    e.preventDefault();

    setNewSettings(!newSettings);
  };

  const editSettingsHandler = (e) => {
    e.preventDefault();

    setEditSettings(!editSettings);
    setChapterAddress(chapterSettings.chapterAddress);
    setChapterEmail(chapterSettings.chapterEmail);
    setPassword(chapterSettings.password);
    setChapterPhone(chapterSettings.chapterPhone);
    setChapterPaymentId(chapterSettings.chapterPayment);
  };

  const cancelHandler = (e) => {
    e.preventDefault();

    setEditSettings(!editSettings);
    // setChapterAddress(chapterSettings.chapterAddress);
    // setChapterEmail(chapterSettings.chapterEmail);
    // setPassword(chapterSettings.password);
    // setChapterPhone(chapterSettings.chapterPhone);
    // setChapterPaymentId(chapterSettings.chapterPayment);
  };

  const updateSettingsHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateChapterSettings({
        chapterEmail,
        password,
        chapterAddress,
        chapterPhone,
        chapterPaymentId,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(chapterAddress);

    dispatch(
      newChapterSettings(
        chapterEmail,
        password,
        chapterAddress,
        chapterPhone,
        chapterPaymentId
      )
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
          <Card>
            <Card.Header as='h5' className='text-center text-info'>
              Chapter Settings
            </Card.Header>
            <Card.Body>
              {chapterSettingsLoading ? (
                <Loader />
              ) : chapterSettingsError ? (
                <Message variant='danger'>{chapterSettingsError}</Message>
              ) : (chapterSettings && chapterSettings.length !== 0) ||
                newSettings ? (
                <Form onSubmit={submitHandler}>
                  <ListGroup variant='flush'>
                    {chapterSettings && chapterSettings.length !== 0 && (
                      <ListGroup.Item>
                        <Row>
                          <>
                            <Col md={3}>Chapter Name:</Col>
                            <Col>{chapterSettings.chapterName}</Col>
                          </>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Chapter Address:</Col>
                        {chapterSettings &&
                        chapterSettings.length !== 0 &&
                        !editSettings ? (
                          <Col>{chapterSettings.chapterAddress}</Col>
                        ) : newSettings || editSettings ? (
                          <>
                            <Form.Group as={Col} controlId='chapterAddress'>
                              <Form.Control
                                required
                                type='text'
                                placeholder='Address'
                                value={chapterAddress}
                                onChange={(e) =>
                                  setChapterAddress(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>
                          </>
                        ) : null}
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Chapter Phone:</Col>
                        {chapterSettings &&
                        chapterSettings.length !== 0 &&
                        !editSettings ? (
                          <Col>{chapterSettings.chapterPhone}</Col>
                        ) : newSettings || editSettings ? (
                          <>
                            <Form.Group as={Col} controlId='chapterPhone'>
                              <Form.Control
                                required
                                type='text'
                                placeholder='Phone number..'
                                value={chapterPhone}
                                onChange={(e) =>
                                  setChapterPhone(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>
                          </>
                        ) : null}
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Chapter Email:</Col>
                        {chapterSettings &&
                        chapterSettings.length !== 0 &&
                        !editSettings ? (
                          <Col>{chapterSettings.chapterEmail}</Col>
                        ) : newSettings || editSettings ? (
                          <>
                            <Form.Group as={Col} controlId='chapterEmail'>
                              <Form.Control
                                required
                                type='email'
                                placeholder='Email..'
                                value={chapterEmail}
                                onChange={(e) =>
                                  setChapterEmail(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>
                          </>
                        ) : null}
                      </Row>
                    </ListGroup.Item>

                    {newSettings || editSettings ? (
                      <ListGroup.Item>
                        <Row>
                          <>
                            <Col md={3}>Password:</Col>
                            <Form.Group as={Col} controlId='password'>
                              <Form.Control
                                required
                                type='password'
                                placeholder='password...'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                          </>
                        </Row>
                      </ListGroup.Item>
                    ) : null}

                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>PayPal Client Id:</Col>
                        {chapterSettings &&
                        chapterSettings.length !== 0 &&
                        !editSettings ? (
                          <Col>{chapterSettings.chapterPayment}</Col>
                        ) : newSettings || editSettings ? (
                          <>
                            <Form.Group as={Col} controlId='chapterPaymentId'>
                              <Form.Control
                                required
                                type='text'
                                placeholder='PayPal Client Id'
                                value={chapterPaymentId}
                                onChange={(e) =>
                                  setChapterPaymentId(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>
                          </>
                        ) : null}
                      </Row>
                    </ListGroup.Item>
                    {newSettings ? (
                      <Row>
                        <Col className='m-0 p-1'>
                          {/* <Link
                            className='btn btn-outline-info btn-sm btn-block rounded'
                            onClick={submitHandler}
                          >
                            Submit
                          </Link> */}
                          <Button
                            type='submit'
                            variant='info'
                            className='btn  btn-sm btn-block rounded'
                          >
                            Submit
                          </Button>
                        </Col>
                        <Col className='m-0 p-1'>
                          <Link
                            className='btn btn-outline-warning btn-sm btn-block rounded'
                            onClick={addNewSettings}
                          >
                            Cancel
                          </Link>
                        </Col>
                      </Row>
                    ) : editSettings ? (
                      <Row>
                        <Col className='m-0 p-1'>
                          <Link
                            className='btn btn-outline-info btn-sm btn-block  rounded'
                            onClick={updateSettingsHandler}
                          >
                            Update
                          </Link>
                        </Col>

                        <Col className='m-0 p-1'>
                          <Link
                            className='btn btn-outline-danger btn-sm btn-block  rounded'
                            onClick={cancelHandler}
                          >
                            Cancel
                          </Link>
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col className='m-0 p-1'>
                          <Link
                            className='btn btn-outline-warning btn-sm btn-block  rounded'
                            onClick={editSettingsHandler}
                          >
                            Edit
                          </Link>
                        </Col>
                      </Row>
                    )}
                  </ListGroup>
                </Form>
              ) : (
                <>
                  <Link
                    className='btn btn-outline-warning btn-sm btn-block rounded'
                    onClick={addNewSettings}
                  >
                    Chapter settings has not been created yet. Please create
                    chapter settings. To create settings click here.
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SettingScreen;
