// src/utils/api.js
export const authorizedRequest = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const res = await fetch(`http://localhost:4000/api/v1/${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();
  return { status: res.status, data };
};
