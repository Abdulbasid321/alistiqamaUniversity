
  

// "use client";
// import { useState, useEffect } from "react";
// import debounce from "lodash.debounce"; // Install this

// interface Result {
//   course: string;
//   grade: string;
//   regNumber: string;
// }

// export default function StudentResults() {
//   const [regNumber, setRegNumber] = useState("");
//   const [course, setCourse] = useState("");
//   const [grade, setGrade] = useState("");
//   const [results, setResults] = useState<Result[]>([]);

//   const fetchResults = async () => {
//     try {
//       const response = await fetch(`https://istiqamauni-1.onrender.com/getResults/${regNumber}`);
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }
  
//       const data = await response.json();
  
//       // Ensure results is always an array
//       setResults(Array.isArray(data.results) ? data.results : []);
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setResults([]); // Ensure no crash if API fails
//     }
//   };
  
//   // Debounced function to prevent multiple API calls
//   const fetchResultsDebounced = debounce(fetchResults, 500);

//   useEffect(() => {
//     if (regNumber.trim().length >= 3) {
//       fetchResultsDebounced();
//     }
//   }, [regNumber]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!regNumber || !course || !grade) return alert("All fields are required");

//     try {
//       const response = await fetch("https://istiqamauni-1.onrender.com/addResult", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ regNumber, course, grade }),
//       });

//       if (!response.ok) throw new Error("Failed to add result");

//       alert("Result added successfully!");
//       setCourse("");
//       setGrade("");
//       fetchResults(); // Fetch results again after adding
//     } catch (error) {
//       console.error("Error adding result:", error);
//       alert("Failed to add result");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Add Student Result</h2>
//         <form onSubmit={handleSubmit} className="grid gap-4">
//           <input type="text" placeholder="Student Reg Number" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} className="p-2 border rounded" required />
//           <input type="text" placeholder="Course Name" value={course} onChange={(e) => setCourse(e.target.value)} className="p-2 border rounded" required />
//           <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="p-2 border rounded" required />
//           <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Result</button>
//         </form>
//       </div>

//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//         <h3 className="text-xl font-semibold">Student Results</h3>
//         <ul className="mt-4">
//           {results.length === 0 ? (
//             <p className="text-gray-500">No results found.</p>
//           ) : (
//             results.map((result, index) => (
//               <li key={index} className="p-2 border-b">
//                 <span className="font-bold">{result.course}:</span> {result.grade} ({result.regNumber})
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";

export default function UploadStudentResult() {
  const [regNo, setRegNo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regNo || !file) {
      setMessage("Please enter registration number and select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("regNumber", regNo);
    formData.append("result", file);

    try {
      // const response = await fetch("http://localhost:5000/uploadResult", {
      const response = await fetch("https://istiqamauni-1.onrender.com/uploadResult", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload result");
      }

      const data = await response.json();
      setMessage("Result uploaded successfully!");
      setRegNo("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading result:", error);
      setMessage("Failed to upload result.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Student Result</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Enter Student Reg Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="p-2 border rounded"
            required
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Result"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}




// "use client";

// import { useState, useEffect } from "react";

// interface Student {
//   _id: string;
//   name: string;
// }

// interface Class {
//   _id: string;
//   name: string;
// }

// export default function UploadStudentResult() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [selectedStudentId, setSelectedStudentId] = useState("");
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch students
//     fetch("https://istiqamauni-1.onrender.com/api/students")
//       .then((res) => res.json())
//       .then((data) => setStudents(data))
//       .catch((err) => console.error("Error fetching students:", err));

//     // Fetch classes
//     fetch("https://istiqamauni-1.onrender.com/api/classes")
//       .then((res) => res.json())
//       .then((data) => setClasses(data))
//       .catch((err) => console.error("Error fetching classes:", err));
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedStudentId || !selectedClassId || !file) {
//       setMessage("Please select a student, class, and file.");
//       return;
//     }

//     setUploading(true);
//     setMessage("");

//     const formData = new FormData();
//     formData.append("user", selectedStudentId);
//     formData.append("classId", selectedClassId);
//     formData.append("result", file);

//     try {
//       const response = await fetch("https://istiqamauni-1.onrender.com/uploadResult", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload result");
//       }

//       const data = await response.json();
//       setMessage("Result uploaded successfully!");
//       // Reset form
//       setSelectedStudentId("");
//       setSelectedClassId("");
//       setFile(null);
//     } catch (error) {
//       console.error("Error uploading result:", error);
//       setMessage("Failed to upload result.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Upload Student Result</h2>
//         <form onSubmit={handleSubmit} className="grid gap-4">
//           <select
//             value={selectedStudentId}
//             onChange={(e) => setSelectedStudentId(e.target.value)}
//             className="p-2 border rounded"
//             required
//           >
//             <option value="">Select Student</option>
//             {students.map((student) => (
//               <option key={student._id} value={student._id}>
//                 {student.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={selectedClassId}
//             onChange={(e) => setSelectedClassId(e.target.value)}
//             className="p-2 border rounded"
//             required
//           >
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls._id}>
//                 {cls.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="p-2 border rounded"
//             required
//           />

//           <button
//             type="submit"
//             className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Upload Result"}
//           </button>
//         </form>
//         {message && <p className="mt-4 text-center">{message}</p>}
//       </div>
//     </div>
//   );
// }
