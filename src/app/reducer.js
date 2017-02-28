import { APP_ONLINE } from './actions';

const initState = {
  online: navigator.onLine,
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    case APP_ONLINE:
      return { ...state, online: action.status };

    default:
      return state;

  }
};

export default reducer;
