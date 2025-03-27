// import { Bell } from 'lucide-react'
// import React from 'react'

// const Header = () => {
//   return (
//     <div className='flex items-center justify-between p-4 border border-gray-400 shadow-sm'>
//         <div>image</div>
//         <div><Bell  className='h-6 w-6 hover:text-green-700 cursor-pointer'/></div>

//     </div>
//   )
// }

// export default Header

import { Bell, Menu } from "lucide-react";
import Link from "next/link";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md md:ml-4">
      {/* Hamburger Menu Button (Only visible on mobile) */}
      <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
        <Menu size={28} />
      </button>
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="">
        {/* <div><Link href="/"><h3 className="h-6 w-6 hover:text-green-700 cursor-pointer items-start">Logout</h3></Link></div> */}
        <div><Bell className='h-6 w-6 hover:text-green-700 cursor-pointer items-start' /></div>
      </div>

    </header>
  );
}
