// import React from "react";
// import { CheckCircle, XCircle } from "lucide-react";

// const StudentProfile = () => {
//   // Sample student data (replace with actual data from backend)
//   const student = {
//     name: "John Doe",
//     regNumber: "STU2024123",
//     department: "Computer Science",
//     level: "300 Level",
//     email: "john.doe@example.com",
//     phone: "+234 810 123 4567",
//     address: "123 University Road, Lagos",
//     feesPaid: true, // Change to false to test "Not Paid"
//     profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder image
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
//       <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
//         {/* Profile Picture */}
//         <div className="flex justify-center">
//           <img
//             src={student.profilePic}
//             alt="Profile"
//             className="w-32 h-32 rounded-full shadow-md border-4 border-green-500"
//           />
//         </div>

//         {/* Student Info */}
//         <div className="text-center mt-4">
//           <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
//           <p className="text-sm text-gray-500">Reg No: {student.regNumber}</p>
//           <p className="text-sm text-gray-500">{student.department} | {student.level}</p>
//         </div>

//         {/* Fees Status */}
//         <div className="mt-5 flex items-center justify-center gap-2 text-lg font-semibold">
//           {student.feesPaid ? (
//             <>
//               <CheckCircle className="text-green-600" size={24} />
//               <span className="text-green-600">Fees Paid</span>
//             </>
//           ) : (
//             <>
//               <XCircle className="text-red-600" size={24} />
//               <span className="text-red-600">Fees Not Paid</span>
//             </>
//           )}
//         </div>

//         {/* Additional Info */}
//         <div className="mt-6 space-y-3">
//           <p className="text-gray-700"><strong>Email:</strong> {student.email}</p>
//           <p className="text-gray-700"><strong>Phone:</strong> {student.phone}</p>
//           <p className="text-gray-700"><strong>Address:</strong> {student.address}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;


'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import jwt from 'jsonwebtoken'; 

const StudentProfile = () => {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
  
    try {
      const decoded: any = jwt.decode(token);
      if (decoded?.data?.id) {
        setUserId(decoded.data.id);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);
  
  useEffect(() => {
    if (!userId) return;
  
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`https://istiqamauni-1.onrender.com/students/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch student details");

        const data = await response.json();
        setStudent(data.student);
        setUpdatedStudent(data.student);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudentDetails();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`https://istiqamauni-1.onrender.com/students/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setStudent(data.updatedStudent);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading student data...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  if (!student) {
    return <p className="text-center mt-10 text-gray-600">No student data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
        <div className="flex justify-center">
          <img
            src={student.profilePic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md border-4 border-green-500"
          />
        </div>

        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedStudent.name}
                onChange={handleInputChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              student.name
            )}
          </h2>
          <p className="text-sm text-gray-500">Reg No: {student.regNumber}</p>
          <p className="text-sm text-gray-500">
            {student.department} | {student.level}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-lg font-semibold">
          {student.feesPaid ? (
            <>
              <CheckCircle className="text-green-600" size={24} />
              <span className="text-green-600">Fees Paid</span>
            </>
          ) : (
            <>
              <XCircle className="text-red-600" size={24} />
              <span className="text-red-600">Fees Not Paid</span>
            </>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-gray-700">
            <strong>Email:</strong>{' '}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedStudent.email}
                onChange={handleInputChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              student.email
            )}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={updatedStudent.phone}
                onChange={handleInputChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              student.phone
            )}
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={updatedStudent.address}
                onChange={handleInputChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              student.address
            )}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;


// 'use client';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { CheckCircle, XCircle } from 'lucide-react';
// import jwt from 'jsonwebtoken'; 

// const StudentProfile = () => {
//   const router = useRouter();
//   const [student, setStudent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     // const token = localStorage.getItem("token"); 

//     console.log("Token from localStorage:", token); // ✅ Check if token exists
//     if (!token) {
//       console.error("No token found in localStorage!");
//       router.push("/login");
//       return;
//     }
  
//     try {
//       const decoded: any = jwt.decode(token);
//       console.log("Decoded Token:", decoded); // ✅ Check the structure of the decoded token
  
//       if (decoded?.data?.id) {
//         console.log("Extracted userId:", decoded.data.id); // ✅ Ensure `userId` is available
//         setUserId(decoded.data.id);
//       } else {
//         console.error("Student ID not found in token");
//         router.push("/login");
//       }
//     } catch (err) {
//       console.error("Error decoding token:", err);
//     }
//   }, []);
  
//   useEffect(() => {
//     if (!userId) return;
    
//     // const userId = "67dfbbe4d051c4033fae1aab"
  
//     const fetchStudentDetails = async () => {
//       try {
//         console.log("Fetching student data for ID:", userId);
//         const response = await fetch(`https://istiqamauni-1.onrender.com/students/${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch student details");
//         }
//         const data = await response.json();
//         console.log("Fetched Student Data:", data);
//         setStudent(data.student);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchStudentDetails();
//   }, [userId]); // ✅ Runs only when userId updates
  

//   if (loading) {
//     return <p className="text-center mt-10">Loading student data...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
//   }

//   if (!student) {
//     return <p className="text-center mt-10 text-gray-600">No student data found.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
//       <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
//         {/* Profile Picture */}
//         <div className="flex justify-center">
//           <img
//             src={student.profilePic || 'https://via.placeholder.com/150'}
//             alt="Profile"
//             className="w-32 h-32 rounded-full shadow-md border-4 border-green-500"
//           />
//         </div>

//         {/* Student Info */}
//         <div className="text-center mt-4">
//           <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
//           <p className="text-sm text-gray-500">Reg No: {student.regNumber}</p>
//           <p className="text-sm text-gray-500">
//             {student.department} | {student.level}
//           </p>
//         </div>

//         {/* Fees Status */}
//         <div className="mt-5 flex items-center justify-center gap-2 text-lg font-semibold">
//           {student.feesPaid ? (
//             <>
//               <CheckCircle className="text-green-600" size={24} />
//               <span className="text-green-600">Fees Paid</span>
//             </>
//           ) : (
//             <>
//               <XCircle className="text-red-600" size={24} />
//               <span className="text-red-600">Fees Not Paid</span>
//             </>
//           )}
//         </div>

//         {/* Additional Info */}
//         <div className="mt-6 space-y-3">
//           <p className="text-gray-700">
//             <strong>Email:</strong> {student.email}
//           </p>
//           <p className="text-gray-700">
//             <strong>Phone:</strong> {student.phone}
//           </p>
//           <p className="text-gray-700">
//             <strong>Address:</strong> {student.address}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;

