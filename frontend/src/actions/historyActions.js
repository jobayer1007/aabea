import axios from 'axios';
import {
  HISTORY_ALL_FAIL,
  HISTORY_ALL_REQUEST,
  HISTORY_ALL_SUCCESS,
  HISTORY_BY_ID_FAIL,
  HISTORY_BY_ID_REQUEST,
  HISTORY_BY_ID_SUCCESS,
  HISTORY_DELETE_FAIL,
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_SUCCESS,
  HISTORY_NEW_FAIL,
  HISTORY_NEW_REQUEST,
  HISTORY_NEW_SUCCESS,
  HISTORY_UPDATE_BY_ID_FAIL,
  HISTORY_UPDATE_BY_ID_REQUEST,
  HISTORY_UPDATE_BY_ID_SUCCESS,
} from '../constants/historyConstants';

export const newHistory = (id, title, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HISTORY_NEW_REQUEST,
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
      '/api/chapters/history',
      {
        title,
        body,
        id,
      },
      config
    );

    dispatch({
      type: HISTORY_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allHistory = () => async (dispatch) => {
  try {
    dispatch({
      type: HISTORY_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/chapters/history`, config);

    dispatch({
      type: HISTORY_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHistoryById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HISTORY_BY_ID_REQUEST,
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
      `/api/chapters/history/${id}`,

      config
    );

    dispatch({
      type: HISTORY_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateHistoryById = (id, title, body) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: HISTORY_UPDATE_BY_ID_REQUEST,
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
      `/api/chapters/history/${id}`,
      { title, body },
      config
    );

    dispatch({
      type: HISTORY_UPDATE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HISTORY_UPDATE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteHistory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HISTORY_DELETE_REQUEST,
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

    await axios.delete(`/api/chapters/history/${id}`, config);

    dispatch({ type: HISTORY_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: HISTORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
