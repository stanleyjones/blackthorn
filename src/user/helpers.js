const JWT_TOKEN = 'jwt_token';

export const clearToken = () => localStorage.removeItem(JWT_TOKEN);
export const getToken = () => localStorage.getItem(JWT_TOKEN);
export const setToken = token => localStorage.setItem(JWT_TOKEN, token);

export const authenticate = (nextState, replace) => {
  if (!getToken()) { replace({ pathname: '/login' }); }
};

export const restorePath = (nextState, replace) => {
  replace({ pathname: '/campaigns' });
};
