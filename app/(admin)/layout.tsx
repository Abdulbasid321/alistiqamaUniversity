// import React from 'react'
// import Sidebar from './components/Sidebar'
// import Header from './components/Header'


// const layout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div>
//             <div className='md:w-64 fixed hidden md:block'>
//                 <Sidebar />
//             </div>
//           <div className='md:ml-64'>
//             <Header />
//           {children}
//           </div>
//         </div>
//     )
// }

// export default layout

// "use client";
// import { useState } from "react";
// import Sidebar from './components/Sidebar'
// import Header from './components/Header'


// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex">
//       {/* Sidebar (Hidden on large screens, Slide-in on small screens) */}
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-64"
//         } transition-transform md:translate-x-0 md:block hidden`}
//       >
//         <Sidebar children={undefined} />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 md:ml-64">
//         <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//         {children}
//       </div>

//       {/* Overlay (For closing sidebar on small screens) */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// } 



// "use client";
// import { useState } from "react";
// import Sidebar from './components/Sidebar'
// import Header from './components/Header'

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex relative">
//       {/* Sidebar (Mobile + Desktop) */}
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out 
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:block z-50`}
//       >
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 md:ml-64 relative z-10">
//         <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//         {children}
//       </div>

//       {/* Clickable Overlay (Only if Sidebar is open) */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Sidebar from './components/Sidebar'
import Header from './components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex relative">
      {/* Sidebar (Mobile + Desktop) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:block z-50`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 relative z-10">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        {children}
      </div>

      {/* Clickable Overlay (Only if Sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
