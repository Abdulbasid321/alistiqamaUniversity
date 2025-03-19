
"use client";
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface Class {
  _id: string;
  name: string;
}

interface Props {
  setStudentData: (classId: string) => void;
  currentClassId: string;
}

const ClassSelector: React.FC<Props> = ({ currentClassId, setStudentData }) => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/class');
        console.log('Fetched classes:', response.data); // Debug log
        setClasses(response.data.classes); // Adjust if your API response structure is different
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="mb-4">
      <select
        id="classSelect"
        value={currentClassId}
        onChange={(e) => setStudentData(e.target.value)}
        className="block w-full mt-1 p-3 rounded-md text-sm text-gray-500"
        required
      >
        <option value="" >Select student department</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id} >{cls.name}</option>
        ))}

        {/* <option value="" >Select student class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id} >{cls.name}</option>
        ))} */}
      </select>
    </div>
  );
};

export default ClassSelector;

