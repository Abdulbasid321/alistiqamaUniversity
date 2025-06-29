// "use client"
// import React, { useEffect, useState } from "react";

// interface Result {
//   createdAt: string;
//   _id: string;
//   fileName: string;
//   fileUrl: string;
//   fileType: string;
//   uploadedAt: string;
// }

// const StudentResultsPage = () => {
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchResults = async (regNumber: string) => {
//     try {
//           const sanitizedRegNumber = regNumber.replace(/[^a-zA-Z0-9]/g, "");
//       const res = await fetch(`http://localhost:5000/student/results/${sanitizedRegNumber}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setResults(data ? [data] : []);
//     } catch (err) {
//       console.error("Failed to fetch results", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const regNumber = localStorage.getItem("regNumber");
    
//     if (regNumber) {
//       fetchResults(regNumber);
//     } else {
//       console.error("No registration number found in localStorage.");
//       setLoading(false);
//     }
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading results...</p>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//   <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
//     📄 My Results
//   </h1>

//   {results.length === 0 ? (
//     <p className="text-center text-gray-500 text-lg">
//       No results available.
//     </p>
//   ) : (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {results.map((result) => (
//         <div
//           key={result._id}
//           className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
//         >
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800 truncate">
//               {result.fileName}
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">
//               Uploaded on:{" "}
//               {new Date(result.createdAt || result.uploadedAt).toLocaleDateString()}
//             </p>
//           </div>
//           <a
//             href={result.fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-6 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             View Result
//           </a>
//         </div>
//       ))}
//     </div>
//   )}
// </div>

//   );
// };

// export default StudentResultsPage;


"use client";
import React, { useEffect, useState } from "react";

interface Result {
  createdAt: string;
  _id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt?: string;
}

const StudentResultsPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async (regNumber: string) => {
    try {
      const sanitizedRegNumber = regNumber.replace(/[^a-zA-Z0-9]/g, "");
      const res = await fetch(
        `https://istiqamauni-1.onrender.com/student/results/${sanitizedRegNumber}`,
        // `https://istiqamauni-1.onrender.com/student/results/${sanitizedRegNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Failed to fetch results", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const regNumber = localStorage.getItem("regNumber");

    if (regNumber) {
      fetchResults(regNumber);
    } else {
      console.error("No registration number found in localStorage.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center mt-10">Loading results...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        📄 My Results
      </h1>

      {results.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No results available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {result.fileName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Uploaded on:{" "}
                  {(() => {
  const dateStr = result.createdAt || result.uploadedAt;
  return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
})()}


                </p>
              </div>
              <a
                href={result.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Result
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentResultsPage;


// "use client"
// import React, { useEffect, useState } from "react";

// interface Result {
//   _id: string;
//   fileName: string;
//   fileUrl: string;
//   fileType: string;
//   uploadedAt: string;
// }

// const StudentResultsPage = () => {
//   const [results, setResults] = useState<Result[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchResults = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/student/results", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setResults(data.results || []);
//     } catch (err) {
//       console.error("Failed to fetch results", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-green-600 text-white py-6 shadow-md">
//         <div className="max-w-5xl mx-auto px-4">
//           <h1 className="text-3xl font-bold">Welcome, Student 👋</h1>
//           <p className="text-sm text-green-100 mt-1">Here are your uploaded results.</p>
//         </div>
//       </header>

//       {/* Results Section */}
//       <main className="max-w-5xl mx-auto p-4">
//         {loading ? (
//           <p className="text-gray-500 mt-10 text-center">Loading your results...</p>
//         ) : results.length === 0 ? (
//           <div className="text-center mt-10">
//             <p className="text-xl text-gray-600">No results uploaded yet 😢</p>
//           </div>
//         ) : (
//           <div className="grid gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
//             {results.map((result) => (
//               <div
//                 key={result._id}
//                 className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
//               >
//                 <h2 className="font-semibold text-lg truncate">{result.fileName}</h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Type: {result.fileType.split("/")[1]?.toUpperCase()}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Uploaded: {new Date(result.uploadedAt).toLocaleDateString()}
//                 </p>
//                 <div className="flex justify-between mt-4">
//                   <a
//                     href={result.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-green-600 hover:underline"
//                   >
//                     View
//                   </a>
//                   <a
//                     href={result.fileUrl}
//                     download={result.fileName}
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     Download
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default StudentResultsPage;
