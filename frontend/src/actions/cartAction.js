import axios from 'axios';

import {
  CART_NEW_FAIL,
  CART_NEW_REQUEST,
  CART_NEW_SUCCESS,
} from '../constants/cartConstants';

export const addToCart =
  (
    eventId,
    eventName,
    mInit,
    firstName,
    lastName,
    isMember,
    memberId,
    email,
    phone,
    numberOfAdults,
    numberOfMinors
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_NEW_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(
        `/api/events/register/${memberId}`,

        config
      );

      dispatch({
        type: CART_NEW_SUCCESS,
        payload: {
          eventId,
          eventName,
          mInit,
          firstName,
          lastName,
          isMember,
          memberId: data,
          email,
          phone,
          numberOfAdults,
          numberOfMinors,
        },
      });

      // localStorage.setItem(
      //   'cartItems',
      //   JSON.stringify(getState().cart.cartItems)
      // );
    } catch (error) {
      dispatch({
        type: CART_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
