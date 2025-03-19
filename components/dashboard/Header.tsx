'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
  return (
    <header className="md:border-[#000080] border-red-600 border-b-2 flex flex-col fixed z-50 inset-x-0">
        <div className='py-4 md:px-5 px-3 flex justify-between bg-white items-center w-full'>
            <Link href="/"  className='flex items-center'>
                <Image src={'/logo1.png'} alt='' width={40} height={40} className='w-auto h-auto'/>
                <h1 className="text-2xl font-bold text-[#000080]">Al-istiqama</h1>
            </Link>
            <div className='font-bold text-sm hidden md:flex items-center gap-5'>
                <Link href="#news" className='hover:text-red-500 text-[#000080] '>News & Events</Link>
                <Link href="#about" className='hover:text-red-500 text-[#000080] '>About</Link>
                <Link href="#gallery" className='hover:text-red-500 text-[#000080] '>Gallery</Link>
                <Link href="#contact" className='hover:text-red-500 text-[#000080] '>Contact</Link>
            </div>
            <nav className='font-bold md:text-sm text-xs flex items-center gap-3'>
                <Link href="/login" className='hover:text-red-500 text-[#000080]'>Student</Link>
                <Link href="/admin" className='bg-[#000080] hover:bg-red-600 text-white rounded-md py-2 px-3'>Admin</Link>
            </nav>
        </div>
    </header>
  );
};

export default Header;
