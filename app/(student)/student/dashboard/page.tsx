
// 'use client';

// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Calendar, Bell, FileText, CheckCircle, Banknote, User } from 'lucide-react';

// const student = {
//   id: 'UNI-2024001',
//   name: 'John Doe',
//   email: 'johndoe@university.edu',
//   level: '200',
//   department: 'Computer Science',
//   tuitionPaid: true,
// };

// const courses = [
//   { id: '1', name: 'Mathematics', code: 'MTH201', status: 'Ongoing' },
//   { id: '2', name: 'Physics', code: 'PHY202', status: 'Completed' },
//   { id: '3', name: 'Computer Science', code: 'CS203', status: 'Pending' },
// ];

// const grades = [
//   { course: 'Mathematics', grade: 'A' },
//   { course: 'Physics', grade: 'B+' },
//   { course: 'Computer Science', grade: 'Pending' },
// ];

// const deadlines = [
//   { id: '1', title: 'Math Assignment', dueDate: 'Aug 30, 2024' },
//   { id: '2', title: 'Physics Lab Report', dueDate: 'Sep 2, 2024' },
// ];

// const notifications = [
//   { id: '1', message: 'New university policy update!', date: 'Today' },
//   { id: '2', message: 'Registration for next semester starts soon!', date: 'Yesterday' },
// ];

// const StudentDashboard = () => {
//   return (
//     <div className="container mx-auto p-6">
//       {/* Student Profile Section */}
//       <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
//         <div>
//           <h1 className="text-2xl font-bold">Welcome, {student.name} 👋</h1>
//           <p className="text-gray-500">{student.email}</p>
//           <p className="text-gray-700 font-semibold">Level: {student.level}</p>
//           <p className="text-gray-700 font-semibold">Department: {student.department}</p>
//         </div>
//         <Button className="bg-green-500 hover:bg-green-600 text-white">Edit Profile</Button>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//         <Button className="flex items-center gap-2">
//           <FileText size={20} /> View Courses
//         </Button>
//         <Button className="flex items-center gap-2">
//           <Calendar size={20} /> Timetable
//         </Button>
//         <Button className="flex items-center gap-2">
//           <CheckCircle size={20} /> Grades
//         </Button>
//         <Button className="flex items-center gap-2">
//           <Bell size={20} /> Notifications
//         </Button>
//       </div>

//       {/* Tuition Status */}
//       <h3 className="text-xl font-semibold mt-6 mb-4">Financial Status</h3>
//       <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Banknote size={24} className="text-green-600" />
//           <p className="text-gray-700">
//             {student.tuitionPaid ? 'Tuition Paid' : 'Outstanding Balance'}
//           </p>
//         </div>
//         {!student.tuitionPaid && (
//           <Button className="bg-red-500 hover:bg-red-600 text-white">Pay Now</Button>
//         )}
//       </div>

//       {/* Course Overview */}
//       <h3 className="text-xl font-semibold mt-6 mb-4">Enrolled Courses</h3>
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
//         {courses.map((course) => (
//           <Card key={course.id} className="p-4 shadow-md border rounded-lg">
//             <CardContent>
//               <h2 className="text-xl font-semibold">{course.name}</h2>
//               <p className="text-sm text-gray-600">Course Code: {course.code}</p>
//               <Badge
//                 className={`mt-2 text-white px-3 py-1 rounded-full ${
//                   course.status === 'Ongoing' ? 'bg-green-500' 
//                   : course.status === 'Completed' ? 'bg-blue-500' 
//                   : 'bg-gray-400'
//                 }`}
//               >
//                 {course.status}
//               </Badge>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Upcoming Deadlines */}
//       <h3 className="text-xl font-semibold mt-6 mb-4">Upcoming Deadlines</h3>
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         {deadlines.length > 0 ? (
//           deadlines.map((deadline) => (
//             <div key={deadline.id} className="flex justify-between border-b py-2">
//               <span>{deadline.title}</span>
//               <span className="text-gray-500">{deadline.dueDate}</span>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No upcoming deadlines.</p>
//         )}
//       </div>

//       {/* Grades Overview */}
//       <h3 className="text-xl font-semibold mt-6 mb-4">Grades Overview</h3>
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         {grades.length > 0 ? (
//           grades.map((grade, index) => (
//             <div key={index} className="flex justify-between border-b py-2">
//               <span>{grade.course}</span>
//               <span className={`font-semibold ${grade.grade === 'Pending' ? 'text-gray-500' : 'text-green-600'}`}>
//                 {grade.grade}
//               </span>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No grades available.</p>
//         )}
//       </div>

//       {/* Notifications */}
//       <h3 className="text-xl font-semibold mt-6 mb-4">Recent Notifications</h3>
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div key={notification.id} className="flex justify-between border-b py-2">
//               <span>{notification.message}</span>
//               <span className="text-gray-500">{notification.date}</span>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No new notifications.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


'use client';

import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const StudentDashboardPage = () => {
  const router = useRouter();
  const [studentName, setStudentName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded: any = jwt.decode(token);
      const studentId = decoded?.data?.id;
      if (studentId) {
        setUserId(studentId);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Token decoding error:', error);
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`https://istiqamauni-1.onrender.com/students/${userId}`);
        // const res = await fetch(`http://localhost:5000/students/${userId}`);
        const data = await res.json();
        setStudentName(data.student.name);
      } catch (err) {
        console.error('Failed to fetch student data:', err);
      }
    };

    fetchStudent();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Welcome Banner */}
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-sm mb-6">
        <p className="font-semibold text-lg">
          Welcome, {studentName || 'Student'} 🎓
        </p>
        <p className="text-sm text-green-700">Here’s your dashboard overview.</p>
      </div>

      {/* Static Action Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/student/courses">
          <div className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition cursor-pointer border border-gray-100 text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-700 mb-1">Browse Courses</h3>
            <p className="text-sm text-gray-500">Explore and enroll in courses.</p>
          </div>
        </Link>

        <Link href="/student/studentresult">
          <div className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition cursor-pointer border border-gray-100 text-center">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold text-gray-700 mb-1">View Results</h3>
            <p className="text-sm text-gray-500">See your academic progress.</p>
          </div>
        </Link>

        <Link href="https://ausumaila.edu.ng">
          <div className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition cursor-pointer border border-gray-100 text-center">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-gray-700 mb-1">Contact Support</h3>
            <p className="text-sm text-gray-500">Need help? Reach out here.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardPage;

