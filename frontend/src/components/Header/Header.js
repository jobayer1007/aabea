import React, { useEffect } from 'react';

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
import { Link } from 'react-router-dom';
import PauseOnHover from '../ImageCarousel/PauseOnHover';
import Loader from '../Loader';
import Message from '../Message';
import { getChapterBySubDomain } from '../../actions/chapterActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterBySubDomain = useSelector((state) => state.chapterBySubDomain);
  const { loading, error, chapterByDomain } = chapterBySubDomain;

  const checkChapter = window.location.host.split('.')[0];

  useEffect(() => {
    dispatch(getChapterBySubDomain(checkChapter)); //done
  }, [dispatch, checkChapter]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Container>
        <Row className='align-items-center'>
          <Col xs={3} className='text-center'>
            <Link to='/'>
              <Image
                src='/uploads/logoImage.png'
                alt='logo'
                // style={{ height: '135px' }}
                fluid
                className='logo'
              />
            </Link>
          </Col>
          <Col xs={6}>
            <PauseOnHover />
          </Col>
          <Col xs={3} className='text-center'>
            <span className='nav-chapterName text-info'>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                chapterByDomain &&
                chapterByDomain.length !== 0 && (
                  <h2>{chapterByDomain.chapterName}</h2>
                )
              )}
            </span>
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
                  <>
                    <LinkContainer to='/dashboard'>
                      <Nav.Link>Admin Dashboard</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/blog'>
                      <Nav.Link>Blog</Nav.Link>
                    </LinkContainer>
                  </>
                ) : userInfo.userRole === 'member' ? (
                  <>
                    <LinkContainer to='/dashboard'>
                      <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/blog'>
                      <Nav.Link>Blog</Nav.Link>
                    </LinkContainer>
                  </>
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
                  {/* <LinkContainer to='/training'>
                    <Nav.Link>Training</Nav.Link>
                  </LinkContainer> */}
                  <LinkContainer to='/payment'>
                    <Nav.Link>Payment</Nav.Link>
                  </LinkContainer>
                </>
              )}

              <LinkContainer to='/donate'>
                <Nav.Link>Donation</Nav.Link>
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
