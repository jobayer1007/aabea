import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Button, 
  Card,
  Row,
  Col,
  Image,
  NavDropdown,
} from 'react-bootstrap';

import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Side = (props) => {
  return (
    <>
      <Nav className='flex-column'>
        <Nav.Item>
          <LinkContainer to='/dashboard'>
            <Nav.Link>
              {' '}
              <Button variant='outline-info' block>
                Payment
              </Button>
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to='/register'>
            <Nav.Link href='/register'>Register</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to='/dashboardScreen'>
            <Nav.Link>dashboardScreen</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Row className='sideBar'>
        <Col>
          <Card className='text-center' border='primary'>
            <Card.Body>
              <Card.Title>
                <Button variant='outline-info' block>
                  Payment
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  Donate
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  Training
                </Button>
              </Card.Title>
              <Card.Title>
                <Button variant='outline-info' block>
                  Committiees
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
        </Col>
      </Row>
    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar;
