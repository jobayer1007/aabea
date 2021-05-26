import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { newBlog } from '../../actions/blogAction';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { BLOG_NEW_RESET } from '../../constants/blogConstants';

const CreateBlogScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [photoId, setPhotoId] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogNew = useSelector((state) => state.blogNew);
  const { loading, error, success } = blogNew;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (success) {
      swal('Success!', success, 'success').then((value) => {
        dispatch({ type: BLOG_NEW_RESET });
        history.push('/blog');
      });
    }
  }, [dispatch, history, userInfo, success]);

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
      setPhotoId(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      dispatch(newBlog(title, body, category, photoId));
    }

    setValidated(true);
  };

  return (
    <Container>
      {/* Card Start */}
      <Card border='info'>
        <Card.Header className='text-center text-info' as='h2'>
          New Blog
        </Card.Header>
        <Card.Body>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success ? (
            <Message variant='success'>{success}</Message>
          ) : (
            <>
              <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Row>
                  {/* <Row> */}
                  <Form.Group as={Col} md='2'>
                    <Form.Label>Title</Form.Label>
                  </Form.Group>

                  <Form.Group as={Col} md='10' controlId='title'>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Blog title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Category</Form.Label>
                  </Form.Group>

                  <Form.Group as={Col} md='10' controlId='category'>
                    <Form.Control
                      required
                      type='text'
                      placeholder='type'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Picture</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md='10' controlId='photo'>
                    <Form.Control
                      required
                      type='text'
                      // placeholder='Enter your last certificate url..'
                      value={photoId}
                      onChange={(e) => setPhotoId(e.target.value)}
                    ></Form.Control>
                    <Form.File
                      id='image-file'
                      label='Choose File'
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group as={Col} md='2'>
                    <Form.Label>Body</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md='10' controlId='body'>
                    <Form.Control
                      as='textarea'
                      required
                      type='text'
                      placeholder='Add your text here..'
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Group as={Row}>
                  <Col md={{ span: 10, offset: 2 }}>
                    <Button type='submit' variant='info' block>
                      Post Blog
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
      {/* Card End */}
    </Container>
  );
};

export default CreateBlogScreen;
