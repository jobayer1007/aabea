import axios from 'axios';

import {
  USER_APPROVE_FAIL,
  USER_APPROVE_REQUEST,
  USER_APPROVE_SUCCESS,
  USER_CREATE_ADMIN_FAIL,
  USER_CREATE_ADMIN_REQUEST,
  USER_CREATE_ADMIN_SUCCESS,
  USER_DELETE_ADMIN_FAIL,
  USER_DELETE_ADMIN_REQUEST,
  USER_DELETE_ADMIN_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_DONATE_FAIL,
  USER_DONATE_REQUEST,
  USER_DONATE_SUCCESS,
  USER_DONATION_DETAILS_FAIL,
  USER_DONATION_DETAILS_REQUEST,
  USER_DONATION_DETAILS_SUCCESS,
  USER_EMAIL_VERIFY_FAIL,
  USER_EMAIL_VERIFY_REQUEST,
  USER_EMAIL_VERIFY_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PAYMENT_DETAILS_FAIL,
  USER_PAYMENT_DETAILS_REQUEST,
  USER_PAYMENT_DETAILS_RESET,
  USER_PAYMENT_DETAILS_SUCCESS,
  USER_PAY_FAIL,
  USER_PAY_REQUEST,
  USER_PAY_SUCCESS,
  USER_PENDING_DELETE_FAIL,
  USER_PENDING_DELETE_REQUEST,
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
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const login = (userRole, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { userRole, email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_PENDING_LIST_RESET });
  dispatch({ type: USER_PENDING_DETAILS_RESET });
};

export const register = (
  email,
  password,
  firstName,
  mInit,
  lastName,
  address1,
  city,
  state,
  zipcode,
  primaryPhone,
  degree,
  degreeYear,
  major,
  collegeName
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/register',
      {
        email,
        password,
        firstName,
        mInit,
        lastName,
        address1,
        city,
        state,
        zipcode,
        primaryPhone,
        degree,
        degreeYear,
        major,
        collegeName,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data,
    // });

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetailsById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/users/${id}`,

      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/users/profile`,

      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/dashboard`, config);
    // dispatch({ type: USER_DETAILS_RESET });

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user.id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserPaymentDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PAYMENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/payment`, config);

    dispatch({
      type: USER_PAYMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PAYMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payUser = (id, paymentTypeName, qty, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/users/${id}/pay`,
      { paymentTypeName, qty, paymentResult },
      config
    );
    console.log('qty value: ' + qty);

    dispatch({
      type: USER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyUserEmail = (hash, email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_EMAIL_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/users/activate/${hash}`,
      { email },
      config
    );

    dispatch({
      type: USER_EMAIL_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_EMAIL_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const donateUser = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DONATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/users/${id}/donate`,
      paymentResult,
      config
    );

    dispatch({
      type: USER_DONATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DONATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDonationDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DONATION_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/donate`, config);

    dispatch({
      type: USER_DONATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DONATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPendingUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PENDING_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/pending`, config);
    dispatch({ type: USER_DETAILS_RESET });

    dispatch({
      type: USER_PENDING_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PENDING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPendingUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PENDING_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/users/${id}/pending`,

      config
    );

    dispatch({
      type: USER_PENDING_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PENDING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_APPROVE_REQUEST,
    });
    console.log(id);
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/users/${id}/pending`, config);

    dispatch({ type: USER_APPROVE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_APPROVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// not yet employed
export const deletePendingUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PENDING_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_PENDING_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_PENDING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAdminUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_ADMIN_REQUEST,
    });
    console.log(id);
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/users/${id}/admin`, config);

    dispatch({ type: USER_CREATE_ADMIN_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CREATE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Not yet employed
export const deleteAdminUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_ADMIN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}/admin`, config);

    dispatch({ type: USER_DELETE_ADMIN_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
