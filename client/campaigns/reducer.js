import { FETCHING_USER, FETCHED_USER } from '../user/actions';

const initState = {
  loading: false,
  data: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return Object.assign({}, state, { loading: true });

    case FETCHED_USER:
      return Object.assign({}, state, { loading: false, data: action.data.user.campaigns });
    default:
      return {};
  }
};

export default reducer;
