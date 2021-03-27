import React from 'react';
import { Col, Row, Card, Carousel } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <Row>
        <Col md={{ span: 6, order: 1 }} lg={{ span: 3, order: 1 }}>
          <Card className='mb-2'>
            <Card.Header as='h4'>Announcements</Card.Header>
            <Card.Body>
              {/* <ListGroup>
              <ListGroup.Item>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                officiis facilis beatae consequatur reiciendis dicta quia
                voluptatem, ab, voluptatum eligendi ullam libero facere impedit
                molestiae repudiandae ipsa, necessitatibus numquam velit?
              </ListGroup.Item>
            </ListGroup> */}
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                officiis facilis beatae consequatur reiciendis dicta quia
                voluptatem, ab, voluptatum eligendi ullam libero facere impedit
                molestiae repudiandae ipsa, necessitatibus numquam velit?
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='mb-2'>
            {/* <Card.Title as='h4'>Events:</Card.Title> */}
            <Card.Header as='h4'>Events :</Card.Header>
            <Card.Body>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                officiis facilis beatae consequatur reiciendis dicta quia
                voluptatem, ab, voluptatum eligendi ullam libero facere impedit
                molestiae repudiandae ipsa, necessitatibus numquam velit?
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={{ order: 12 }} lg={{ span: 6, order: 2 }}>
          <Card className='text-center mb-2'>
            <Card.Header as='h2'>Mission</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ipsa amet, optio mollitia rem hic odit aliquam quaerat dolor
                minus molestias iusto sint, quia, quis laudantium ducimus animi
                possimus inventore!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='text-center mb-2'>
            <Card.Header as='h2'>Vission</Card.Header>
            <Card.Body>
              <Card.Title>Vission title </Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ipsa amet, optio mollitia rem hic odit aliquam quaerat dolor
                minus molestias iusto sint, quia, quis laudantium ducimus animi
                possimus inventore!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='text-center mb-2'>
            <Card.Header as='h2'>History</Card.Header>
            <Card.Body>
              <Card.Title>History Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ipsa amet, optio mollitia rem hic odit aliquam quaerat dolor
                minus molestias iusto sint, quia, quis laudantium ducimus animi
                possimus inventore!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='text-center mb-2'>
            <Card.Header as='h2'>Any other Main Topic</Card.Header>
            <Card.Body>
              <Card.Title>Topic Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ipsa amet, optio mollitia rem hic odit aliquam quaerat dolor
                minus molestias iusto sint, quia, quis laudantium ducimus animi
                possimus inventore!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={{ span: 6, order: 2 }} lg={{ span: 3, order: 12 }}>
          <Card>
            <Card.Body>
              <Card.Title>Quick Links</Card.Title>
              <Card.Link href='#'>Link 1</Card.Link>
              <Card.Link href='#'>Link 2</Card.Link>
              <Card.Link href='#'>Link 3</Card.Link>
              <Card.Link href='#'>Link 4</Card.Link>
            </Card.Body>
            <Card.Body>
              <Card.Title>Current Committee:</Card.Title>

              <Carousel controls={false} indicators={false}>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src='https://source.unsplash.com/random/?building'
                    alt='First slide'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src='https://source.unsplash.com/random/?nature'
                    alt='Third slide'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src='https://source.unsplash.com/random/?people'
                    alt='Third slide'
                  />
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
