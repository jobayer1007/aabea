import axios from 'axios';
import {
  VISSION_ALL_FAIL,
  VISSION_ALL_REQUEST,
  VISSION_ALL_SUCCESS,
  VISSION_DELETE_FAIL,
  VISSION_DELETE_REQUEST,
  VISSION_DELETE_SUCCESS,
  VISSION_NEW_FAIL,
  VISSION_NEW_REQUEST,
  VISSION_NEW_SUCCESS,
  VISSION_UPDATE_BY_ID_FAIL,
  VISSION_UPDATE_BY_ID_REQUEST,
  VISSION_UPDATE_BY_ID_SUCCESS,
} from '../constants/vissionConstants';

export const newVission = (title, body, id) => async (dispatch) => {
  try {
    dispatch({
      type: VISSION_NEW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/chapters/vission',
      {
        title,
        body,
        id,
      },
      config
    );

    dispatch({
      type: VISSION_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VISSION_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allVission = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VISSION_ALL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chapters/vission`, config);

    dispatch({
      type: VISSION_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VISSION_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateVissionById = (vission) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VISSION_UPDATE_BY_ID_REQUEST,
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
      `/api/chapters/vission/${id}`,
      vission,
      config
    );

    dispatch({
      type: VISSION_UPDATE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VISSION_UPDATE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVission = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VISSION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/chapters/vission/${id}`, config);

    dispatch({ type: VISSION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: VISSION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
