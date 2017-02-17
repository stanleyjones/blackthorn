import { FETCHING_USER, FETCHED_USER } from '../user/actions';

import {
  DELETING_CAMPAIGN,
  DELETED_CAMPAIGN,
  EDIT_CAMPAIGN,
  NEW_CAMPAIGN,
  SAVING_CAMPAIGN,
  SAVED_CAMPAIGN,
} from './actions';

const initState = {
  loading: false,
  data: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case EDIT_CAMPAIGN: {
      const campaignIndex = state.data.findIndex(campaign => campaign.id === action.id);
      const campaigns = [...state.data];
      campaigns[campaignIndex] = {
        ...campaigns[campaignIndex],
        ...action.attrs,
      };
      return { ...state, data: campaigns };
    }

    case NEW_CAMPAIGN:
      return { ...state, data: [...state.data, { name: 'New Campaign' }] };

    case DELETING_CAMPAIGN:
    case FETCHING_USER:
    case SAVING_CAMPAIGN:
      return { ...state, loading: true };

    case FETCHED_USER:
      return { ...state, loading: false, data: action.data.user.campaigns };

    case DELETED_CAMPAIGN:
    case SAVED_CAMPAIGN:
      return { ... state, loading: false, data: action.data.campaigns };

    default:
      return state;
  }
};

export default reducer;
