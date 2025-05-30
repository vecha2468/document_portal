'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/hooks/useLogin';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      localStorage.setItem('access', data.access);
localStorage.setItem('refresh', data.refresh);
      router.push('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <button
        type="button"
        className="mb-4 text-blue-600 hover:underline text-sm"
        onClick={() => router.push('/')}
      >
        &larr; Back to Home
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input className="w-full p-2 border" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="w-full p-2 border" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
      <div className="text-center mt-2">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => router.push('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
