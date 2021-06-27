import axios from 'axios';
import {
  DOCUMENT_ALL_FAIL,
  DOCUMENT_ALL_REQUEST,
  DOCUMENT_ALL_SUCCESS,
  DOCUMENT_BY_ID_FAIL,
  DOCUMENT_BY_ID_REQUEST,
  DOCUMENT_BY_ID_SUCCESS,
  DOCUMENT_DELETE_FAIL,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_NEW_FAIL,
  DOCUMENT_NEW_REQUEST,
  DOCUMENT_NEW_SUCCESS,
} from '../constants/documentConstants';

export const newDocument =
  (documentType, documentName, documentDescription, document, checkChapter) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCUMENT_NEW_REQUEST,
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
        '/api/doc/new',
        {
          documentType,
          documentName,
          documentDescription,
          document,
          checkChapter,
        },
        config
      );

      dispatch({
        type: DOCUMENT_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DOCUMENT_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allDocuments = (checkChapter) => async (dispatch) => {
  try {
    dispatch({
      type: DOCUMENT_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/doc/chapter/${checkChapter}`,

      config
    );

    dispatch({
      type: DOCUMENT_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCUMENT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDocumentById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DOCUMENT_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      // responseType: 'arraybuffer', //Comment it in Server
    };

    const { data } = await axios.get(
      `/api/doc/${id}`,

      config
    );

    dispatch({
      type: DOCUMENT_BY_ID_SUCCESS,
      payload: data,
    });
    // window.location.href = data;
  } catch (error) {
    dispatch({
      type: DOCUMENT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDocument = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCUMENT_DELETE_REQUEST,
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

    await axios.delete(`/api/doc/${id}`, config);

    dispatch({ type: DOCUMENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DOCUMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
