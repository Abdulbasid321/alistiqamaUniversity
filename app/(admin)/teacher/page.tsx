// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const StudentDashboard = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);


//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("No token found! Redirecting to login...");
//       router.replace("/admin"); // Use replace to prevent back navigation
//     } else {
//       setIsAuthenticated(true);
//     }
    
//     setLoading(false);
//   }, []);
//   if (loading) return null; // Don't show anything while checking authentication

//   if (!isAuthenticated) return null; // Prevent dashboard from showing before redirect

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-gray-800">Welcome to Your Dashboard</h2>
//         <p className="text-gray-500">You are successfully logged in.</p>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
"use client";

import { useState, useEffect } from "react";

interface Result {
  course: string;
  grade: string;
  regNumber: string;
}

export default function StudentResults() {
  const [regNumber, setRegNumber] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    console.log("Current regNumber:", regNumber);
    if (regNumber) fetchResults();
  }, [regNumber]);
  
  const fetchResults = async () => {
    try {
      const response = await fetch(`https://istiqamauni-1.onrender.com/getResults/${regNumber}`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Ensure results is always an array
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]); // Ensure no crash if API fails
    }
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber || !course || !grade) return alert("All fields are required");

    const newResult = { regNumber, course, grade };

    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/addResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResult),
      });

      if (!response.ok) throw new Error("Failed to add result");

      alert("Result added successfully!");
      setCourse("");
      setGrade("");
      fetchResults();
    } catch (error) {
      console.error("Error adding result:", error);
      alert("Failed to add result");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Student Result</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" placeholder="Student Reg Number" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} className="p-2 border rounded" required />
          <input type="text" placeholder="Course Name" value={course} onChange={(e) => setCourse(e.target.value)} className="p-2 border rounded" required />
          <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="p-2 border rounded" required />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Result</button>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h3 className="text-xl font-semibold">Student Results</h3>
        <ul className="mt-4">
          {results.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            results.map((result, index) => (
              <li key={index} className="p-2 border-b">
                <span className="font-bold">{result.course}:</span> {result.grade} ({result.regNumber})
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
