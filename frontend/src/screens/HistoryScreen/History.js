import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
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
              historyId && (
                <>
                  <Card.Header className='text-center' as='h2'>
                    {historyId.title}
                  </Card.Header>
                  {/* <Card.Title className='text-center'>
                  {' '}
                  Published Date:
                  {format(new Date(announcement.createdAt), 'dd/mm/yyyy')}
                </Card.Title> */}
                  <Card.Body>
                    {' '}
                    {parse(`<div>${historyId.body}</div>`)}
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

export default History;
