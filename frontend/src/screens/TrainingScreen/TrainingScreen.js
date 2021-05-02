import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar/Sidebar';
// import { listUsers, deleteUser } from '../actions/userActions';

const TrainingScreen = () => {
  return (
    <>
      <Row className='content'>
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          // id='sidebar-wrapper'
          className='m-0 p-1'
        >
          <Sidebar />
        </Col>
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
          className='m-0 p-1'
        >
          <Card className='text-center' border='info'>
            <Card.Header as='h5' className='text-info'>
              Training Screen
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TrainingScreen;
