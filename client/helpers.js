import 'whatwg-fetch';

export const queryGraph = query =>
  fetch('http://localhost:9000/ql', {
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
