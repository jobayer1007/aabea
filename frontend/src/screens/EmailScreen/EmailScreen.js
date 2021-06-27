import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled';
import parse from 'html-react-parser';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ColumnFilter from '../../components/Table/ColumnFilter';
import RTable from '../../components/Table/RTable';
import { allEmails, getEmailById, newEmail } from '../../actions/emailActions';
import { EMAIL_NEW_RESET } from '../../constants/emailConstants';
import { listUsers } from '../../actions/userActions';
import { allCMembers } from '../../actions/committeeActions';
import swal from 'sweetalert';
import UploadFiles from '../../components/FileUpload/UploadFiles';

const EmailScreen = ({ history }) => {
  const dispatch = useDispatch();
  const checkChapter = window.location.host;

  const [addEmail, setAddEmail] = useState(false);
  const [emailReceipent, setEmailReceipent] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [id, setId] = useState('');
  const [selected, setSelected] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState([]);

  const emailsRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const emailAll = useSelector((state) => state.emailAll);
  const { loading, error, emails } = emailAll;

  emailsRef.current = emails;

  const emailNew = useSelector((state) => state.emailNew);
  const { loading: emailNewLoading, error: emailNewError, success } = emailNew;

  const userList = useSelector((state) => state.userList);
  const { loading: userListLoading, error: userListError, users } = userList;

  const cMemberAll = useSelector((state) => state.cMemberAll);
  const {
    loading: cMemberAllLoading,
    error: cMemberAllError,
    cMembers,
  } = cMemberAll;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      // setId(userInfo.memberId);
      dispatch(allEmails(checkChapter));
      dispatch(listUsers(checkChapter));
      dispatch(allCMembers(checkChapter));
      dispatch({ type: EMAIL_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      swal('Success!', success, 'success').then((value) => {
        setAddEmail(false);
        setTitle('');
        setBody('');
        setUploadedFiles([]);
        setMessage([]);
        setSelected('');
      });
    } else if (emailNewError) {
      swal('Error!', emailNewError, 'error');
    }

    if (selected === 'allMember') {
      if (users && users.length !== 0) {
        let addresses = [];
        users.forEach((user, index) => {
          addresses.push(user.member.primaryEmail);
        });
        setEmailReceipent(addresses);
      }
    } else if (selected === 'allCommitteeMember') {
      if (cMembers && cMembers.length !== 0) {
        let addresses = [];
        cMembers.forEach((cMember, index) => {
          addresses.push(cMember.member.primaryEmail);
        });
        setEmailReceipent(addresses);
      }
    }
  }, [
    dispatch,
    history,
    checkChapter,
    userInfo,
    success,
    emailNewError,

    selected,
  ]);

  const viewEmailHandler = (rowIndex) => {
    const id = emailsRef.current[rowIndex].emailId;

    history.push(`/email/${id}`, '_blank');
  };

  const addNewEmail = (e) => {
    // e.preventDefault();

    setAddEmail(!addEmail);
    setEmailReceipent([]);
    setTitle('');
    setBody('');
    setUploadedFiles([]);
    setMessage([]);
    setSelected('');
  };

  const handleSelect = (e) => {
    e.preventDefault();

    setSelected(e.target.value);
  };

  const customAddressHandler = (e) => {
    e.preventDefault();

    if (emailReceipent.length !== 0) {
      setEmailReceipent([emailReceipent + ',' + e.target.value]);
    } else {
      setEmailReceipent([e.target.value]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      newEmail({ emailReceipent, title, body, uploadedFiles, checkChapter })
    );
  };

  const SentEmails = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values.map((sentEmail, idx) => {
          return (
            <span key={idx} className='badge'>
              {sentEmail}
            </span>
          );
        })}
      </>
    );
  };

  const SentAttachments = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
      <>
        {values.map((SentAttachment, idx) => {
          return (
            // <span key={idx} className='badge'>
            //   {SentAttachment}
            // </span>
            <a href={SentAttachment} className='badge' target='_blank'>
              {SentAttachment.split('/image-')[1]}
            </a>
          );
        })}
      </>
    );
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
      accessor: 'sentTo',
      Filter: ColumnFilter,
      Cell: ({ cell: { value } }) => <SentEmails values={value} />,
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
      Header: 'Attachment/s',
      accessor: 'attachments',
      Filter: ColumnFilter,
      Cell: ({ cell: { value } }) => <SentAttachments values={value} />,
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

  const uploadFileHandler = async (e) => {
    const file = e.target.files;

    let uploads = [];
    for (let i = 0; i < file.length; i++) {
      const formData = new FormData();
      formData.append(`image`, file[i]);
      setUploading(true);

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axios.post('/api/upload', formData, config);
        console.log(data);
        uploadedFiles.push(data);
        setUploading(false);

        setMessage((prevMessage) => [
          ...prevMessage,
          'Uploaded the file successfully: ' + file[i].name,
        ]);
      } catch (error) {
        console.error(error);
        setUploading(false);
        setMessage((prevMessage) => [
          ...prevMessage,
          'Could not upload the file: ' + file[i].name,
        ]);
      }
    }
    // if (uploadedFiles.length !== 0) {
    //   setUploadedFiles([uploadedFiles + ',' + { uploads }]);
    //   // uploadedFiles.push(uploads);
    // } else {
    //   // uploadedFiles.push(uploads);
    //   setUploadedFiles(uploads);
    // }
  };
  console.log(uploadedFiles);

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
                                  <option value=''>Please Select</option>
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

                              {selected && selected === 'custom' ? (
                                <Form.Group controlId='custom'>
                                  <Form.Label>Receipent</Form.Label>
                                  <Form.Control
                                    as='select'
                                    onChange={customAddressHandler}
                                  >
                                    <option>Please select reciepent</option>
                                    {users &&
                                      users.length !== 0 &&
                                      users.map((user, index) => (
                                        <option key={index} value={user.email}>
                                          {user.userName}
                                        </option>
                                      ))}
                                  </Form.Control>
                                </Form.Group>
                              ) : null}

                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                required
                                type='text'
                                placeholder='Address'
                                value={emailReceipent}
                                onChange={(e) =>
                                  setEmailReceipent([e.target.value])
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='title'>
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                required
                                type='text'
                                placeholder='Please Enter A Title..'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='body'>
                              <Form.Label>Mail</Form.Label>
                              <CKEditor
                                required
                                editor={ClassicEditor}
                                data={body}
                                onChange={(e, editor) => {
                                  const data = editor.getData();
                                  setBody(data);
                                }}
                              />
                            </Form.Group>

                            <Form.Group controlId='attachments'>
                              <Form.Label>Attachment/s</Form.Label>
                              {/* <Form.Control
                                type='text'
                                placeholder='Enter image url..'
                                value={uploadedFiles}
                                onChange={(e) =>
                                  setUploadedFiles(e.target.value)
                                }
                              ></Form.Control> */}
                              <Form.File
                                custom
                                id='image-file'
                                label='Choose File'
                                multiple
                                onChange={uploadFileHandler}
                              ></Form.File>
                              {uploading && <Loader />}
                            </Form.Group>

                            {message.length > 0 && (
                              <div
                                className='alert alert-secondary'
                                role='alert'
                              >
                                <ul>
                                  {message.map((item, i) => {
                                    return <li key={i}>{item}</li>;
                                  })}
                                </ul>
                              </div>
                            )}

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
