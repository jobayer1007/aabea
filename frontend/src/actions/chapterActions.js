import axios from 'axios';
import {
  CHAPTER_BY_SUBDOMAIN_FAIL,
  CHAPTER_BY_SUBDOMAIN_REQUEST,
  CHAPTER_BY_SUBDOMAIN_SUCCESS,
  CHAPTER_DELETE_FAIL,
  CHAPTER_DELETE_REQUEST,
  CHAPTER_DELETE_SUCCESS,
  CHAPTER_DETAILS_RESET,
  CHAPTER_LIST_FAIL,
  CHAPTER_LIST_REQUEST,
  CHAPTER_LIST_SUCCESS,
  CHAPTER_REGISTER_FAIL,
  CHAPTER_REGISTER_REQUEST,
  CHAPTER_REGISTER_SUCCESS,
  CHAPTER_SETTINGS_FAIL,
  CHAPTER_SETTINGS_NEW_FAIL,
  CHAPTER_SETTINGS_NEW_REQUEST,
  CHAPTER_SETTINGS_NEW_SUCCESS,
  CHAPTER_SETTINGS_REQUEST,
  CHAPTER_SETTINGS_SUCCESS,
  CHAPTER_SETTINGS_UPDATE_FAIL,
  CHAPTER_SETTINGS_UPDATE_REQUEST,
  CHAPTER_SETTINGS_UPDATE_SUCCESS,
} from '../constants/chapterConstants';

export const registerChapter =
  (chapterEmail, chapterName, chapterAddress, chapterPhone, subDomain) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CHAPTER_REGISTER_REQUEST,
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
        '/api/chapters/new',
        {
          chapterEmail,
          chapterName,
          chapterAddress,
          chapterPhone,
          subDomain,
        },
        config
      );

      dispatch({
        type: CHAPTER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAPTER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listChapters = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/chapters`, config);
    dispatch({ type: CHAPTER_DETAILS_RESET });

    dispatch({
      type: CHAPTER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAPTER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteChapter = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_DELETE_REQUEST,
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

    await axios.delete(`/api/chapters/${id}`, config);

    dispatch({ type: CHAPTER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CHAPTER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////Chapter Settings////////////////////////////////////////////////////

export const newChapterSettings =
  (chapterEmail, password, chapterAddress, chapterPhone, chapterPaymentId) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CHAPTER_SETTINGS_NEW_REQUEST,
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
        '/api/chapters/settings',
        {
          chapterEmail,
          password,
          chapterAddress,
          chapterPhone,
          chapterPaymentId,
        },
        config
      );

      dispatch({
        type: CHAPTER_SETTINGS_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAPTER_SETTINGS_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getChapterSettings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_SETTINGS_REQUEST,
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

    const { data } = await axios.get(`/api/chapters/settings`, config);

    dispatch({
      type: CHAPTER_SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAPTER_SETTINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateChapterSettings =
  (settings) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHAPTER_SETTINGS_UPDATE_REQUEST,
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
        `/api/chapters/settings`,
        settings,
        config
      );

      dispatch({ type: CHAPTER_SETTINGS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CHAPTER_SETTINGS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//////////////////// Chapter By Domain//////////////////////////
export const getChapterBySubDomain = (subDomain) => async (dispatch) => {
  try {
    dispatch({
      type: CHAPTER_BY_SUBDOMAIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/chapters/subDomain`,
      { subDomain },
      config
    );

    dispatch({
      type: CHAPTER_BY_SUBDOMAIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAPTER_BY_SUBDOMAIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
