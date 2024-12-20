"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                SaaS Template
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#docs" className="text-gray-600 hover:text-gray-900">
              Documentation
            </Link>
            <Link
              href="/signup"
              className="rounded-lg ml-8 px-4 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
