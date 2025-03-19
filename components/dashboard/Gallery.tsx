"use client";

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  mediaData: string; // Base64 string (currently not used)
  mediaName: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axiosInstance.get('/getAllMedia');
        setGalleryItems(response.data);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
      }
    };

    fetchGalleryItems();
  }, []);

  const renderMedia = (item: GalleryItem) => {
  // const mediaUrl = `/media/${encodeURIComponent(item.mediaName)}`;
  const mediaUrl = item.mediaUrl;
  console.log('Rendering media:', { mediaUrl, mediaType: item.mediaType, title: item.title, description: item.description });

  if (item.mediaType.startsWith('image')) {
    return (
      <img
        src={mediaUrl}
        alt={item.title || 'Gallery Image'}
        className="h-[300px] md:w-[400px] w-[300px] rounded-lg"
        width={300}
        height={200}
        loading="lazy"
        onError={(e) => {
          console.error('Failed to load image, loading fallback:', mediaUrl);
          (e.target as HTMLImageElement).src = '/media/placeholder.jpeg';
        }}
      />
    );
  } else  {
    return null;
  }
};


  return (
    <div className='w-full min-h-screen p-5 flex flex-col justify-center' id='gallery'>
      <h1 className='font-bold text-red-600 text-xl text-center'>Gallery</h1>
      <p className='font-bold text-center text-sm'>Some amazing moments from us</p>
      <ScrollArea className="w-full whitespace-nowrap pb-5 mt-5">
        <div className="flex gap-3 p-5 justify-center">
          {galleryItems.map((item) => (
            <div key={item._id} className=''>
              <div className="md:w-[400px] w-[300px] h-[300px]  rounded-lg">{renderMedia(item)}</div>
              <p className='text-center m-3'>{item.description}</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Gallery;

