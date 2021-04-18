import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';
import { getMissionById } from '../../actions/missionActions';

const Mission = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const missionById = useSelector((state) => state.missionById);
  const { loading, error, mission } = missionById;

  useEffect(() => {
    dispatch(getMissionById(id));
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
          mission && (
            <>
              <Card.Header className='text-info' as='h2'>
                {mission.title}
              </Card.Header>
              <Card.Body> {parse(`<div>${mission.body}</div>`)}</Card.Body>
            </>
          )
        )}
      </Card>
    </Container>
  );
};

export default Mission;
