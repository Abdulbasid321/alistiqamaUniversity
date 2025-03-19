import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const AdminSidebar = () => {
  return (
    <div className='flex flex-col gap-5 w-[150px] items-center h-full fixed border-r-2 border-red-600 p-5'>
      <Link href="/" className='flex items-center'>
        <Image src={'/logo1.png'} alt='' width={50} height={50}/>
      </Link>
      <div className='flex flex-col justify-center items-center gap-5 h-[50%]'>
        <Link  href="" className='text-sm font-bold text-[#000080] hover:text-red-600'>Student</Link>
        <Link  href="" className='text-sm font-bold text-[#000080] hover:text-red-600'>Add admin</Link>
      </div>
      <Link href={'/'} className="w-full bg-[#000080] text-center text-white hover:text-red-600 p-2 rounded-md">Logout</Link>

    </div>
  )
}

export default AdminSidebar