import React, { useEffect, useState } from 'react';
import { Card, Col, Form, InputGroup, Media, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogById } from '../../actions/blogAction';
import {
  deleteComment,
  newComment,
  updateCommentById,
} from '../../actions/commentAction';
import {
  deleteReply,
  newReply,
  updateReplyById,
} from '../../actions/replyAction';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import SearchBox from '../../components/SearchBox/SearchBox';

const BlogScreenById = ({ match, history }) => {
  const id = match.params.id;

  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [commentToEdit, setCommentToEdit] = useState('');
  const [replyComment, setReplyComment] = useState(false);
  const [reply, setReply] = useState('');

  const [editReply, setEditReply] = useState(false);
  const [replyId, setReplyId] = useState('');
  const [replyToEdit, setReplyToEdit] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogById = useSelector((state) => state.blogById);
  const { loading, error, blog } = blogById;

  const commentNew = useSelector((state) => state.commentNew);
  const { success: commentNewSuccess } = commentNew;

  const commentUpdate = useSelector((state) => state.commentUpdate);
  const { success: commentUpdateSuccess } = commentUpdate;

  const commentDelete = useSelector((state) => state.commentDelete);
  const { success: commentDeleteSuccess } = commentDelete;

  const replyNew = useSelector((state) => state.replyNew);
  const { success: replyNewSuccess } = replyNew;

  const replyUpdate = useSelector((state) => state.replyUpdate);
  const { success: replyUpdateSuccess } = replyUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getBlogById(id));
    }
  }, [
    dispatch,
    history,
    id,
    userInfo,
    commentNewSuccess,
    commentDeleteSuccess,
    commentUpdateSuccess,
    replyNewSuccess,
    replyUpdateSuccess,
  ]);

  const addNewCommentHandler = (e) => {
    e.preventDefault();

    // console.log(id);
    // console.log(comment);
    dispatch(newComment(comment, id));
  };

  const editCommentHandler = (commentId, comment) => {
    // e.preventDefault();

    setEditComment(!editComment);
    setCommentId(commentId);
    setCommentToEdit(comment);
  };

  const updateCommentHandler = (e) => {
    e.preventDefault();

    setEditComment(!editComment);

    dispatch(updateCommentById(commentId, commentToEdit));
  };

  const cancelUpdateCommentHandler = (e) => {
    e.preventDefault();

    setEditComment(!editComment);

    setCommentId('');
    setCommentToEdit('');
  };

  const replyCommentHandler = (commentId) => {
    // e.preventDefault();

    setReplyComment(!replyComment);
    setCommentId(commentId);
    setReply('');
  };

  const addNewReplyHandler = (e) => {
    e.preventDefault();

    setReplyComment(!replyComment);
    console.log(reply);
    console.log(commentId);
    console.log(id);
    dispatch(newReply(reply, commentId, id));
  };

  const updateReplyHandler = (e) => {
    e.preventDefault();

    setEditReply(!editReply);

    dispatch(updateReplyById(replyId, replyToEdit));
  };

  const cancelUpdateReplyHandler = (e) => {
    e.preventDefault();

    setEditReply(!editReply);

    setReplyId('');
    setReplyToEdit('');
  };

  const replyReplyHandler = (commentId) => {
    // e.preventDefault();

    setReplyComment(!replyComment);
    setCommentId(commentId);
    setReply('');
    // setCommentToEdit(comment);
  };

  const cancelReplyHandler = (e) => {
    e.preventDefault();

    setReplyComment(!replyComment);

    setCommentId('');
  };

  const editReplyHandler = (replyId, reply) => {
    // e.preventDefault();

    setEditReply(!editReply);
    setReplyId(replyId);
    setReplyToEdit(reply);
  };

  const deleteCommentHandler = (commentId) => {
    if (
      window.confirm(
        'Are you sure about deleting this Comment? All the replies will be deleted along with this comment thread'
      )
    ) {
      dispatch(deleteComment(commentId));
      // console.log(`User deleted: with id: ${id}`);
    }
  };

  const deleteReplyHandler = (replyId) => {
    if (window.confirm('Are you sure about deleting this reply?')) {
      dispatch(deleteReply(replyId));
      // console.log(`User deleted: with id: ${id}`);
    }
  };

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
                <p className='lead'>
                  by <span>{blog.userName}</span>
                </p>

                <hr />

                {/* Date/Time */}
                <p>
                  <span className='glyphicon glyphicon-time'></span> Posted on{' '}
                  {blog.createdAt && blog.createdAt.substring(0, 10)}
                </p>

                <hr />

                {/* Preview Image */}
                <Card.Img src={blog.photoId} alt='' />

                <hr />

                {/* Post Content */}
                <p className='lead'>{blog.body}</p>
                <hr />
                <Form.Row>
                  {/* <Form.Group as={Col} md='2'>
                    <Form.Label>Comment :</Form.Label>
                  </Form.Group> */}
                  <Form.Group as={Col} controlId='comment'>
                    <InputGroup>
                      <Form.Control
                        as='textarea'
                        required
                        type='text'
                        placeholder='Add your Comment here..'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>

                      <InputGroup.Append>
                        <InputGroup.Text id='basic-addon2'>
                          <Link
                            className='btn btn-outline-info btn-sm btn-block  rounded'
                            onClick={addNewCommentHandler}
                          >
                            Add Comment
                          </Link>
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <hr />
                {/* Comments */}

                {blog.comments && blog.comments !== 0
                  ? blog.comments.map((comment) => (
                      <>
                        <Media key={comment.commentId}>
                          <img
                            width={64}
                            height={64}
                            className='mr-3'
                            src={comment.profilePicture}
                            alt='profilePicture'
                          />
                          <Media.Body>
                            <h5>{comment.userName}</h5>
                            {editComment && comment.commentId === commentId ? (
                              <Form.Row>
                                <Form.Group as={Col} controlId='comment'>
                                  <InputGroup>
                                    <Form.Control
                                      required
                                      type='text'
                                      placeholder='Comment'
                                      value={commentToEdit}
                                      onChange={(e) =>
                                        setCommentToEdit(e.target.value)
                                      }
                                    ></Form.Control>
                                    <InputGroup.Append>
                                      <InputGroup.Text id='basic-addon2'>
                                        <Link
                                          className='btn btn-outline-info btn-sm btn-block  rounded'
                                          onClick={updateCommentHandler}
                                        >
                                          Update Comment
                                        </Link>
                                      </InputGroup.Text>

                                      <InputGroup.Text id='basic-addon2'>
                                        <Link
                                          className='btn btn-outline-danger btn-sm btn-block  rounded'
                                          onClick={cancelUpdateCommentHandler}
                                        >
                                          Cancel
                                        </Link>
                                      </InputGroup.Text>
                                    </InputGroup.Append>
                                  </InputGroup>
                                </Form.Group>
                              </Form.Row>
                            ) : (
                              <>
                                <p>{comment.comment}</p>
                                <p>
                                  {/* edit Comment */}
                                  {comment.userId === userInfo.memberId ? (
                                    <span
                                      onClick={() =>
                                        editCommentHandler(
                                          comment.commentId,
                                          comment.comment
                                        )
                                      }
                                    >
                                      <i
                                        className='far fa-edit action ml-3'
                                        style={{ color: '#4285F4' }}
                                      ></i>
                                    </span>
                                  ) : null}

                                  <span
                                    onClick={() =>
                                      replyCommentHandler(comment.commentId)
                                    }
                                  >
                                    <i
                                      class='fa fa-reply ml-3'
                                      aria-hidden='true'
                                    ></i>
                                  </span>
                                  {/* Delete comment */}
                                  {comment.userId === userInfo.memberId ? (
                                    <span
                                      onClick={() =>
                                        deleteCommentHandler(comment.commentId)
                                      }
                                    >
                                      <i
                                        className='fas fa-trash action ml-3'
                                        style={{ color: 'red' }}
                                      ></i>
                                    </span>
                                  ) : null}
                                </p>
                              </>
                            )}

                            {comment.replies && comment.replies !== 0
                              ? comment.replies.map((reply) => (
                                  <Media key={reply.replyId}>
                                    <img
                                      width={64}
                                      height={64}
                                      className='mr-3'
                                      src={reply.profilePicture}
                                      alt='placeholder'
                                    />
                                    <Media.Body>
                                      <h5>{reply.userName}</h5>
                                      {editReply &&
                                      reply.replyId === replyId ? (
                                        <Form.Row>
                                          <Form.Group
                                            as={Col}
                                            controlId='reply'
                                          >
                                            <InputGroup>
                                              <Form.Control
                                                required
                                                type='text'
                                                placeholder='Reply'
                                                value={replyToEdit}
                                                onChange={(e) =>
                                                  setReplyToEdit(e.target.value)
                                                }
                                              ></Form.Control>
                                              <InputGroup.Append>
                                                <InputGroup.Text id='basic-addon2'>
                                                  <Link
                                                    className='btn btn-outline-info btn-sm btn-block  rounded'
                                                    onClick={updateReplyHandler}
                                                  >
                                                    Update Reply
                                                  </Link>
                                                </InputGroup.Text>

                                                <InputGroup.Text id='basic-addon2'>
                                                  <Link
                                                    className='btn btn-outline-danger btn-sm btn-block  rounded'
                                                    onClick={
                                                      cancelUpdateReplyHandler
                                                    }
                                                  >
                                                    Cancel
                                                  </Link>
                                                </InputGroup.Text>
                                              </InputGroup.Append>
                                            </InputGroup>
                                          </Form.Group>
                                        </Form.Row>
                                      ) : (
                                        <>
                                          <p>{reply.reply}</p>
                                          <p>
                                            {/* edit Reply */}
                                            {reply.userId ===
                                            userInfo.memberId ? (
                                              <span
                                                onClick={() =>
                                                  editReplyHandler(
                                                    reply.replyId,
                                                    reply.reply
                                                  )
                                                }
                                              >
                                                <i
                                                  className='far fa-edit action ml-3'
                                                  style={{ color: '#4285F4' }}
                                                ></i>
                                              </span>
                                            ) : null}

                                            <span
                                              onClick={() =>
                                                replyReplyHandler(
                                                  reply.commentId
                                                )
                                              }
                                            >
                                              <i
                                                class='fa fa-reply ml-3'
                                                aria-hidden='true'
                                              ></i>
                                            </span>
                                            {/* Delete comment */}
                                            {reply.userId ===
                                            userInfo.memberId ? (
                                              <span
                                                onClick={() =>
                                                  deleteReplyHandler(
                                                    reply.replyId
                                                  )
                                                }
                                              >
                                                <i
                                                  className='fas fa-trash action ml-3'
                                                  style={{ color: 'red' }}
                                                ></i>
                                              </span>
                                            ) : null}
                                          </p>
                                        </>
                                      )}
                                    </Media.Body>
                                  </Media>
                                ))
                              : null}
                            {replyComment && comment.commentId === commentId ? (
                              <Form.Row>
                                <Form.Group as={Col} controlId='reply'>
                                  <InputGroup>
                                    <Form.Control
                                      as='textarea'
                                      required
                                      type='text'
                                      placeholder='Add your Reply here..'
                                      value={reply}
                                      onChange={(e) => setReply(e.target.value)}
                                    ></Form.Control>

                                    <InputGroup.Append>
                                      <InputGroup.Text id='basic-addon2'>
                                        <Link
                                          className='btn btn-outline-info btn-sm btn-block  rounded'
                                          onClick={addNewReplyHandler}
                                        >
                                          Reply
                                        </Link>
                                      </InputGroup.Text>

                                      <InputGroup.Text id='basic-addon2'>
                                        <Link
                                          className='btn btn-outline-danger btn-sm btn-block  rounded'
                                          onClick={cancelReplyHandler}
                                        >
                                          Cancel
                                        </Link>
                                      </InputGroup.Text>
                                    </InputGroup.Append>
                                  </InputGroup>
                                </Form.Group>
                              </Form.Row>
                            ) : null}
                          </Media.Body>
                        </Media>
                        <hr />
                      </>
                    ))
                  : null}
                {/*  */}
              </>
            )
          )}
        </Col>

        <Col md={{ span: 4, order: 12 }} className='m-0 p-1'>
          <>
            {/* <!-- Blog Search Well --> */}
            <SearchBox />
          </>
        </Col>
      </Row>
    </>
  );
};

export default BlogScreenById;
