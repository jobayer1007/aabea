import axios from 'axios';
import {
  EVENT_ALL_FAIL,
  EVENT_ALL_REQUEST,
  EVENT_ALL_SUCCESS,
  EVENT_BY_ID_FAIL,
  EVENT_BY_ID_REQUEST,
  EVENT_BY_ID_SUCCESS,
  EVENT_CONTACT_ALL_FAIL,
  EVENT_CONTACT_ALL_REQUEST,
  EVENT_CONTACT_ALL_SUCCESS,
  EVENT_CONTACT_BY_ID_FAIL,
  EVENT_CONTACT_BY_ID_REQUEST,
  EVENT_CONTACT_BY_ID_SUCCESS,
  EVENT_CONTACT_DELETE_FAIL,
  EVENT_CONTACT_DELETE_REQUEST,
  EVENT_CONTACT_DELETE_SUCCESS,
  EVENT_CONTACT_NEW_FAIL,
  EVENT_CONTACT_NEW_REQUEST,
  EVENT_CONTACT_NEW_SUCCESS,
  EVENT_CONTACT_UPDATE_BY_ID_FAIL,
  EVENT_CONTACT_UPDATE_BY_ID_REQUEST,
  EVENT_CONTACT_UPDATE_BY_ID_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_NEW_FAIL,
  EVENT_NEW_REQUEST,
  EVENT_NEW_SUCCESS,
  EVENT_PUBLISH_FAIL,
  EVENT_PUBLISH_REQUEST,
  EVENT_PUBLISH_SUCCESS,
  EVENT_REGISTER_FAIL,
  EVENT_REGISTER_REQUEST,
  EVENT_REGISTER_SUCCESS,
  EVENT_UNPUBLISH_FAIL,
  EVENT_UNPUBLISH_REQUEST,
  EVENT_UNPUBLISH_SUCCESS,
  EVENT_UPDATE_BY_ID_FAIL,
  EVENT_UPDATE_BY_ID_REQUEST,
  EVENT_UPDATE_BY_ID_SUCCESS,
} from '../constants/eventConstants';

export const newEvent =
  (
    eventName,
    eventDescription,
    // eventStartDate,
    // eventEndDate,
    // eventStartTime,
    // eventEndTime,
    eventDate,
    eventAddress,
    adultFee,
    minorFee,
    cap
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_NEW_REQUEST,
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
        '/api/events/new',
        {
          eventName,
          eventDescription,
          // eventStartDate,
          // eventEndDate,
          // eventStartTime,
          // eventEndTime,
          eventDate,
          eventAddress,
          adultFee,
          minorFee,
          cap,
        },
        config
      );

      dispatch({
        type: EVENT_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allEvents = (subDomain) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/events`, { subDomain }, config);

    dispatch({
      type: EVENT_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/events/${id}`,

      config
    );

    dispatch({
      type: EVENT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEventById =
  (
    id,
    eventName,
    eventDescription,
    // eventStartDate,
    // eventEndDate,
    // eventStartTime,
    // eventEndTime,
    eventDate,
    eventAddress,
    adultFee,
    minorFee,
    cap
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_UPDATE_BY_ID_REQUEST,
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

      const { data } = await axios.put(
        `/api/events/${id}`,
        {
          eventName,
          eventDescription,
          // eventStartDate,
          // eventEndDate,
          // eventStartTime,
          // eventEndTime,
          eventDate,
          eventAddress,
          adultFee,
          minorFee,
          cap,
        },
        config
      );

      dispatch({
        type: EVENT_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
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

    await axios.delete(`/api/events/${id}`, config);

    dispatch({ type: EVENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

////////////////////Event Contact///////////////////////////////////////
export const newEventContact =
  (id, memberId, positionName, contactEmail, contactPhone) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_CONTACT_NEW_REQUEST,
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
        `/api/events/newContact/${id}`,
        {
          memberId,
          positionName,
          contactEmail,
          contactPhone,
        },
        config
      );

      dispatch({
        type: EVENT_CONTACT_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_CONTACT_NEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const eventAllContact = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_CONTACT_ALL_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/events/contacts/${id}`, config);

    dispatch({
      type: EVENT_CONTACT_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CONTACT_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventContactById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_CONTACT_BY_ID_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/events/contactby/${id}`, {}, config);

    dispatch({
      type: EVENT_CONTACT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CONTACT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEventContactById =
  (eventContactId, memberId, positionName, contactEmail, contactPhone) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_CONTACT_UPDATE_BY_ID_REQUEST,
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

      const { data } = await axios.put(
        `/api/events/contactby/${eventContactId}`,
        {
          memberId,
          positionName,
          contactEmail,
          contactPhone,
        },
        config
      );

      dispatch({
        type: EVENT_CONTACT_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_CONTACT_UPDATE_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteEventContact = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_CONTACT_DELETE_REQUEST,
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

    await axios.delete(`/api/events/contactby/${id}`, config);

    dispatch({ type: EVENT_CONTACT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EVENT_CONTACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

///////////////////////Event publish/////////////////////////////////////////////////

export const publishEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_PUBLISH_REQUEST,
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

    const { data } = await axios.put(`/api/events/publish/${id}`, {}, config);

    dispatch({
      type: EVENT_PUBLISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_PUBLISH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unpublishEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_UNPUBLISH_REQUEST,
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

    const { data } = await axios.put(`/api/events/unpublish/${id}`, {}, config);

    dispatch({
      type: EVENT_UNPUBLISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_UNPUBLISH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/////////////////////////Event Registration///////////////////////////////////////////////

export const registerEvent =
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
    numberOfMinors,
    paymentResult
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: EVENT_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/events/register',
        {
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
          numberOfMinors,
          paymentResult,
        },
        config
      );

      dispatch({
        type: EVENT_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
