import axios from 'axios';
import {
  MISSION_ALL_FAIL,
  MISSION_ALL_REQUEST,
  MISSION_ALL_SUCCESS,
  MISSION_BY_ID_FAIL,
  MISSION_BY_ID_REQUEST,
  MISSION_BY_ID_SUCCESS,
  MISSION_DELETE_FAIL,
  MISSION_DELETE_REQUEST,
  MISSION_DELETE_SUCCESS,
  MISSION_NEW_FAIL,
  MISSION_NEW_REQUEST,
  MISSION_NEW_SUCCESS,
  MISSION_UPDATE_BY_ID_FAIL,
  MISSION_UPDATE_BY_ID_REQUEST,
  MISSION_UPDATE_BY_ID_SUCCESS,
} from '../constants/missionConstants';

export const newMission = (title, body, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MISSION_NEW_REQUEST,
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
      '/api/chapters/mission',
      {
        title,
        body,
        id,
      },
      config
    );

    dispatch({
      type: MISSION_NEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MISSION_NEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allMission = () => async (dispatch) => {
  try {
    dispatch({
      type: MISSION_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/chapters/mission`, config);

    dispatch({
      type: MISSION_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MISSION_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMissionById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MISSION_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/chapters/mission/${id}`,

      config
    );

    dispatch({
      type: MISSION_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MISSION_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMissionById =
  (id, title, body) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSION_UPDATE_BY_ID_REQUEST,
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
        `/api/chapters/mission/${id}`,
        { title, body },
        config
      );

      dispatch({
        type: MISSION_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MISSION_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteMission = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MISSION_DELETE_REQUEST,
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

    await axios.delete(`/api/chapters/mission/${id}`, config);

    dispatch({ type: MISSION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MISSION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
