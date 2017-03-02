import { queryGraph } from '../shared/helpers';

import { clearToken, getToken, setToken } from './helpers';

export const AUTHENTICATE = 'USER.AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'USER.AUTHENTICATE.SUCCESS';
export const AUTHENTICATE_FAILURE = 'USER.AUTHENTICATE.FAILURE';
export const FETCH = 'USER.FETCH';
export const FETCH_SUCCESS = 'USER.FETCH.SUCCESS';
export const FETCH_FAILURE = 'USER.FETCH.FAILURE';
export const INVITE = 'USER.INVITE';
export const INVITE_SUCCESS = 'USER.INVITE.SUCCESS';
export const INVITE_FAILURE = 'USER.INVITE.FAILURE';
export const REQUEST_PASSCODE = 'USER.REQUEST_PASSCODE';
export const REQUEST_PASSCODE_SUCCESS = 'USER.REQUEST_PASSCODE.SUCCESS';
export const REQUEST_PASSCODE_FAILURE = 'USER.REQUEST_PASSCODE.FAILURE';

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH });
  try {
    const { data } = await queryGraph(`
      query {
        user: queryUser(token: "${getToken()}") {
          id: _id,
          campaigns {
            characters { id, name },
            id: _id,
            name,
            players { id: _id, name, email },
            userId,
          },
          characters {
            id,
            name,
            description,
            campaign { id: _id },
            player { id: _id }
          },
          name,
        }
      }
    `);
    return dispatch({ type: FETCH_SUCCESS, data });
  } catch (err) {
    return dispatch({ type: FETCH_FAILURE, err });
  }
};

export const requestPasscode = email => async (dispatch) => {
  dispatch({ type: REQUEST_PASSCODE });
  try {
    const { data: { id } } = await queryGraph(`
      mutation {
        id: requestPasscode(email: "${email}")
      }
    `);
    if (!id) { return dispatch({ type: REQUEST_PASSCODE_FAILURE }); }
    return dispatch({ type: REQUEST_PASSCODE_SUCCESS, id });
  } catch (err) {
    return dispatch({ type: REQUEST_PASSCODE_FAILURE, err });
  }
};

export const authUser = (id, passcode) => async (dispatch) => {
  dispatch({ type: AUTHENTICATE });
  try {
    const { data: { auth: { token } } } = await queryGraph(`
      mutation {
        auth(id: "${id}", passcode: "${passcode}") { error, token }
      }
    `);
    if (token) {
      setToken(token);
      return dispatch({ type: AUTHENTICATE_SUCCESS, redirect: '/' });
    }
    clearToken();
    return dispatch({ type: AUTHENTICATE_FAILURE, redirect: '/login' });
  } catch (err) {
    clearToken();
    return dispatch({ type: AUTHENTICATE_FAILURE, err, redirect: '/login' });
  }
};

export const inviteUser = (email, campaignId) => async (dispatch) => {
  dispatch({ type: INVITE, campaignId });
  try {
    const { data: { name } } = await queryGraph(`
      mutation {
        inviteUser(email: "${email}", campaignId: "${campaignId}") {
          name
        }
      }
    `);
    return dispatch({ type: INVITE_SUCCESS, name, campaignId });
  } catch (err) {
    return dispatch({ type: INVITE_FAILURE, err });
  }
};
