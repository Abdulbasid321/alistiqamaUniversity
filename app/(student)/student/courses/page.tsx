
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import axiosInstance from '@/utils/axiosInstance';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';

// // // Define Course type
// // interface Course {
// //   id: string;
// //   name: string;
// //   code: string;
// //   instructor: string;
// //   status: 'Ongoing' | 'Completed' | 'Pending';
// // }

// // const StudentCourses = () => {
// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [search, setSearch] = useState('');

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await axiosInstance.get<Course[]>('/student/courses'); // Ensure this endpoint returns correct data
// //         setCourses(response.data);
// //       } catch (error) {
// //         console.error('Error fetching courses:', error);
// //       }
// //     };
// //     fetchCourses();
// //   }, []);

// //   const filteredCourses = courses.filter((course) =>
// //     course.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-2xl font-bold text-center mb-6">My Courses</h1>

// //       <Input
// //         type="text"
// //         placeholder="Search courses..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //         className="mb-6 p-2 border rounded w-full"
// //       />

// //       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
// //         {filteredCourses.length > 0 ? (
// //           filteredCourses.map((course) => (
// //             <Card key={course.id} className="p-4 shadow-md border rounded-lg">
// //               <CardContent>
// //                 <h2 className="text-xl font-semibold">{course.name}</h2>
// //                 <p className="text-sm text-gray-600">Course Code: {course.code}</p>
// //                 <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
// //                 <Badge className={`mt-2 text-white px-3 py-1 rounded-full ${
// //                   course.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-400'
// //                 }`}>
// //                   {course.status}
// //                 </Badge>
// //               </CardContent>
// //             </Card>
// //           ))
// //         ) : (
// //           <p className="text-center text-gray-500">No courses found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentCourses;

// 'use client';

// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// // Define Course type
// interface Course {
//   id: string;
//   name: string;
//   code: string;
//   instructor: string;
//   status: 'Ongoing' | 'Completed' | 'Pending';
//   semester: 'First' | 'Second';
//   level: '100' | '200' | '300' | '400';
// }

// // Hardcoded courses
// const sampleCourses: Course[] = [
//   { id: '1', name: 'Mathematics', code: 'MTH101', instructor: 'Dr. John Doe', status: 'Ongoing', semester: 'First', level: '100' },
//   { id: '2', name: 'Physics', code: 'PHY201', instructor: 'Prof. Jane Smith', status: 'Completed', semester: 'Second', level: '200' },
//   { id: '3', name: 'Computer Science', code: 'CSC301', instructor: 'Dr. Alex Brown', status: 'Ongoing', semester: 'First', level: '300' },
//   { id: '4', name: 'Biology', code: 'BIO101', instructor: 'Dr. Emily White', status: 'Pending', semester: 'Second', level: '100' },
//   { id: '5', name: 'Chemistry', code: 'CHM202', instructor: 'Prof. David Black', status: 'Ongoing', semester: 'First', level: '200' },
// ];

// const StudentCourses = () => {
//   const [search, setSearch] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedLevel, setSelectedLevel] = useState('');

//   // Filter courses based on search, semester, and level
//   const filteredCourses = sampleCourses.filter((course) =>
//     course.name.toLowerCase().includes(search.toLowerCase()) &&
//     (selectedSemester === '' || course.semester === selectedSemester) &&
//     (selectedLevel === '' || course.level === selectedLevel)
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">My Courses</h1>

//       {/* Search & Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <Input
//           type="text"
//           placeholder="Search courses..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border rounded w-full md:w-1/3"
//         />

//         {/* Semester Filter */}
//        {/* Semester Filter */}
// <Select onValueChange={setSelectedSemester}>
//   <SelectTrigger className="border p-2 rounded w-full md:w-1/3">
//     <SelectValue placeholder="Select Semester" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="First">First Semester</SelectItem>
//     <SelectItem value="Second">Second Semester</SelectItem>
//     <SelectItem value="All">All Semesters</SelectItem> {/* Use a valid string */}
//   </SelectContent>
// </Select>

// {/* Level Filter */}
// <Select onValueChange={setSelectedLevel}>
//   <SelectTrigger className="border p-2 rounded w-full md:w-1/3">
//     <SelectValue placeholder="Select Level" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="100">100 Level</SelectItem>
//     <SelectItem value="200">200 Level</SelectItem>
//     <SelectItem value="300">300 Level</SelectItem>
//     <SelectItem value="400">400 Level</SelectItem>
//     <SelectItem value="All">All Levels</SelectItem> {/* Use a valid string */}
//   </SelectContent>
// </Select>

//       </div>

