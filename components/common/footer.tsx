import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-12 bg-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-2">Join our newsletter</h2>
        <p className="text-gray-600 mb-4">
          Get updates from us weekly about project management
        </p>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-2 border rounded-lg"
          />
          <button className="px-6 py-2 bg-[#BFDE42] text-black rounded-lg">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="YowManage" width={40} height={40} />
              <h3 className="text-xl font-semibold">YowManage</h3>
            </div>
            <div className="mb-6">
              <p className="font-semibold">Address:</p>
              <p className="text-gray-600">
                Level 2, 45 Tech Avenue, Melbourne VIC 3000
              </p>
            </div>
            <div>
              <p className="font-semibold">Contact:</p>
              <a href="tel:1800987654" className="text-gray-600 block">
                1800 987 654
              </a>
              <a href="mailto:support@yowmanage.com" className="text-gray-600">
                support@yowmanage.com
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-gray-600">
                Home
              </Link>
              <Link href="/features" className="text-gray-600">
                Features
              </Link>
              <Link href="/project" className="text-gray-600">
                Project
              </Link>
              <Link href="/pricing" className="text-gray-600">
                Pricing
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about-us" className="text-gray-600">
                About Us
              </Link>
              <Link href="/careers" className="text-gray-600">
                Careers
              </Link>
              <Link href="/contact-us" className="text-gray-600">
                Contact Us
              </Link>
              <Link href="/blog" className="text-gray-600">
                Blog
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <div className="flex gap-4">
              <a href="#" className="text-gray-600">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-600">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-600">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">
            © 2024 YowManage. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-gray-600">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-600">
              Terms of Service
            </Link>
            <Link href="/cookies-settings" className="text-gray-600">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
