import axios from 'axios';
import {
  CHAPTER_BY_SUBDOMAIN_FAIL,
  CHAPTER_BY_SUBDOMAIN_REQUEST,
  CHAPTER_BY_SUBDOMAIN_SUCCESS,
  CHAPTER_DELETE_FAIL,
  CHAPTER_DELETE_REQUEST,
  CHAPTER_DELETE_SUCCESS,
  CHAPTER_DETAILS_FAIL,
  CHAPTER_DETAILS_REQUEST,
  CHAPTER_DETAILS_RESET,
  CHAPTER_DETAILS_SUCCESS,
  CHAPTER_DONATIONS_FAIL,
  CHAPTER_DONATIONS_REQUEST,
  CHAPTER_DONATIONS_SUCCESS,
  CHAPTER_LIST_FAIL,
  CHAPTER_LIST_REQUEST,
  CHAPTER_LIST_SUCCESS,
  CHAPTER_PAYMENTS_FAIL,
  CHAPTER_PAYMENTS_REQUEST,
  CHAPTER_PAYMENTS_SUCCESS,
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
  CHAPTER_UPDATE_FAIL,
  CHAPTER_UPDATE_REQUEST,
  CHAPTER_UPDATE_SUCCESS,
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

export const getChapterById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAPTER_DETAILS_REQUEST,
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
      `/api/chapters/${id}`,

      config
    );

    dispatch({
      type: CHAPTER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAPTER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateChapterById =
  (id, chapterName, chapterAddress, chapterEmail, chapterPhone, subDomain) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CHAPTER_UPDATE_REQUEST,
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
        `/api/chapters/${id}`,
        { chapterName, chapterAddress, chapterEmail, chapterPhone, subDomain },
        config
      );

      dispatch({
        type: CHAPTER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAPTER_UPDATE_FAIL,
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
  (
    chapterEmail,
    password,
    chapterName,
    chapterAddress,
    chapterPhone,
    chapterPaymentId,
    checkChapter
  ) =>
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
          chapterName,
          chapterAddress,
          chapterPhone,
          chapterPaymentId,
          checkChapter,
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

export const getChapterSettings =
  (checkChapter) => async (dispatch, getState) => {
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

      const { data } = await axios.get(
        `/api/chapters/settings/${checkChapter}`,
        config
      );

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
  (
    checkChapter,
    chapterEmail,
    password,
    chapterName,
    chapterAddress,
    chapterPhone,
    chapterPaymentId
  ) =>
  async (dispatch, getState) => {
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

      console.log(checkChapter);
      const { data } = await axios.put(
        `/api/chapters/settings/${checkChapter}`,
        {
          chapterEmail,
          password,
          chapterName,
          chapterAddress,
          chapterPhone,
          chapterPaymentId,
        },
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
export const getChapterBySubDomain = (checkChapter) => async (dispatch) => {
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
      `/api/chapters/chapter/${checkChapter}`,
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

//////////////////// Chapter Payments//////////////////////////
export const getChapterPayments =
  (checkChapter) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHAPTER_PAYMENTS_REQUEST,
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
        `/api/chapters/payments/${checkChapter}`,
        config
      );

      dispatch({
        type: CHAPTER_PAYMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAPTER_PAYMENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//////////////////// Chapter Donations//////////////////////////
export const getChapterDonations =
  (checkChapter) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHAPTER_DONATIONS_REQUEST,
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
        `/api/chapters/donations/${checkChapter}`,
        config
      );

      dispatch({
        type: CHAPTER_DONATIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAPTER_DONATIONS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
