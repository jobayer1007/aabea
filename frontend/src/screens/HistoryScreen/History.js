import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';
import { getHistoryById } from '../../actions/historyActions';

const History = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const historyById = useSelector((state) => state.historyById);
  const { loading, error, historyId } = historyById;

  useEffect(() => {
    dispatch(getHistoryById(id));
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
          historyId && (
            <>
              <Card.Header className='text-info' as='h2'>
                {historyId.title}
              </Card.Header>

              <Card.Body>{parse(`<div>${historyId.body}</div>`)}</Card.Body>
            </>
          )
        )}
      </Card>
    </Container>
  );
};

export default History;
