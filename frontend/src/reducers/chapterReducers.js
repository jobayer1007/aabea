import {
  CHAPTER_DELETE_FAIL,
  CHAPTER_DELETE_REQUEST,
  CHAPTER_DELETE_SUCCESS,
  CHAPTER_LIST_FAIL,
  CHAPTER_LIST_REQUEST,
  CHAPTER_LIST_RESET,
  CHAPTER_LIST_SUCCESS,
  CHAPTER_REGISTER_FAIL,
  CHAPTER_REGISTER_REQUEST,
  CHAPTER_REGISTER_RESET,
  CHAPTER_REGISTER_SUCCESS,
  CHAPTER_SETTINGS_FAIL,
  CHAPTER_SETTINGS_NEW_FAIL,
  CHAPTER_SETTINGS_NEW_REQUEST,
  CHAPTER_SETTINGS_NEW_RESET,
  CHAPTER_SETTINGS_NEW_SUCCESS,
  CHAPTER_SETTINGS_REQUEST,
  CHAPTER_SETTINGS_RESET,
  CHAPTER_SETTINGS_SUCCESS,
  CHAPTER_SETTINGS_UPDATE_FAIL,
  CHAPTER_SETTINGS_UPDATE_REQUEST,
  CHAPTER_SETTINGS_UPDATE_RESET,
  CHAPTER_SETTINGS_UPDATE_SUCCESS,
} from '../constants/chapterConstants';

export const chapterRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAPTER_REGISTER_REQUEST:
      return { loading: true };
    case CHAPTER_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case CHAPTER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case CHAPTER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const chapterListReducer = (state = { chapters: [] }, action) => {
  switch (action.type) {
    case CHAPTER_LIST_REQUEST:
      return { loading: true };
    case CHAPTER_LIST_SUCCESS:
      return { loading: false, chapters: action.payload };
    case CHAPTER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CHAPTER_LIST_RESET:
      return { chapters: [] };
    default:
      return state;
  }
};

export const chapterDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAPTER_DELETE_REQUEST:
      return { loading: true };
    case CHAPTER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CHAPTER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

///////////////////////Chapter Settings///////////////////

export const chapterSettingsNewReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAPTER_SETTINGS_NEW_REQUEST:
      return { loading: true };
    case CHAPTER_SETTINGS_NEW_SUCCESS:
      return { loading: false, success: action.payload };
    case CHAPTER_SETTINGS_NEW_FAIL:
      return { loading: false, error: action.payload };
    case CHAPTER_SETTINGS_NEW_RESET:
      return {};
    default:
      return state;
  }
};

export const chapterSettingsReducer = (
  state = { chapterSettings: {} },
  action
) => {
  switch (action.type) {
    case CHAPTER_SETTINGS_REQUEST:
      return { ...state, loading: true };
    case CHAPTER_SETTINGS_SUCCESS:
      return { loading: false, success: true, chapterSettings: action.payload };
    case CHAPTER_SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    case CHAPTER_SETTINGS_RESET:
      return {};
    default:
      return state;
  }
};

export const chapterSettingsUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAPTER_SETTINGS_UPDATE_REQUEST:
      return { loading: true };
    case CHAPTER_SETTINGS_UPDATE_SUCCESS:
      return { loading: false, success: action.payload };
    case CHAPTER_SETTINGS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CHAPTER_SETTINGS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
