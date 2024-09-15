import React, { useState } from 'react';
import { Sumariser as summarizeText } from '../Functions/sumariser';
import toast from 'react-hot-toast';
import { MessageSquareText } from 'lucide-react';
import Navbar from './Navbar';

const Summariser = () => {
  const [summary, setSummary] = useState('');
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const newQueryHandler = () => {
    setInputData('');
    setSummary('');
    setError('');
  };

  const summaryHandler = async (data) => {
    if (!data) return;

    setLoading(true);
    setError('');

    try {
      const response = await summarizeText(data);
      setSummary(response);
      setInputData('');
      setError('');
    } catch (error) {
      toast.error('An error occurred while summarizing the text.');
      setError('An error occurred while summarizing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/4 h-screen p-6 bg-gradient-to-br from-gray-50 via-gray-200 to-gray-300 text-gray-800 flex flex-col">
<Navbar />

      <header className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter text to summarize"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none  transition-all duration-300 ease-in-out"
        />
        <button
          onClick={() => summaryHandler(inputData)}
          className={`relative p-3 rounded-lg shadow transition-all duration-300 ease-in-out ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-700 active:bg-black-600'} ${loading && 'hover:bg-gray-400'}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <span className="ml-3 text-blue-600">Processing...</span>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <MessageSquareText color='#f7872b' /> 
              <span>Summarize</span>
            </div>
          )}
        </button>
        {error && (
          <button
            onClick={newQueryHandler}
            className="p-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:bg-red-700 transition-all duration-300 ease-in-out"
          >
            New Query
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-6 ">
        {error ? (
          <div className="text-red-600 font-semibold text-lg">{error}</div>
        ) : (
          <div className="text-gray-800 text-lg">{summary}</div>
        )}
      </main>
    </div>
  );
};

export default Summariser;
