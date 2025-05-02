
// 'use client';

// import * as React from 'react';
// import Autoplay from 'embla-carousel-autoplay';
// import axiosInstance from '@/utils/axiosInstance';
// import { Card, CardContent } from '@/components/ui/card';
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
// import { Separator } from '../ui/separator';
// import Image from 'next/image';

// interface BlogPost {
//   _id: string;
//   title: string;
//   content: string;
//   author: string;
// }

// export function NewsCard() {
//   const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
//   const [error, setError] = React.useState<string | null>(null);
//   const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

//   React.useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const response = await axiosInstance.get('/blog');
//       setBlogs(response.data.blogs); // Ensure the key here matches your API response
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//       setError('Failed to load blog posts. Please try again later.');
//     }
//   };

//   return (
//     <Carousel
//       plugins={[plugin.current]}
//       className="max-w-sm md:max-w-4xl min-h-[500px] "
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {error ? (
//           <CarouselItem>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
//                   <p className="text-red-500">{error}</p>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ) : blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <CarouselItem key={blog._id}>
//               <div className="p-1">
//                 <Card>
//                   <CardContent className="flex flex-col min-h-[500px] w-full p-6">
//                     <h3 className="text-2xl text-[#000080] text-center font-semibold">{blog.title}</h3>
//                     <Separator />
//                     <p className="text-xl mt-5">{blog.content}</p>
//                     <p className=" flex absolute bottom-3 right-2 justify-end" >{blog.author}</p>
//                   </CardContent>
//                 </Card>  
//               </div>
//             </CarouselItem>
//           ))
//         ) : (
//           <CarouselItem>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
//                   <p>No news available at the moment.</p>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         )}
//       </CarouselContent>
//     </Carousel>
//   );
// }


'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import axiosInstance from '@/utils/axiosInstance';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Separator } from '../ui/separator';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export function NewsCard() {
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get('/blog');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog posts. Please try again later.');
    }
  };

  return (
    <section className="w-full bg-white py-16 px-6" id="news">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Latest News</h2>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Stay updated with the latest happenings from our community
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {error ? (
            <CarouselItem>
              <Card>
                <CardContent className="min-h-[300px] flex items-center justify-center text-red-500 font-semibold">
                  {error}
                </CardContent>
              </Card>
            </CarouselItem>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <CarouselItem key={blog._id}>
                <Card className="shadow-lg border border-gray-200 rounded-xl">
                  <CardContent className="min-h-[350px] p-6 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-blue-800 text-center">{blog.title}</h3>
                    <Separator />
                    <p className="text-gray-700 text-base leading-relaxed line-clamp-6">
                      {blog.content}
                    </p>
                    <p className="text-right text-sm text-gray-500 mt-auto">— {blog.author}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <Card>
                <CardContent className="min-h-[300px] flex items-center justify-center text-gray-500 font-medium">
                  No news available at the moment.
                </CardContent>
              </Card>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
