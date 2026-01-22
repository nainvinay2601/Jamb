"use client";

import { Search, Mail, Menu, X } from "lucide-react";
import { IoMailOutline } from "react-icons/io5";

import { IoSearchOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { VscMenu } from "react-icons/vsc";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50  h-20 bg-[#f3f0ed] ">
      <div className="px-4 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-serif font-bold text-gray-900">
              Jamb.
            </span>
          </Link>

          {/* Desktop Icons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-[#9c9c9d] hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
             <IoSearchOutline size={24} />
            </button>
           
            <button
              className="text-[#9c9c9d] hover:text-gray-900 transition-colors"
              aria-label="Contact"
            >
              <IoMailOutline size={24} />
            </button>
             <button
              className="text-[#9c9c9d] hover:text-gray-900 transition-colors"
              aria-label="Contact"
            >
             <VscMenu size={24} className="-mt-0.5"/>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
                                       <VscMenu size={24} className="-mt-0.5"/>


            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F1ED] border-t border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center space-x-6">
              <button
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Contact"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}