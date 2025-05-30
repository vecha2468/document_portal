'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('access');

  const logout = () => {
    localStorage.removeItem('access');
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-10 py-3">
      {/* Logo & App Name */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}> 
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7V3a1 1 0 011-1h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1v-4" />
            <rect width="6" height="8" x="3" y="8" rx="1"/>
          </svg>
        </span>
        <span className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-300">DocuAI Portal</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2 md:gap-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
            >
              Dashboard
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
            >
              Logout
            </button>
            {/* User avatar/icon */}
            <span className="ml-2 hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
              </svg>
            </span>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
