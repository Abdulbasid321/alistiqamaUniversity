'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { jwtDecode } from 'jwt-decode'; 
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface Result {
  user: string;
  _id: string;
  classId: {
    _id: string;
    name: string;
  };
  fileName: string;
  fileType: string;
}

interface Class {
  _id: string;
  name: string;
}


interface DecodedToken {
  data: {
    id: string;
    email: string;
  };
}

const StudentDashboard = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const decodedToken = jwtDecode<DecodedToken>(token);
      const userId = decodedToken.data.id;

      console.log(`Fetching results for user ID: ${userId}`);

      const response = await axiosInstance.get(`/getResults/${userId}`);
      console.log('API response:', response.data);

      setResults(response.data.results);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Error fetching results');
      setLoading(false);
    }
  };

  // const handleDownloadResult = async (fileId: string) => {
  //   try {
  //     const response = await axiosInstance.get(`/downloadResult/${fileId}`, {
  //       responseType: 'blob',
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (err) {
  //     console.error('Error downloading result:', err);
  //   }
  // };

  const handleDownloadResult = async (fileId: string) => {
    try {
      const response = await axiosInstance.get(`/downloadResult/${fileId}`, {
        responseType: 'blob',
      });
  
      // Log headers to check the content-disposition
      console.log('Response headers:', response.headers);
  
      const disposition = response.headers['content-disposition'];
      const filename = disposition ? disposition.split('filename=')[1] : 'result.pdf'; // Fallback filename
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading result:', err);
    }
  };
  

  if (loading) return <div className="flex justify-center items-center text-center text-gray-700">Loading...</div>;
  if (error) return <div className="flex justify-center items-center text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-3">
      <div className="relative flex items-center justify-center">
        <Image
          src={'/pupil icon.png'}
          alt='Student Icon'
          height={50}
          width={50}
          className='w-24 h-24 absolute right-0 top-0 animate-pulse'
        />
        <Image
        src={'/results icon.png'}
        alt='image'
        height={50}
        width={50}
        className='w-24 h-24 right-0  bottom-20  absolute animate-pulse'
      />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-lg rounded-lg p-3">
        <h2 className="text-xl font-semibold mb-4 text-[#000080]">Results</h2>
        <Table className='bg-white'>
          <TableCaption>A list of your results</TableCaption>
          <TableHeader>
            <TableRow >
              <TableHead className="w-[10%] text-[#000080] font-bold">Class</TableHead>
              <TableHead className='text-[#000080] font-bold'>File Name</TableHead>
              <TableHead className="text-right text-[#000080] font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {results.length > 0 ? (
                results.map(result => (
            <TableRow key={result._id}>
              <TableCell className="font-medium">{result.classId.name}</TableCell>
              <TableCell>{result.fileName} </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleDownloadResult(result._id)}
                  className="bg-[#000080] text-white py-1 px-2 text-xs font-bold rounded hover:text-red-600">
                  Download
                </button>
              </TableCell>
            </TableRow>
            ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Image
        src={'/Pencil icon.png'}
        alt='image'
        height={50}
        width={50}
        className='w-14 h-14 right-20 bottom-0  absolute animate-bounce'
      />
        <Image
        src={'/results icon.png'}
        alt='image'
        height={50}
        width={50}
        className='w-24 h-24 left-0  bottom-20  absolute animate-pulse'
      />
    </div>
  );
};

export default StudentDashboard;

