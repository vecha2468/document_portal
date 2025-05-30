'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authFetch } from '@/utils/auth';

const API = process.env.NEXT_PUBLIC_API_URL;


export default function useDocuments() {
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // SSR/SSG safety: don't fetch on server
  if (typeof window === 'undefined') {
    return { documents: [], loading: false, refetch: () => {} };
  }

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/api/documents/`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      } else {
        alert('Failed to fetch documents');
      }
    } catch (err) {
      alert(err.message || 'Failed to fetch documents');
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, loading, refetch: fetchDocuments };
}
