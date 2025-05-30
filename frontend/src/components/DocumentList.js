'use client';
import { useState } from 'react';
import { deleteDocument } from '@/hooks/useDeleteDocument';
import { updateDocument } from '@/hooks/useUpdateDocument';


export default function DocumentList({ documents, onDelete, onUpdate, onSelect, selectedId }) {
  const token = localStorage.getItem('access');
  const [editingDocId, setEditingDocId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newFile, setNewFile] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      onDelete();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };
  

  const handleUpdate = async (id) => {
    try {
      await updateDocument(id, newTitle, newFile);
      onUpdate();
      setEditingDocId(null);
      setNewFile(null);
      setNewTitle('');
    } catch (err) {
      alert(err.message || 'Update failed');
    }
  };
  

  return (
    <div className="space-y-4 mt-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`flex items-center gap-4 p-4 rounded-xl shadow transition border-2 ${
            selectedId === doc.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
              : 'border-transparent bg-white dark:bg-gray-800'
          } hover:border-blue-400`}
        >
          {/* Document Icon/Avatar */}
          <div
            onClick={() => onSelect(doc.id)}
            className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition"
            title="Select document"
          >
            <svg className="w-7 h-7 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7V3a1 1 0 011-1h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1v-4" />
              <rect width="6" height="8" x="3" y="8" rx="1"/>
            </svg>
          </div>

          {/* Document Info */}
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => onSelect(doc.id)}
          >
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-lg truncate ${selectedId === doc.id ? 'text-blue-700 dark:text-blue-200' : 'text-gray-900 dark:text-white'}`}>{doc.title}</span>
              {/* Optionally show date if available */}
              {doc.updated_at && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{new Date(doc.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Actions or Edit Mode */}
          {editingDocId === doc.id ? (
            <div className="flex flex-col gap-2 w-56">
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="New Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input className="w-full p-2 border rounded" type="file" onChange={(e) => setNewFile(e.target.files[0])} />
              <div className="flex gap-2 mt-1">
                <button onClick={() => {
                  console.log('Save clicked for doc:', doc.id, 'Title:', newTitle, 'File:', newFile);
                  handleUpdate(doc.id);
                }} className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Save</button>
                <button onClick={() => setEditingDocId(null)} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 ml-2">
              <button
                onClick={() => {
                  console.log('Edit clicked for doc:', doc.id, doc.title);
                  setEditingDocId(doc.id);
                  setNewTitle(doc.title);
                  setNewFile(null);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                title="Edit"
              >
                <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2-2l-6 6m2-2l-6 6" />
                </svg>
                <span className="ml-1">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                title="Delete"
              >
                <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="ml-1">Delete</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
