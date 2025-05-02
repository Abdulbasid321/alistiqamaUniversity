// "use client";

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axiosInstance';
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// interface GalleryItem {
//   _id: string;
//   title: string;
//   description: string;
//   mediaUrl: string;
//   mediaType: string;
//   mediaData: string; // Base64 string (currently not used)
//   mediaName: string;
// }

// const Gallery = () => {
//   const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

//   useEffect(() => {
//     const fetchGalleryItems = async () => {
//       try {
//         const response = await axiosInstance.get('/getAllMedia');
//         setGalleryItems(response.data);
//       } catch (err) {
//         console.error('Error fetching gallery items:', err);
//       }
//     };

//     fetchGalleryItems();
//   }, []);

//   const renderMedia = (item: GalleryItem) => {
//   // const mediaUrl = `/media/${encodeURIComponent(item.mediaName)}`;
//   const mediaUrl = item.mediaUrl;
//   console.log('Rendering media:', { mediaUrl, mediaType: item.mediaType, title: item.title, description: item.description });

//   if (item.mediaType.startsWith('image')) {
//     return (
//       <img
//         src={mediaUrl}
//         alt={item.title || 'Gallery Image'}
//         className="h-[300px] md:w-[400px] w-[300px] rounded-lg"
//         width={300}
//         height={200}
//         loading="lazy"
//         onError={(e) => {
//           console.error('Failed to load image, loading fallback:', mediaUrl);
//           (e.target as HTMLImageElement).src = '/media/placeholder.jpeg';
//         }}
//       />
//     );
//   } else  {
//     return null;
//   }
// };


//   return (
//     <div className='w-full min-h-screen p-5 flex flex-col justify-center' id='gallery'>
//       <h1 className='font-bold text-red-600 text-xl text-center'>Gallery</h1>
//       <p className='font-bold text-center text-sm'>Some amazing moments from us</p>
//       <ScrollArea className="w-full whitespace-nowrap pb-5 mt-5">
//         <div className="flex gap-3 p-5 justify-center">
//           {galleryItems.map((item) => (
//             <div key={item._id} className=''>
//               <div className="md:w-[400px] w-[300px] h-[300px]  rounded-lg">{renderMedia(item)}</div>
//               <p className='text-center m-3'>{item.description}</p>
//             </div>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>
//     </div>
//   );
// };

// export default Gallery;

'use client';

import React from 'react';

const staticGalleryItems = [
  {
    id: '1',
    title: 'Graduation Day',
    description: 'A memorable moment for our graduating students.',
    mediaUrl: '/media/graduation.jpg',
    mediaType: 'image',
  },
  {
    id: '2',
    title: 'Cultural Day',
    description: 'Celebrating diverse traditions and unity.',
    mediaUrl: '/media/cultural.jpg',
    mediaType: 'image',
  },
  {
    id: '3',
    title: 'Science Fair',
    description: 'Innovation at its peak during our annual fair.',
    mediaUrl: '/media/science-fair.jpg',
    mediaType: 'image',
  },
  {
    id: '4',
    title: 'Sports Week',
    description: 'Team spirit and fun during our sports activities.',
    mediaUrl: '/media/sports.jpg',
    mediaType: 'image',
  },
];

const StaticGallery = () => {
  return (
    <div className="w-full min-h-screen px-6 py-12 bg-gray-50" id="gallery">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600">Gallery</h1>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Some amazing moments from our events and activities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {staticGalleryItems.map((item) => (
          <div key={item.id} className="rounded-lg shadow-lg overflow-hidden group relative">
            <img
              src={item.mediaUrl}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/media/placeholder.jpeg';
              }}
            />
            <div className="p-4 bg-white">
              <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticGallery;
