"use client";
import React, { useEffect, useState } from "react";
import { BlogPost } from "@/app/(types)/blogs";
import { Clock } from "lucide-react";
// Add params as a prop with type definition
interface BlogPageProps {
  params: {
    id: string;
  };
}

const BlogPage = ({ params }: BlogPageProps) => {
  // Access the id from params
  const { id } = params;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const fetchBlogPost = async () => {
    const response = await fetch(`/api/blog/${id}`);
    const data = await response.json();
    console.log(data[0]);
    setBlogPost(data[0]);
  };
  useEffect(() => {
    fetchBlogPost();
  }, []);

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <div className="flex items-center">
            <img
              src={blogPost.image || "/default-avatar.png"}
              alt={blogPost.author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium">{blogPost.author}</span>
          </div>

          <Clock className="w-4 h-4 ml-4" />
          <time className="text-sm text-gray-600 ml-2">5 minutes to read</time>
        </div>
        {blogPost.image && (
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        {blogPost.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {new Date(blogPost.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogPage;
