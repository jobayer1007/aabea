import {
  EMAIL_ALL_FAIL,
  EMAIL_ALL_REQUEST,
  EMAIL_ALL_SUCCESS,
  EMAIL_BY_ID_FAIL,
  EMAIL_BY_ID_REQUEST,
  EMAIL_BY_ID_RESET,
  EMAIL_BY_ID_SUCCESS,
  EMAIL_NEW_FAIL,
  EMAIL_NEW_REQUEST,
  EMAIL_NEW_RESET,
  EMAIL_NEW_SUCCESS,
} from '../constants/emailConstants';

export const emailNewReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_NEW_REQUEST:
      return { loading: true };
    case EMAIL_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case EMAIL_NEW_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const emailAllReducer = (state = { emails: [] }, action) => {
  switch (action.type) {
    case EMAIL_ALL_REQUEST:
      return { loading: true };
    case EMAIL_ALL_SUCCESS:
      return { loading: false, emails: action.payload };
    case EMAIL_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const emailByIdReducer = (state = { email: {} }, action) => {
  switch (action.type) {
    case EMAIL_BY_ID_REQUEST:
      return { ...state, loading: true };
    case EMAIL_BY_ID_SUCCESS:
      return { loading: false, success: true, email: action.payload };
    case EMAIL_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};
