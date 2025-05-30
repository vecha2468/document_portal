'use client';
export async function signupUser({ username, email, password }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Signup failed');
  }

  return await res.json();
}
