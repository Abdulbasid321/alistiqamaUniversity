import React from 'react'
import '../globals.css'
import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className='flex lg:flex-row flex-col h-screen'>
          <div className='hidden lg:flex justify-end items-center h-screen w-[50%]  border border-[#000080] '>
            <Image 
              src="/login1.png"
              alt="logo"
              width={500}
              height={500}
              className="shadow-2xl rounded"
            />  
          </div>
          <section className='flex bg-[#04031C] justify-center flex-1 flex-col '>
            {children}
          </section>
          {/* text-[#877EFF] */}
        </div>
  )
}