//       {/* Course List */}
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <Card key={course.id} className="p-4 shadow-md border rounded-lg">
//               <CardContent>
//                 <h2 className="text-xl font-semibold">{course.name}</h2>
//                 <p className="text-sm text-gray-600">Course Code: {course.code}</p>
//                 <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
//                 <p className="text-sm text-gray-600">Semester: {course.semester}</p>
//                 <p className="text-sm text-gray-600">Level: {course.level}</p>
//                 <Badge className={`mt-2 text-white px-3 py-1 rounded-full ${
//                   course.status === 'Ongoing' ? 'bg-green-500' 
//                   : course.status === 'Completed' ? 'bg-blue-500' 
//                   : 'bg-gray-400'
//                 }`}>
//                   {course.status}
//                 </Badge>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No courses found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentCourses;




// // 'use client';

// // import React, { useState } from 'react';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';

// // // Define Course type
// // interface Course {
// //   id: string;
// //   name: string;
// //   code: string;
// //   instructor: string;
// //   status: 'Ongoing' | 'Completed' | 'Pending';
// // }

// // // Hardcoded courses
// // const sampleCourses: Course[] = [
// //   { id: '1', name: 'Mathematics', code: 'MTH101', instructor: 'Dr. John Doe', status: 'Ongoing' },
// //   { id: '2', name: 'Physics', code: 'PHY201', instructor: 'Prof. Jane Smith', status: 'Completed' },
// //   { id: '3', name: 'Computer Science', code: 'CSC301', instructor: 'Dr. Alex Brown', status: 'Ongoing' },
// //   { id: '4', name: 'Biology', code: 'BIO101', instructor: 'Dr. Emily White', status: 'Pending' },
// //   { id: '5', name: 'Chemistry', code: 'CHM202', instructor: 'Prof. David Black', status: 'Ongoing' },
// // ];

// // const StudentCourses = () => {
// //   const [search, setSearch] = useState('');

// //   // Filter courses based on search input
// //   const filteredCourses = sampleCourses.filter((course) =>
// //     course.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-2xl font-bold text-center mb-6">My Courses</h1>

// //       <Input
// //         type="text"
// //         placeholder="Search courses..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //         className="mb-6 p-2 border rounded w-full"
// //       />

// //       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
// //         {filteredCourses.length > 0 ? (
// //           filteredCourses.map((course) => (
// //             <Card key={course.id} className="p-4 shadow-md border rounded-lg">
// //               <CardContent>
// //                 <h2 className="text-xl font-semibold">{course.name}</h2>
// //                 <p className="text-sm text-gray-600">Course Code: {course.code}</p>
// //                 <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
// //                 <Badge className={`mt-2 text-white px-3 py-1 rounded-full ${
// //                   course.status === 'Ongoing' ? 'bg-green-500' 
// //                   : course.status === 'Completed' ? 'bg-blue-500' 
// //                   : 'bg-gray-400'
// //                 }`}>
// //                   {course.status}
// //                 </Badge>
// //               </CardContent>
// //             </Card>
// //           ))
// //         ) : (
// //           <p className="text-center text-gray-500">No courses found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentCourses;

'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
// Define Course type
interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  status: 'Ongoing' | 'Completed' | 'Pending';
  semester: 'First' | 'Second';
  level: '100' | '200' | '300' | '400';
}

const StudentCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>("https://istiqamauni-1.onrender.com/courses");
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search, semester, and level
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedSemester === '' || selectedSemester === 'All' || course.semester === selectedSemester) &&
    (selectedLevel === '' || selectedLevel === 'All' || course.level === selectedLevel)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Courses</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        {/* Semester Filter */}
        <Select onValueChange={setSelectedSemester}>
          <SelectTrigger className="border p-2 rounded w-full md:w-1/3">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Semesters</SelectItem>
            <SelectItem value="First">First Semester</SelectItem>
            <SelectItem value="Second">Second Semester</SelectItem>
          </SelectContent>
        </Select>

        {/* Level Filter */}
        <Select onValueChange={setSelectedLevel}>
          <SelectTrigger className="border p-2 rounded w-full md:w-1/3">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Levels</SelectItem>
            <SelectItem value="100">100 Level</SelectItem>
            <SelectItem value="200">200 Level</SelectItem>
            <SelectItem value="300">300 Level</SelectItem>
            <SelectItem value="400">400 Level</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="p-4 shadow-md border rounded-lg">
              <CardContent>
                <h2 className="text-xl font-semibold">{course.name}</h2>
                <p className="text-sm text-gray-600">Course Code: {course.code}</p>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-600">Semester: {course.semester}</p>
                <p className="text-sm text-gray-600">Level: {course.level}</p>
                <Badge className={`mt-2 text-white px-3 py-1 rounded-full ${
                  course.status === 'Ongoing' ? 'bg-green-500' 
                  : course.status === 'Completed' ? 'bg-blue-500' 
                  : 'bg-gray-400'
                }`}>
                  {course.status}
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
