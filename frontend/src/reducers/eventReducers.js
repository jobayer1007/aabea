import {
  EVENT_ALL_FAIL,
  EVENT_ALL_REQUEST,
  EVENT_ALL_SUCCESS,
  EVENT_BY_ID_FAIL,
  EVENT_BY_ID_REQUEST,
  EVENT_BY_ID_RESET,
  EVENT_BY_ID_SUCCESS,
  EVENT_CONTACT_ALL_FAIL,
  EVENT_CONTACT_ALL_REQUEST,
  EVENT_CONTACT_ALL_SUCCESS,
  EVENT_CONTACT_BY_ID_FAIL,
  EVENT_CONTACT_BY_ID_REQUEST,
  EVENT_CONTACT_BY_ID_RESET,
  EVENT_CONTACT_BY_ID_SUCCESS,
  EVENT_CONTACT_DELETE_FAIL,
  EVENT_CONTACT_DELETE_REQUEST,
  EVENT_CONTACT_DELETE_SUCCESS,
  EVENT_CONTACT_NEW_FAIL,
  EVENT_CONTACT_NEW_REQUEST,
  EVENT_CONTACT_NEW_RESET,
  EVENT_CONTACT_NEW_SUCCESS,
  EVENT_CONTACT_UPDATE_BY_ID_FAIL,
  EVENT_CONTACT_UPDATE_BY_ID_REQUEST,
  EVENT_CONTACT_UPDATE_BY_ID_RESET,
  EVENT_CONTACT_UPDATE_BY_ID_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_NEW_FAIL,
  EVENT_NEW_REQUEST,
  EVENT_NEW_RESET,
  EVENT_NEW_SUCCESS,
  EVENT_PUBLISH_FAIL,
  EVENT_PUBLISH_REQUEST,
  EVENT_PUBLISH_RESET,
  EVENT_PUBLISH_SUCCESS,
  EVENT_REGISTER_FAIL,
  EVENT_REGISTER_REQUEST,
  EVENT_REGISTER_RESET,
  EVENT_REGISTER_SUCCESS,
  EVENT_UNPUBLISH_FAIL,
  EVENT_UNPUBLISH_REQUEST,
  EVENT_UNPUBLISH_RESET,
  EVENT_UNPUBLISH_SUCCESS,
  EVENT_UPDATE_BY_ID_FAIL,
  EVENT_UPDATE_BY_ID_REQUEST,
  EVENT_UPDATE_BY_ID_RESET,
  EVENT_UPDATE_BY_ID_SUCCESS,
} from '../constants/eventConstants';

export const eventNewReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_NEW_REQUEST:
      return { loading: true };
    case EVENT_NEW_SUCCESS:
      return { loading: false, success: true, newCreatedEvent: action.payload };
    case EVENT_NEW_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const eventAllReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_ALL_REQUEST:
      return { loading: true };
    case EVENT_ALL_SUCCESS:
      return { loading: false, events: action.payload };
    case EVENT_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const eventByIdReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case EVENT_BY_ID_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const eventUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case EVENT_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

///////////Event Contact/////////////////////////

export const eventContactNewReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CONTACT_NEW_REQUEST:
      return { loading: true };
    case EVENT_CONTACT_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case EVENT_CONTACT_NEW_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CONTACT_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const eventContactAllReducer = (
  state = { eventContacts: [] },
  action
) => {
  switch (action.type) {
    case EVENT_CONTACT_ALL_REQUEST:
      return { loading: true };
    case EVENT_CONTACT_ALL_SUCCESS:
      return { loading: false, eventContacts: action.payload };
    case EVENT_CONTACT_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const eventContactByIdReducer = (
  state = { eventContact: {} },
  action
) => {
  switch (action.type) {
    case EVENT_CONTACT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case EVENT_CONTACT_BY_ID_SUCCESS:
      return { loading: false, success: true, eventContact: action.payload };
    case EVENT_CONTACT_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CONTACT_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const eventContactUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CONTACT_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case EVENT_CONTACT_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: action.payload };
    case EVENT_CONTACT_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CONTACT_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const eventContactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CONTACT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

/////////////////////Event Publish//////////////////////////////////////

export const eventPublishReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_PUBLISH_REQUEST:
      return { loading: true };
    case EVENT_PUBLISH_SUCCESS:
      return { loading: false, success: action.payload };
    case EVENT_PUBLISH_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_PUBLISH_RESET:
      return {};
    default:
      return state;
  }
};

export const eventUnpublishReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_UNPUBLISH_REQUEST:
      return { loading: true };
    case EVENT_UNPUBLISH_SUCCESS:
      return { loading: false, success: action.payload };
    case EVENT_UNPUBLISH_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_UNPUBLISH_RESET:
      return {};
    default:
      return state;
  }
};

///////////////////Event Register///////////////////////////////////////////

export const eventRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_REGISTER_REQUEST:
      return { loading: true };
    case EVENT_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case EVENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
