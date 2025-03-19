'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area"

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchBlogPosts();
  }, []);


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const fetchBlogPosts = async () => {
    try {
      const response = await axiosInstance.get('/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/blog', { title, content });
      setMessage('Blog post created successfully.');
      fetchBlogPosts(); // Refresh the blog list
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage('Error creating blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await axiosInstance.delete(`/blog/${id}`);
      fetchBlogPosts();
      setMessage('Blog post deleted successfully.');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setMessage('Error deleting blog post.');
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-red-600">Manage Blogs</h2>
            <p className="text-xs font-light text-gray-600">
              Update the blogs section.
            </p>
          </div>
          <Image src="/globe icon.png" alt="image" height={50} width={50} className="w-12 h-12" />
        </div>

      <form onSubmit={handleCreateBlog} className="mb-6">
        <div className="mb-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
            required
          />
        </div>
        <div className="mb-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Blog content"
            required
          />
        </div>
        <button type="submit" disabled={loading} className='bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded mt-4'>
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
        {message && <p className="text-xs font-bold mt-2 text-red-500">{message}</p>}
      </form>

      <Table className="bg-white rounded-lg">
      <ScrollArea className="h-52 w-full rounded-lg border">
          <TableCaption>list of blogs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] text-[#000080] font-bold">Title</TableHead>
              <TableHead className="text-[#000080] font-bold">Content</TableHead>
              <TableHead className="text-right text-[#000080] font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-medium">
                  {blog.title}
                </TableCell>
                <TableCell>{blog.content.substring(0, 20)}..</TableCell>
                <TableCell className="text-right">
                <button
                    className="bg-red-500 text-white text-xs hover:text-[#000080] font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteBlog(blog._id)}
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

export default AdminBlogs;
