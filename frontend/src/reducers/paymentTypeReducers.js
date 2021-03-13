import {
  PAYMENT_TYPE_DELETE_FAIL,
  PAYMENT_TYPE_DELETE_REQUEST,
  PAYMENT_TYPE_DELETE_SUCCESS,
  PAYMENT_TYPE_LIST_FAIL,
  PAYMENT_TYPE_LIST_REQUEST,
  PAYMENT_TYPE_LIST_RESET,
  PAYMENT_TYPE_LIST_SUCCESS,
  PAYMENT_TYPE_REGISTER_FAIL,
  PAYMENT_TYPE_REGISTER_REQUEST,
  PAYMENT_TYPE_REGISTER_RESET,
  PAYMENT_TYPE_REGISTER_SUCCESS,
} from '../constants/paymentTypeConstants';

export const paymentTypeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_TYPE_REGISTER_REQUEST:
      return { loading: true };
    case PAYMENT_TYPE_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case PAYMENT_TYPE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_TYPE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const paymentTypeListReducer = (
  state = { paymentTypes: [] },
  action
) => {
  switch (action.type) {
    case PAYMENT_TYPE_LIST_REQUEST:
      return { loading: true };
    case PAYMENT_TYPE_LIST_SUCCESS:
      return { loading: false, paymentTypes: action.payload };
    case PAYMENT_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_TYPE_LIST_RESET:
      return { paymentTypes: [] };
    default:
      return state;
  }
};

export const paymentTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_TYPE_DELETE_REQUEST:
      return { loading: true };
    case PAYMENT_TYPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PAYMENT_TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
