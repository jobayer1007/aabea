import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Card, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { allImage, deleteImage, newImage } from '../../actions/imageActions';
import * as S from './ImagesScreen.Styles';
import {
  IMAGE_BY_ID_RESET,
  IMAGE_NEW_RESET,
} from '../../constants/imageConstants';

const ImagesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [addImage, setAddImage] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const imageAll = useSelector((state) => state.imageAll);
  const { loading, error, images } = imageAll;

  const imageNew = useSelector((state) => state.imageNew);
  const { loading: imageNewLoading, error: imageNewError, success } = imageNew;

  // const imageById = useSelector((state) => state.imageById);
  // const {
  //   loading: imageByIdLoading,
  //   error: imageByIdError,
  //   success: imageByIdSuccess,
  //   image : imageById,
  // } = imageById;

  const imageDelete = useSelector((state) => state.imageDelete);
  const { success: successDelete } = imageDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(allImage());
      dispatch({ type: IMAGE_NEW_RESET });
      dispatch({ type: IMAGE_BY_ID_RESET });
    } else {
      history.push('/login');
    }
    if (success) {
      setAddImage(!addImage);
      setImageName('');
      setImageDescription('');
      setImageLink('');
      setImage('');
      dispatch({ type: IMAGE_BY_ID_RESET });
    }
    // if (imageByIdSuccess) {
    //   setAddHistory(true);
    //   setEditHistory(true);
    //   setTitle(historyId.title);
    //   setBody(historyId.body);
    //   setId(historyId.chapterId);
    // }
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

    dispatch(newImage(imageName, imageDescription, imageLink, image));
  };
  return (
    <>
      <Row className='content'>
        {/* Sidebar */}
        <Col
          md={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          id='sidebar-wrapper'
          className='mb-2'
        >
          <Sidebar />
        </Col>
        {/* Sidebar End */}
        <Col
          md={{ span: 9, order: 12 }}
          lg={{ span: 9, order: 12 }}
          id='page-content-wrapper'
        >
          <S.CardDeck>
            {/* <CardColumns> */}

            <Row>
              <Col
                md={{ span: 12, order: 1 }}
                lg={{ span: 12, order: 1 }}
                // style={{ padding: 0 }}
                className='mb-2'
              >
                <Card border='primary'>
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

                                <option value='logo'>Logo</option>
                                <option value='navbarImage'>
                                  Navbar Image
                                </option>
                                <option value='homeScreenImage'>
                                  Home Screen Image
                                </option>
                              </Form.Control>
                            </Form.Group>

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

                            <Form.Group controlId='imageLink'>
                              <Form.Label>Image Link</Form.Label>
                              <Form.Control
                                type='text'
                                placeholder='Please Enter image link(optional)'
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                              ></Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='2'>
                              <Form.Label>Image</Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} md='10' controlId='image'>
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
                              <i className='fas fa-plus' /> Add
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
                className='mb-2'
                id='all-chapter'
              >
                <Card className='text-center' border='primary'>
                  <Card.Header as='h5'>Images</Card.Header>

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
                              <td>
                                {' '}
                                <Image
                                  src={image.image}
                                  alt={image.image}
                                  thumbnail
                                />
                                {/* <Card.Img src={image.image} variant='top' /> */}
                              </td>
                              {userInfo &&
                                (userInfo.userRole === 'systemAdmin' ||
                                  userInfo.userRole === 'admin') && (
                                  <td>
                                    {/* <Button
                                      variant='light'
                                      className='btn-sm'
                                      onClick={() =>
                                        editHistoryHandler(image.imageId)
                                      }
                                    >
                                      <i className='fas fa-edit'></i>
                                    </Button> */}

                                    <Button
                                      variant='danger'
                                      className='btn-sm'
                                      onClick={() =>
                                        deleteImageHandler(image.imageId)
                                      }
                                    >
                                      <i className='fas fa-trash'></i>
                                    </Button>
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
