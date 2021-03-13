import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  Image,
  Row,
  Col,
  Card,
  CardDeck,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Sidebar from '../../components/Sidebar/Sidebar';
// import { listUsers, deleteUser } from '../actions/userActions';

const TrainingScreen = ({ history }) => {
  return (
    <>
      <Row className='content'>
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          // id='sidebar-wrapper'
        >
          <Sidebar />
        </Col>
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <Card className='text-center' border='primary'>
            <Card.Header as='h2'>Training Screen</Card.Header>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TrainingScreen;
