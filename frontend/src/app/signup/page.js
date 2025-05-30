'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/hooks/useSignup';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      router.push('/login');
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
        <h2 className="text-xl font-bold">Sign Up</h2>
        <input className="w-full p-2 border" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="w-full p-2 border" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="w-full p-2 border" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Sign Up</button>
      </form>
      <div className="text-center mt-2">
        <span className="text-gray-600">Already have an account? </span>
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
}
