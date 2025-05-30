'use client';
import { authFetch } from '@/utils/auth';

export async function updateDocument(id, title, file) {
  const formData = new FormData();
  if (title) formData.append('title', title);
  if (file) formData.append('file', file);

  const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/${id}/`, {
    method: 'PUT',
    body: formData,
    // Do not set Content-Type for FormData, browser will handle it
  });
console.log(res)
  if (!res.ok) throw new Error('Update failed');
}