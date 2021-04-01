import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Image,
  NavDropdown,
} from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import HeaderCarousel from './HeaderCarousel';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      {/* First */}

      <Container fluid>
        <Row style={{ height: '100px' }}>
          <Col xs={2} className='text-center'>
            <Link to='/'>
              <Image
                src='/uploads/logoImage.png'
                alt='logo'
                style={{ height: '100px' }}
                fluid
              />
            </Link>
            {/* <h1>Logo</h1> */}
          </Col>
          <Col xs={6}>
            <HeaderCarousel />
          </Col>
          <Col xs={4} className='text-center'>
            <h3>Washington D.C Chapter</h3>{' '}
          </Col>
        </Row>
      </Container>

      {/* Second */}
      {/* NEW */}
      {/* OLD */}
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        sticky='top'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AABEA</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {userInfo ? (
                userInfo.userRole === 'admin' ||
                userInfo.userRole === 'systemAdmin' ? (
                  <LinkContainer to='/systemAdmin'>
                    <Nav.Link>Admin Dashboard</Nav.Link>
                  </LinkContainer>
                ) : userInfo.userRole === 'member' ? (
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                ) : null
              ) : (
                <LinkContainer to='/about'>
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav className='ml-auto'>
              <LinkContainer to='/committiees'>
                <Nav.Link>Committiees</Nav.Link>
              </LinkContainer>
              {userInfo && (
                <>
                  <LinkContainer to='/training'>
                    <Nav.Link>Training</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer to='/donate'>
                <Nav.Link>Donate</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  {' '}
                  <NavDropdown
                    title={userInfo.userName.toUpperCase()}
                    id='userName'
                  >
                    {' '}
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/register'>
                    <Nav.Link>Registration</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'> </i> Login
                    </Nav.Link>
                  </LinkContainer>{' '}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
