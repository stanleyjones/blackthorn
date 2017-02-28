import { queryGraph } from '../helpers';

import { clearToken, getToken, setToken } from './helpers';

export const AUTHENTICATING_USER = 'AUTHENTICATING_USER';
export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const FETCHING_USER = 'FETCHING_USER';
export const FETCHED_USER = 'FETCHED_USER';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const REQUESTING_PASSCODE = 'REQUESTING_PASSCODE';
export const REQUESTED_PASSCODE = 'REQUESTED_PASSCODE';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const fetchUser = () => (dispatch) => {
  dispatch({ type: FETCHING_USER });
  try {
    const { data } = queryGraph(`
      query {
        user: queryUser(token: "${getToken()}") {
          id: _id,
          campaigns { id: _id, name, userId },
          name,
        }
      }
    `);
    return dispatch({ type: FETCHED_USER, data });
  } catch (err) {
    return dispatch({ type: FETCH_USER_ERROR, err });
  }
};

export const requestPasscode = email => (dispatch) => {
  dispatch({ type: REQUESTING_PASSCODE });
  try {
    const { data: { id } } = queryGraph(`
      mutation {
        id: requestPasscode(email: "${email}")
      }
    `);
    if (!id) { return dispatch({ type: REQUEST_FAILED }); }
    return dispatch({ type: REQUESTED_PASSCODE, id });
  } catch (err) {
    return dispatch({ type: REQUEST_FAILED, err });
  }
};

export const authUser = (id, passcode) => (dispatch) => {
  dispatch({ type: AUTHENTICATING_USER });
  try {
    const { data: { auth: { token } } } = queryGraph(`
      mutation {
        auth(id: "${id}", passcode: "${passcode}") { error, token }
      }
    `);
    if (token) {
      setToken(token);
      return dispatch({ type: AUTHENTICATED_USER, redirect: '/' });
    }
    clearToken();
    return dispatch({ type: AUTHENTICATION_FAILED, redirect: '/login' });
  } catch (err) {
    clearToken();
    return dispatch({ type: AUTHENTICATION_FAILED, err, redirect: '/login' });
  }
};
