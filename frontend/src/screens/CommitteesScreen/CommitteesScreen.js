import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Media,
  ListGroup,
  Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  newCMember,
  allCMembers,
  deleteCMember,
  getCMemberById,
  updateCMemberById,
} from '../../actions/committeeActions';
import {
  COMMITTEE_MEMBER_BY_ID_RESET,
  COMMITTEE_MEMBER_NEW_RESET,
  COMMITTEE_MEMBER_UPDATE_BY_ID_RESET,
} from '../../constants/committeeConstants';
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

const CommitteeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addCMember, setAddCMember] = useState(false);
  const [editCMember, setEditCMember] = useState(false);
  const [cMemberId, setCMemberId] = useState('');
  const [position, setPosition] = useState('');
  // const [tenure, setTenure] = useState([]);
  const [bio, setBio] = useState('');
  const [tenureFrom, setTenureFrom] = useState('');
  const [tenureTo, setTenureTo] = useState('');
  const [id, setId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cMemberAll = useSelector((state) => state.cMemberAll);
  const { loading, error, cMembers } = cMemberAll;

  const cMemberNew = useSelector((state) => state.cMemberNew);
  const {
    loading: cMemberNewLoading,
    error: cMemberNewError,
    success,
  } = cMemberNew;

  const cMemberById = useSelector((state) => state.cMemberById);
  const { success: cMemberByIdSuccess, cMember } = cMemberById;

  const cMemberUpdate = useSelector((state) => state.cMemberUpdate);
  const { success: cMemberUpdateSuccess, error: cMemberUpdateError } =
    cMemberUpdate;

  const cMemberDelete = useSelector((state) => state.cMemberDelete);
  const { success: successDelete } = cMemberDelete;

  const checkChapter = window.location.host;

  useEffect(() => {
    if (userInfo) {
      // setId(userInfo.memberId);
      dispatch({ type: COMMITTEE_MEMBER_NEW_RESET });
    }
    dispatch(allCMembers(checkChapter));
    // else {
    //   history.push('/login');
    // }
    if (success || cMemberUpdateSuccess) {
      setAddCMember(false);
      setEditCMember(false);

      setCMemberId('');
      setPosition('');
      // setTenure('');
      setTenureFrom('');
      setTenureTo('');
      dispatch({ type: COMMITTEE_MEMBER_BY_ID_RESET });
    }
    if (cMemberNewError) {
      // console.log(error);
      swal('Error!', cMemberNewError, 'error');
    }
    if (cMemberUpdateError) {
      swal('Error!', cMemberUpdateError, 'error');
    }

    if (cMemberByIdSuccess) {
      setAddCMember(true);
      setEditCMember(true);
      setPosition(cMember.position);
      setBio(cMember.bio);
      setTenureFrom(cMember.tenure[0].value);
      setTenureTo(cMember.tenure[1].value);
      setCMemberId(cMember.memberId);

      setId(cMember.cId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    cMemberNewError,
    cMemberUpdateError,
    cMemberByIdSuccess,
    cMember,
    cMemberUpdateSuccess,
    successDelete,
  ]);

  const editCMemberHandler = (id) => {
    dispatch({ type: COMMITTEE_MEMBER_UPDATE_BY_ID_RESET });
    console.log(id);
    dispatch(getCMemberById(id));
  };

  const deleteCMemberHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteCMember(id));
    }
  };

  const addNewCMember = (e) => {
    e.preventDefault();

    setAddCMember(!addCMember);
    setPosition('');
    setBio('');
    setTenureFrom('');
    setTenureTo('');
    setCMemberId('');
    setEditCMember(false);
    dispatch({ type: COMMITTEE_MEMBER_BY_ID_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editCMember) {
      const period = [tenureFrom, tenureTo];

      // console.log(period);
      // console.log(cMemberId);
      // console.log(position);
      // console.log(tenure);
      console.log(bio);
      dispatch(updateCMemberById(id, cMemberId, position, bio, period));
    } else {
      // setId(userInfo.memberId);
      // setTenure(new Date(tenureFrom), new Date(tenureTo));
      const period = [tenureFrom, tenureTo];
      // setTenure(period);
      // console.log(period);
      // console.log(cMemberId);
      // console.log(position);
      // // console.log(tenure);
      // console.log(bio);
      dispatch(newCMember(cMemberId, position, period, bio));
    }
  };

  return (
    <Row className='content'>
      {userInfo &&
      (userInfo.userRole === 'admin' ||
        userInfo.userRole === 'systemAdmin' ||
        userInfo.userRole === 'member') ? (
        <>
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
                {userInfo &&
                (userInfo.userRole === 'admin' ||
                  userInfo.userRole === 'systemAdmin') ? (
                  <>
                    <Col
                      md={{ span: 12, order: 1 }}
                      lg={{ span: 12, order: 1 }}
                      // style={{ padding: 0 }}
                      className='mb-2 p-0'
                    >
                      <Card border='info'>
                        <Card.Header className='text-center text-info' as='h3'>
                          <Link
                            className='btn btn-outline-info btn-sm btn-block rounded'
                            // onClick={() => setAddAnnouncement(!addAnnouncement)}
                            onClick={addNewCMember}
                          >
                            New Committee Member
                          </Link>
                        </Card.Header>

                        <Card.Body>
                          {addCMember
                            ? (cMemberNewError && (
                                <Message variant='danger'>
                                  {cMemberNewError}{' '}
                                </Message>
                              )) ||
                              (cMemberNewLoading && <Loader />) ||
                              (success ? (
                                <Message variant='success'>{success}</Message>
                              ) : (
                                <Form onSubmit={submitHandler}>
                                  <Form.Group controlId='postion'>
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control
                                      type='text'
                                      placeholder='Please Enter Position'
                                      value={position}
                                      onChange={(e) =>
                                        setPosition(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='cMemberId'>
                                    <Form.Label>Member Id</Form.Label>
                                    <Form.Control
                                      type='number'
                                      placeholder='Please Enter The Member Id'
                                      value={cMemberId}
                                      onChange={(e) =>
                                        setCMemberId(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='tenureFrom'>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                      type='date'
                                      placeholder='Please Enter The Starting Date'
                                      value={tenureFrom}
                                      onChange={(e) =>
                                        setTenureFrom(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='tenureTo'>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                      type='date'
                                      placeholder='Please Enter The Ending Date'
                                      value={tenureTo}
                                      onChange={(e) =>
                                        setTenureTo(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>

                                  <Form.Group controlId='bio'>
                                    <Form.Label>Bio</Form.Label>

                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={bio}
                                      onChange={(e, editor) => {
                                        const data = editor.getData();
                                        setBio(data);
                                      }}
                                    />
                                  </Form.Group>

                                  {editCMember ? (
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
                        <Card.Header as='h3' className='text-center text-info'>
                          Committee Members
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
                                  {/* <th>ID</th> */}
                                  <th>Tenure</th>
                                  <th>Position</th>
                                  <th>Member Id</th>
                                  <th>Name</th>
                                  {/* <th>Bio</th> */}
                                  {/* <th>CHAPTER ADDRESS</th> */}
                                  {userInfo &&
                                    (userInfo.userRole === 'systemAdmin' ||
                                      userInfo.userRole === 'admin') && (
                                      <th>EDIT/DELETE</th>
                                    )}
                                </tr>
                              </thead>

                              <tbody>
                                {cMembers.map((cMember) => (
                                  <tr key={cMember.cId}>
                                    {/* // <td>{announcement.chapterId}</td> */}
                                    {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                                    <td>
                                      {' '}
                                      {new Date(
                                        cMember.tenure[0].value
                                      ).getFullYear()}{' '}
                                      -
                                      {new Date(
                                        cMember.tenure[1].value
                                      ).getFullYear()}
                                    </td>
                                    <td> {cMember.position}</td>
                                    <td> {cMember.memberId}</td>
                                    <td>
                                      {' '}
                                      {cMember.member.firstName}{' '}
                                      {cMember.member.lastName}
                                    </td>
                                    {/* <td> {cMember.bio}</td> */}

                                    {userInfo &&
                                      (userInfo.userRole === 'systemAdmin' ||
                                        userInfo.userRole === 'admin') && (
                                        <td>
                                          {/* <Button
                                            variant='light'
                                            className='btn-sm'
                                            onClick={() =>
                                              editCMemberHandler(cMember.cId)
                                            }
                                          >
                                            <i className='fas fa-edit'></i>
                                          </Button> */}

                                          <span
                                            onClick={() =>
                                              editCMemberHandler(cMember.cId)
                                            }
                                          >
                                            <i
                                              className='far fa-edit action'
                                              style={{ color: '#4285F4' }}
                                            ></i>
                                          </span>

                                          {/* <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() =>
                                              deleteCMemberHandler(cMember.cId)
                                            }
                                          >
                                            <i className='fas fa-trash'></i>
                                          </Button> */}

                                          <span
                                            onClick={() =>
                                              deleteCMemberHandler(cMember.cId)
                                            }
                                          >
                                            <i
                                              className='fas fa-trash action ml-2'
                                              style={{ color: 'red' }}
                                            ></i>
                                          </span>
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
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <ListGroup variant='flush'>
                          {cMembers.map((cMember) => (
                            <ListGroup.Item>
                              <Media key={cMember.cId}>
                                <img
                                  width={164}
                                  height={164}
                                  className='mr-3'
                                  src={cMember.member.profilePicture}
                                  alt={cMember.member.firstName}
                                />
                                <Media.Body>
                                  <h5>{cMember.position.toUpperCase()}</h5>
                                  <p className='text-justify'>
                                    {parse(cMember.bio.substring(0, 100))}...
                                    <Link to={`/committee/${cMember.cId}`}>
                                      Read more
                                    </Link>
                                  </p>
                                </Media.Body>
                              </Media>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </>
                    )}
                  </>
                )}
              </Row>
            </>
          </Col>
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Container>
              <ListGroup variant='flush'>
                {cMembers.map((cMember) => (
                  <ListGroup.Item>
                    <Media key={cMember.cId}>
                      <img
                        width={164}
                        height={164}
                        className='mr-3'
                        src={cMember.member.profilePicture}
                        alt={cMember.member.firstName}
                      />
                      <Media.Body>
                        <h5>{cMember.position.toUpperCase()}</h5>
                        <p className='text-justify'>
                          {parse(cMember.bio.substring(0, 100))}...
                          <Link to={`/committee/${cMember.cId}`}>
                            Read more
                          </Link>
                        </p>
                      </Media.Body>
                    </Media>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          )}
        </>
      )}
    </Row>
  );
};

export default CommitteeScreen;
