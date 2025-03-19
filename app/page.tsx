
import React from 'react';
import Image from "next/image";
import Header from "@/components/dashboard/Header";
import Footer from '@/components/dashboard/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Gallery from '@/components/dashboard/Gallery';
import HeroSection from '@/components/dashboard/HeroSection';
import { Menu } from '@/components/dashboard/Menu';
import { NewsCard } from '@/components/dashboard/NewsCard';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Menu />
      <div className='w-full h-full flex flex-col'>
        <HeroSection />
        <div id="news" className=' min-h-screen flex flex-col justify-center items-center p-5 gap-5'>
          <h1 className='font-bold text-xl text-red-600 text-center'>News and Events</h1>
          <p className='text-sm font-bold text-center'>Get up-to-date news and events from us</p>
          <div className='flex flex-col md:flex-row gap-5'>
            <NewsCard />
          </div>
        </div>
        <div className="p-4 bg-red-50 md:h-[400px] min-h-[800px] flex flex-col md:justify-center justify-around " id='about'>
          <div className='flex flex-col'>
            <div className='md:w-[100%]  flex flex-col gap-5 p-5 justify-center text-center'>
              <Image
                src={'/books icon.png'}
                alt='image'
                height={50}
                width={50}
                className='w-14 h-14 left-20 bottom-100  absolute animate-bounce'
              />
              <Image
                src={'/Pencil icon.png'}
                alt='image'
                height={50}
                width={50}
                className='w-14 h-14 right-20 bottom-96  absolute animate-bounce'
              />
              <p className='font-bold md:text-xl text-red-600'>Who We Are</p>
              <p className='text-lg font-bold text-[#000080]'>Al-Istiqama University is localted in Sumaila Local Government, Kano State.

Kano, Nigeria.</p>
              <Separator className='bg-red-600' />
              <div className='flex flex-col lg:flex-row gap-5  mt-5'>
                <div className='border border-red-600 rounded p-3 text-center'>
                  <h1 className='font-bold text-lg text-red-600'>Vision</h1>
                  <p className='text-lg font-bold text-[#000080]'>To be a reputable and inclusive student-centred teaching and research University, preparing engaged citizens, scholars and leaders for productive participation in a changing global society, as well as to be in full harmony with its host community as the formulator of its hopes and aspirations and the promoter of its core cultural, religious and spiritual values towards achieving an advanced virile society." MISSION Our mission is: "To encourage global study, experiential learning and research, interdisciplinary scholarship, creativity, and entrepreneurial endeavors with ultimate fear of Allah.</p>
                </div>
                <div className='border border-red-600 rounded p-3 text-center'>
                  <h1 className='font-bold text-lg text-red-600'>Mission</h1>
                  <p className='text-lg font-bold text-[#000080]'>Our mission is: "To encourage global study, experiential learning and research, interdisciplinary scholarship, creativity, and entrepreneurial endeavors with ultimate fear of Allah.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Gallery />
        <div id="contact" className='bg-red-50 min-h-screen flex flex-col justify-center items-center md:gap-0 gap-10 p-5'>

          <h1 className='font-bold text-xl text-red-600 text-center'>Contact Us</h1>
          <p className='text-sm font-bold text-center'>For inquiries send us emails by filling the form or whatsapp us on: 08109328203</p>
          <form target="_blank" action="https://formsubmit.co/handsonlearningschool@gmail.com" className='p-6 rounded text-center md:w-[70%] w-full text-white' method="POST">
            <input type="hidden" name="_template" value="table" />
            {/* change local host to the domain name */}
            <input type="hidden" name="_next" value="https://holschool.vercel.app/confirmation" />
            {/* <input type="hidden" name="_next" value="https://handschool.vercel.app/confirmation"/> */}
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <input type="text" name="name" className="form-control text-black w-full rounded-md py-2 px-1" placeholder="Full Name" required />
                </div>
                <div className="col mt-2">
                  <input type="email" name="email" className="form-control text-black w-full rounded-md py-2 px-1" placeholder="Email Address" required />
                </div>
                
              </div>
            </div>
            <div className="form-group mt-2">
              <textarea placeholder="Your Message" className="form-control text-black w-full rounded-md py-2 px-1" name="message" required></textarea>
            </div>
            <Button type="submit" className="md:w-[40%] w-[60%] bg-[#000080] hover:bg-[#000080] text-white hover:text-red-600 mt-4 p-2 rounded">Send</Button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

