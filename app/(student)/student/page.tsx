"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const StudentDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found! Redirecting to login...");
      // router.replace("/login"); // Use replace to prevent back navigation
    } else {
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  if (loading) return null; // Don't show anything while checking authentication

  if (!isAuthenticated) return null; // Prevent dashboard from showing before redirect

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to Your Dashboard</h2>
        <p className="text-gray-500">You are successfully logged in.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
