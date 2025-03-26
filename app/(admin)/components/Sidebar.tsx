// import React from 'react'
// import {BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon, } from 'lucide-react'
// import Link from 'next/link'

// const Sidebar = () => {
//     const  lists =[
//         {
//             id: 1,
//            name: "Profile",
//            path: "/student/profile",
//            icon: LayoutDashboard
//         },
//         {
//             id: 2,
//            name: "Dashboard",
//            path: "/student/dashboard",
//            icon: UserPenIcon
//         },
//         {
//             id: 3,
//            name: "courses",
//            path: "/student/courses",
//            icon: GraduationCap
//         },
//         {
//             id: 4,
//            name: "Result",
//            path: "/teachers-dashboard/result",
//            icon: BookAIcon
//         },

//     ]
//   return (
//     <div className='border border-gray-600 h-screen p-4 shadow-md'>
//         <h2 className='text-center text-xl font-bold text-green-700 my-2'>Logo</h2>
//         <hr />
//         <div className='mt-2'>
//             {lists.map(list =>(
//                 <Link key={list.id} href={list.path}>
//                     <h2 className='flex items-center gap-3 text:md p-3 rounded-xl hover:bg-green-700 text-slate-500 hover:text-white'>
//                         <list.icon />
//                         {list.name}
//                     </h2>
//                 </Link>
//             ))}

//         </div>
//     </div>
//   )
// }

// export default Sidebar

// import { BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon } from "lucide-react";
// import Link from "next/link";

// const Sidebar = () => {
//   const lists = [
//     { id: 1, name: "Profile", path: "/student/profile", icon: LayoutDashboard },
//     { id: 2, name: "Dashboard", path: "/student/dashboard", icon: UserPenIcon },
//     { id: 3, name: "Courses", path: "/student/courses", icon: GraduationCap },
//     { id: 4, name: "Result", path: "/teachers-dashboard/result", icon: BookAIcon },
//   ];

//   return (
//     <div className="h-screen p-4 bg-white border-r shadow-md">
//       <h2 className="text-center text-xl font-bold text-green-700 my-2">Logo</h2>
//       <hr />
//       <div className="mt-2">
//         {lists.map((list) => (
//           <Link key={list.id} href={list.path}>
//             <h2 className="flex items-center gap-3 text-md p-3 rounded-xl hover:bg-green-700 text-slate-500 hover:text-white cursor-pointer">
//               <list.icon />
//               {list.name}
//             </h2>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// // import { BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon } from "lucide-react";
// // import Link from "next/link";

// // const Sidebar = () => {
// //   const lists = [
// //     { id: 1, name: "Profile", path: "/student/profile", icon: LayoutDashboard },
// //     { id: 2, name: "Dashboard", path: "/student/dashboard", icon: UserPenIcon },
// //     { id: 3, name: "Courses", path: "/student/courses", icon: GraduationCap },
// //     { id: 4, name: "Result", path: "/teachers-dashboard/result", icon: BookAIcon },
// //   ];

// //   return (
// //     <div className="h-screen p-4 bg-white border-r shadow-md">
// //       <h2 className="text-center text-xl font-bold text-green-700 my-2">Logo</h2>
// //       <hr />
// //       <div className="mt-2">
// //         {lists.map((list) => (
// //           <Link key={list.id} href={list.path}>
// //             <h2 className="flex items-center gap-3 text-md p-3 rounded-xl hover:bg-green-700 text-slate-500 hover:text-white cursor-pointer">
// //               <list.icon />
// //               {list.name}
// //             </h2>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;


import React from "react";
import { BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const lists = [
    { id: 1, name: "Add Student", path: "/teacher/addstudent", icon: LayoutDashboard },
    { id: 2, name: "Dashboard", path: "/teacher/admindashboard", icon: UserPenIcon },
    { id: 3, name: "Courses", path: "/teacher/addcourses", icon: GraduationCap },
    { id: 4, name: "Result", path: "/teacher/result", icon: BookAIcon },
  ];

  return (
    <div className="border border-gray-600 h-screen p-4 shadow-md bg-white">
      <h2 className="text-center text-xl font-bold text-green-700 my-2">Logo</h2>
      <hr />
      <div className="mt-2">
        {lists.map((list) => (
          <Link key={list.id} href={list.path} onClick={closeSidebar}>
            <h2 className="flex items-center gap-3 text-md p-3 rounded-xl hover:bg-green-700 text-slate-500 hover:text-white">
              <list.icon />
              {list.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
