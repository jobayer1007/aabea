import axios from 'axios';
import {
  REPLY_DELETE_FAIL,
  REPLY_DELETE_REQUEST,
  REPLY_DELETE_SUCCESS,
  REPLY_NEW_FAIL,
  REPLY_NEW_REQUEST,
  REPLY_NEW_SUCCESS,
  REPLY_UPDATE_BY_ID_FAIL,
  REPLY_UPDATE_BY_ID_REQUEST,
  REPLY_UPDATE_BY_ID_SUCCESS,
} from '../constants/replyConstants';

export const newReply =
  (reply, commentId, blogId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: REPLY_NEW_REQUEST,
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
        '/api/reply',
        {
          reply,
          commentId,
          blogId,
        },
        config
      );

      dispatch({
        type: REPLY_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPLY_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateReplyById = (id, reply) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPLY_UPDATE_BY_ID_REQUEST,
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

    const { data } = await axios.put(`/api/reply/${id}`, { reply }, config);

    dispatch({
      type: REPLY_UPDATE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPLY_UPDATE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReply = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPLY_DELETE_REQUEST,
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

    await axios.delete(`/api/reply/${id}`, config);

    dispatch({ type: REPLY_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: REPLY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
