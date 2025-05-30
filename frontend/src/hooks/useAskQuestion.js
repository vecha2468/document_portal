'use client';
import { authFetch } from '@/utils/auth';

export async function askQuestion(documentId, question) {
  const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/${documentId}/ask/`, {
    method: 'POST',
    body: JSON.stringify({ question }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'AI failed');

  return data.answer;
}