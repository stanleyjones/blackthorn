import 'whatwg-fetch';

export const queryGraph = query =>
  fetch('http://localhost:9000/ql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    },
    body: query,
  });

export const parseResponse = res => {
  if (res.ok) { return res.json(); }
  const err = new Error(res.statusText);
  err.response = res;
  throw err;
};
