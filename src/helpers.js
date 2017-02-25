import 'whatwg-fetch';

export const queryGraph = query =>
  fetch(`${process.env.REACT_APP_API}/ql`, {
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
