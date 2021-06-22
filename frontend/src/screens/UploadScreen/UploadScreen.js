import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { Button, Row, Col, Card, Form } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  allDocuments,
  deleteDocument,
  newDocument,
} from '../../actions/documentAction';
import {
  DOCUMENT_BY_ID_RESET,
  DOCUMENT_NEW_RESET,
} from '../../constants/documentConstants';
import RTable from '../../components/Table/RTable';
import ColumnFilter from '../../components/Table/ColumnFilter';

const UploadScreen = ({ history }) => {
  const dispatch = useDispatch();
  const checkChapter = window.location.host;

  const [docColumns, setDocColumns] = useState([]);

  const documentsRef = useRef();

  const [addDocument, setAddDocument] = useState(false);
  const [documentType, setDocumentType] = useState('private');
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [document, setDocument] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const documentAll = useSelector((state) => state.documentAll);
  const { loading, error, documents } = documentAll;

  documentsRef.current = documents;

  const documentNew = useSelector((state) => state.documentNew);
  const {
    loading: documentNewLoading,
    error: documentNewError,
    success,
  } = documentNew;

  const documentDelete = useSelector((state) => state.documentDelete);
  const { success: successDelete } = documentDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    dispatch(allDocuments(checkChapter));
    if (success) {
      setAddDocument((addDocument) => !addDocument);
      setDocumentType('');
      setDocumentName('');
      setDocumentDescription('');
      setDocument('');
      dispatch({ type: DOCUMENT_BY_ID_RESET });
      dispatch({ type: DOCUMENT_NEW_RESET });
    }
    if (userInfo) {
      if (
        userInfo.userRole === 'admin' ||
        userInfo.userRole === 'systemAdmin'
      ) {
        setDocColumns([
          {
            Header: 'Document Name',
            // accessor: 'documentName',
            id: 'link',
            accessor: (d) => d.document,
            Cell: ({ row }) => (
              <a
                // onClick={() => openDocHandler(row.original.documentId)}
                href={`/doc/${row.original.documentId}`}
                name={row.original.document}
                target='_blank'
              >
                {row.original.documentName}
              </a>
            ),
            Filter: ColumnFilter,
          },
          {
            Header: 'Description',
            accessor: 'documentDescription',
            Filter: ColumnFilter,
          },
          {
            Header: 'Upload Date',
            accessor: 'createdAt',
            Filter: ColumnFilter,
            Cell: ({ value }) => {
              return format(new Date(value), 'dd/mm/yyyy');
            },
          },

          {
            Header: 'Actions',
            accessor: 'actions',
            Cell: (props) => {
              const rowIdx = props.row.id;
              return (
                <>
                  <span onClick={() => deleteDocHandler(rowIdx)}>
                    <i
                      className='fas fa-trash action ml-2'
                      style={{ color: 'red' }}
                    ></i>
                  </span>
                </>
              );
            },
          },
        ]);
      } else {
        setDocColumns([
          {
            Header: 'Document Name',
            accessor: 'documentName',
            Filter: ColumnFilter,
          },
          {
            Header: 'Description',
            accessor: 'documentDescription',
            Filter: ColumnFilter,
          },
          {
            Header: 'Upload Date',
            accessor: 'createdAt',
            Filter: ColumnFilter,
            Cell: ({ value }) => {
              return format(new Date(value), 'dd/mm/yyyy');
            },
          },
        ]);
      }
    } else {
      setDocColumns([
        {
          Header: 'Document Name',
          accessor: 'documentName',
          Filter: ColumnFilter,
        },
        {
          Header: 'Description',
          accessor: 'documentDescription',
          Filter: ColumnFilter,
        },
        {
          Header: 'Upload Date',
          accessor: 'createdAt',
          Filter: ColumnFilter,
          Cell: ({ value }) => {
            return format(new Date(value), 'dd/mm/yyyy');
          },
        },
      ]);
    }
  }, [dispatch, userInfo, checkChapter, success, successDelete]);

  const addNewDocument = (e) => {
    e.preventDefault();

    setAddDocument(!addDocument);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setDocument(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const deleteDocHandler = (rowIndex) => {
    const id = documentsRef.current[rowIndex].documentId;
    if (window.confirm('Are you sure about deleting this Document?')) {
      dispatch(deleteDocument(id));
    }
  };

  // const openDocHandler = (id) => {
  //   window.open(`/doc/${id}`, '_blank');
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      newDocument(
        documentType,
        documentName,
        documentDescription,
        document,
        checkChapter
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
          <>
            {/* <CardColumns> */}

            <Row>
              {userInfo &&
                (userInfo.userRole === 'admin' ||
                  userInfo.userRole === 'systemAdmin') && (
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
                          onClick={addNewDocument}
                          to=''
                        >
                          Add Document
                        </Link>
                      </Card.Header>
                      <Card.Body>
                        {addDocument
                          ? (documentNewError && (
                              <Message variant='danger'>
                                {documentNewError}
                              </Message>
                            )) ||
                            (documentNewLoading && <Loader />) ||
                            (success ? (
                              <Message variant='success'>{success}</Message>
                            ) : (
                              <Form onSubmit={submitHandler}>
                                {/* <Form.Group controlId='documentTypre'>
                                  <Form.Label>Document Type</Form.Label>
                                  <Form.Control
                                    required
                                    as='select'
                                    type='text'
                                    placeholder='Please Enter document type'
                                    value={documentType}
                                    onChange={(e) =>
                                      setDocumentType(e.target.value)
                                    }
                                  >
                                    <option>Please Select an image type</option>

                                    <option value='private'>Private</option>
                                    <option value='public'>Public</option>
                                  </Form.Control>
                                </Form.Group> */}

                                <Form.Group controlId='documentName'>
                                  <Form.Label>Document Name</Form.Label>
                                  <Form.Control
                                    required
                                    type='text'
                                    placeholder='Please Enter Document Name'
                                    value={documentName}
                                    onChange={(e) =>
                                      setDocumentName(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='documentDescription'>
                                  <Form.Label>Document Description</Form.Label>
                                  <Form.Control
                                    required
                                    type='text'
                                    placeholder='Please enter document description'
                                    value={documentDescription}
                                    onChange={(e) =>
                                      setDocumentDescription(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='document'>
                                  <Form.Label>Document</Form.Label>
                                  <Form.Control
                                    required
                                    type='text'
                                    placeholder='Enter document url..'
                                    value={document}
                                    onChange={(e) =>
                                      setDocument(e.target.value)
                                    }
                                  ></Form.Control>
                                  <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                  ></Form.File>
                                  {uploading && <Loader />}
                                </Form.Group>

                                <Button type='submit' variant='info' block>
                                  <i className='fas fa-plus' /> Load
                                </Button>
                              </Form>
                            ))
                          : null}
                      </Card.Body>
                    </Card>
                  </Col>
                )}

              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2 p-0'
                id='all-chapter'
              >
                {/* All Documents */}
                <Card className='text-center mb-2' border='info'>
                  <Card.Header as='h3' className='text-info'>
                    All Documents
                  </Card.Header>

                  <Card.Body>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        {documents && documents.length !== 0 && (
                          <>
                            <RTable users={documents} COLUMNS={docColumns} />
                          </>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    </>
  );
};

export default UploadScreen;
