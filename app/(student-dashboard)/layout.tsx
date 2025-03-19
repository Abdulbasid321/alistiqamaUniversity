import React from 'react';
import Navbar from './components/Navbar';
import '../globals.css';
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className='flex flex-col w-full min-h-screen bg-[#f2f2f2]'>
        <Navbar />
        <div className='p-4 mt-[50px] '>{children}</div>
      </div>
    
  );
}