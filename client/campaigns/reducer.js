import { FETCHING_USER, FETCHED_USER } from '../user/actions';

import { NEW_CAMPAIGN } from './actions';

const initState = {
  loading: false,
  data: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case NEW_CAMPAIGN:
      return Object.assign({}, state, {
        data: [...state.data, { name: 'New Campaign' }],
      });

    case FETCHING_USER:
      return Object.assign({}, state, { loading: true });

    case FETCHED_USER:
      return Object.assign({}, state, { loading: false, data: action.data.user.campaigns });

    default:
      return state;
  }
};

export default reducer;
