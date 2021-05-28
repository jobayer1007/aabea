import axios from 'axios';
import {
  QUICK_LINK_ALL_FAIL,
  QUICK_LINK_ALL_REQUEST,
  QUICK_LINK_ALL_SUCCESS,
  QUICK_LINK_BY_ID_FAIL,
  QUICK_LINK_BY_ID_REQUEST,
  QUICK_LINK_BY_ID_SUCCESS,
  QUICK_LINK_DELETE_FAIL,
  QUICK_LINK_DELETE_REQUEST,
  QUICK_LINK_DELETE_SUCCESS,
  QUICK_LINK_NEW_FAIL,
  QUICK_LINK_NEW_REQUEST,
  QUICK_LINK_NEW_SUCCESS,
  QUICK_LINK_UPDATE_BY_ID_FAIL,
  QUICK_LINK_UPDATE_BY_ID_REQUEST,
  QUICK_LINK_UPDATE_BY_ID_SUCCESS,
} from '../constants/quickLinkConstants';

export const newLink = (linkTitle, link) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUICK_LINK_NEW_REQUEST,
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
      '/api/link',
      {
        linkTitle,
        link,
      },
      config
    );

    dispatch({
      type: QUICK_LINK_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUICK_LINK_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allLinkss = (subDomain) => async (dispatch) => {
  try {
    dispatch({
      type: QUICK_LINK_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/link`, { subDomain }, config);

    dispatch({
      type: QUICK_LINK_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUICK_LINK_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLinkById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: QUICK_LINK_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/link/${id}`,

      config
    );

    dispatch({
      type: QUICK_LINK_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUICK_LINK_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLinkById =
  (id, linkTitle, link) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUICK_LINK_UPDATE_BY_ID_REQUEST,
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
        `/api/link/${id}`,
        {
          linkTitle,
          link,
        },
        config
      );

      dispatch({
        type: QUICK_LINK_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUICK_LINK_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteLink = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUICK_LINK_DELETE_REQUEST,
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

    await axios.delete(`/api/link/${id}`, config);

    dispatch({ type: QUICK_LINK_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: QUICK_LINK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
