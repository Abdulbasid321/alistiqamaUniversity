
"use client";

import { useState, useEffect } from "react";

interface Result {
  fileName: string;
  fileType: string;
  fileData: string;
  user: { username: string };
  classId: { name: string };
}

interface Student {
  _id: string;
  username: string;
}

interface Department {
  _id: string;
  name: string;
}

export default function UploadResult() {
  const [file, setFile] = useState<File | null>(null);
  const [classId, setClassId] = useState(""); // Store department ID
  const [studentId, setStudentId] = useState(""); // Store student ID
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
    if (studentId) fetchResults();
  }, [studentId]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/students");
      const data = await response.json();
      
      console.log("Fetched students:", data); // Debugging line
  
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error("Expected an array but got:", data);
        setStudents([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };
  

  const fetchDepartments = async () => {
    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/courses");
      const data: Department[] = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(`https://istiqamauni-1.onrender.com/getResults/${studentId}`);
      const data: Result[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !classId || !studentId) return alert("All fields are required");

    const formData = new FormData();
    formData.append("result", file);
    formData.append("user", studentId);
    formData.append("classId", classId);

    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/uploadResult", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload result");

      alert("Result uploaded successfully!");
      setFile(null);
      fetchResults();
    } catch (error) {
      console.error("Error uploading result:", error);
      alert("Failed to upload result");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Student Result</h2>
        <form onSubmit={handleUpload} className="grid gap-4">
          <input type="file" onChange={handleFileChange} className="p-2 border rounded" required />

          {/* Select Student */}
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="p-2 border rounded" required>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>{student.username}</option>
            ))}
          </select>

          {/* Select Department */}
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="p-2 border rounded" required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))}
          </select>

          <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload Result
          </button>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h3 className="text-xl font-semibold">Uploaded Results</h3>
        <ul className="mt-4">
          {results.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            results.map((result, index) => (
              <li key={index} className="p-2 border-b">
                <span className="font-bold">{result.fileName}</span> - 
                <span className="ml-2">({result.classId.name} - {result.user.username})</span> 
                <a href={`data:${result.fileType};base64,${result.fileData}`} download={result.fileName} className="text-blue-600 ml-2">Download</a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}