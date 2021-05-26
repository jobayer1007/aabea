import React, { useEffect } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from '../../actions/blogAction';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const BlogScreenById = ({ match, history }) => {
  const id = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogById = useSelector((state) => state.blogById);
  const { loading, error, blog } = blogById;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getBlogById(id));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Row className='content'>
        <Col md={{ span: 8, order: 1 }} className='m-0 p-1'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            blog && (
              <>
                {/* Title */}
                <h1>{blog.title}</h1>

                {/* Author */}
                <p class='lead'>
                  by <a href='#'>{blog.userId}</a>
                </p>

                <hr />

                {/* Date/Time */}
                <p>
                  <span class='glyphicon glyphicon-time'></span> Posted on{' '}
                  {blog.createdAt.substring(0, 10)}
                </p>

                <hr />

                {/* Preview Image */}
                <Card.Img src={blog.photoId} alt='' />

                <hr />

                {/* Post Content */}
                <p class='lead'>{blog.body}</p>
                <hr />
              </>
            )
          )}
        </Col>

        <Col md={{ span: 4, order: 12 }} className='m-0 p-1'>
          Search area
        </Col>
      </Row>
    </>
  );
};

export default BlogScreenById;
