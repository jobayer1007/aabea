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
// import { listUsers, deleteUser } from '../actions/userActions';

const DonateScreen = ({ history }) => {
  return (
    <>
      <Row className='content'>
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          // id='sidebar-wrapper'
        >
          <Card className='text-center' border='primary'>
            <Card.Body>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/donate'>
                    <Nav.Link>Donate</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/training'>
                    <Nav.Link>Training</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/committiees'>
                    <Nav.Link>Committiees</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
              <Card.Title>
                <Card.Title>
                  <LinkContainer to='/committiees'>
                    <Button variant='outline-info' block>
                      Committiees
                    </Button>
                  </LinkContainer>
                </Card.Title>
              </Card.Title>
            </Card.Body>
            <Card.Footer className='text-muted'>
              <Link
                className='btn btn-outline-warning btn-sm btn-block my-5 rounded'
                to=''
              >
                another button
              </Link>
            </Card.Footer>
          </Card>{' '}
        </Col>
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <Card className='text-center' border='primary'>
            <Card.Header as='h2'>Donate Screen</Card.Header>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DonateScreen;
