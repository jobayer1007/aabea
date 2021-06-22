import axios from 'axios';
import {
  COMMITTEE_MEMBER_NEW_REQUEST,
  COMMITTEE_MEMBER_NEW_SUCCESS,
  COMMITTEE_MEMBER_NEW_FAIL,
  COMMITTEE_MEMBER_ALL_REQUEST,
  COMMITTEE_MEMBER_ALL_SUCCESS,
  COMMITTEE_MEMBER_ALL_FAIL,
  COMMITTEE_MEMBER_BY_ID_REQUEST,
  COMMITTEE_MEMBER_BY_ID_SUCCESS,
  COMMITTEE_MEMBER_BY_ID_FAIL,
  COMMITTEE_MEMBER_UPDATE_BY_ID_REQUEST,
  COMMITTEE_MEMBER_UPDATE_BY_ID_SUCCESS,
  COMMITTEE_MEMBER_UPDATE_BY_ID_FAIL,
  COMMITTEE_MEMBER_DELETE_REQUEST,
  COMMITTEE_MEMBER_DELETE_SUCCESS,
  COMMITTEE_MEMBER_DELETE_FAIL,
} from '../constants/committeeConstants';

export const newCMember =
  (memberId, position, period, bio) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMITTEE_MEMBER_NEW_REQUEST,
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
        '/api/committee/new',
        {
          memberId,
          position,
          period,
          bio,
        },
        config
      );

      dispatch({
        type: COMMITTEE_MEMBER_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMITTEE_MEMBER_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allCMembers = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: COMMITTEE_MEMBER_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/committee/chapter/${checkChapter}`,
      config
    );

    // console.log(data);
    dispatch({
      type: COMMITTEE_MEMBER_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMITTEE_MEMBER_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCMemberById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMITTEE_MEMBER_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/committee/${id}`,

      config
    );

    dispatch({
      type: COMMITTEE_MEMBER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMITTEE_MEMBER_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCMemberById =
  (id, cMemberId, position, bio, period) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMITTEE_MEMBER_UPDATE_BY_ID_REQUEST,
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
        `/api/committee/${id}`,
        { cMemberId, position, bio, period },
        config
      );

      dispatch({
        type: COMMITTEE_MEMBER_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMITTEE_MEMBER_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCMember = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMITTEE_MEMBER_DELETE_REQUEST,
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

    await axios.delete(`/api/committee/${id}`, config);

    dispatch({ type: COMMITTEE_MEMBER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COMMITTEE_MEMBER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
