'use client';
import { useState } from 'react';
import { uploadDocument } from '@/hooks/useUploadDocument';


export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadDocument(title, file);
      setFile(null);
      setTitle('');
      onUpload(); // trigger refresh
    } catch (err) {
      alert(err.message || 'Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input className="border p-2 w-full" type="text" placeholder="Document Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="border p-2 w-full" type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Upload</button>
    </form>
  );
}
