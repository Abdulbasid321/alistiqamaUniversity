"use client";

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';

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

interface Props {
  onClassChange: (classId: string) => void;
  onUserChange: (userId: string) => void;
  selectedClassId: string;
  selectedUserId: string;
}

const ClassAndUserSelector: React.FC<Props> = ({ onClassChange, onUserChange, selectedClassId, selectedUserId }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/class');
        console.log('Fetched classes:', response.data); // Debug log
        setClasses(response.data.classes); // Adjust according to your response structure
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      const fetchUsersByClass = async () => {
        try {
          const response = await axiosInstance.get(`/class/${selectedClassId}/users`);
          console.log('Fetched users for class:', response.data); // Debug log
          setUsers(response.data.users); // Adjust according to your response structure
        } catch (err) {
          console.error('Error fetching users for class:', err);
        }
      };

      fetchUsersByClass();
    } else {
      setUsers([]);
    }
  }, [selectedClassId]);

  return (
    <div className="mb-4">
      <div className="mb-4">
        <select
          id="classSelectStudent"
          value={selectedClassId}
          onChange={(e) => onClassChange(e.target.value)}
          className="block w-full mt-1 p-3 rounded-md text-sm text-gray-500"
          required
        >
          <option value="">Select student department</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <select
          id="userSelect"
          value={selectedUserId}
          onChange={(e) => onUserChange(e.target.value)}
          className="block w-full mt-1 p-3 rounded-md text-sm text-gray-500"
          required
        >
          <option value="">Select a student</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.sureName} {user.email}
              </option>
            ))
          ) : (
            <option disabled>No users available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default ClassAndUserSelector;


