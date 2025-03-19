"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/'); // Redirect to login page
  };

  return (
    <div className='flex flex-row gap-5 bg-white w-full justify-between items-center h-[60px] fixed border-b-2 border-red-600 p-5'>
      <div className='flex justify-center items-center gap-3'>
      <Link href="/" className='flex items-center '>
        <Image src={'/logo1.png'} alt='' width={50} height={50} className='w-auto h-auto'/>
      </Link>
        <h1 className='text-sm font-bold text-[#000080] hover:text-red-600'>Student Dashboard</h1>
      </div>
      <button onClick={handleLogout} className="bg-[#000080] text-center text-xs font-bold text-white hover:text-red-600 p-2 rounded-md">
        Log out
      </button>
    </div>
  );
};

export default Navbar;
