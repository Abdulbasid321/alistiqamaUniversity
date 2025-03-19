'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import ClassAndUserSelector from '../components/ClassAndUserSelector';
import ClassSelector from '../components/ClassSelector';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from "@/components/ui/scroll-area"
// import PromoteStudents from '../components/PromoteStudents';
import AdminGallery from '../components/AdminGallery';
import AdminBlogs from '../components/AdminBlogs';
import { AdminMenu } from '../components/AdminMenu';

interface User {
  currentClassId: string;
  _id: string;
  firstName: string;
  sureName: string;
  email: string;
}

interface AdminData {
  email: string;
  password: string;
}

interface StudentData {
  firstName: string;
  sureName: string;
  email: string;
  password: string;
  currentClassId: string;
}

const Page = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [adminData, setAdminData] = useState<AdminData>({ email: '', password: '' });
  const [studentData, setStudentData] = useState<StudentData>({ firstName: '', sureName: '', email: '', password: '', currentClassId: '' });
  const [file, setFile] = useState<File | null>(null);
  const [selectedClassIdForResult, setSelectedClassIdForResult] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [adminMessage, setAdminMessage] = useState<string>('');
  const [studentMessage, setStudentMessage] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [deleteMessage, setDeleteMessage] = useState<string>('');
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  const [studentLoading, setStudentLoading] = useState<boolean>(false);
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAdminMessage('');
      setStudentMessage('');
      setResultMessage('');
      setDeleteMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [adminMessage, studentMessage, resultMessage, deleteMessage]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.sureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [searchTerm, users]);

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminMessage('');
    try {
      const response = await axiosInstance.post('/register/admin', adminData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      fetchUsers();
      setAdminData({ email: '', password: '' });
      setAdminMessage('Admin created successfully.');
    } catch (err) {
      console.error('Error creating admin:', err);
      setAdminMessage('Error creating admin.');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentLoading(true);
    setStudentMessage('');
    try {
      const response = await axiosInstance.post('/users', studentData);
      fetchUsers();
      setStudentData({ firstName: '', sureName: '', email: '', password: '', currentClassId: '' });
      setStudentMessage('Student created successfully.');
    } catch (err) {
      console.error('Error creating student:', err);
      setStudentMessage('Error creating student.');
    } finally {
      setStudentLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setDeleteMessage('');
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
      setDeleteMessage('User deleted successfully.');
    } catch (err) {
      console.error('Error deleting user:', err);
      setDeleteMessage('Error deleting user.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultLoading(true);
    setResultMessage('');
    if (!file) {
      console.error('No file selected');
      setResultMessage('No file selected.');
      setResultLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('result', file);
    formData.append('user', selectedUserId);
    formData.append('classId', selectedClassIdForResult);

    try {
      await axiosInstance.post('/uploadResult', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResultMessage('Result uploaded successfully.');
    } catch (err) {
      console.error('Error uploading result:', err);
      setResultMessage('Error uploading result.');
    } finally {
      setResultLoading(false);
    }
  };

  const handleClassChangeStudent = (classId: string) => {
    setStudentData(prev => ({ ...prev, currentClassId: classId }));
  };

  const handleClassChange = (classId: string) => {
    setSelectedClassIdForResult(classId);
    setSelectedUserId('');
  };

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="container mx-auto p-4">
      <Image
        src="/pupil icon.png"
        alt="image"
        height={50}
        width={50}
        className="w-24 h-24 right-0 top-16 absolute animate-pulse"
        priority
      />

      <AdminMenu />

      <p className="text-center text-[#000080] mb-5 font-bold">
        This admin dashboard is restricted for administrative work only!!!
      </p>
      <div id='as' className=" flex md:flex-row flex-col w-full mb-8 gap-5">
        <div className="md:w-[50%] w-full">
          <h2 className="text-lg font-bold text-red-600">Create Admin</h2>
          <p className="text-xs font-light text-gray-600 mb-4">
            Create other admins to have access to use the dashboard
          </p>
          <form onSubmit={handleCreateAdmin}>
            <Input
              type="email"
              value={adminData.email}
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              placeholder="Email"
              className="mb-2"
              required
            />
            <Input
              type="password"
              value={adminData.password}
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
              placeholder="Password"
              className="mb-2"
              required
            />
            <button
              type="submit"
              className="bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded mt-4"
              disabled={adminLoading}
            >
              {adminLoading ? 'Creating...' : 'Create Admin'}
            </button>
            {adminMessage && (
              <p className={`font-bold text-xs text-${adminMessage.includes('success') ? 'green' : 'red'}-500`}>
                {adminMessage}
              </p>
            )}
          </form>
        </div>

        <div className="md:w-[50%] w-full">
          <h2 className="text-lg font-bold text-red-600">Create Student</h2>
          <p className="text-xs font-light text-gray-600 mb-4">
            Create student with student details and choose a unique password for the students
          </p>
          <form onSubmit={handleCreateStudent}>
            <Input
              type="text"
              value={studentData.firstName}
              onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
              placeholder="First Name"
              className="mb-2"
              required
            />
            <Input
              type="text"
              value={studentData.sureName}
              onChange={(e) => setStudentData({ ...studentData, sureName: e.target.value })}
              placeholder="Surname"
              className="mb-2"
              required
            />
            <Input
              type="email"
              value={studentData.email}
              onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
              placeholder="Email"
              className="mb-2"
              required
            />
            <Input
              type="password"
              value={studentData.password}
              onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
              placeholder="Password"
              className="mb-2"
              required
            />
            <ClassSelector
              currentClassId={studentData.currentClassId}
              setStudentData={handleClassChangeStudent}
            />
            <button
              type="submit"
              className="bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded mt-4"
              disabled={studentLoading}
            >
              {studentLoading ? 'Creating...' : 'Create Student'}
            </button>
            {studentMessage && (
              <p className={`font-bold text-xs text-${studentMessage.includes('success') ? 'green' : 'red'}-500`}>
                {studentMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      <div id='r' className=" mb-8">
        <div className="flex justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-red-600">Upload Result</h2>
            <p className="text-xs font-light text-gray-600">
              Upload student result section where we select the information of the student by class and name then select the student result file(pdf) before uploading.
            </p>
          </div>
          <Image src="/results icon.png" alt="image" height={50} width={50} className="w-12 h-12" />
        </div>
        <form onSubmit={handleUploadResult}>
          <ClassAndUserSelector
            onClassChange={handleClassChange}
            onUserChange={handleUserChange}
            selectedClassId={selectedClassIdForResult}
            selectedUserId={selectedUserId}
          />
          <Input type="file" onChange={handleFileUpload} className="mb-2 text-gray-500" required />
          <button
            type="submit"
            className="bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded mt-4"
            disabled={resultLoading}
          >
            {resultLoading ? 'Uploading...' : 'Upload Result'}
          </button>
          {resultMessage && (
            <p className={`font-bold text-xs text-${resultMessage.includes('success') ? 'green' : 'red'}-500`}>
              {resultMessage}
            </p>
          )}
        </form>
        <Image
          src="/Pencil icon.png"
          alt="image"
          height={50}
          width={50}
          className="w-14 h-14 right-20 bottom-0 absolute animate-bounce"
        />
      </div>

      {/* <PromoteStudents /> */}

      <div id='gb' className=' flex md:flex-row flex-col min-h-screen w-full gap-5'>
        <AdminGallery />
        <AdminBlogs />
      </div>

      <div id='s' className='min-h-screen'>
        <h2 className="text-lg font-bold text-red-600">All Students</h2>
        <p className="text-xs font-light text-gray-600 mb-4">
          List of all students, in this section you will be able to search and delete student and is permanent.
        </p>
        <Input
          type="text"
          placeholder="Search by email or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        {deleteMessage && (
            <p className={`font-bold text-xs text-${deleteMessage.includes('success') ? 'green' : 'red'}-600`}>
              {deleteMessage}
            </p>
          )}
        <Table className="bg-white rounded-lg">
        <ScrollArea className="h-68 w-full rounded-lg border">
          <TableCaption>list of students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] text-[#000080] font-bold">Name</TableHead>
              <TableHead className="text-[#000080] font-bold">Email</TableHead>
              <TableHead className="text-right text-[#000080] font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  {user.firstName} {user.sureName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white text-xs hover:text-[#000080] font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </ScrollArea>
        </Table>
      </div>
    </div>
  );
};

export default Page;

