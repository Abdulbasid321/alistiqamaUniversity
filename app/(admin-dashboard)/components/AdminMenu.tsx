"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

export function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="md:hidden top-12 left-2 text-red-600 fixed z-50 "
        onClick={toggleDropdown}
      >
        <MenuIcon className="mr-1 w-4 h-4" />
        MENU
      </Button>
      {isOpen && (
        <div className=" top-20 left-3 mt-2 w-32 fixed z-50  bg-white border border-red-600 rounded shadow-lg">
          
          <div className="flex flex-col space-y-2 items-center mt-2 p-2">
            <Link href="#as" className="hover:bg-purple-50 text-red-600 text-center rounded p-2" onClick={toggleDropdown}>
              Admin & Student
            </Link>
            <Link href="#r" className="hover:bg-purple-50 text-red-600 rounded p-2" onClick={toggleDropdown}>
              Results
            </Link>
            <Link href="#p" className="hover:bg-purple-50 text-red-600 rounded p-2" onClick={toggleDropdown}>
              Promote
            </Link>
            <Link href="#gb" className="hover:bg-purple-50 text-red-600 rounded text-center p-2" onClick={toggleDropdown}>
              Gallery & Blogs
            </Link>
            <Link href="#s" className="hover:bg-purple-50 text-red-600 rounded p-2" onClick={toggleDropdown}>
              All Students
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
