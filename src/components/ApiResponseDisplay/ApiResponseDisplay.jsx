import React from 'react';

const ApiResponseDisplay = ({ responses }) => {
  return (
    <div className="mt-4 p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">API Chain Responses</h2>
      {responses.length > 0 ? (
        responses.map((response, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">Response {index + 1}:</h3>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(response, null, 2)}</pre>
          </div>
        ))
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default ApiResponseDisplay;
