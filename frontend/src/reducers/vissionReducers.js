import {
  VISSION_ALL_FAIL,
  VISSION_ALL_REQUEST,
  VISSION_ALL_SUCCESS,
  VISSION_BY_ID_FAIL,
  VISSION_BY_ID_REQUEST,
  VISSION_BY_ID_RESET,
  VISSION_BY_ID_SUCCESS,
  VISSION_DELETE_FAIL,
  VISSION_DELETE_REQUEST,
  VISSION_DELETE_SUCCESS,
  VISSION_NEW_FAIL,
  VISSION_NEW_REQUEST,
  VISSION_NEW_SUCCESS,
  VISSION_UPDATE_BY_ID_FAIL,
  VISSION_UPDATE_BY_ID_REQUEST,
  VISSION_UPDATE_BY_ID_RESET,
  VISSION_UPDATE_BY_ID_SUCCESS,
} from '../constants/vissionConstants';

export const vissionNewReducer = (state = {}, action) => {
  switch (action.type) {
    case VISSION_NEW_REQUEST:
      return { loading: true };
    case VISSION_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case VISSION_NEW_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const vissionAllReducer = (state = { vissions: [] }, action) => {
  switch (action.type) {
    case VISSION_ALL_REQUEST:
      return { loading: true };
    case VISSION_ALL_SUCCESS:
      return { loading: false, vissions: action.payload };
    case VISSION_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const vissionByIdReducer = (state = { vission: {} }, action) => {
  switch (action.type) {
    case VISSION_BY_ID_REQUEST:
      return { ...state, loading: true };
    case VISSION_BY_ID_SUCCESS:
      return { loading: false, success: true, vission: action.payload };
    case VISSION_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case VISSION_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const vissionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VISSION_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case VISSION_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, vission: action.payload };
    case VISSION_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case VISSION_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const vissionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VISSION_DELETE_REQUEST:
      return { loading: true };
    case VISSION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VISSION_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
