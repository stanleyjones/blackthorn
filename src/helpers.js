import 'whatwg-fetch';

import getConfig from './config';

const { host, port } = getConfig();

export const queryGraph = query =>
  fetch(`${host}:${port}/ql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/graphql' },
    body: query,
  });

export const parseResponse = res => {
  if (res.ok) { return res.json(); }
  const err = new Error(res.statusText);
  err.response = res;
  throw err;
};
