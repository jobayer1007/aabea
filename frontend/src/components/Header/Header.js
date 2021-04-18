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
import PauseOnHover from '../ImageCarousel/PauseOnHover';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Container fluid>
        <Row style={{ height: '30%' }}>
          <Col xs={3} className='text-center'>
            <Link to='/'>
              <Image
                src='/uploads/logoImage.png'
                alt='logo'
                style={{ height: '100px' }}
                fluid
              />
            </Link>
          </Col>
          <Col xs={6}>
            <PauseOnHover />
          </Col>
          <Col xs={3} className='text-center'>
            <h3>Washington D.C Chapter</h3>{' '}
          </Col>
        </Row>
      </Container>

      <Navbar
        bg='dark'
        variant='dark'
        expand='md'
        sticky='top'
        collapseOnSelect
      >
        <>
          <LinkContainer to='/'>
            <Navbar.Brand>AABEA</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {userInfo ? (
                userInfo.userRole === 'admin' ||
                userInfo.userRole === 'systemAdmin' ? (
                  <LinkContainer to='/dashboard'>
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
        </>
      </Navbar>
    </header>
  );
};

export default Header;
