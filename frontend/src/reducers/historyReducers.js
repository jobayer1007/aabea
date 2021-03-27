import {
  HISTORY_ALL_FAIL,
  HISTORY_ALL_REQUEST,
  HISTORY_ALL_SUCCESS,
  HISTORY_BY_ID_FAIL,
  HISTORY_BY_ID_REQUEST,
  HISTORY_BY_ID_RESET,
  HISTORY_BY_ID_SUCCESS,
  HISTORY_DELETE_FAIL,
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_SUCCESS,
  HISTORY_NEW_FAIL,
  HISTORY_NEW_REQUEST,
  HISTORY_NEW_RESET,
  HISTORY_NEW_SUCCESS,
  HISTORY_UPDATE_BY_ID_FAIL,
  HISTORY_UPDATE_BY_ID_REQUEST,
  HISTORY_UPDATE_BY_ID_RESET,
  HISTORY_UPDATE_BY_ID_SUCCESS,
} from '../constants/historyConstants';

export const historyNewReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_NEW_REQUEST:
      return { loading: true };
    case HISTORY_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case HISTORY_NEW_FAIL:
      return { loading: false, error: action.payload };
    case HISTORY_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const historyAllReducer = (state = { histories: [] }, action) => {
  switch (action.type) {
    case HISTORY_ALL_REQUEST:
      return { loading: true };
    case HISTORY_ALL_SUCCESS:
      return { loading: false, histories: action.payload };
    case HISTORY_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const historyByIdReducer = (state = { historyId: {} }, action) => {
  switch (action.type) {
    case HISTORY_BY_ID_REQUEST:
      return { ...state, loading: true };
    case HISTORY_BY_ID_SUCCESS:
      return { loading: false, success: true, historyId: action.payload };
    case HISTORY_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case HISTORY_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const historyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case HISTORY_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, history: action.payload };
    case HISTORY_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case HISTORY_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const historyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_DELETE_REQUEST:
      return { loading: true };
    case HISTORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case HISTORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
