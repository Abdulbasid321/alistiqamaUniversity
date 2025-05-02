"use client";

import { useState, useEffect } from "react";

export default function CreateDepartment() {
  const [departmentData, setDepartmentData] = useState({
    name: "",
    code: "",
    instructor: "",
    status: "Ongoing",
    semester: "First",
    level: "400",
  });

  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    fetchTotalCourses();
  }, []);

  const fetchTotalCourses = async () => {
    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/courses");
      // const response = await fetch("http://localhost:3000/courses");
      
      const data = await response.json();
      setTotalCourses(data.length || 0);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://istiqamauni-1.onrender.com/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentData),
      });

      if (!response.ok) throw new Error("Failed to create department");

      alert("Department created successfully!");
      setDepartmentData({
        name: "",
        code: "",
        instructor: "",
        status: "Ongoing",
        semester: "First",
        level: "400",
      });

      fetchTotalCourses();
    } catch (error) {
      console.error("Error creating department:", error);
      alert("Failed to create department");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Course</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="name" placeholder="Department Name" value={departmentData.name} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="code" placeholder="Course Code" value={departmentData.code} onChange={handleChange} className="p-2 border rounded" required />
          <input type="text" name="instructor" placeholder="Instructor Name" value={departmentData.instructor} onChange={handleChange} className="p-2 border rounded" required />
          <select name="status" value={departmentData.status} onChange={handleChange} className="p-2 border rounded">
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <select name="semester" value={departmentData.semester} onChange={handleChange} className="p-2 border rounded">
            <option value="First">First</option>
            <option value="Second">Second</option>
          </select>
          <select name="level" value={departmentData.level} onChange={handleChange} className="p-2 border rounded">
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
          </select>
          <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Course</button>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center w-full max-w-lg">
        <h3 className="text-xl font-semibold">Total Department</h3>
        <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
      </div>
    </div>
  );
}
