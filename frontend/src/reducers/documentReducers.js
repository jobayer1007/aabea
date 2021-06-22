import {
  DOCUMENT_ALL_FAIL,
  DOCUMENT_ALL_REQUEST,
  DOCUMENT_ALL_SUCCESS,
  DOCUMENT_BY_ID_FAIL,
  DOCUMENT_BY_ID_REQUEST,
  DOCUMENT_BY_ID_RESET,
  DOCUMENT_BY_ID_SUCCESS,
  DOCUMENT_DELETE_FAIL,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_NEW_FAIL,
  DOCUMENT_NEW_REQUEST,
  DOCUMENT_NEW_RESET,
  DOCUMENT_NEW_SUCCESS,
} from '../constants/documentConstants';

export const documentNewReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCUMENT_NEW_REQUEST:
      return { loading: true };
    case DOCUMENT_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case DOCUMENT_NEW_FAIL:
      return { loading: false, error: action.payload };
    case DOCUMENT_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const documentAllReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case DOCUMENT_ALL_REQUEST:
      return { loading: true };
    case DOCUMENT_ALL_SUCCESS:
      return { loading: false, documents: action.payload };
    case DOCUMENT_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const documentByIdReducer = (state = { document: {} }, action) => {
  switch (action.type) {
    case DOCUMENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case DOCUMENT_BY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        document: action.payload,
      };
    case DOCUMENT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case DOCUMENT_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const documentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCUMENT_DELETE_REQUEST:
      return { loading: true };
    case DOCUMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DOCUMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
