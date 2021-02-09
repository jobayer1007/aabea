import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 m-5 '>
            Copyright &copy; {new Date().getFullYear()} : AABEA. All Rights
            Reserved. Designed by Jobayer
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
