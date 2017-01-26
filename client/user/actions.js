import { parseResponse, queryGraph } from '../helpers';

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER';
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHED_USER = 'FETCHED_USER';

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCHING_USER });
  queryGraph(`query {
    user: queryUser(token: "${localStorage.getItem('jwt_token')}") {
      id: _id,
      campaigns { id: _id, name },
      name,
    }
  }`)
  .then(parseResponse)
  .then(json => dispatch({ type: FETCHED_USER, data: json.data }));
};

export const authUser = () => (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  queryGraph('mutation { token: authUser(email: "stanley@sunshocked.com") }')
  .then(parseResponse)
  .then(json => {
    localStorage.setItem('jwt_token', json.data.token);
    return dispatch(fetchUser());
  });
};
