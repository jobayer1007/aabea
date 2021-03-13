import React from 'react';
import { useSelector } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import { Button, Card, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card className='text-center' border='primary'>
      <Card.Body>
        {/* Chapter */}
        {userInfo && userInfo.userRole === 'systemAdmin' && (
          <Card.Title>
            <Button variant='outline-info' block>
              <LinkContainer to='/chapter'>
                <Nav.Link>Chapter</Nav.Link>
              </LinkContainer>
            </Button>
          </Card.Title>
        )}

        {userInfo &&
          (userInfo.userRole === 'systemAdmin' ||
            userInfo.userRole === 'admin') && (
            <>
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

              {/* Payment types */}
              <Card.Title>
                <Button variant='outline-info' block>
                  <LinkContainer to='/paymentType'>
                    <Nav.Link>Payment Types</Nav.Link>
                  </LinkContainer>
                </Button>
              </Card.Title>
            </>
          )}

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
            <LinkContainer to='/payment'>
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>

        <Card.Title>
          <Button variant='outline-info' block>
            <LinkContainer to='/donate'>
              <Nav.Link>Donation</Nav.Link>
            </LinkContainer>
          </Button>
        </Card.Title>
      </Card.Body>

      {/* <Card.Footer className='text-muted'>
        <Link
          className='btn btn-outline-warning btn-sm btn-block my-5 rounded'
          to=''
        >
          another button
        </Link>
      </Card.Footer> */}
    </Card>
  );
};

export default Sidebar;
