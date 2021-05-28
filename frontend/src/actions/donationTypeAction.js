import axios from 'axios';
import {
  DONATION_TYPE_DELETE_FAIL,
  DONATION_TYPE_DELETE_REQUEST,
  DONATION_TYPE_DELETE_SUCCESS,
  DONATION_TYPE_LIST_FAIL,
  DONATION_TYPE_LIST_REQUEST,
  DONATION_TYPE_LIST_SUCCESS,
  DONATION_TYPE_REGISTER_FAIL,
  DONATION_TYPE_REGISTER_REQUEST,
  DONATION_TYPE_REGISTER_SUCCESS,
} from '../constants/donationTypeConstant';

export const registerDonationType =
  (donationTypeName, donationTypeDescription) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DONATION_TYPE_REGISTER_REQUEST,
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
        '/api/chapters/donationType',
        {
          donationTypeName,
          donationTypeDescription,
        },
        config
      );

      dispatch({
        type: DONATION_TYPE_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DONATION_TYPE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listDonationTypes = () => async (dispatch) => {
  try {
    dispatch({
      type: DONATION_TYPE_LIST_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/chapters/donationType`, config);

    dispatch({
      type: DONATION_TYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONATION_TYPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDonationType = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONATION_TYPE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/chapters/donationType/${id}`, {}, config);

    dispatch({ type: DONATION_TYPE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DONATION_TYPE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
