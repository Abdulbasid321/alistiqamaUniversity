'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  mediaType: string;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const fetchGalleryImages = async () => {
    try {
      const response = await axiosInstance.get('/getAllMedia');
      if (response.data ) {
        setImages(response.data); // Correctly set gallery items
      } else {
        console.error('Unexpected API response:', response.data);
        setImages([]); // Set to empty if response is unexpected
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setImages([]);
    }
  };
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || title.trim() === '' || description.trim() === '') {
      setMessage('Please select a file, provide a title, and a description.');
      return;
    }

    const formData = new FormData();
    formData.append('media', selectedFile);
    formData.append('title', title);
    formData.append('description', description);

    setLoading(true);
    try {
      await axiosInstance.post('/uploadMedia', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Media uploaded successfully.');
      fetchGalleryImages(); // Refresh the gallery
      setSelectedFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading media:', error);
      setMessage('Error uploading media.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      await axiosInstance.delete(`/deleteMedia/${id}`); // Adjusted the endpoint URL to match your backend
      fetchGalleryImages();
      setMessage('Media deleted successfully.');
    } catch (error) {
      console.error('Error deleting media:', error);
      setMessage('Error deleting media.');
    }
  };
  

  return (
    <div className="w-full ">
      <div className="flex justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-red-600">Manage Gallery</h2>
            <p className="text-xs font-light text-gray-600">
              Update the gallery section.
            </p>
          </div>
          <Image src="/news icon.png" alt="image" height={50} width={50} className="w-12 h-12" />
        </div>

      <form onSubmit={handleUploadImage} className="mb-6">
        <div className="mb-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Media title"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Media description"
            required
          />
        </div>
        <div className="mb-4">
          <Input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" disabled={loading} className='bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded mt-4'>
          {loading ? 'Uploading...' : 'Upload Media'}
        </button>
        {message && <p className="text-xs font-bold mt-2 text-red-500">{message}</p>}
      </form>

      <Table className="bg-white rounded-lg">
      <ScrollArea className="h-48 w-full rounded-lg border">
          <TableCaption>list of blogs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] text-[#000080] font-bold">Title</TableHead>
              <TableHead className="text-[#000080] font-bold">Content</TableHead>
              <TableHead className="text-right text-[#000080] font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
          {images.map((image) => (
              <TableRow key={image._id}>
                <TableCell className="font-medium">
                  {image.title}
                </TableCell>
                <TableCell>{image.description.substring(0, 20)}..</TableCell>
                <TableCell className="text-right">
                <button
                    className="bg-red-500 text-white text-xs hover:text-[#000080] font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteImage(image._id)}
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
  );
};

export default AdminGallery;

