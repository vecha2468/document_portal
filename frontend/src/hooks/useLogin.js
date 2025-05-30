'use client';
export async function loginUser({ username, password }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Login failed');
  }

  return data; // contains access + refresh tokens
}
