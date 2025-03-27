"use client";

import { useState } from "react";

interface Result {
  course: string;
  grade: string;
  regNumber: string;
}

export default function ViewResults() {
  const [regNumber, setRegNumber] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    if (!regNumber) return alert("Please enter your registration number");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://istiqamauni-1.onrender.com/getResults/${regNumber}`);
      // const response = await fetch(`https://istiqamauni-1.onrender.com/getResults/${regNumber}`);
      if (!response.ok) throw new Error("Failed to fetch results");
      
      const data: Result[] = await response.json();
      setResults(data);
    } catch (error) {
      setError("Error fetching results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">View Your Results</h2>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        <button
          onClick={fetchResults}
          className="p-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
        >
          {loading ? "Loading..." : "View Results"}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-xl font-semibold">Results</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No results found.</p>
        ) : (
          <ul className="mt-4">
            {results.map((result, index) => (
              <li key={index} className="p-2 border-b">
                <span className="font-bold">{result.course}</span>: {result.grade}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
