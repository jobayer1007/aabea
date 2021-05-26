import axios from 'axios';
import {
  CATEGORY_ALL_FAIL,
  CATEGORY_ALL_REQUEST,
  CATEGORY_ALL_SUCCESS,
  CATEGORY_BY_ID_FAIL,
  CATEGORY_BY_ID_REQUEST,
  CATEGORY_BY_ID_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_NEW_FAIL,
  CATEGORY_NEW_REQUEST,
  CATEGORY_NEW_SUCCESS,
  CATEGORY_UPDATE_BY_ID_FAIL,
  CATEGORY_UPDATE_BY_ID_REQUEST,
  CATEGORY_UPDATE_BY_ID_SUCCESS,
} from '../constants/categoryConstants';

export const newCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_NEW_REQUEST,
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
      '/api/category',
      {
        name,
      },
      config
    );

    dispatch({
      type: CATEGORY_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allcategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/category`, config);

    dispatch({
      type: CATEGORY_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/category/${id}`,

      config
    );

    dispatch({
      type: CATEGORY_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategoryById = (id, name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_BY_ID_REQUEST,
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

    const { data } = await axios.put(`/api/category/${id}`, { name }, config);

    dispatch({
      type: CATEGORY_UPDATE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
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

    await axios.delete(`/api/category/${id}`, config);

    dispatch({ type: CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
