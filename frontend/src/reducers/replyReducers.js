import {
  REPLY_DELETE_FAIL,
  REPLY_DELETE_REQUEST,
  REPLY_DELETE_SUCCESS,
  REPLY_NEW_FAIL,
  REPLY_NEW_REQUEST,
  REPLY_NEW_RESET,
  REPLY_NEW_SUCCESS,
  REPLY_UPDATE_BY_ID_FAIL,
  REPLY_UPDATE_BY_ID_REQUEST,
  REPLY_UPDATE_BY_ID_RESET,
  REPLY_UPDATE_BY_ID_SUCCESS,
} from '../constants/replyConstants';

export const replyNewReducer = (state = {}, action) => {
  switch (action.type) {
    case REPLY_NEW_REQUEST:
      return { loading: true };
    case REPLY_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case REPLY_NEW_FAIL:
      return { loading: false, error: action.payload };
    case REPLY_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const replyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case REPLY_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case REPLY_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, reply: action.payload };
    case REPLY_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case REPLY_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const replyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REPLY_DELETE_REQUEST:
      return { loading: true };
    case REPLY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REPLY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
