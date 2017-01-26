import { FETCHING_USER, FETCHED_USER } from '../user/actions';

import { NEW_CAMPAIGN, SAVING_CAMPAIGN, SAVED_CAMPAIGN } from './actions';

const initState = {
  loading: false,
  data: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case NEW_CAMPAIGN:
      return { ...state, data: [...state.data, { name: 'New Campaign' }] };

    case SAVING_CAMPAIGN:
    case FETCHING_USER:
      return { ...state, loading: true };

    case FETCHED_USER:
      return { ...state, loading: false, data: action.data.user.campaigns };

    case SAVED_CAMPAIGN:
      return { ... state, loading: false, data: action.data.campaigns };

    default:
      return state;
  }
};

export default reducer;
