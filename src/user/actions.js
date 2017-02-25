import { browserHistory } from 'react-router';

import { parseResponse, queryGraph } from '../helpers';

import { clearToken, getToken, setToken } from './helpers';

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER';
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHED_USER = 'FETCHED_USER';
export const REQUESTING_PASSCODE = 'REQUESTING_PASSCODE';
export const REQUESTED_PASSCODE = 'REQUESTED_PASSCODE';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCHING_USER });
  queryGraph(`query {
    user: queryUser(token: "${getToken()}") {
      id: _id,
      campaigns { id: _id, name, userId },
      name,
    }
  }`)
  .then(parseResponse)
  .then(json => dispatch({ type: FETCHED_USER, data: json.data }));
};

export const requestPasscode = email => (dispatch) => {
  dispatch({ type: REQUESTING_PASSCODE });
  queryGraph(`mutation { id: requestPasscode(email: "${email}") }`)
  .then(parseResponse)
  .then(json => {
    const { data: { id } } = json;
    if (!id) { return dispatch({ type: REQUEST_FAILED }); }
    return dispatch({ type: REQUESTED_PASSCODE, id });
  });
};

export const authUser = (id, passcode) => (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  queryGraph(`mutation { auth(id: "${id}", passcode: "${passcode}") { error, token } }`)
  .then(parseResponse)
  .then(json => {
    const { data: { auth: { token } } } = json;
    if (token) {
      setToken(token);
      browserHistory.push('/');
      return dispatch({ type: AUTHENTICATED_USER });
    }
    clearToken();
    browserHistory.push('/login');
    return dispatch({ type: AUTHENTICATION_FAILED });
  });
};
