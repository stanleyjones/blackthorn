import {
  AUTHENTICATING_USER,
  FETCHING_USER,
  FETCHED_USER,
} from './actions';

const initState = {
  loading: false,
  data: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case AUTHENTICATING_USER:
    case FETCHING_USER:
      return { ...state, loading: true };

    case FETCHED_USER:
      return { ...state, loading: false, data: action.data.user };

    default:
      return state;

  }
};

export default reducer;
