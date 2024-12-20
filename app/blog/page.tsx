import React from "react";
import { BlogPostCard } from "@/app/(types)/blogs";
import Navbar from "@/components/common/nav-bar";
import Footer from "@/components/common/footer";
// Sample data - replace with your actual data source
const blogPosts: BlogPostCard[] = [
  {
    id: 1,
    title: "Simple Proctives that will help you get better every...",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a libero maximus, rhoncus ex vel, suscipit velit. Donec in interdum...",
    date: "Mar 8, 2024",
    author: "Admin",
    comments: 0,
    image:
      "https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // Add more blog posts...
];

const BlogPageInList = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full">
                    {post.date}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <span>By {post.author}</span>
                  <span className="mx-4">•</span>
                  <span>No Comments</span>
                </div>

                <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPageInList;
