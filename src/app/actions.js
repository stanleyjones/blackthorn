export const APP_ONLINE = 'APP.ONLINE';
export const TOGGLE_NAVBAR = 'APP.NAVBAR';

export const appOnline = status => ({ type: APP_ONLINE, status });
export const toggleNavbar = () => ({ type: TOGGLE_NAVBAR });
