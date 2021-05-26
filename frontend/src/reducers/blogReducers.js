import {
  BLOG_ALL_FAIL,
  BLOG_ALL_REQUEST,
  BLOG_ALL_SUCCESS,
  BLOG_BY_ID_FAIL,
  BLOG_BY_ID_REQUEST,
  BLOG_BY_ID_RESET,
  BLOG_BY_ID_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_NEW_FAIL,
  BLOG_NEW_REQUEST,
  BLOG_NEW_RESET,
  BLOG_NEW_SUCCESS,
  BLOG_UPDATE_BY_ID_FAIL,
  BLOG_UPDATE_BY_ID_REQUEST,
  BLOG_UPDATE_BY_ID_RESET,
  BLOG_UPDATE_BY_ID_SUCCESS,
} from '../constants/blogConstants';

export const blogNewReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_NEW_REQUEST:
      return { loading: true };
    case BLOG_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case BLOG_NEW_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const blogAllReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_ALL_REQUEST:
      return { loading: true };
    case BLOG_ALL_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const blogByIdReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_BY_ID_REQUEST:
      return { ...state, loading: true };
    case BLOG_BY_ID_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const blogUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case BLOG_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
