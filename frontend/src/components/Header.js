import React from 'react';
import aabealogoSmall from '../aabealogoSmall.jpg';
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
          <Navbar.Brand href='/'>AABEA</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/home'>Home</Nav.Link>
              <Nav.Link href='/about'>About</Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              <Nav.Link href='/donate'>Donate</Nav.Link>
              <Nav.Link href='/registration'>Registration</Nav.Link>
              <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
