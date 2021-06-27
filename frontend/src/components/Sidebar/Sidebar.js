import React from 'react';
import { useSelector } from 'react-redux';

import { LinkContainer } from 'react-router-bootstrap';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Card className='text-center' border='info'>
      <Card.Body>
        {/* Chapter */}
        {userInfo && userInfo.userRole === 'systemAdmin' && (
          <Card.Title>
            <LinkContainer to='/chapter'>
              <Link
                className='btn btn-outline-info btn-sm btn-block rounded'
                to='/chapter'
              >
                Chapter
              </Link>
            </LinkContainer>
          </Card.Title>
        )}

        {userInfo &&
          (userInfo.userRole === 'systemAdmin' ||
            userInfo.userRole === 'admin') && (
            <>
              <Card.Title>
                <LinkContainer to='/events'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/events'
                  >
                    Events
                  </Link>
                </LinkContainer>
              </Card.Title>

              <Card.Title>
                <LinkContainer to='/emails'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/emails'
                  >
                    Email
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Announcement */}
              <Card.Title>
                <LinkContainer to='/announcement'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/announcement'
                  >
                    Announcement
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Mission */}
              <Card.Title>
                <LinkContainer to='/mission'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/mission'
                  >
                    Mission
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Vission */}
              <Card.Title>
                <LinkContainer to='/vission'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/vission'
                  >
                    Vision
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* History */}
              <Card.Title>
                <LinkContainer to='/history'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/history'
                  >
                    History
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Payment types */}
              <Card.Title>
                <LinkContainer to='/paymentType'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/paymentType'
                  >
                    Payment Type
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Donation types */}
              <Card.Title>
                <LinkContainer to='/donationType'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/donationType'
                  >
                    Donation Type
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Images */}
              <Card.Title>
                <LinkContainer to='/images'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/images'
                  >
                    Images
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Help Contact */}
              <Card.Title>
                <LinkContainer to='/help'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/help'
                  >
                    Help Contact
                  </Link>
                </LinkContainer>
              </Card.Title>

              {/* Quick Links */}
              <Card.Title>
                <LinkContainer to='/links'>
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    to='/links'
                  >
                    Quick Links
                  </Link>
                </LinkContainer>
              </Card.Title>
            </>
          )}

        <Card.Title>
          <LinkContainer to='/documents'>
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              to='/documents'
            >
              Uploads / Downloads
            </Link>
          </LinkContainer>
        </Card.Title>

        <Card.Title>
          <LinkContainer to='/members'>
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              to='/members'
            >
              Members
            </Link>
          </LinkContainer>
        </Card.Title>

        {/* <Card.Title>
          <LinkContainer to='/training'>
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              to='/training'
            >
              Training
            </Link>
          </LinkContainer>
        </Card.Title> */}

        <Card.Title>
          <LinkContainer to='/committiees'>
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              to='/committiees'
            >
              Committiee
            </Link>
          </LinkContainer>
        </Card.Title>

        <Card.Title>
          <LinkContainer to='/payment'>
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              to='/payment'
            >
              Payment
            </Link>
          </LinkContainer>
        </Card.Title>

        <Card.Title>
          <LinkContainer to='/donate'>
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              to='/donate'
            >
              Donation
            </Link>
          </LinkContainer>
        </Card.Title>
      </Card.Body>

      {userInfo &&
        (userInfo.userRole === 'systemAdmin' ||
          userInfo.userRole === 'admin') && (
          <Card.Footer className='text-muted'>
            <Link
              className='btn btn-outline-warning btn-sm btn-block  rounded'
              to='/settings'
            >
              Chapter Settings
            </Link>
          </Card.Footer>
        )}
    </Card>
  );
};

export default Sidebar;
