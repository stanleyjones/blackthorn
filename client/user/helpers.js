const isLoggedIn = () => !!localStorage.getItem('jwt_token');

export const authenticate = (nextState, replace) => {
  if (!isLoggedIn()) { replace({ pathname: '/login' }); }
};
