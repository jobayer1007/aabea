import axios from 'axios';
import {
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
} from '../constants/chapterConstants';

export const registerChapter = (
  chapterEmail,
  chapterName,
  chapterAddress,
  chapterPhone
) => async (dispatch) => {
  try {
    dispatch({
      type: CHAPTER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/chapters/new',
      {
        chapterEmail,
        chapterName,
        chapterAddress,
        chapterPhone,
      },
      config
    );

    dispatch({
      type: CHAPTER_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: CHAPTER_LOGIN_SUCCESS,
    //   payload: data,
    // });

    // localStorage.setItem('CHAPTERInfo', JSON.stringify(data));
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
