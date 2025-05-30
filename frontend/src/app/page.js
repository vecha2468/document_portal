'use client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Home() {
  const router = useRouter();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('access');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white to-blue-100 dark:from-gray-900 dark:to-black flex items-center justify-center px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-4">AI Document Assistant</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Upload documents, manage them, and ask intelligent questions using AI. Designed for productivity and speed.
          </p>
        </div>
      </main>
    </>
  );
}
