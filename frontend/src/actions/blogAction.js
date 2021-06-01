import axios from 'axios';
import {
  BLOG_ALL_FAIL,
  BLOG_ALL_REQUEST,
  BLOG_ALL_SUCCESS,
  BLOG_BY_ID_FAIL,
  BLOG_BY_ID_REQUEST,
  BLOG_BY_ID_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_NEW_FAIL,
  BLOG_NEW_REQUEST,
  BLOG_NEW_SUCCESS,
  BLOG_UPDATE_BY_ID_FAIL,
  BLOG_UPDATE_BY_ID_REQUEST,
  BLOG_UPDATE_BY_ID_SUCCESS,
} from '../constants/blogConstants';

export const newBlog =
  (title, body, category, photoId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOG_NEW_REQUEST,
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
        '/api/blog',
        {
          title,
          body,
          category,
          photoId,
        },
        config
      );

      dispatch({
        type: BLOG_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allblogs = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/blog/chapter/${checkChapter}`,
      config
    );

    dispatch({
      type: BLOG_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlogById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_BY_ID_REQUEST,
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

    const { data } = await axios.get(`/api/blog/${id}`, config);

    dispatch({
      type: BLOG_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBlogById =
  (id, { blog }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOG_UPDATE_BY_ID_REQUEST,
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

      const { data } = await axios.put(`/api/blog/${id}`, { blog }, config);

      dispatch({
        type: BLOG_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_DELETE_REQUEST,
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

    await axios.delete(`/api/blog/${id}`, config);

    dispatch({ type: BLOG_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
