// 'use client';

// import React from 'react';
// import Image from 'next/image';

// function HeroSection() {
//   return (
//     <div id='home' className='container lg:min-h-screen flex flex-col-reverse lg:flex-row  w-full mt-20 '>
//       <div className=' flex lg:w-1/2 w-full  items-center justify-center relative'>
//         <Image
//           src={'/books icon.png'}
//           alt='image'
//           height={50}
//           width={50}
//           className='w-14 h-14 left-20  top-60  absolute animate-bounce'
//         />
//         <Image
//           src={'/Pencil icon.png'}
//           alt='image'
//           height={50}
//           width={50}
//           className='w-14 h-14 right-56 bottom-56  absolute animate-bounce'
//         />
//         <div className=' flex flex-col gap-4 w-[500px] items-center text-center lg:items-start lg:text-start'>
//           <h1 className=' text-xl font-bold text-red-600'>
//             Welcome to Hands-on Learning Primary And Secondary School
//           </h1>
//           <h1 className=' text-3xl md:text-6xl font-bold text-[#000080]'>
//             Empower your kids future with us.
//           </h1>
//           <p className=' text-sm md:text:lg font-normal'>
//           We envision a world in which every child regardless of background becomes academically, intellectually, socially and morally self-relient, productive and responsible citizen.
//           </p>
//         </div>
//       </div>
//       <div className='flex lg:w-1/2 w-full justify-center items-center h-[500px] lg:h-[700px]'>
//         <div className='flex relative w-[450px] h-[400px] lg:w-[450px] lg:h-[500px] px-6'>
//           <Image src={'/image 4.jpg'} alt='image' className='rounded-full' fill />
//           <Image
//             src={'/Pencil icon.png'}
//             alt='image'
//             width={20}
//             height={20}
//             className=' w-10 h-10 absolute top-0 left-0 animate-bounce'
//           />
//           <Image
//             src={'/books icon.png'}
//             alt='image'
//             width={20}
//             height={20}
//             className=' w-10 h-10 bottom-0 absolute animate-bounce'
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;


'use client';

import React from 'react';
import Image from 'next/image';

function HeroSection() {
  return (
    <div
      id='home'
      className='relative w-full h-screen flex items-center justify-center text-white'
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/school.jpeg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> Dark Overlay
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        {/* Left Side - Text */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-gradient-to-r from-green-500 to-green-300">
            Welcome to Al Istiqama University
          </h1>
          <p className="text-lg lg:text-xl text-gray-200">
            Empowering students with knowledge, innovation, and excellence. Join us on a journey of academic success.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full transition">
            Get Started
          </button>
        </div>

        {/* Right Side - Centered Image */}
        <div className="lg:w-1/2 flex items-center justify-center relative">
          {/* <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[450px]">
            <Image
              src="/student.jpg"  // Replace with your student image
              alt="Student"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
          </div> */}

          {/* Floating Icons */}
          <Image
            src="/books icon.png"
            alt="Books Icon"
            width={50}
            height={50}
            className="absolute top-5 left-5 animate-bounce"
          />
          <Image
            src="/Pencil icon.png"
            alt="Pencil Icon"
            width={50}
            height={50}
            className="absolute bottom-5 right-5 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;


// 'use client';

// import React from 'react';
// import Image from 'next/image';

// function HeroSection() {
//   return (
//     <div
//       id='home'
//       className='relative w-full h-screen flex items-center justify-center text-white'
//     >
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0">
//         <Image
//           src="/imgs.jpg" // Replace with your actual background image
//           alt="Hero Background"
//           layout="fill"
//           objectFit="cover"
//           className="z-0"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark Overlay */}
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
//         {/* Left Side - Text */}
//         <div className="lg:w-1/2 text-center lg:text-left space-y-6">
//           <h1 className="text-4xl lg:text-6xl font-bold text-gradient-to-r from-green-500 to-green-300">
//             Welcome to Al Istiqama University
//           </h1>
//           <p className="text-lg lg:text-xl text-gray-200">
//             Empowering students with knowledge, innovation, and excellence. Join us on a journey of academic success.
//           </p>
//           <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full transition">
//             Get Started
//           </button>
//         </div>

//         {/* Right Side - Image */}
//         <div className="lg:w-1/2 flex justify-center items-center relative">
//           <div className="relative w-[400px] h-[400px] lg:w-[450px] lg:h-[500px]">
//             {/* <Image
//               src="/imgs.jpg" // Replace with your student image
//               alt="Student"
//               layout="fill"
//               className="rounded-lg shadow-lg"
//             /> */}
//           </div>
          
//           {/* Floating Icons */}
//           <Image
//             src="/books icon.png"
//             alt="Books Icon"
//             width={50}
//             height={50}
//             className="absolute top-10 left-10 animate-bounce"
//           />
//           <Image
//             src="/Pencil icon.png"
//             alt="Pencil Icon"
//             width={50}
//             height={50}
//             className="absolute bottom-10 right-10 animate-bounce"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;
