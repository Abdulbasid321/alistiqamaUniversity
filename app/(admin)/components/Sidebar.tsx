// import React from "react";
// import { BookAIcon, GraduationCap, LayoutDashboard, LogOutIcon, UserPenIcon } from "lucide-react";
// import Link from "next/link";

// const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
//   const lists = [
//     { id: 1, name: "Add Student", path: "/teacher/addstudent", icon: LayoutDashboard },
//     { id: 2, name: "Dashboard", path: "/teacher/admindashboard", icon: UserPenIcon },
//     { id: 3, name: "Department", path: "/teacher/addcourses", icon: GraduationCap },
//     { id: 4, name: "Result", path: "/teacher/result", icon: BookAIcon },
//     { id: 5, name: "Logout", path: "/", icon: LogOutIcon },
//   ];

//   return (
//     <div className="border border-gray-600 h-screen p-4 shadow-md bg-white">
//       <h2 className="text-center text-xl font-bold text-green-700 my-2">Logo</h2>
//       <hr />
//       <div className="mt-2">
//         {lists.map((list) => (
//           <Link key={list.id} href={list.path} onClick={closeSidebar}>
//             <h2 className="flex items-center gap-3 text-md p-3 rounded-xl hover:bg-green-700 text-slate-500 hover:text-white">
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


"use client"; // If using Next.js App Router

import React from "react";
import { useRouter } from "next/navigation";
import { BookAIcon, GraduationCap, LayoutDashboard, LogOutIcon, UserPenIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const router = useRouter();

  const handleLogout = () => {
    // 🔹 Clear authentication data (JWT, session, etc.)
    localStorage.removeItem("jwtToken"); // If storing JWT in localStorage
    sessionStorage.removeItem("jwtToken"); // If using sessionStorage

    // 🔹 Redirect user to login page
    router.push("/login");
  };

  const lists = [
    { id: 1, name: "Add Student", path: "/teacher/addstudent", icon: LayoutDashboard },
    { id: 2, name: "Dashboard", path: "/teacher/admindashboard", icon: UserPenIcon },
    { id: 3, name: "Course", path: "/teacher/addcourses", icon: GraduationCap },
    { id: 4, name: "Time-Table", path: "/teacher/timetable", icon: BookAIcon },
    { id: 5, name: "Result", path: "/teacher/result", icon: BookAIcon },
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

        {/* 🔹 Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-md p-3 rounded-xl w-full mt-4 bg-red-500 text-white hover:bg-red-700"
        >
          <LogOutIcon />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
