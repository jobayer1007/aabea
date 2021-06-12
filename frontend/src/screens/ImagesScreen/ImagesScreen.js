import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  Form,
  Image,
  ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  allImage,
  deleteImage,
  getHomeScreenImage,
  getImageByEvent,
  newImage,
} from '../../actions/imageActions';
import * as S from './ImagesScreen.Styles';
import {
  IMAGE_BY_ID_RESET,
  IMAGE_NEW_RESET,
} from '../../constants/imageConstants';
import { allEvents } from '../../actions/eventActions';

const ImagesScreen = ({ history }) => {
  const dispatch = useDispatch();
  const checkChapter = window.location.host;

  const [addImage, setAddImage] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [eventId, setEventId] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const imageHomeScreen = useSelector((state) => state.imageHomeScreen);
  const {
    loading: homeScreenImagesLoading,
    error: homeScreenImagesError,
    homeScreenImages,
  } = imageHomeScreen;

  const imageByEvent = useSelector((state) => state.imageByEvent);
  const {
    loading: imageByEventLoading,
    error: imageByEventError,
    images: imageByEventImages,
  } = imageByEvent;

  const imageAll = useSelector((state) => state.imageAll);
  const { loading, error, images } = imageAll;

  const imageNew = useSelector((state) => state.imageNew);
  const { loading: imageNewLoading, error: imageNewError, success } = imageNew;

  const imageDelete = useSelector((state) => state.imageDelete);
  const { success: successDelete } = imageDelete;

  const eventAll = useSelector((state) => state.eventAll);
  const { loading: eventAllLoading, error: eventAllError, events } = eventAll;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.userRole === 'systemAdmin' || userInfo.userRole === 'admin')
    ) {
      dispatch(allImage(checkChapter));
      dispatch(getHomeScreenImage(checkChapter));
      dispatch(getImageByEvent(checkChapter));
      dispatch(allEvents(checkChapter));
      dispatch({ type: IMAGE_NEW_RESET });
      dispatch({ type: IMAGE_BY_ID_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      setAddImage((addImage) => !addImage);
      setImageName('');
      setImageDescription('');
      setEventId('');
      setImage('');
      dispatch({ type: IMAGE_BY_ID_RESET });
    }
  }, [dispatch, history, userInfo, success, successDelete]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const deleteImageHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteImage(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      newImage(imageName, imageDescription, eventId, image, checkChapter)
    );
  };
  return (
    <>
      <Row className='content'>
        {/* Sidebar */}
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          id='sidebar-wrapper'
          className='m-0 p-1'
        >
          <Sidebar />
        </Col>
        {/* Sidebar End */}
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
          className='m-0 p-1'
        >
          <S.CardDeck>
            {/* <CardColumns> */}

            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2 p-0'
              >
                <Card border='info'>
                  <Card.Header className='text-center' as='h2'>
                    <Link
                      className='btn btn-outline-info btn-sm btn-block rounded'
                      onClick={() => setAddImage(!addImage)}
                    >
                      Add Image
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    {addImage
                      ? (imageNewError && (
                          <Message variant='danger'>{imageNewError}</Message>
                        )) ||
                        (imageNewLoading && <Loader />) ||
                        (success ? (
                          <Message variant='success'>{success}</Message>
                        ) : (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='imageName'>
                              <Form.Label>Image Type</Form.Label>
                              <Form.Control
                                as='select'
                                type='text'
                                placeholder='Please Enter A Title..'
                                value={imageName}
                                onChange={(e) => setImageName(e.target.value)}
                              >
                                <option>Please Select an image type</option>

                                {/* <option value='logo'>Logo</option> */}
                                <option value='navbarImage'>
                                  Events photo
                                </option>
                                <option value='homeScreenImage'>
                                  Chapter iconic image
                                </option>
                              </Form.Control>
                            </Form.Group>

                            {imageName && imageName === 'navbarImage' ? (
                              <Form.Group controlId='imageName'>
                                <Form.Label>Event</Form.Label>
                                <Form.Control
                                  as='select'
                                  onChange={(e) => setEventId(e.target.value)}
                                >
                                  <option>Select event</option>
                                  {events.map((event, index) => (
                                    <option key={index} value={event.eventId}>
                                      {event.eventName}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            ) : null}

                            <Form.Group controlId='imageDescription'>
                              <Form.Label>Image Description</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter image description'
                                value={imageDescription}
                                onChange={(e) =>
                                  setImageDescription(e.target.value)
                                }
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                              <Form.Label>Image</Form.Label>
                              <Form.Control
                                required
                                type='text'
                                placeholder='Enter image url..'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                              ></Form.Control>
                              <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                              ></Form.File>
                              {uploading && <Loader />}
                            </Form.Group>

                            <Button type='submit' variant='info' block>
                              <i className='fas fa-plus' /> Load
                            </Button>
                          </Form>
                        ))
                      : null}
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={{ span: 12, order: 12 }}
                lg={{ span: 12, order: 12 }}
                className='mb-2 p-0'
                id='all-chapter'
              >
                {/* Chapter Iconic Images */}
                <Card className='text-center mb-2' border='info'>
                  <Card.Header as='h3' className='text-info'>
                    Chapter Iconic Images
                  </Card.Header>

                  <Card.Body>
                    {homeScreenImagesLoading ? (
                      <Loader />
                    ) : homeScreenImagesError ? (
                      <Message variant='danger'>
                        {homeScreenImagesError}
                      </Message>
                    ) : (
                      homeScreenImages && (
                        <ListGroup variant='flush'>
                          <ListGroup.Item>
                            <Row className='justify-content-between'>
                              {homeScreenImages.map((image, index) => (
                                <Col md={2} key={index} className='m-1 p-0'>
                                  <Link to={`/image/${image.imageId}`}>
                                    <Image
                                      src={image.image}
                                      alt={image.imageName}
                                      fluid
                                      rounded
                                      style={{ height: '100%', width: '100%' }}
                                    />
                                  </Link>
                                </Col>
                              ))}
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      )
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
                                  event.eventImageGalleries.map(
                                    (evetImage, index) => (
                                      <Col
                                        md={3}
                                        key={index}
                                        className='m-1 p-0'
                                      >
                                        <Link
                                          to={`/image/${evetImage.imageId}`}
                                        >
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
                                    )
                                  )
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

                {/* All Images */}
                <Card className='text-center mb-2' border='info'>
                  <Card.Header as='h3' className='text-info'>
                    All Images
                  </Card.Header>

                  <Card.Body>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                      >
                        <thead>
                          <tr>
                            <th>Image Type</th>
                            <th>Description</th>
                            <th>Image</th>
                            {userInfo &&
                              (userInfo.userRole === 'systemAdmin' ||
                                userInfo.userRole === 'admin') && (
                                <th>DELETE</th>
                              )}
                          </tr>
                        </thead>

                        <tbody>
                          {images.map((image) => (
                            <tr key={image.imageId}>
                              {/* // <td>{announcement.chapterId}</td> */}
                              {/* <td>
                                {' '}
                                <Image src={user.image} thumbnail />
                              </td> */}
                              <td> {image.imageName}</td>
                              <td> {image.imageDescription}</td>
                              <td>
                                {' '}
                                <Image
                                  src={image.image}
                                  alt={image.image}
                                  fluid
                                  rounded
                                  style={{ height: '165px', width: '200px' }}
                                />
                                {/* <Card.Img src={image.image} variant='top' /> */}
                              </td>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    {/* <Button
                                      variant='danger'
                                      className='btn-sm'
                                      onClick={() =>
                                        deleteImageHandler(image.imageId)
                                      }
                                    >
                                      <i className='fas fa-trash'></i>
                                    </Button> */}

                                    <span
                                      onClick={() =>
                                        deleteImageHandler(image.imageId)
                                      }
                                    >
                                      <i
                                        className='fas fa-trash action ml-2'
                                        style={{ color: 'red' }}
                                      ></i>
                                    </span>
                                  </td>
                                )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </S.CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default ImagesScreen;
