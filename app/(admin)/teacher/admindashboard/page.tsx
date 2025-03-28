"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar } from "recharts";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, departments: 0 });
  // const [students, setStudents] = useState([]);
  const [students, setStudents] = useState<{ id: string; name: string; department: string }[]>([]);


  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://istiqamauni-1.onrender.com/stats/");
        const data = await res.json();
        setStats({
          students: data.totalStudents,
          departments: data.totalDepartments,
        });
  
        const studentsRes = await fetch("https://istiqamauni-1.onrender.com/students/");
        const studentsData = await studentsRes.json();
        
        console.log("Fetched students:", studentsData); // Debugging
  
        // Ensure students is an array and map _id to id
        setStudents(Array.isArray(studentsData.students) ? 
          studentsData.students.map((s: any) => ({
            id: s._id,
            name: s.name,
            department: s.department
          })) : []
        );
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
  
    fetchStats();
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
              {Array.isArray(students) && students.map((student, index) => (
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
