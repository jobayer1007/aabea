import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  Image,
  Row,
  Col,
  Card,
  CardColumns,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const AdminSidebar = () => {
  return (
    <Card className='text-center' border='primary'>
      <Card.Body>
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/chapter'>
              <Nav.Link>Chapter</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/members'>
              <Nav.Link>Members</Nav.Link>
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
          <Button variant='outline-info' block>
            <LinkContainer to='/paymentType'>
              <Nav.Link>Payment Types</Nav.Link>
            </LinkContainer>
          </Button>
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
    </Card>
  );
};

export default AdminSidebar;
