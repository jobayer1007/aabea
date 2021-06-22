import React, { useEffect } from 'react';
import parse from 'html-react-parser';

import { Card, Col, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allblogs } from '../../actions/blogAction';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { BLOG_BY_ID_RESET } from '../../constants/blogConstants';
import SearchBox from '../../components/SearchBox/SearchBox';

const BlogScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogAll = useSelector((state) => state.blogAll);
  const { loading, error, blogs } = blogAll;

  const checkChapter = window.location.host.split('.')[0];

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(allblogs(checkChapter));
      dispatch({ type: BLOG_BY_ID_RESET });
    }
  }, [dispatch, history, userInfo, checkChapter]);

  const newBlogHandler = (e) => {
    e.preventDefault();

    // console.log('Edit clicked');
    history.push(`/blog/new`);

    // dispatch(approveUser(pendingId));
    // history.push('/systemAdmin');
  };

  return (
    <>
      <Row className='content'>
        <Col md={{ span: 8, order: 1 }} className='m-0 p-1'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : blogs && blogs.length !== 0 ? (
            <>
              {blogs.map((blog) => (
                <>
                  <Row key={blog.blogId}>
                    <Col md={6}>
                      {/* Preview Image */}
                      <Card.Img variant='top' src={blog.photoId} alt='pic' />
                    </Col>

                    <Col md={6}>
                      {/* Title */}
                      <h1>{blog.title}</h1>

                      {/* Author */}
                      <p class='lead'>
                        by <span>{blog.userName}</span>
                      </p>

                      <hr />

                      {/* Date/Time */}
                      <p>
                        <span class='glyphicon glyphicon-time'></span> Posted on{' '}
                        {blog.createdAt.substring(0, 10)}
                      </p>

                      <hr />

                      {/* Post Content */}
                      <p class='lead'>
                        {parse(blog.body.substring(0, 100))}...
                        <Link to={`/blogs/${blog.blogId}`}>read more</Link>
                      </p>
                    </Col>
                  </Row>
                  <hr />
                </>
              ))}
            </>
          ) : (
            <p>No Blog Available!</p>
          )}
        </Col>

        <Col md={{ span: 4, order: 12 }} className='m-0 p-1'>
          <Card className='mb-2'>
            <Card.Header className='text-center' as='h2'>
              <Link
                className='btn btn-outline-info btn-sm btn-block rounded'
                // onClick={() => setAddAnnouncement(!addAnnouncement)}
                onClick={newBlogHandler}
              >
                Create new Blog
              </Link>
            </Card.Header>
          </Card>

          <>
            {/* <!-- Blog Search Well --> */}
            <SearchBox />
          </>
        </Col>
      </Row>
    </>
  );
};

export default BlogScreen;
