import axios from 'axios';
import {
  ANNOUNCEMENT_NEW_FAIL,
  ANNOUNCEMENT_NEW_REQUEST,
  ANNOUNCEMENT_NEW_SUCCESS,
  ANNOUNCEMENT_ALL_FAIL,
  ANNOUNCEMENT_ALL_REQUEST,
  ANNOUNCEMENT_ALL_SUCCESS,
  ANNOUNCEMENT_BY_ID_REQUEST,
  ANNOUNCEMENT_BY_ID_SUCCESS,
  ANNOUNCEMENT_BY_ID_FAIL,
  ANNOUNCEMENT_UPDATE_BY_ID_REQUEST,
  ANNOUNCEMENT_UPDATE_BY_ID_SUCCESS,
  ANNOUNCEMENT_UPDATE_BY_ID_FAIL,
  ANNOUNCEMENT_DELETE_REQUEST,
  ANNOUNCEMENT_DELETE_SUCCESS,
  ANNOUNCEMENT_DELETE_FAIL,
} from '../constants/announcementConstants';

export const newAnnouncement = (title, body, id) => async (dispatch) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_NEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/chapters/announcement',
      {
        title,
        body,
        id,
      },
      config
    );

    dispatch({
      type: ANNOUNCEMENT_NEW_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: CHAPTER_LOGIN_SUCCESS,
    //   payload: data,
    // });

    // localStorage.setItem('CHAPTERInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allAnnouncements = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_ALL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chapters/announcements`, config);

    dispatch({
      type: ANNOUNCEMENT_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAnnouncementById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_BY_ID_REQUEST,
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

    const { data } = await axios.get(
      `/api/chapters/announcements/${id}`,

      config
    );

    dispatch({
      type: ANNOUNCEMENT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAnnouncementById = (id, announcement) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_UPDATE_BY_ID_REQUEST,
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
      `/api/chapters/announcements/${id}`,
      announcement,
      config
    );

    dispatch({
      type: ANNOUNCEMENT_UPDATE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_UPDATE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAnnouncement = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/chapters/announcements/${id}`, config);

    dispatch({ type: ANNOUNCEMENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
