import {
  ANNOUNCEMENT_ALL_FAIL,
  ANNOUNCEMENT_ALL_REQUEST,
  ANNOUNCEMENT_ALL_SUCCESS,
  ANNOUNCEMENT_BY_ID_FAIL,
  ANNOUNCEMENT_BY_ID_REQUEST,
  ANNOUNCEMENT_BY_ID_SUCCESS,
  ANNOUNCEMENT_DELETE_FAIL,
  ANNOUNCEMENT_DELETE_REQUEST,
  ANNOUNCEMENT_DELETE_SUCCESS,
  ANNOUNCEMENT_NEW_FAIL,
  ANNOUNCEMENT_NEW_REQUEST,
  ANNOUNCEMENT_NEW_RESET,
  ANNOUNCEMENT_NEW_SUCCESS,
  ANNOUNCEMENT_UPDATE_BY_ID_FAIL,
  ANNOUNCEMENT_UPDATE_BY_ID_REQUEST,
  ANNOUNCEMENT_UPDATE_BY_ID_SUCCESS,
} from '../constants/announcementConstants';

export const announcementNewReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_NEW_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case ANNOUNCEMENT_NEW_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const announcementAllReducer = (
  state = { announcements: [] },
  action
) => {
  switch (action.type) {
    case ANNOUNCEMENT_ALL_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_ALL_SUCCESS:
      return { loading: false, announcements: action.payload };
    case ANNOUNCEMENT_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const announcementByIdReducer = (
  state = { announcement: {} },
  action
) => {
  switch (action.type) {
    case ANNOUNCEMENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case ANNOUNCEMENT_BY_ID_SUCCESS:
      return { loading: false, success: true, announcement: action.payload };

    case ANNOUNCEMENT_BY_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const announcementUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, announcement: action.payload };
    case ANNOUNCEMENT_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const announcementDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_DELETE_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ANNOUNCEMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
