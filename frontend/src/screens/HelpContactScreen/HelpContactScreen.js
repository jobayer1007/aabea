import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ColumnFilter from '../../components/Table/ColumnFilter';
import RTable from '../../components/Table/RTable';
import {
  allHelps,
  newHelp,
  getHelpById,
  updateHelpById,
  deleteHelp,
} from '../../actions/helpActions';
import {
  HELP_CONTACT_BY_ID_RESET,
  HELP_CONTACT_NEW_RESET,
  HELP_CONTACT_UPDATE_BY_ID_RESET,
} from '../../constants/helpContactConstants';

const HelpContactScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addHelp, setAddHelp] = useState(false);
  const [editHelp, setEditHelp] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [helpFor, setHelpFor] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isTrue, setIsTrue] = useState(true);
  const [id, setId] = useState('');

  const helpContactsRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const helpAll = useSelector((state) => state.helpAll);
  const { loading, error, helpContacts } = helpAll;

  helpContactsRef.current = helpContacts;

  const helpNew = useSelector((state) => state.helpNew);
  const { loading: helpNewLoading, error: helpNewError, success } = helpNew;

  const helpById = useSelector((state) => state.helpById);
  const { success: helpByIdSuccess, help } = helpById;

  const helpUpdate = useSelector((state) => state.helpUpdate);
  const { success: helpUpdateSuccess } = helpUpdate;

  const helpDelete = useSelector((state) => state.helpDelete);
  const { success: successDelete } = helpDelete;

  const checkChapter = window.location.host.split('.')[0];

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      // setId(userInfo.memberId);
      dispatch(allHelps(checkChapter));
      dispatch({ type: HELP_CONTACT_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || helpUpdateSuccess) {
      setAddHelp(false);
      setEditHelp(false);

      setMemberId('');
      setHelpFor('');
      setContactEmail('');
      setContactPhone('');
      setIsTrue(false);
      setId('');
      dispatch({ type: HELP_CONTACT_BY_ID_RESET });
    }
    if (helpByIdSuccess) {
      setAddHelp(true);
      setEditHelp(true);

      setMemberId(help.memberId);
      setHelpFor(help.helpFor);
      setContactEmail(help.contactEmail);
      setContactPhone(help.contactPhone);
      setIsTrue(help.isTrue);
      setId(help.helpConatctId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    helpByIdSuccess,
    help,
    helpUpdateSuccess,
    successDelete,
  ]);

  const editHelpHandler = (rowIndex) => {
    const id = helpContactsRef.current[rowIndex].helpContactId;
    dispatch({ type: HELP_CONTACT_UPDATE_BY_ID_RESET });
    // console.log(rowIndex);
    // console.log(id);
    dispatch(getHelpById(id));
  };

  const deleteHelpHandler = (rowIndex) => {
    const id = helpContactsRef.current[rowIndex].helpContactId;

    if (window.confirm('Are You Sure?')) {
      dispatch(deleteHelp(id));
    }
  };

  const addNewHelp = (e) => {
    e.preventDefault();

    setAddHelp(!addHelp);
    setMemberId('');
    setHelpFor('');
    setContactEmail('');
    setContactPhone('');
    setIsTrue(false);
    setEditHelp(false);
    dispatch({ type: HELP_CONTACT_BY_ID_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editHelp) {
      dispatch(
        updateHelpById(
          memberId,
          helpFor,
          contactEmail,
          contactPhone,
          profilePicture,
          isTrue,
          id
        )
      );
    } else {
      // setId(userInfo.memberId);
      // console.log(id);
      dispatch(newHelp(memberId, helpFor, contactEmail, contactPhone, isTrue));
    }
  };

  const columnsAdmin = [
    {
      Header: 'Member Id',
      accessor: 'memberId',
      Filter: ColumnFilter,
    },
    // {
    //   Header: 'Name',
    //   accessor: 'userName',
    // },
    {
      Header: 'For',
      accessor: 'helpFor',
      Filter: ColumnFilter,
      Cell: ({ value }) => {
        return parse(value);
      },
    },
    {
      Header: 'Email',
      accessor: 'contactEmail',
      Filter: ColumnFilter,
    },
    {
      Header: 'Phone',
      accessor: 'contactPhone',
      Filter: ColumnFilter,
    },
    {
      Header: 'Available',
      accessor: 'isTrue',
      Filter: ColumnFilter,
    },

    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props) => {
        const rowIdx = props.row.id;
        return (
          <div>
            <span onClick={() => editHelpHandler(rowIdx)}>
              <i className='far fa-edit action mr-2'></i>
            </span>

            <span onClick={() => deleteHelpHandler(rowIdx)}>
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
                      onClick={addNewHelp}
                    >
                      New contact for help
                    </Link>
                  </Card.Header>

                  <Card.Body>
                    {addHelp
                      ? (helpNewError && (
                          <Message variant='danger'>{helpNewError}</Message>
                        )) ||
                        (helpNewLoading && <Loader />) ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='memberId'>
                              <Form.Label>Member Id</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please enter member id..'
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='helpFor'>
                              <Form.Label>For</Form.Label>
                              <Form.Control
                                type='text'
                                // placeholder='Pl'
                                value={helpFor}
                                onChange={(e) => setHelpFor(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='helpFor'>
                              <Form.Label>For</Form.Label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={helpFor}
                                onChange={(e, editor) => {
                                  const data = editor.getData();
                                  setHelpFor(data);
                                }}
                              />
                            </Form.Group> */}

                            <Form.Group controlId='contactEmail'>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type='email'
                                placeholder='Please enter email address..'
                                value={contactEmail}
                                onChange={(e) =>
                                  setContactEmail(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='contactPhone'>
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please enter phone number..'
                                value={contactPhone}
                                onChange={(e) =>
                                  setContactPhone(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='memberId'>
                              <Form.Label>Member Id</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please enter member id..'
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                              ></Form.Control>
                            </Form.Group> */}

                            {editHelp ? (
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
                    All contacts for help
                  </Card.Header>

                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <RTable users={helpContacts} COLUMNS={columnsAdmin} />
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

export default HelpContactScreen;
