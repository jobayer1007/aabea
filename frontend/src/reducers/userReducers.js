import {
  USER_ALL_LIST_FAIL,
  USER_ALL_LIST_REQUEST,
  USER_ALL_LIST_RESET,
  USER_ALL_LIST_SUCCESS,
  USER_APPROVE_FAIL,
  USER_APPROVE_REQUEST,
  USER_APPROVE_RESET,
  USER_APPROVE_SUCCESS,
  USER_CREATE_ADMIN_FAIL,
  USER_CREATE_ADMIN_REQUEST,
  USER_CREATE_ADMIN_RESET,
  USER_CREATE_ADMIN_SUCCESS,
  USER_DELETE_ADMIN_FAIL,
  USER_DELETE_ADMIN_REQUEST,
  USER_DELETE_ADMIN_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_BY_ID_FAIL,
  USER_DETAILS_BY_ID_REQUEST,
  USER_DETAILS_BY_ID_RESET,
  USER_DETAILS_BY_ID_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_DONATE_FAIL,
  USER_DONATE_REQUEST,
  USER_DONATE_RESET,
  USER_DONATE_SUCCESS,
  USER_DONATION_DETAILS_FAIL,
  USER_DONATION_DETAILS_REQUEST,
  USER_DONATION_DETAILS_RESET,
  USER_DONATION_DETAILS_SUCCESS,
  USER_EMAIL_VERIFY_FAIL,
  USER_EMAIL_VERIFY_REQUEST,
  USER_EMAIL_VERIFY_RESET,
  USER_EMAIL_VERIFY_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_RESET,
  USER_PASSWORD_RESET_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_RESET,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PAYMENT_DETAILS_FAIL,
  USER_PAYMENT_DETAILS_REQUEST,
  USER_PAYMENT_DETAILS_RESET,
  USER_PAYMENT_DETAILS_SUCCESS,
  USER_PAY_FAIL,
  USER_PAY_REQUEST,
  USER_PAY_RESET,
  USER_PAY_SUCCESS,
  USER_PENDING_DELETE_FAIL,
  USER_PENDING_DELETE_REQUEST,
  USER_PENDING_DELETE_RESET,
  USER_PENDING_DELETE_SUCCESS,
  USER_PENDING_DETAILS_FAIL,
  USER_PENDING_DETAILS_REQUEST,
  USER_PENDING_DETAILS_RESET,
  USER_PENDING_DETAILS_SUCCESS,
  USER_PENDING_LIST_FAIL,
  USER_PENDING_LIST_REQUEST,
  USER_PENDING_LIST_RESET,
  USER_PENDING_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_VERIFY_EMAIL_RESEND_FAIL,
  USER_VERIFY_EMAIL_RESEND_REQUEST,
  USER_VERIFY_EMAIL_RESEND_RESET,
  USER_VERIFY_EMAIL_RESEND_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

export const userDetailsByIdReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_BY_ID_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_BY_ID_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_BY_ID_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [], admins: [] };
    default:
      return state;
  }
};

export const userAllListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ALL_LIST_REQUEST:
      return { loading: true };
    case USER_ALL_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload };

    case USER_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ALL_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUptadeReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userPaymentDetailsReducer = (state = { payments: [] }, action) => {
  switch (action.type) {
    case USER_PAYMENT_DETAILS_REQUEST:
      return { loading: true };
    case USER_PAYMENT_DETAILS_SUCCESS:
      return { loading: false, payments: action.payload };

    case USER_PAYMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_PAYMENT_DETAILS_RESET:
      return {
        payments: [],
      };

    default:
      return state;
  }
};

export const userPayReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PAY_REQUEST:
      return { loading: true };
    case USER_PAY_SUCCESS:
      return { loading: false, success: action.payload };

    case USER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case USER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const userEmailVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_VERIFY_REQUEST:
      return { loading: true };
    case USER_EMAIL_VERIFY_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_EMAIL_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case USER_EMAIL_VERIFY_RESET:
      return {};
    default:
      return state;
  }
};

export const userVerificationEmailResendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_EMAIL_RESEND_REQUEST:
      return { loading: true };
    case USER_VERIFY_EMAIL_RESEND_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_VERIFY_EMAIL_RESEND_FAIL:
      return { loading: false, error: action.payload };
    case USER_VERIFY_EMAIL_RESEND_RESET:
      return {};
    default:
      return state;
  }
};

export const userDonateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DONATE_REQUEST:
      return { loading: true };
    case USER_DONATE_SUCCESS:
      return { loading: false, success: true, donateResulte: action.payload };

    case USER_DONATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DONATE_RESET:
      return {};

    default:
      return state;
  }
};

export const userDonationDetailsReducer = (
  state = { donations: [] },
  action
) => {
  switch (action.type) {
    case USER_DONATION_DETAILS_REQUEST:
      return { loading: true };
    case USER_DONATION_DETAILS_SUCCESS:
      return { loading: false, donations: action.payload };

    case USER_DONATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DONATION_DETAILS_RESET:
      return {
        donations: [],
      };

    default:
      return state;
  }
};

export const userPendingListReducer = (
  state = { pendingUsers: [] },
  action
) => {
  switch (action.type) {
    case USER_PENDING_LIST_REQUEST:
      return { loading: true };
    case USER_PENDING_LIST_SUCCESS:
      return { loading: false, pendingUsers: action.payload };
    case USER_PENDING_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_PENDING_LIST_RESET:
      return { pendingUsers: [] };
    default:
      return state;
  }
};

export const userPendingDetailsReducer = (
  state = { pendingUser: {} },
  action
) => {
  switch (action.type) {
    case USER_PENDING_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_PENDING_DETAILS_SUCCESS:
      return { loading: false, pendingUser: action.payload };

    case USER_PENDING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_PENDING_DETAILS_RESET:
      return {
        pendingUser: {},
      };

    default:
      return state;
  }
};

export const userPendingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PENDING_DELETE_REQUEST:
      return { loading: true };
    case USER_PENDING_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_PENDING_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PENDING_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userApproveReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_APPROVE_REQUEST:
      return { loading: true };
    case USER_APPROVE_SUCCESS:
      return { loading: false, success: true };
    case USER_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case USER_APPROVE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userCreateAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_CREATE_ADMIN_REQUEST:
      return { loading: true };
    case USER_CREATE_ADMIN_SUCCESS:
      return { loading: false, success: true };
    case USER_CREATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_ADMIN_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userDeleteAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_ADMIN_REQUEST:
      return { loading: true };
    case USER_DELETE_ADMIN_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_DELETE_ADMIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return { loading: true };
    case USER_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    case USER_PASSWORD_RESET_RESET:
      return {};
    default:
      return state;
  }
};

export const userPasswordUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_UPDATE_REQUEST:
      return { loading: true };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_PASSWORD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PASSWORD_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
