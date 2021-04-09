import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import * as S from './AnnouncementScreen.Styles';
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
import parse from 'html-react-parser';

const Announcement = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const announcementById = useSelector((state) => state.announcementById);
  const { loading, error, success, announcement } = announcementById;

  useEffect(() => {
    dispatch(getAnnouncementById(id));
  }, [dispatch, history, id]);

  return (
    <>
      <Link className='btn btn-light my-3 btn-sm btn-outline-success' to='/'>
        Go Back
      </Link>
      <Row className='content'>
        <Col id='page-content-wrapper'>
          <Card border='primary'>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              announcement && (
                <>
                  <Card.Header className='text-center' as='h2'>
                    {announcement.title}
                  </Card.Header>
                  <Card.Title className='text-center'>
                    {' '}
                    Published Date: {'  '}
                    {`${announcement.createdAt}`.substring(0, 10)}
                  </Card.Title>
                  <Card.Body>
                    {parse(`<div>${announcement.body}</div>`)}
                  </Card.Body>
                </>
              )
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Announcement;
