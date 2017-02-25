import {
  AUTHENTICATING_USER,
  FETCHING_USER,
  FETCHED_USER,
  REQUESTED_PASSCODE,
} from './actions';

const initState = {
  loading: false,
  data: {},
  requestedPasscode: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case AUTHENTICATING_USER:
    case FETCHING_USER:
      return { ...state, loading: true };

    case FETCHED_USER:
      return { ...state, loading: false, data: action.data.user };

    case REQUESTED_PASSCODE:
      return { ...state, requestedPasscode: action.id };

    default:
      return state;

  }
};

export default reducer;
