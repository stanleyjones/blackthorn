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
      const campaignIndex = state.data.findIndex(campaign => campaign.id === action.id);
      const campaigns = [...state.data];
      campaigns[campaignIndex] = {
        ...campaigns[campaignIndex],
        ...action.attrs,
      };
      return { ...state, data: campaigns };
    }

    case CREATE:
    case DELETE:
    case FETCH_USER:
    case SAVE:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.data.user.campaigns };

    case CREATE_SUCCESS:
    case DELETE_SUCCESS:
    case SAVE_SUCCESS:
      return { ...state, loading: false, data: action.data.campaigns };

    default:
      return state;
  }
};

export default reducer;
