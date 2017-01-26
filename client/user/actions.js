import { parseResponse, queryGraph } from '../helpers';

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
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

export const authUser = email => (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  queryGraph(`mutation { token: authUser(email: "${email}") }`)
  .then(parseResponse)
  .then(json => {
    const { data: { token } } = json;
    if (token) {
      localStorage.setItem('jwt_token', token);
      return dispatch(fetchUser());
    }
    localStorage.removeItem('jwt_token');
    return dispatch({ type: AUTHENTICATION_FAILED });
  });
};
