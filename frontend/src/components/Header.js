import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Carousel,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';

const Header = () => {
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
      <Navbar
        bg='light'
        variant='light'
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
              <LinkContainer to='/home'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-auto'>
              <LinkContainer to='/donate'>
                <Nav.Link>Donate</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/registration'>
                <Nav.Link>Registration</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
