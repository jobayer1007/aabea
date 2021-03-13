import React from 'react';
// import * as S from './Header/Header.Styles';

import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Carousel,
  Container,
  Row,
  Col,
  Image,
  NavDropdown,
} from 'react-bootstrap';
import { logout } from '../../actions/userActions';

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
        <Row>
          <Col xs={2} href='/' className='text-center'>
            <h1>Logo</h1>
          </Col>
          <Col>
            <Carousel controls={false} indicators={false}>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='https://source.unsplash.com/random/800x50'
                  alt='First slide'
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='https://source.unsplash.com/random/800x50'
                  alt='Third slide'
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='https://source.unsplash.com/random/800x50'
                  alt='Third slide'
                />
              </Carousel.Item>
            </Carousel>
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
        // sticky='top'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AABEA</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/systemAdmin'>
                <Nav.Link>System Admin</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <LinkContainer to='/dashboard'>
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to='/about'>
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav className='ml-auto'>
              {userInfo && (
                <>
                  <LinkContainer to='/committiees'>
                    <Nav.Link>Committiees</Nav.Link>
                  </LinkContainer>
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
                  <NavDropdown
                    title={userInfo.userName.toUpperCase()}
                    id='userName'
                  >
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
