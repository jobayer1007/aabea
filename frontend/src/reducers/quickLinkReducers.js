import {
  QUICK_LINK_ALL_FAIL,
  QUICK_LINK_ALL_REQUEST,
  QUICK_LINK_ALL_SUCCESS,
  QUICK_LINK_BY_ID_FAIL,
  QUICK_LINK_BY_ID_REQUEST,
  QUICK_LINK_BY_ID_RESET,
  QUICK_LINK_BY_ID_SUCCESS,
  QUICK_LINK_DELETE_FAIL,
  QUICK_LINK_DELETE_REQUEST,
  QUICK_LINK_DELETE_SUCCESS,
  QUICK_LINK_NEW_FAIL,
  QUICK_LINK_NEW_REQUEST,
  QUICK_LINK_NEW_RESET,
  QUICK_LINK_NEW_SUCCESS,
  QUICK_LINK_UPDATE_BY_ID_FAIL,
  QUICK_LINK_UPDATE_BY_ID_REQUEST,
  QUICK_LINK_UPDATE_BY_ID_RESET,
  QUICK_LINK_UPDATE_BY_ID_SUCCESS,
} from '../constants/quickLinkConstants';

export const linkNewReducer = (state = {}, action) => {
  switch (action.type) {
    case QUICK_LINK_NEW_REQUEST:
      return { loading: true };
    case QUICK_LINK_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case QUICK_LINK_NEW_FAIL:
      return { loading: false, error: action.payload };
    case QUICK_LINK_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const linkAllReducer = (state = { links: [] }, action) => {
  switch (action.type) {
    case QUICK_LINK_ALL_REQUEST:
      return { loading: true };
    case QUICK_LINK_ALL_SUCCESS:
      return { loading: false, links: action.payload };
    case QUICK_LINK_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const linkByIdReducer = (state = { link: {} }, action) => {
  switch (action.type) {
    case QUICK_LINK_BY_ID_REQUEST:
      return { ...state, loading: true };
    case QUICK_LINK_BY_ID_SUCCESS:
      return { loading: false, success: true, link: action.payload };
    case QUICK_LINK_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case QUICK_LINK_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const linkUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUICK_LINK_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case QUICK_LINK_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, link: action.payload };
    case QUICK_LINK_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case QUICK_LINK_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const linkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUICK_LINK_DELETE_REQUEST:
      return { loading: true };
    case QUICK_LINK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUICK_LINK_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
