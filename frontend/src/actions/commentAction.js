import axios from 'axios';
import {
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_NEW_FAIL,
  COMMENT_NEW_REQUEST,
  COMMENT_NEW_SUCCESS,
  COMMENT_UPDATE_BY_ID_FAIL,
  COMMENT_UPDATE_BY_ID_REQUEST,
  COMMENT_UPDATE_BY_ID_SUCCESS,
} from '../constants/commentConstants';

export const newComment = (comment, blogId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_NEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/comment',
      {
        comment,
        blogId,
      },
      config
    );

    dispatch({
      type: COMMENT_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCommentById =
  (id, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENT_UPDATE_BY_ID_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/comment/${id}`,
        { comment },
        config
      );

      dispatch({
        type: COMMENT_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMENT_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteComment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/comment/${id}`, config);

    dispatch({ type: COMMENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
