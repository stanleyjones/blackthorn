import { FETCH as FETCH_USER, FETCH_SUCCESS as FETCH_USER_SUCCESS } from '../user/actions';

import {
  CREATE,
  CREATE_SUCCESS,
  DELETE,
  DELETE_SUCCESS,
  EDIT,
  SAVE_SUCCESS,
  SAVE,
} from './actions';

const initState = {
  loading: false,
  data: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case EDIT: {
      const characterIndex = state.data.findIndex(character => character.id === action.id);
      const characters = [...state.data];
      characters[characterIndex] = {
        ...characters[characterIndex],
        ...action.attrs,
      };
      return { ...state, data: characters };
    }

    case CREATE:
    case DELETE:
    case FETCH_USER:
    case SAVE:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.data.user.characters };

    case CREATE_SUCCESS:
    case DELETE_SUCCESS:
    case SAVE_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default reducer;
