import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';
import { getVissionById } from '../../actions/vissionActions';

const Vission = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const vissionById = useSelector((state) => state.vissionById);
  const { loading, error, vission } = vissionById;

  useEffect(() => {
    dispatch(getVissionById(id));
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
          vission && (
            <>
              <Card.Header className='text-info' as='h2'>
                {vission.title}
              </Card.Header>

              <Card.Body> {parse(`<div>${vission.body}</div>`)}</Card.Body>
            </>
          )
        )}
      </Card>
    </Container>
  );
};

export default Vission;
