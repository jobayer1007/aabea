import {
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_NEW_FAIL,
  COMMENT_NEW_REQUEST,
  COMMENT_NEW_RESET,
  COMMENT_NEW_SUCCESS,
  COMMENT_UPDATE_BY_ID_FAIL,
  COMMENT_UPDATE_BY_ID_REQUEST,
  COMMENT_UPDATE_BY_ID_RESET,
  COMMENT_UPDATE_BY_ID_SUCCESS,
} from '../constants/commentConstants';

export const commentNewReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_NEW_REQUEST:
      return { loading: true };
    case COMMENT_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case COMMENT_NEW_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case COMMENT_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
