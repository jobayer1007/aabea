import {
  COMMITTEE_MEMBER_ALL_FAIL,
  COMMITTEE_MEMBER_ALL_REQUEST,
  COMMITTEE_MEMBER_ALL_SUCCESS,
  COMMITTEE_MEMBER_BY_ID_FAIL,
  COMMITTEE_MEMBER_BY_ID_REQUEST,
  COMMITTEE_MEMBER_BY_ID_RESET,
  COMMITTEE_MEMBER_BY_ID_SUCCESS,
  COMMITTEE_MEMBER_DELETE_FAIL,
  COMMITTEE_MEMBER_DELETE_REQUEST,
  COMMITTEE_MEMBER_DELETE_SUCCESS,
  COMMITTEE_MEMBER_NEW_FAIL,
  COMMITTEE_MEMBER_NEW_REQUEST,
  COMMITTEE_MEMBER_NEW_RESET,
  COMMITTEE_MEMBER_NEW_SUCCESS,
  COMMITTEE_MEMBER_UPDATE_BY_ID_FAIL,
  COMMITTEE_MEMBER_UPDATE_BY_ID_REQUEST,
  COMMITTEE_MEMBER_UPDATE_BY_ID_RESET,
  COMMITTEE_MEMBER_UPDATE_BY_ID_SUCCESS,
} from '../constants/committeeConstants';

export const cMemberNewReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMITTEE_MEMBER_NEW_REQUEST:
      return { loading: true };
    case COMMITTEE_MEMBER_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case COMMITTEE_MEMBER_NEW_FAIL:
      return { loading: false, error: action.payload };
    case COMMITTEE_MEMBER_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const cMemberAllReducer = (state = { cMembers: [] }, action) => {
  switch (action.type) {
    case COMMITTEE_MEMBER_ALL_REQUEST:
      return { loading: true };
    case COMMITTEE_MEMBER_ALL_SUCCESS:
      return { loading: false, cMembers: action.payload };
    case COMMITTEE_MEMBER_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cMemberByIdReducer = (state = { cMember: {} }, action) => {
  switch (action.type) {
    case COMMITTEE_MEMBER_BY_ID_REQUEST:
      return { ...state, loading: true };
    case COMMITTEE_MEMBER_BY_ID_SUCCESS:
      return { loading: false, success: true, cMember: action.payload };
    case COMMITTEE_MEMBER_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case COMMITTEE_MEMBER_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const cMemberUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMITTEE_MEMBER_UPDATE_BY_ID_REQUEST:
      return { loading: true };
    case COMMITTEE_MEMBER_UPDATE_BY_ID_SUCCESS:
      return { loading: false, success: true, cMember: action.payload };
    case COMMITTEE_MEMBER_UPDATE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case COMMITTEE_MEMBER_UPDATE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const cMemberDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMITTEE_MEMBER_DELETE_REQUEST:
      return { loading: true };
    case COMMITTEE_MEMBER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMITTEE_MEMBER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
