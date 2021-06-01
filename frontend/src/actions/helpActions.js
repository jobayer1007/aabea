import axios from 'axios';
import {
  HELP_CONTACT_ALL_FAIL,
  HELP_CONTACT_ALL_REQUEST,
  HELP_CONTACT_ALL_SUCCESS,
  HELP_CONTACT_BY_ID_FAIL,
  HELP_CONTACT_BY_ID_REQUEST,
  HELP_CONTACT_BY_ID_SUCCESS,
  HELP_CONTACT_DELETE_FAIL,
  HELP_CONTACT_DELETE_REQUEST,
  HELP_CONTACT_DELETE_SUCCESS,
  HELP_CONTACT_NEW_FAIL,
  HELP_CONTACT_NEW_REQUEST,
  HELP_CONTACT_NEW_SUCCESS,
  HELP_CONTACT_UPDATE_BY_ID_FAIL,
  HELP_CONTACT_UPDATE_BY_ID_REQUEST,
  HELP_CONTACT_UPDATE_BY_ID_SUCCESS,
} from '../constants/helpContactConstants';

export const newHelp =
  (memberId, helpFor, contactEmail, contactPhone, isTrue) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: HELP_CONTACT_NEW_REQUEST,
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
        '/api/helps',
        {
          memberId,
          helpFor,
          contactEmail,
          contactPhone,
          isTrue,
        },
        config
      );

      dispatch({
        type: HELP_CONTACT_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HELP_CONTACT_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allHelps = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: HELP_CONTACT_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log('from help action: ' + checkChapter);
    const { data } = await axios.get(
      `/api/helps/chapter/${checkChapter}`,

      config
    );

    dispatch({
      type: HELP_CONTACT_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HELP_CONTACT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHelpById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: HELP_CONTACT_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/helps/${id}`,

      config
    );

    dispatch({
      type: HELP_CONTACT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HELP_CONTACT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateHelpById =
  (memberId, helpFor, contactEmail, contactPhone, profilePicture, isTrue, id) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: HELP_CONTACT_UPDATE_BY_ID_REQUEST,
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
        `/api/helps/${id}`,
        {
          memberId,
          helpFor,
          contactEmail,
          contactPhone,
          profilePicture,
          isTrue,
        },
        config
      );

      dispatch({
        type: HELP_CONTACT_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: HELP_CONTACT_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteHelp = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HELP_CONTACT_DELETE_REQUEST,
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

    await axios.delete(`/api/helps/${id}`, config);

    dispatch({ type: HELP_CONTACT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: HELP_CONTACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
