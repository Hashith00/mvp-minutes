import React from "react";
import { BlogPost } from "@/app/(types)/blogs";
import { Clock } from "lucide-react";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBlogPost(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,
    {
      cache: "no-store", // or 'force-cache' if you want to cache the result
    }
  );
  const data = await response.json();
  return data[0];
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { id }: { id: string } = await params;
  const blogPost = await getBlogPost(id);

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
        {blogPost.content
          .split("\n")
          .map((paragraph: string, index: number) => (
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
