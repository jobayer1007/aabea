import {
  CATEGORY_ALL_FAIL,
  CATEGORY_ALL_REQUEST,
  CATEGORY_ALL_SUCCESS,
  CATEGORY_BY_ID_FAIL,
  CATEGORY_BY_ID_REQUEST,
  CATEGORY_BY_ID_RESET,
  CATEGORY_BY_ID_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_NEW_FAIL,
  CATEGORY_NEW_REQUEST,
  CATEGORY_NEW_RESET,
  CATEGORY_NEW_SUCCESS,
  CATEGORY_UPDATE_BY_ID_FAIL,
  CATEGORY_UPDATE_BY_ID_REQUEST,
  CATEGORY_UPDATE_BY_ID_RESET,
  CATEGORY_UPDATE_BY_ID_SUCCESS,
} from '../constants/categoryConstants';

export const categoryNewReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_NEW_REQUEST:
      return { loading: true };
    case CATEGORY_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case CATEGORY_NEW_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryAllReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_ALL_REQUEST:
      return { loading: true };
    case CATEGORY_ALL_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryByIdReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_BY_ID_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_BY_ID_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
