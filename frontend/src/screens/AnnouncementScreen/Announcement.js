import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAnnouncementById } from '../../actions/announcementAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';

const Announcement = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const announcementById = useSelector((state) => state.announcementById);
  const { loading, error, announcement } = announcementById;

  useEffect(() => {
    dispatch(getAnnouncementById(id));
  }, [dispatch, history, id]);

  return (
    <Container>
      <Link className='btn btn-light my-3 btn-sm btn-outline-info' to='/'>
        Go Back
      </Link>

      <Card>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          announcement && (
            <>
              <Card.Header className='text-info' as='h2'>
                {announcement.title}
                <Card.Title className='text-muted'>
                  {' '}
                  Published Date: {'  '}
                  {`${announcement.createdAt}`.substring(0, 10)}
                </Card.Title>
              </Card.Header>
              <Card.Body>{parse(`<div>${announcement.body}</div>`)}</Card.Body>
            </>
          )
        )}
      </Card>
    </Container>
  );
};

export default Announcement;
