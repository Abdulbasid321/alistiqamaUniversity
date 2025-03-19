import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const page = () => {
  return (
    <div className='bg-[#04031C] w-full h-screen flex justify-center items-center'>
        <div className='bg-white flex flex-col items-center text-center gap-5 p-5 rounded'>
          <Link href="/"  className='flex items-center'><Image src={'/logo1.png'} alt='' width={50} height={50}/></Link>
          <p className='text-[#04031C] text-sm font-bold'>Thank you, your response was sent successfully. <br /> We will get back to you shortly.</p>
          <Link href="/"  className='px-2 py-3 font-bold text-xs text-white rounded bg-[#04031C]'>Home Page</Link>
        </div>
    </div>
  )
}

export default page;