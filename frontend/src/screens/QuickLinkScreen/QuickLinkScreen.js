import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ColumnFilter from '../../components/Table/ColumnFilter';
import RTable from '../../components/Table/RTable';
import {
  newLink,
  deleteLink,
  getLinkById,
  updateLinkById,
  allLinks,
} from '../../actions/linkActions';
import {
  QUICK_LINK_BY_ID_RESET,
  QUICK_LINK_NEW_RESET,
  QUICK_LINK_UPDATE_BY_ID_RESET,
} from '../../constants/quickLinkConstants';

const QuickLinkScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addLink, setAddLink] = useState(false);
  const [editLink, setEditLink] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkAddress, setLinkAddress] = useState('');
  const [id, setId] = useState('');

  const linksRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const linkAll = useSelector((state) => state.linkAll);
  const { loading, error, links } = linkAll;

  linksRef.current = links;

  const linkNew = useSelector((state) => state.linkNew);
  const { loading: linkNewLoading, error: linkNewError, success } = linkNew;

  const linkById = useSelector((state) => state.linkById);
  const { success: linkByIdSuccess, link } = linkById;

  const linkUpdate = useSelector((state) => state.linkUpdate);
  const { success: linkUpdateSuccess } = linkUpdate;

  const linkDelete = useSelector((state) => state.linkDelete);
  const { success: successDelete } = linkDelete;

  const checkChapter = window.location.host;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      // setId(userInfo.memberId);
      dispatch(allLinks(checkChapter));
      dispatch({ type: QUICK_LINK_NEW_RESET });
    } else {
      history.push('/login');
    }
    if (success || linkUpdateSuccess) {
      setAddLink(false);
      setEditLink(false);

      setLinkTitle('');
      setLinkAddress('');
      dispatch({ type: QUICK_LINK_BY_ID_RESET });
    }
    if (linkByIdSuccess) {
      setAddLink(true);
      setEditLink(true);
      setLinkTitle(link.title);
      setLinkAddress(link.link);
      setId(link.linkId);

      // setId(announcement.announcementId);
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    linkByIdSuccess,
    link,
    linkUpdateSuccess,
    successDelete,
  ]);

  const editLinkHandler = (rowIndex) => {
    const id = linksRef.current[rowIndex].linkId;
    dispatch({ type: QUICK_LINK_UPDATE_BY_ID_RESET });
    // console.log(rowIndex);
    // console.log(id);
    dispatch(getLinkById(id));
  };

  const deleteLinkHandler = (rowIndex) => {
    const id = linksRef.current[rowIndex].linkId;

    if (window.confirm('Are You Sure?')) {
      dispatch(deleteLink(id));
    }
  };

  const addNewLink = (e) => {
    e.preventDefault();

    setAddLink(!addLink);
    setLinkTitle('');
    setLinkAddress('');
    setEditLink(false);
    dispatch({ type: QUICK_LINK_BY_ID_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editLink) {
      dispatch(updateLinkById(id, linkTitle, linkAddress));
    } else {
      setId(userInfo.memberId);
      // console.log(id);
      dispatch(newLink(linkTitle, linkAddress));
    }
  };

  const columnsAdmin = [
    {
      Header: 'Title',
      accessor: 'linkTitle',
      Filter: ColumnFilter,
    },
    // {
    //   Header: 'Name',
    //   accessor: 'userName',
    // },
    {
      Header: 'Link Address',
      accessor: 'link',
      Filter: ColumnFilter,
    },
    {
      Header: 'Created At',
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
          <div>
            <span onClick={() => editLinkHandler(rowIdx)}>
              <i className='far fa-edit action mr-2'></i>
            </span>

            <span onClick={() => deleteLinkHandler(rowIdx)}>
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
                      // onClick={() => setAddAnnouncement(!addAnnouncement)}
                      onClick={addNewLink}
                    >
                      New Link
                    </Link>
                  </Card.Header>

                  <Card.Body>
                    {addLink
                      ? (linkNewError && (
                          <Message variant='danger'>{linkNewError}</Message>
                        )) ||
                        (linkNewLoading && <Loader />) ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='linkTitle'>
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter A Title..'
                                value={linkTitle}
                                onChange={(e) => setLinkTitle(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='linkAddress'>
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please enter an address..'
                                value={linkAddress}
                                onChange={(e) => setLinkAddress(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            {editLink ? (
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
                    Links
                  </Card.Header>

                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <RTable users={links} COLUMNS={columnsAdmin} />
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

export default QuickLinkScreen;
