import { parseResponse, queryGraph } from '../helpers';

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHED_USER = 'FETCHED_USER';

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCHING_USER });
  queryGraph('{ user(email: "stanley@sunshocked.com") { email, name, campaigns { name } } }')
  .then(parseResponse)
  .then(json => dispatch({ type: FETCHED_USER, data: json.data }));
};
