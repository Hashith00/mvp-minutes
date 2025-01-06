import React from "react";
import type { BlogPostCard } from "@/app/(types)/blogs";
import Image from "next/image";

const BlogPostCardComponent = ({ post }: { post: BlogPostCard }) => {
  return (
    <a href={`/blog/${post.id}`}>
      <div
        key={post.id}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative h-64">
          <Image
            src={post.image}
            alt={post.title}
            className="object-cover"
            width={500}
            height={300}
          />
        </div>

        <div className="p-6 md:p-1 lg:p-6 md:pb-4 w-full">
          <div className="flex flex-col sm:flex-row items-center text-gray-600 text-sm mb-4 w-full mt-4 lg:mt-12 md:mt-2 ">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full mb-3 sm:mb-0 sm:px-4 sm:py-1">
              {post.date}
            </span>
            <span className="hidden sm:inline-block sm:mx-4">•</span>
            <div className="flex items-center gap-2 text-center">
              <span className="text-gray-700">By {post.author}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700">No Comments</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>

          <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
            Read More
          </button>
        </div>
      </div>
    </a>
  );
};

export default BlogPostCardComponent;
