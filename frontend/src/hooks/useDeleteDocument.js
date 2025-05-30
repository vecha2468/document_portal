'use client';
import { authFetch } from '@/utils/auth';

export async function deleteDocument(id) {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/${id}/`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Delete failed');
  }