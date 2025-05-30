'use client';
export async function uploadDocument(title, file) {
    const token = localStorage.getItem('access');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  
    if (!res.ok) throw new Error('Upload failed');
  }