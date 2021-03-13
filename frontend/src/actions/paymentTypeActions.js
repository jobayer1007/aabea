import axios from 'axios';
import {
  PAYMENT_TYPE_DELETE_FAIL,
  PAYMENT_TYPE_DELETE_REQUEST,
  PAYMENT_TYPE_DELETE_SUCCESS,
  PAYMENT_TYPE_LIST_FAIL,
  PAYMENT_TYPE_LIST_REQUEST,
  PAYMENT_TYPE_LIST_SUCCESS,
  PAYMENT_TYPE_REGISTER_FAIL,
  PAYMENT_TYPE_REGISTER_REQUEST,
  PAYMENT_TYPE_REGISTER_SUCCESS,
} from '../constants/paymentTypeConstants';

export const registerPaymentType = (
  paymentTypeName,
  paymentTypeAmount,
  paymentTypeDescription
) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_TYPE_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/chapters/paymenttype',
      {
        paymentTypeName,
        paymentTypeAmount,
        paymentTypeDescription,
      },
      config
    );

    dispatch({
      type: PAYMENT_TYPE_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: PAYMENT_TYPE_LOGIN_SUCCESS,
    //   payload: data,
    // });

    // localStorage.setItem('CHAPTERInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PAYMENT_TYPE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPaymentTypes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_TYPE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chapters/paymentType`, config);
    // dispatch({ type: PAYMENT_TYPE_DETAILS_RESET });

    dispatch({
      type: PAYMENT_TYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_TYPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePaymentType = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_TYPE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/chapters/paymentType/${id}`, config);

    dispatch({ type: PAYMENT_TYPE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PAYMENT_TYPE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
