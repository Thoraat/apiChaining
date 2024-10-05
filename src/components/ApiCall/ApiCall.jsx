import React, { useState } from 'react';

const ApiCall = ({ addApiToChain }) => {
  const [selectedApi, setSelectedApi] = useState(''); // Selected API
  const [method, setMethod] = useState('GET'); // GET or POST method
  const [body, setBody] = useState({}); // POST body for POST request

  const apiOptions = [
    {
      label: 'Get Users (GET)',
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET'
    },
    {
      label: 'Create Post (POST)',
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      body: { title: '', body: '', userId: '' } // Sample body
    },
    {
      label: 'Get Comments by Post (GET)',
      url: 'https://jsonplaceholder.typicode.com/comments?postId={id}', // Use {id} for chaining
      method: 'GET'
    }
  ];

  const handleAddApi = () => {
    const apiData = {
      url: selectedApi.url,
      method,
      body: method === 'POST' ? body : null,
    };
    addApiToChain(apiData); // Add API to the chain
  };

  const handleApiChange = (e) => {
    const api = apiOptions.find((opt) => opt.label === e.target.value);
    setSelectedApi(api);
    setMethod(api.method);
  };

  const handleBodyChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Select API</h2>
      <select className="border p-2 rounded w-full" onChange={handleApiChange} value={selectedApi.label}>
        <option value="">Select API</option>
        {apiOptions.map((api) => (
          <option key={api.label} value={api.label}>
            {api.label}
          </option>
        ))}
      </select>

      {/* Show POST body input if POST method is selected */}
      {method === 'POST' && (
        <div className="mt-4">
          <h3 className="font-semibold">Enter POST Request Body</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={body.title}
            onChange={handleBodyChange}
            className="border p-2 rounded w-full mt-2"
          />
          <input
            type="text"
            name="body"
            placeholder="Body"
            value={body.body}
            onChange={handleBodyChange}
            className="border p-2 rounded w-full mt-2"
          />
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={body.userId}
            onChange={handleBodyChange}
            className="border p-2 rounded w-full mt-2"
          />
        </div>
      )}

      <button className="mt-4 p-2 bg-green-500 text-white rounded w-full" onClick={handleAddApi}>
        Add to Chain
      </button>
    </div>
  );
};

export default ApiCall;
