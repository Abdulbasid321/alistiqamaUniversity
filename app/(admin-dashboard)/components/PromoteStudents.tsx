"use client";

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';

interface Class {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  firstName: string;
  sureName: string;
  email: string;
}

const PromoteStudents = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedClassIdSingle, setSelectedClassIdSingle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [newClassIdSingle, setNewClassIdSingle] = useState<string>('');
  const [promoteMessageSingle, setPromoteMessageSingle] = useState<string>('');
  const [loadingSingle, setLoadingSingle] = useState<boolean>(false);

  const [selectedClassIdAll, setSelectedClassIdAll] = useState<string>('');
  const [newClassIdAll, setNewClassIdAll] = useState<string>('');
  const [promoteMessageAll, setPromoteMessageAll] = useState<string>('');
  const [loadingAll, setLoadingAll] = useState<boolean>(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (promoteMessageSingle || promoteMessageAll) {
      const timer = setTimeout(() => {
        setPromoteMessageSingle('');
        setPromoteMessageAll('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [promoteMessageSingle, promoteMessageAll]);

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get('/class');
      setClasses(response.data.classes);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  useEffect(() => {
    if (selectedClassIdSingle) {
      fetchUsersByClass(selectedClassIdSingle);
    }
  }, [selectedClassIdSingle]);

  const fetchUsersByClass = async (classId: string) => {
    try {
      const response = await axiosInstance.get(`/class/${classId}/users`);
      setUsers(response.data.users);
    } catch (err) {
      console.error('Error fetching users for class:', err);
    }
  };

  const handlePromoteSingle = async () => {
    setLoadingSingle(true);
    setPromoteMessageSingle('');
    try {
      await axiosInstance.post('/promote', { userIds: [selectedUserId], newClassId: newClassIdSingle });
      setPromoteMessageSingle('Student promoted successfully.');
      fetchUsersByClass(selectedClassIdSingle); // Refresh the user list after promotion
    } catch (err) {
      console.error('Error promoting student:', err);
      setPromoteMessageSingle('Error promoting student.');
    }
    setLoadingSingle(false);
  };

  const handlePromoteAll = async () => {
    setLoadingAll(true);
    setPromoteMessageAll('');
    try {
      const response = await axiosInstance.get(`/class/${selectedClassIdAll}/users`);
      const userIds = response.data.users.map((user: User) => user._id);

      await axiosInstance.post('/promote', { userIds, newClassId: newClassIdAll });
      setPromoteMessageAll('All students promoted successfully.');
      fetchUsersByClass(selectedClassIdAll); // Refresh the user list after promotion
    } catch (err) {
      console.error('Error promoting all students:', err);
      setPromoteMessageAll('Error promoting all students.');
    }
    setLoadingAll(false);
  };

  return (
 <div id='p' className="mb-8">
    <div className="flex justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-red-600">Promote Students</h2>
            <p className='text-xs font-light text-gray-600 mb-4'>Promote student section where we have two parts, we can promote individually and we can promote multiple students by class at the end of the session.</p>
          </div>
          <Image src="/promote icon.png" alt="image" height={50} width={50} className="w-12 h-12 " />
        </div>
    <div className='flex md:flex-row flex-col gap-5 w-full'>
        <div className='flex flex-col gap-4 w-full'>
           <div className='w-full'>
           <h3 className="text-md font-light mb-2 text-[#000080]">Promote Students in a Class Individually</h3>
             <div className="mb-4 w-full">
                <select value={selectedClassIdSingle} onChange={(e) => setSelectedClassIdSingle(e.target.value)} className="border rounded-lg p-2 w-full text-gray-500">
                <option value="">Select current class</option>
                {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                    {cls.name}
                    </option>
                ))}
                </select>
            </div>
            <div className="mb-4 w-full">
                <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className="border rounded-lg p-2 w-full text-gray-500">
                <option value="">Select a student</option>
                {users.length > 0 ? (
                    users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.firstName} {user.sureName}
                    </option>
                    ))
                ) : (
                    <option disabled>No users available</option>
                )}
                </select>
            </div>
            <div className="mb-4 w-full">
                <select value={newClassIdSingle} onChange={(e) => setNewClassIdSingle(e.target.value)} className="border rounded-lg p-2 w-full text-gray-500">
                <option value="">Select next class</option>
                {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                    {cls.name}
                    </option>
                ))}
                </select>
              </div>
              <button
                    onClick={handlePromoteSingle}
                    className="bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded"
                    disabled={loadingSingle || !selectedUserId || !newClassIdSingle}
                >
                    {loadingSingle ? 'Promoting...' : 'Promote Student'}
                </button>
                {promoteMessageSingle && <p className={`font-bold text-xs text-${promoteMessageSingle.includes('success') ? 'green' : 'red'}-500`}>{promoteMessageSingle}</p>}
           </div>
          </div>

          <div className='flex flex-col gap-4 w-full'>
            <div className="w-full">
                <h3 className="text-md font-light mb-2 text-[#000080]">Promote All Students in a Class</h3>
                
                <div className="mb-4 w-full">
                    <select value={selectedClassIdAll} onChange={(e) => setSelectedClassIdAll(e.target.value)} className="border rounded-lg p-2 w-full text-gray-500">
                        <option value="" >Select a class</option>
                        {classes.map((cls) => (
                        <option key={cls._id} value={cls._id}>
                            {cls.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 w-full">
                <select value={newClassIdAll} onChange={(e) => setNewClassIdAll(e.target.value)} className="border rounded-lg p-2 w-full text-gray-500">
                    <option value="">Select next class</option>
                    {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                        {cls.name}
                    </option>
                    ))}
                </select>
                </div>

                <button
                onClick={handlePromoteAll}
                className="bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded"
                disabled={loadingAll || !selectedClassIdAll || !newClassIdAll}
                >
                {loadingAll ? 'Promoting...' : 'Promote All Students'}
                </button>
                {promoteMessageAll && <p className={`font-bold text-xs text-${promoteMessageAll.includes('success') ? 'green' : 'red'}-500`}>{promoteMessageAll}</p>}
            </div>
          </div>
        </div>
    </div>
  );
};

export default PromoteStudents;
