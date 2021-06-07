import axios from 'axios';
import {
  IMAGE_ALL_FAIL,
  IMAGE_ALL_REQUEST,
  IMAGE_ALL_SUCCESS,
  IMAGE_BY_EVENT_FAIL,
  IMAGE_BY_EVENT_REQUEST,
  IMAGE_BY_EVENT_SUCCESS,
  IMAGE_BY_ID_FAIL,
  IMAGE_BY_ID_REQUEST,
  IMAGE_BY_ID_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_HOMESCREEN_FAIL,
  IMAGE_HOMESCREEN_REQUEST,
  IMAGE_HOMESCREEN_SUCCESS,
  IMAGE_NAVBAR_FAIL,
  IMAGE_NAVBAR_REQUEST,
  IMAGE_NAVBAR_SUCCESS,
  IMAGE_NEW_FAIL,
  IMAGE_NEW_REQUEST,
  IMAGE_NEW_SUCCESS,
} from '../constants/imageConstants';

export const newImage =
  (imageName, imageDescription, eventId, image, checkChapter) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: IMAGE_NEW_REQUEST,
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
        '/api/image/new',
        {
          imageName,
          imageDescription,
          eventId,
          image,
          checkChapter,
        },
        config
      );

      dispatch({
        type: IMAGE_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMAGE_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allImage = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/image/chapter/${checkChapter}`,
      config
    );

    dispatch({
      type: IMAGE_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getImageById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/image/${id}`, {}, config);

    dispatch({
      type: IMAGE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNavbarImage = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_NAVBAR_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/image/navbar/chapter/${checkChapter}`,
      config
    );

    dispatch({
      type: IMAGE_NAVBAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_NAVBAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHomeScreenImage = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_HOMESCREEN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/image/homeScreen/chapter/${checkChapter}`,
      config
    );

    dispatch({
      type: IMAGE_HOMESCREEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_HOMESCREEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getImageByEvent = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_BY_EVENT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/image/event/chapter/${checkChapter}`,
      config
    );

    dispatch({
      type: IMAGE_BY_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_BY_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteImage = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMAGE_DELETE_REQUEST,
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

    await axios.delete(`/api/image/${id}`, config);

    dispatch({ type: IMAGE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
