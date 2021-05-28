import {
  HELP_CONTACT_ALL_FAIL,
  HELP_CONTACT_ALL_REQUEST,
  HELP_CONTACT_ALL_SUCCESS,
  HELP_CONTACT_BY_ID_FAIL,
  HELP_CONTACT_BY_ID_REQUEST,
  HELP_CONTACT_BY_ID_RESET,
  HELP_CONTACT_BY_ID_SUCCESS,
  HELP_CONTACT_DELETE_FAIL,
  HELP_CONTACT_DELETE_REQUEST,
  HELP_CONTACT_DELETE_SUCCESS,
  HELP_CONTACT_NEW_FAIL,
  HELP_CONTACT_NEW_REQUEST,
  HELP_CONTACT_NEW_RESET,
  HELP_CONTACT_NEW_SUCCESS,
  HELP_CONTACT_UPDATE_BY_ID_FAIL,
  HELP_CONTACT_UPDATE_BY_ID_REQUEST,
  HELP_CONTACT_UPDATE_BY_ID_RESET,
  HELP_CONTACT_UPDATE_BY_ID_SUCCESS,
} from '../constants/helpContactConstants';

export const helpNewReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_CONTACT_NEW_REQUEST:
      return { loading: true };
    case HELP_CONTACT_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case HELP_CONTACT_NEW_FAIL:
      return { loading: false, error: action.payload };
    case HELP_CONTACT_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const helpAllReducer = (state = { helpContacts: [] }, action) => {
  switch (action.type) {
    case HELP_CONTACT_ALL_REQUEST:
      return { loading: true };
    case HELP_CONTACT_ALL_SUCCESS:
      return { loading: false, helpContacts: action.payload };
    case HELP_CONTACT_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const helpByIdReducer = (state = { helpContact: {} }, action) => {
  switch (action.type) {
    case HELP_CONTACT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case HELP_CONTACT_BY_ID_SUCCESS:
      return { loading: false, success: true, helpContact: action.payload };
    case HELP_CONTACT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case HELP_CONTACT_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const helpUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_CONTACT_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case HELP_CONTACT_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, helpContact: action.payload };
    case HELP_CONTACT_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case HELP_CONTACT_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const helpDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_CONTACT_DELETE_REQUEST:
      return { loading: true };
    case HELP_CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case HELP_CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
