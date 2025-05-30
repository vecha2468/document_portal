export async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Refresh token failed');

  localStorage.setItem('access', data.access);
  return data.access;
}

// Universal fetch wrapper that handles JWT refresh
export async function authFetch(url, options = {}) {
  let access = localStorage.getItem('access');
  // Only set Content-Type to application/json if not sending FormData
  const isFormData = options.body instanceof FormData;
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${access}`,
    ...(isFormData ? {} : {'Content-Type': options.headers && options.headers['Content-Type'] ? options.headers['Content-Type'] : 'application/json'})
  };


  let response = await fetch(url, options);

  if (response.status === 401) {
    // Try to refresh token
    try {
      access = await refreshAccessToken();
      options.headers.Authorization = `Bearer ${access}`;
      response = await fetch(url, options); // retry
    } catch (err) {
      // Refresh failed, force logout or redirect to login
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }
  }

  return response;
}
  