import {
  MISSION_ALL_FAIL,
  MISSION_ALL_REQUEST,
  MISSION_ALL_SUCCESS,
  MISSION_BY_ID_FAIL,
  MISSION_BY_ID_REQUEST,
  MISSION_BY_ID_RESET,
  MISSION_BY_ID_SUCCESS,
  MISSION_DELETE_FAIL,
  MISSION_DELETE_REQUEST,
  MISSION_DELETE_SUCCESS,
  MISSION_NEW_FAIL,
  MISSION_NEW_REQUEST,
  MISSION_NEW_RESET,
  MISSION_NEW_SUCCESS,
  MISSION_UPDATE_BY_ID_FAIL,
  MISSION_UPDATE_BY_ID_REQUEST,
  MISSION_UPDATE_BY_ID_RESET,
  MISSION_UPDATE_BY_ID_SUCCESS,
} from '../constants/missionConstants';

export const missionNewReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSION_NEW_REQUEST:
      return { loading: true };
    case MISSION_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case MISSION_NEW_FAIL:
      return { loading: false, error: action.payload };
    case MISSION_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const missionAllReducer = (state = { missions: [] }, action) => {
  switch (action.type) {
    case MISSION_ALL_REQUEST:
      return { loading: true };
    case MISSION_ALL_SUCCESS:
      return { loading: false, missions: action.payload };
    case MISSION_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const missionByIdReducer = (state = { mission: {} }, action) => {
  switch (action.type) {
    case MISSION_BY_ID_REQUEST:
      return { ...state, loading: true };
    case MISSION_BY_ID_SUCCESS:
      return { loading: false, success: true, mission: action.payload };
    case MISSION_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case MISSION_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const missionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSION_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case MISSION_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, mission: action.payload };
    case MISSION_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case MISSION_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const missionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MISSION_DELETE_REQUEST:
      return { loading: true };
    case MISSION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MISSION_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
