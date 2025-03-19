import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
<link rel="icon" href="/favicon.ico" />

export const metadata: Metadata = {
  title: 'Hands-on Learning',
  description: 'Created by haafeezdev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='flex flex-col relative bg-[#f2f2f2]'>
          <div className='flex flex-col w-full min-h-screen relative '>
            <div className=''>{children}</div>
          </div>
      </div>
      </body>
    </html>
  );
}
