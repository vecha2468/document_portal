'use client';
import { useState } from 'react';
import { askQuestion } from '@/hooks/useAskQuestion';

export default function QuestionBox({ selectedDocId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ask = async () => {
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      const response = await askQuestion(selectedDocId, question);
      setAnswer(response);
    } catch (err) {
      setError(err.message || 'Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <input
        className="border p-2 w-full rounded"
        placeholder="Ask a question about the document"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={ask}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        disabled={loading || !question.trim()}
      >
        {loading ? 'Asking...' : 'Ask'}
      </button>
      {error && (
        <div className="text-red-600 bg-red-50 p-2 rounded">{error}</div>
      )}
      {answer && (
        <div className="bg-white text-black p-4 rounded shadow mt-4">
          <p className="font-semibold text-gray-800">AI Answer:</p>
          <p className="mt-2">{answer}</p>
        </div>
      )}
    </div>
  );
}
