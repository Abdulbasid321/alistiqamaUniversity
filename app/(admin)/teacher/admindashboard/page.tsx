// "use client";
// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// export default function AdminDashboard() {
//   const [stats] = useState({
//     users: 1500,
//     courses: 35,
//     revenue: "$45,000",
//   });

//   const activities = [
//     { user: "John Doe", action: "Enrolled in React", date: "2025-03-25" },
//     { user: "Jane Smith", action: "Completed Node.js", date: "2025-03-24" },
//     { user: "Alice Johnson", action: "Purchased a new course", date: "2025-03-23" },
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats.users}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Total Courses</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats.courses}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Total Revenue</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats.revenue}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activities */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle>Recent Activities</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Action</TableHead>
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {activities.map((activity, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{activity.user}</TableCell>
//                   <TableCell>{activity.action}</TableCell>
//                   <TableCell>{activity.date}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";

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

//   useEffect(() => {
//     console.log("Current regNumber:", regNumber);
//     if (regNumber) fetchResults();
//   }, [regNumber]);
  
//   const fetchResults = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/getResults/${regNumber}`);
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }
  
//       const data = await response.json();
  
//       // Ensure results is always an array
//       setResults(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setResults([]); // Ensure no crash if API fails
//     }
//   };
  
  

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!regNumber || !course || !grade) return alert("All fields are required");

//     const newResult = { regNumber, course, grade };

//     try {
//       const response = await fetch("http://localhost:3000/addResult", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newResult),
//       });

//       if (!response.ok) throw new Error("Failed to add result");

//       alert("Result added successfully!");
//       setCourse("");
//       setGrade("");
//       fetchResults();
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

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar } from "recharts";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, departments: 0 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://istiqamauni-1.onrender.com/stats/")
      .then((res) => res.json())
      .then((data) => setStats({ students: data.totalStudents, departments: data.totalDepartments }))
      .catch((err) => console.error("Error fetching stats:", err));

    fetch("https://istiqamauni-1.onrender.com/students/")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <motion.h1 className="text-3xl font-bold text-gray-900 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.students}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader>
              <CardTitle>Total Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.departments}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Student Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <motion.tr key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.department}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
