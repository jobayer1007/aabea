import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getImageByEvent, getImageById } from '../../actions/imageActions';

const ImageByIdScreen = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const imageById = useSelector((state) => state.imageById);
  const { loading, error, image } = imageById;

  const imageByEvent = useSelector((state) => state.imageByEvent);
  const {
    loading: imageByEventLoading,
    error: imageByEventError,
    images: imageByEventImages,
  } = imageByEvent;

  const checkChapter = window.location.host;

  useEffect(() => {
    dispatch(getImageById(id));
    dispatch(getImageByEvent(checkChapter));
  }, [dispatch, id, checkChapter]);

  return (
    <>
      <Card className='text-center mb-2' border='info'>
        <Card.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {image && (
                <>
                  <Card.Header as='h3' className='text-info'>
                    {image.imageDescription}
                  </Card.Header>
                  <Image
                    src={image.image} // api/uploads/pdf-file
                    alt={image.image}
                    fluid
                    rounded
                    style={{ height: '80vh', width: '80%' }}
                  />
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Event Images */}
      <Card className='text-center mb-2' border='info'>
        <Card.Header as='h3' className='text-info'>
          Event Images
        </Card.Header>

        <Card.Body>
          {imageByEventLoading ? (
            <Loader />
          ) : imageByEventError ? (
            <Message variant='danger'>{imageByEventError}</Message>
          ) : (
            imageByEventImages && (
              <ListGroup variant='flush'>
                {imageByEventImages.map((event, index) => (
                  <ListGroup.Item key={index} className='mb-2'>
                    <Card.Title className='text-info'>
                      {event.eventName}
                    </Card.Title>
                    <Row className='justify-content-center'>
                      {event.eventImageGalleries &&
                      event.eventImageGalleries.length !== 0 ? (
                        event.eventImageGalleries.map((evetImage, index) => (
                          <Col md={3} key={index} className='m-1 p-0'>
                            <Link to={`/image/${evetImage.imageId}`}>
                              <Image
                                src={evetImage.image}
                                alt={evetImage.imageName}
                                fluid
                                rounded
                                style={{
                                  height: '100%',
                                  width: '100%',
                                }}
                              />
                            </Link>{' '}
                          </Col>
                        ))
                      ) : (
                        <h5>No Image</h5>
                      )}
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ImageByIdScreen;
