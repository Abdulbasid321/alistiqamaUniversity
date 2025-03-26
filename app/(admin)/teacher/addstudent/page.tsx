'use client';

import { useEffect, useState } from 'react';


export default function AdminDashboard() {
  type Student = {
    name: string;
    regNumber: string;
    department: string;
    level: string;
    email: string;
    phone: string;
    address: string;
    feesPaid: boolean;
    profilePic: File | null;
  };
  
  const [stats, setStats] = useState({ students: 0, departments: 0, courses: 0 });
  // const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);    
  const [studentData, setStudentData] = useState<{ 
    name: string;
    regNumber: string;
    department: string;
    level: string;
    email: string;
    phone: string;
    address: string;
    feesPaid: boolean;
    profilePic: File | null;
  }>
  
  ({
    name: '',
    regNumber: '',
    department: '',
    level: '',
    email: '',
    phone: '',
    address: '',
    feesPaid: false,
    profilePic: null,  // Initially set to null
  });
  

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('https://istiqamauni-1.onrender.com/stats/');
        // const response = await fetch("https://istiqamauni-1.onrender.com/stats/");

        const data = await res.json();
        setStats({
          students: data.totalStudents,
          departments: data.totalDepartments,
          courses: data.totalCourses,
        });

        const studentsRes = await fetch('https://istiqamauni-1.onrender.com/students/');
        const studentsData = await studentsRes.json();
        setRecentStudents(studentsData.students || []); // Ensure it's always an array        
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;  // Explicitly cast target for checkboxes
    const { name, value, type } = target;
  
    setStudentData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? target.checked : value.trim(),
    }));
  };
  
  
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStudentData({ ...studentData, profilePic: e.target.files[0] });
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  
  //   console.log("🔍 Student Data Before Submission:", studentData);
  
  //   // Ensure all required fields are filled
  //   if (
  //     !studentData.name ||
  //     !studentData.regNumber ||
  //     !studentData.department ||
  //     !studentData.level ||
  //     !studentData.email ||
  //     !studentData.phone ||
  //     !studentData.address
  //   ) {
  //     console.error("⚠️ Missing Required Fields");
  //     alert("Please fill in all required fields before submitting.");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch("http://localhost:3000/students", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(studentData), // Ensure it's properly converted
  //     });
  
  //     const data = await response.json();
      
  //     if (!response.ok) {
  //       console.error("Backend Error:", data);
  //       throw new Error(data.error || "Failed to submit form");
  //     }
  
  //     console.log("✅ Student added successfully:", data);
  //     alert("Student added successfully!");
  //     setStudentData({
  //       name: '',
  //       regNumber: '',
  //       department: '',
  //       level: '',
  //       email: '',
  //       phone: '',
  //       address: '',
  //       feesPaid: false,
  //       profilePic: null,
  //     });
  
  //        // Reset the file input manually
  //   const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
  //   if (fileInput) fileInput.value = "";
    
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Failed to submit student data");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    console.log("🔍 Student Data Before Submission:", studentData);
  
    // Ensure all required fields are filled
    if (
      !studentData.name ||
      !studentData.regNumber ||
      !studentData.department ||
      !studentData.level ||
      !studentData.email ||
      !studentData.phone ||
      !studentData.address
    ) {
      console.error("⚠️ Missing Required Fields");
      alert("Please fill in all required fields before submitting.");
      return;
    }
  
    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData), // Ensure it's properly converted
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        console.error("Backend Error:", data);
        throw new Error(data.error || "Failed to submit form");
      }
  
      console.log("✅ Student added successfully:", data);
      alert("Student added successfully!");
  
      // Reset the form fields
      setStudentData({
        name: '',
        regNumber: '',
        department: '',
        level: '',
        email: '',
        phone: '',
        address: '',
        feesPaid: false,
        profilePic: null,
      });
  
      // Reset the file input manually
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput) fileInput.value = "";
  
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit student data");
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-3xl font-bold text-green-600">{stats.students}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Departments</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.departments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.courses}</p>
        </div>
      </div>

      {/* Student Registration Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Register New Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" className="p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="regNumber" placeholder="Reg Number" className="p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" className="p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="level" placeholder="Level" className="p-2 border rounded" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" className="p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" className="p-2 border rounded" onChange={handleChange} required />
          <div>
            <input type="checkbox" name="feesPaid" onChange={handleChange} /> Fees Paid
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded" />
          <button type="submit" className="p-2 bg-green-500 text-white rounded">Register</button>
        </form>
      </div>

      {/* Recent Students Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Student Registrations</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Reg Number</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Level</th>
            </tr>
          </thead>
          <tbody>
            {recentStudents.map((student, index) => (
              <tr key={index} className="text-center border">
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.regNumber}</td>
                <td className="border p-2">{student.department}</td>
                <td className="border p-2">{student.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
