// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Input } from '@/components/ui/input';
// import axiosInstance from '@/utils/axiosInstance';

// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loginLoading, setLoginLoading] = useState<boolean>(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoginLoading(true);
//     setError('');

//     try {
//       const response = await axiosInstance.post('/login', { email, password });
//       const { token } = response.data;

//       // Save the token in localStorage
//       localStorage.setItem('token', token);

//       // Redirect to the appropriate dashboard
//       router.push('/student-dashboard');
//       setLoginLoading(false); // or '/admin-dashboard' for admin
//     } catch (err) {
//       setError('Something went wrong');
//       setLoginLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center shadow-2xl rounded lg:w-[80%] h-[90%]">
//       <Image
//         src={'/pupil icon.png'}
//         alt='image'
//         height={50}
//         width={50}
//         className='w-24 h-24 left-0 top-0 absolute animate-pulse'
//       />
//       <Link href="/" className='flex items-center'>
//         <Image src={'/logo1.png'} alt='' width={50} height={50}/>
//       </Link>
//       <form onSubmit={handleLogin} className="p-10 rounded text-center w-full text-white">
//         <div className='mb-4 flex flex-col gap-5 justify-center items-center'>
//           <h2 className="text-xl font-bold">Student Login</h2>
//           <p className='font-bold text-xs mb-4'>Enter your details</p>
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <Input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-4 w-full p-2 outline-none text-gray-700"
//           placeholder="Email"
//           required
//         />
//         <Input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-8 w-full p-2 outline-none text-gray-700"
//           placeholder="Password"
//           required
//         />
//         <button type="submit" className="w-[40%] bg-[#000080] text-white hover:text-red-600 p-2 rounded" disabled={loginLoading}>
//         {loginLoading ? 'Loading...' : 'Login'}</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/utils/axiosInstance";
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
      // const response = await axios.post("http://localhost:3000/login", { email, regNumber });
       const response = await axiosInstance.post("/login", { email, regNumber });
      // const response = await axiosInstance.post("/login", { email, password });
      const { token } = response.data;

      if (!token) {
        console.error("No token found in localStorage!");
        router.push("/login");
        return;
      }
      
      // Save the token in localStorage

      localStorage.setItem("token", token);

      // Redirect to the appropriate dashboard
      router.push('/student');
      setLoginLoading(false);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setLoginLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-indigo-800 p-4">
      {/* Glassmorphic Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
        {/* Floating Icon */}
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
          <Image src={"/pupil icon.png"} alt="User Icon" width={80} height={80} className="animate-bounce" />
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image src={"/logo1.png"} alt="Logo" width={60} height={60} className="opacity-90 hover:opacity-100 transition duration-300" />
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-white">Welcome Back</h2>
          <p className="text-sm text-gray-200 text-center">Log in to continue</p>

          {error && <p className="text-sm text-red-500 text-center bg-white/20 p-2 rounded-md">{error}</p>}

          <div>
            <label className="block text-gray-200 font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/20 border border-white/30 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Password</label>
            <Input
              type="password"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className="w-full bg-white/20 border border-white/30 p-3 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-300 text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-300 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
