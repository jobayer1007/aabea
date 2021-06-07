import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className=' bg-dark'>
      <Container>
        <Row>
          <Col className='text-center py-3 m-5 '>
            Copyright &copy; {new Date().getFullYear()} : AABEA. All Rights
            Reserved. Designed and powered by{' '}
            <a href='https://www.theteamj.com/'>TheTEAMJ</a> and{' '}
            <a href='https://www.goctq.com/'>GoCTQ</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
