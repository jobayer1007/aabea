import {
  IMAGE_ALL_FAIL,
  IMAGE_ALL_REQUEST,
  IMAGE_ALL_SUCCESS,
  IMAGE_BY_ID_FAIL,
  IMAGE_BY_ID_REQUEST,
  IMAGE_BY_ID_RESET,
  IMAGE_BY_ID_SUCCESS,
  IMAGE_DELETE_FAIL,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETE_SUCCESS,
  IMAGE_NEW_FAIL,
  IMAGE_NEW_REQUEST,
  IMAGE_NEW_RESET,
  IMAGE_NEW_SUCCESS,
} from '../constants/imageConstants';

export const imageNewReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_NEW_REQUEST:
      return { loading: true };
    case IMAGE_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case IMAGE_NEW_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const imageAllReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGE_ALL_REQUEST:
      return { loading: true };
    case IMAGE_ALL_SUCCESS:
      return { loading: false, images: action.payload };
    case IMAGE_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const imageByIdReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case IMAGE_BY_ID_SUCCESS:
      return { loading: false, success: true, image: action.payload };
    case IMAGE_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const imageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true };
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
