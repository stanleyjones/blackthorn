import {
  AUTHENTICATE,
  FETCH,
  FETCH_SUCCESS,
  REQUEST_PASSCODE_SUCCESS,
} from './actions';

const initState = {
  loading: false,
  data: {},
  requestedPasscode: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case AUTHENTICATE:
    case FETCH:
      return { ...state, loading: true };

    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.data.user };

    case REQUEST_PASSCODE_SUCCESS:
      return { ...state, requestedPasscode: action.id };

    default:
      return state;

  }
};

export default reducer;
