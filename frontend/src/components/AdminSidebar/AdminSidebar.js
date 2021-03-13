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
        {/* Chapter */}
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/chapter'>
              <Nav.Link>Chapter</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>

        {/* Announcement */}
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/announcement'>
              <Nav.Link>Announcement</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>

        {/* Mission */}
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/mission'>
              <Nav.Link>Mission</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>

        {/* Vission */}
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/vission'>
              <Nav.Link>Vission</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>

        {/* History */}
        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/history'>
              <Nav.Link>History</Nav.Link>
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
