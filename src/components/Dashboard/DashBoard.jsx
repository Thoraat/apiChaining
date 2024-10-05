import React, { useState } from 'react';
import ApiCall from '../ApiCall/ApiCall';
import ApiResponseDisplay from '../ApiResponseDisplay/ApiResponseDisplay';

const Dashboard = () => {
  const [apiChain, setApiChain] = useState([]); // Chain of API calls
  const [responses, setResponses] = useState([]); // API responses
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to add an API to the chain
  const addApiToChain = (apiData) => {
    setApiChain((prevChain) => [...prevChain, apiData]);
  };

  // Function to execute the chain of API calls
  const executeApiChain = async () => {
    setLoading(true);
    setError(null); // Reset error state
    let accumulatedResponses = [];
    
    try {
      for (let i = 0; i < apiChain.length; i++) {
        const api = apiChain[i];
        const response = await fetchApi(api, accumulatedResponses); // Fetch API based on current response
        accumulatedResponses.push(response); // Accumulate the responses
      }
      setResponses(accumulatedResponses); // Store all the responses
    } catch (err) {
      setError('An error occurred during API chaining');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to fetch API based on method and previous responses
  const fetchApi = async (api, accumulatedResponses) => {
    const url = formatUrlWithPreviousResponse(api.url, accumulatedResponses); // Format URL with previous responses
    const options = api.method === 'POST'
      ? { method: 'POST', body: JSON.stringify(api.body), headers: { 'Content-Type': 'application/json' } }
      : {};

    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  };

  // Format URL if it depends on previous responses
  const formatUrlWithPreviousResponse = (url, responses) => {
    return url.replace(/{(\w+)}/g, (match, key) => {
      const lastResponse = responses[responses.length - 1]; // Use the most recent response
      return lastResponse[key] || match; // Replace if the key exists, otherwise leave as is
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">API Chaining Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* API Call Component */}
        <div className="border p-4 rounded shadow-md">
          <ApiCall addApiToChain={addApiToChain} />
        </div>
        
        {/* Button to execute the chain of APIs */}
        <div className="flex flex-col justify-center items-center">
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
            onClick={executeApiChain}
            disabled={loading || apiChain.length === 0} // Disable button when loading or no APIs
          >
            {loading ? 'Executing...' : 'Execute Chain'}
          </button>
          {/* Display Error Message */}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>

      {/* Display API Responses */}
      <ApiResponseDisplay responses={responses} />
    </div>
  );
};

export default Dashboard;
