'use client';
import { useEffect, useState } from 'react';
import UploadForm from '@/components/UploadForm';
import DocumentList from '@/components/DocumentList';
import QuestionBox from '@/components/QuestionBox';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import useDocuments from '@/hooks/useDocuments';

export default function Dashboard() {
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Only fetch documents on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/hooks/useDocuments').then(({ default: useDocuments }) => {
        const { documents, loading, refetch } = useDocuments();
        setDocuments(documents);
        setLoading(loading);
        // Optionally expose refetch if needed
      });
    }
  }, []);

  // Handler to close modal after upload
  const handleUploadAndClose = () => {
    // Refetch logic should be implemented here if needed
    setIsModalOpen(false);
  };

  // Render loading or empty state on server
  if (typeof window === 'undefined') {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col"><Navbar /><main className="flex-1 p-4 md:p-10"><h1 className="text-2xl font-bold">Loading...</h1></main></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Menu</h2>
          <button
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard Home
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Documents</h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
              onClick={() => setIsModalOpen(true)}
            >
              Upload Document
            </button>
          </div>

          {/* Document List always visible */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-10">
            <DocumentList
              documents={documents}
              onDelete={refetch}
              onUpdate={refetch}
              onSelect={(docId) => setSelectedDocId(selectedDocId === docId ? null : docId)}
              selectedId={selectedDocId}
            />
          </div>

          {/* Q&A Section */}
          {selectedDocId ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Ask a Question</h2>
              <QuestionBox selectedDocId={selectedDocId} />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mt-6 text-center text-gray-500 dark:text-gray-300">
              <p>Select a document to ask questions using AI.</p>
            </div>
          )}

          {/* Upload Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-8 relative animate-fade-in">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl font-bold focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close Upload Modal"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Upload Document</h2>
                <UploadForm onUpload={handleUploadAndClose} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
