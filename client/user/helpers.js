const isLoggedIn = () => true;

export const authenticate = (nextState, replace) => {
  if (!isLoggedIn()) { replace({ pathname: '/login' }); }
};
