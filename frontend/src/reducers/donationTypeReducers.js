import {
  DONATION_TYPE_DELETE_FAIL,
  DONATION_TYPE_DELETE_REQUEST,
  DONATION_TYPE_DELETE_SUCCESS,
  DONATION_TYPE_LIST_FAIL,
  DONATION_TYPE_LIST_REQUEST,
  DONATION_TYPE_LIST_RESET,
  DONATION_TYPE_LIST_SUCCESS,
  DONATION_TYPE_REGISTER_FAIL,
  DONATION_TYPE_REGISTER_REQUEST,
  DONATION_TYPE_REGISTER_RESET,
  DONATION_TYPE_REGISTER_SUCCESS,
} from '../constants/donationTypeConstant';

export const donationTypeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_TYPE_REGISTER_REQUEST:
      return { loading: true };
    case DONATION_TYPE_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case DONATION_TYPE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_TYPE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const donationTypeListReducer = (
  state = { donationTypes: [] },
  action
) => {
  switch (action.type) {
    case DONATION_TYPE_LIST_REQUEST:
      return { loading: true };
    case DONATION_TYPE_LIST_SUCCESS:
      return { loading: false, donationTypes: action.payload };
    case DONATION_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_TYPE_LIST_RESET:
      return { donationTypes: [] };
    default:
      return state;
  }
};

export const donationTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_TYPE_DELETE_REQUEST:
      return { loading: true };
    case DONATION_TYPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DONATION_TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
