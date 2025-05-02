// "use client";

// import { useState } from "react";

// interface Result {
//   course: string;
//   grade: string;
//   regNumber: string;
// }

// export default function ViewResults() {
//   const [regNumber, setRegNumber] = useState("");
//   const [results, setResults] = useState<Result[]>([]);
//   // const [results, setResults] = useState<any[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const fetchResults = async () => {
//     if (!regNumber) return alert("Please enter your registration number");
  
//     setLoading(true);
//     setError("");
  
//     try {
//       const response = await fetch(`https://istiqamauni-1.onrender.com/getResults/${regNumber}`);
      
//       if (!response.ok) throw new Error("Failed to fetch results");
  
//       const data = await response.json();
      
//       console.log("API Response:", data); // Debugging: Log the API response
  
//       if (!Array.isArray(data.results)) {
//         throw new Error("Unexpected response format");
//       }
  
//       setResults(data.results); // Assuming `data.results` holds the array of results
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setError("Error fetching results. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">View Your Results</h2>
//         <input
//           type="text"
//           placeholder="Enter Registration Number"
//           value={regNumber}
//           onChange={(e) => setRegNumber(e.target.value)}
//           className="p-2 border rounded w-full mb-4"
//         />
//         <button
//           onClick={fetchResults}
//           className="p-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
//         >
//           {loading ? "Loading..." : "View Results"}
//         </button>
//         {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//       </div>
      
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h3 className="text-xl font-semibold">Results</h3>
//         {results.length === 0 ? (
//           <p className="text-gray-500">No results found.</p>
//         ) : (
//           <ul className="mt-4">
//             {/* {results.map((result, index) => (
//               <li key={index} className="p-2 border-b">
//                 <span className="font-bold">{result.course}</span>: {result.grade}
//               </li>
//             ))} */}
//             {Array.isArray(results) &&
//   results.map((result, index) => (
//     <li key={index} className="p-2 border-b">
//       <span className="font-bold">{result.course}</span>: {result.grade}
//     </li>
//   ))}

//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const StudentDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [regNo, setRegNo] = useState("");
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found! Redirecting to login...");
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleFetchResults = async () => {
    setFetching(true);
    setError("");
    setResults([]);

    try {
      const encodedRegNo = encodeURIComponent(regNo);
      const res = await axios.get(
        // `http://localhost:5000/getResults/CSE191`
        `https://istiqamauni-1.onrender.com/getResults/${encodedRegNo}`
        // `http://localhost:5000/getResults/${encodedRegNo}`
      );
      setResults(res.data.results);
    } catch (err: any) {
      setError(err?.response?.data?.error || "An error occurred.");
    } finally {
      setFetching(false);
    }
  };

  if (loading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Your Dashboard
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter your Registration Number"
            className="w-full px-4 py-2 border rounded"
          />

          <button
            onClick={handleFetchResults}
            disabled={fetching || !regNo}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {fetching ? "Fetching..." : "View My Results"}
          </button>

          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Your Uploaded Results</h3>
          <ul className="space-y-4">
            {results.map((result: any) => (
              <li key={result._id} className="border-b pb-2">
                <p className="text-gray-800 font-medium">File: {result.fileName}</p>
                {/* <p className="text-gray-600 text-sm">Class: {result.classId?.name || "N/A"}</p> */}
              <a
  href={result.fileUrl}
  className="text-blue-500 hover:underline"
  target="_blank"
  rel="noopener noreferrer"
>
  Download Result
</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
