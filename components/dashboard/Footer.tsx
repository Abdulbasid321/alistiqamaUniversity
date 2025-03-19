import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className=' bg-[#000080] w-full flex flex-col justify-around items-start'>
        <div className='flex flex-col md:flex-row flex-1 container justify-between py-10'>
          <div className='p-5'>
            <div className='flex flex-col gap-6'>
              <Link href={'/'}>
                <div className='flex flex-col-reverse md:flex-col gap-4 items-center  text-xl font-bold text-white '>
                  <p>Al-Istiqama University</p>
                  <Image src='/logo1.png' alt='' width={40} height={40} />
                </div>
              </Link>
              <div className='flex gap-6 pb-5 text-white'>
                
              </div>
            </div>
          </div>
          <div className='p-5'>
            <ul>
              <p className='text-white font-bold text-xl pb-4'>Links</p>
              <div className='flex md:flex-col flex-row gap-5'>
                <li className='text-white opacity-70 text-sm pb-2 font-semibold hover:text-red-600 cursor-pointer'>
                    Our Process
                </li>
                <li className='text-white opacity-70 text-sm pb-2 font-semibold hover:text-red-600 cursor-pointer'>
                    Services
                </li>
              </div>
            </ul>
          </div>
          <div className='p-5'>
            <ul>
              <p className='text-white font-bold text-xl pb-4'>Community</p>
              <div className='flex md:flex-col flex-row gap-5'>
                <li className='text-white opacity-70 text-sm pb-2 font-semibold hover:text-red-600 cursor-pointer'>
                    Refer a Friend
                </li>
                <li className='text-white opacity-70 text-sm pb-2 font-semibold hover:text-red-600 cursor-pointer'>
                    Gift Cards
                </li>
              </div>
            </ul>
          </div>
          <div className='p-5'>
            <ul>
              <p className='text-white font-bold text-xl pb-4'>Resources</p>
              <div className='flex md:flex-col flex-row gap-5'>
                <li className='text-white opacity-70 text-sm pb-2 font-semibold hover:text-red-600 cursor-pointer'>
                    Support
                </li>
                <li className='text-white opacity-70 text-sm pb-2 font-semibold hover:text-red-600 cursor-pointer'>
                    Latest Updates
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className='w-full flex flex-col text-center border-t-2 border-red-600  py-6 '>
          <h1 className='text-white opacity-70 font-semibold container '>
            Copyright Hands-on Learning 2024 All right Reserved
          </h1>
        </div>
      </div>
  )
}

export default Footer