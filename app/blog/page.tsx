"use client";
import React, { useState, useEffect } from "react";
import { BlogPostCard } from "@/app/(types)/blogs";
import Navbar from "@/components/common/nav-bar";
import Footer from "@/components/common/footer";
import BlogPostCardComponent from "./(components)/BlogPostCard";

const BlogPageInList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchBlogPosts = async () => {
    const response = await fetch("/api/blog");
    const data = await response.json();
    for (const post of data) {
      post.excerpt = post.content.substring(0, 100) + "...";
      post.date = new Date(post.createdAt).toLocaleDateString();
      post.comments = 0;
      setBlogPosts((prev) => [...prev, post]);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="animate-shimmer h-96 w-full bg-gray-200 rounded-lg"></div>
          ) : (
            blogPosts.map((post) => <BlogPostCardComponent post={post} />)
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPageInList;
