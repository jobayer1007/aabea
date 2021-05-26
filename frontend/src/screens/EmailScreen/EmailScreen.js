import React, { useEffect, useState, useRef } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
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
import { allEmails, getEmailById } from '../../actions/emailActions';
import { EMAIL_NEW_RESET } from '../../constants/emailConstants';

const EmailScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addEmail, setAddEmail] = useState(false);
  // const [editAnnouncement, setEditAnnouncement] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [id, setId] = useState('');
  const [selected, setSelected] = useState('');

  const emailsRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const emailAll = useSelector((state) => state.emailAll);
  const { loading, error, emails } = emailAll;

  emailsRef.current = emails;

  const emailNew = useSelector((state) => state.emailNew);
  const { loading: emailNewLoading, error: emailNewError, success } = emailNew;

  const emailById = useSelector((state) => state.emailById);
  const { success: emailByIdSuccess, email } = emailById;

  // const announcementUpdate = useSelector((state) => state.announcementUpdate);
  // const { success: announcementUpdateSuccess } = announcementUpdate;

  // const announcementDelete = useSelector((state) => state.announcementDelete);
  // const { success: successDelete } = announcementDelete;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      // setId(userInfo.memberId);
      dispatch(allEmails());
      dispatch({ type: EMAIL_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      setAddEmail(false);

      setTitle('');
      setBody('');
      setSelected('');
    }
  }, [dispatch, history, userInfo, success, email]);

  const viewEmailHandler = (rowIndex) => {
    const id = emailsRef.current[rowIndex].emailId;
    console.log(rowIndex);
    console.log(id);
    dispatch(getEmailById(id));
  };

  const addNewEmail = (e) => {
    e.preventDefault();

    setAddEmail(!addEmail);
    setTitle('');
    setBody('');
    setSelected('');
  };

  const handleSelect = (e) => {
    // e.preventDefault();

    setSelected(e.target.value);
    console.log(selected);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('Sent clicked');
    console.log(selected);

    // if (editAnnouncement) {
    //   dispatch(updateAnnouncementById(id, title, body));
    // } else {
    //   setId(userInfo.memberId);
    //   // console.log(id);
    //   dispatch(newAnnouncement(title, body, id));
    // }
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
      Header: 'Body',
      accessor: 'body',
      Filter: ColumnFilter,
      Cell: ({ value }) => {
        return parse(value);
      },
    },
    {
      Header: 'To',
      accessor: 'to',
      Filter: ColumnFilter,
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
      Header: 'View Mail',
      accessor: 'actions',
      Cell: (props) => {
        const rowIdx = props.row.id;
        return (
          <Link
            className='btn btn-outline-info btn-sm ml-2 rounded'
            onClick={() => viewEmailHandler(rowIdx)}
          >
            View
          </Link>
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
                      onClick={addNewEmail}
                    >
                      New Email
                    </Link>
                  </Card.Header>

                  <Card.Body>
                    {addEmail
                      ? (emailNewError && (
                          <Message variant='danger'>{emailNewError}</Message>
                        )) ||
                        (emailNewLoading && <Loader />) ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='to'>
                              {/* <Form.Label>To : </Form.Label> */}

                              <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                  <InputGroup.Text>To :</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  as='select'
                                  type='text'
                                  required
                                  value={selected}
                                  onChange={handleSelect}
                                >
                                  <option value='allMember'>All Member</option>
                                  <option value='allCommitteeMember'>
                                    All Committee Member
                                  </option>
                                  <option value='custom'>Custom</option>
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>
                                  Please choose reciepent.
                                </Form.Control.Feedback>
                              </InputGroup>

                              {/* <ButtonGroup> */}
                              {/* <DropdownButton
                                as={ButtonGroup}
                                title='Please select'
                                id='bg-nested-dropdown'
                                variant='info'
                                className='btn btn-sm rounded'
                                onSelect={handleSelect}
                              >
                                <Dropdown.Item eventKey='allMember'>
                                  All Member
                                </Dropdown.Item>
                                <Dropdown.Item eventKey='allCommitteeMember'>
                                  All Committee Member
                                </Dropdown.Item>
                                <Dropdown.Item eventKey='custom'>
                                  Single/Few Member/s
                                </Dropdown.Item>
                              </DropdownButton> */}
                              {/* </ButtonGroup> */}

                              <Form.Control
                                type='text'
                                placeholder='Address'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

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
                              <Form.Label>Mail</Form.Label>
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

                            <Button type='submit' variant='info' block>
                              Send
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
                className='mb-2 p-0'
                id='all-email'
              >
                <Card border='info'>
                  <Card.Header as='h5' className='text-center text-info'>
                    Sent Box
                  </Card.Header>

                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <RTable users={emails} COLUMNS={columnsAdmin} />
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

export default EmailScreen;
