import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
import {
  allEvents,
  deleteEvent,
  getEventById,
} from '../../actions/eventActions';
import {
  EVENT_NEW_RESET,
  EVENT_UPDATE_BY_ID_RESET,
} from '../../constants/eventConstants';

const EventScreen = ({ history }) => {
  const dispatch = useDispatch();

  // const [addAnnouncement, setAddAnnouncement] = useState(false);
  // const [editAnnouncement, setEditAnnouncement] = useState(false);
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  // const [id, setId] = useState('');

  const eventsRef = useRef();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const eventAll = useSelector((state) => state.eventAll);
  const { loading, error, events } = eventAll;

  eventsRef.current = events;

  const eventNew = useSelector((state) => state.eventNew);
  const { loading: eventNewLoading, error: eventNewError, success } = eventNew;

  const eventById = useSelector((state) => state.eventById);
  const { success: eventByIdSuccess, event } = eventById;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { success: eventUpdateSuccess } = eventUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const { success: successDelete } = eventDelete;

  useEffect(() => {
    // if (userInfo) {
    // setId(userInfo.memberId);
    dispatch(allEvents());
    // dispatch({ type: EVENT_NEW_RESET });
    // }
    // else {
    //   history.push('/login');
    // }
    // if (success || eventUpdateSuccess) {
    //   setAddEvent(false);
    //   setEditEvent(false);

    //   setTitle('');
    //   setBody('');
    //   dispatch({ type: ANNOUNCEMENT_BY_ID_RESET });
    // }
    // if (announcementByIdSuccess) {
    //   setAddAnnouncement(true);
    //   setEditAnnouncement(true);
    //   setTitle(announcement.title);
    //   setBody(announcement.body);
    //   setId(announcement.announcementId);

    //   // setId(announcement.announcementId);
    // }
  }, [
    dispatch,
    history,
    // userInfo,
    success,
    // announcementByIdSuccess,
    // announcement,
    // announcementUpdateSuccess,
    successDelete,
  ]);

  const editEventHandler = (rowIndex) => {
    const id = eventsRef.current[rowIndex].eventId;
    dispatch({ type: EVENT_UPDATE_BY_ID_RESET });
    console.log(rowIndex);
    console.log(id);
    history.push(`/event/${id}`);
    // dispatch(getEventById(id));
  };

  const deleteEventHandler = (rowIndex) => {
    const id = eventsRef.current[rowIndex].eventId;

    if (window.confirm('Are You Sure?')) {
      dispatch(deleteEvent(id));
    }
  };

  // const addNewEvent = (e) => {
  //   e.preventDefault();

  //   setAddAnnouncement(!addAnnouncement);
  //   setTitle('');
  //   setBody('');
  //   setEditAnnouncement(false);
  //   dispatch({ type: ANNOUNCEMENT_BY_ID_RESET });
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   if (editAnnouncement) {
  //     dispatch(updateAnnouncementById(id, title, body));
  //   } else {
  //     setId(userInfo.memberId);
  //     // console.log(id);
  //     dispatch(newAnnouncement(title, body, id));
  //   }
  // };

  const columnsAdmin = [
    {
      Header: 'Title',
      accessor: 'eventName',
      Filter: ColumnFilter,
    },
    // {
    //   Header: 'Name',
    //   accessor: 'userName',
    // },
    {
      Header: 'Event Description',
      accessor: 'eventDescription',
      Filter: ColumnFilter,
      Cell: ({ value }) => {
        return parse(value);
      },
    },
    {
      Header: 'Event Start Date',
      accessor: 'eventDate[0].value',
      Filter: ColumnFilter,
      // Cell: ({ value }) => {
      //   const startDate = new Date(value);
      //   return [startDate];
      // },
    },

    {
      Header: 'Event End Date',
      accessor: 'eventDate[1].value',
      Filter: ColumnFilter,
      // Cell: ({ value }) => {
      //   return format(new Date(value));
      // },
    },

    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props) => {
        const rowIdx = props.row.id;
        return (
          <div>
            <span onClick={() => editEventHandler(rowIdx)}>
              <i className='far fa-edit action mr-2'></i>
            </span>

            <span onClick={() => deleteEventHandler(rowIdx)}>
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
          <>
            {/* <CardColumns> */}

            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card border='info'>
                  <Card.Header className='text-center' as='h5'>
                    {/* <Link
                      className='btn btn-outline-info btn-sm btn-block rounded'
                      // onClick={() => setAddAnnouncement(!addAnnouncement)}
                      onClick={addNewEvent}
                    >
                      New Event
                    </Link> */}

                    <Link
                      className='btn btn-outline-info btn-sm btn-block  rounded'
                      to='/eventsnew'
                    >
                      Create New Event
                    </Link>
                  </Card.Header>
                </Card>
              </Col>

              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2'
                id='all-chapter'
              >
                <Card border='info'>
                  <Card.Header as='h5' className='text-center text-info'>
                    Events
                  </Card.Header>

                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <>
                        <RTable users={events} COLUMNS={columnsAdmin} />
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

export default EventScreen;
