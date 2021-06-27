import axios from 'axios';
import {
  EMAIL_ALL_FAIL,
  EMAIL_ALL_REQUEST,
  EMAIL_ALL_SUCCESS,
  EMAIL_BY_ID_FAIL,
  EMAIL_BY_ID_REQUEST,
  EMAIL_BY_ID_SUCCESS,
  EMAIL_NEW_FAIL,
  EMAIL_NEW_REQUEST,
  EMAIL_NEW_SUCCESS,
} from '../constants/emailConstants';

export const newEmail = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMAIL_NEW_REQUEST,
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

    const { data } = await axios.post('/api/emails', email, config);

    dispatch({
      type: EMAIL_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allEmails = (checkChapter) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMAIL_ALL_REQUEST,
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
      `/api/emails/chapter/${checkChapter}`,
      config
    );

    dispatch({
      type: EMAIL_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEmailById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMAIL_BY_ID_REQUEST,
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
      `/api/emails/${id}`,

      config
    );

    dispatch({
      type: EMAIL_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
