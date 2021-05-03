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
            {/* <Button variant='outline-info' block> */}
            <LinkContainer to='/chapter'>
              {/* <Nav.Link>Chapter</Nav.Link> */}
              <Link
                className='btn btn-outline-info btn-sm btn-block rounded'
                // onClick={() => setAddChapter(!addChapter)}
              >
                Chapter
                {/* <Button>Chapter</Button> */}
              </Link>
            </LinkContainer>
            {/* </Button> */}
          </Card.Title>
        )}

        {userInfo &&
          (userInfo.userRole === 'systemAdmin' ||
            userInfo.userRole === 'admin') && (
            <>
              <Card.Title>
                <LinkContainer to='/events'>
                  <Link className='btn btn-outline-info btn-sm btn-block rounded'>
                    Events
                  </Link>
                </LinkContainer>
              </Card.Title>
              {/* Announcement */}
              <Card.Title>
                {/* <Button variant='outline-info' block> */}
                <LinkContainer to='/announcement'>
                  {/* <Nav.Link>Announcement</Nav.Link> */}
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    // onClick={() => setAddChapter(!addChapter)}
                  >
                    Announcement
                  </Link>
                </LinkContainer>
                {/* </Button> */}
              </Card.Title>

              {/* Mission */}
              <Card.Title>
                {/* <Button variant='outline-info' block> */}
                <LinkContainer to='/mission'>
                  {/* <Nav.Link>Mission</Nav.Link> */}
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    // onClick={() => setAddChapter(!addChapter)}
                  >
                    Mission
                  </Link>
                </LinkContainer>
                {/* </Button> */}
              </Card.Title>

              {/* Vission */}
              <Card.Title>
                {/* <Button variant='outline-info' block> */}
                <LinkContainer to='/vission'>
                  {/* <Nav.Link>Vission</Nav.Link> */}
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    // onClick={() => setAddChapter(!addChapter)}
                  >
                    Vision
                  </Link>
                </LinkContainer>
                {/* </Button> */}
              </Card.Title>

              {/* History */}
              <Card.Title>
                {/* <Button variant='outline-info' block> */}
                <LinkContainer to='/history'>
                  {/* <Nav.Link>History</Nav.Link> */}
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    // onClick={() => setAddChapter(!addChapter)}
                  >
                    History
                  </Link>
                </LinkContainer>
                {/* </Button> */}
              </Card.Title>

              {/* Payment types */}
              <Card.Title>
                {/* <Button variant='outline-info' block> */}
                <LinkContainer to='/paymentType'>
                  {/* <Nav.Link>Payment Types</Nav.Link> */}
                  <Link
                    className='btn btn-outline-info btn-sm btn-block rounded'
                    // onClick={() => setAddChapter(!addChapter)}
                  >
                    Payment Type
                  </Link>
                </LinkContainer>
                {/* </Button> */}
              </Card.Title>

              {/* Images */}
              <Card.Title>
                <LinkContainer to='/images'>
                  <Link className='btn btn-outline-info btn-sm btn-block rounded'>
                    Images
                  </Link>
                </LinkContainer>
              </Card.Title>
            </>
          )}

        <Card.Title>
          {/* <Button variant='outline-info' block> */}
          <LinkContainer to='/members'>
            {/* <Nav.Link>Members</Nav.Link> */}
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              // onClick={() => setAddChapter(!addChapter)}
            >
              Members
            </Link>
          </LinkContainer>
          {/* </Button> */}
        </Card.Title>
        <Card.Title>
          {/* <Button variant='outline-info' block> */}
          <LinkContainer to='/training'>
            {/* <Nav.Link>Training</Nav.Link> */}
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              // onClick={() => setAddChapter(!addChapter)}
            >
              Training
            </Link>
          </LinkContainer>
          {/* </Button> */}
        </Card.Title>
        <Card.Title>
          {/* <Button variant='outline-info' block> */}
          <LinkContainer to='/committiees'>
            {/* <Nav.Link>Committiees</Nav.Link> */}
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              // onClick={() => setAddChapter(!addChapter)}
            >
              Committiee
            </Link>
          </LinkContainer>
          {/* </Button> */}
        </Card.Title>
        <Card.Title>
          {/* <Button variant='outline-info' block> */}
          <LinkContainer to='/payment'>
            {/* <Nav.Link>Payment</Nav.Link> */}
            <Link
              className='btn btn-outline-info btn-sm btn-block rounded'
              // onClick={() => setAddChapter(!addChapter)}
            >
              Payment
            </Link>
          </LinkContainer>
          {/* </Button> */}
        </Card.Title>

        <Card.Title>
          <LinkContainer to='/donate'>
            <Link className='btn btn-outline-info btn-sm btn-block rounded'>
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
