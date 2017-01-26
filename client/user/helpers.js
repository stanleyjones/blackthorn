const JWT_TOKEN = 'jwt_token';

export const clearToken = () => localStorage.removeItem(JWT_TOKEN);
export const getToken = () => localStorage.getItem(JWT_TOKEN);
export const setToken = token => localStorage.setItem(JWT_TOKEN, token);

const isLoggedIn = () => !!getToken();

export const authenticate = (nextState, replace) => {
  if (!isLoggedIn()) { replace({ pathname: '/login' }); }
};

