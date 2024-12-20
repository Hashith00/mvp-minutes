import React from "react";

// Add params as a prop with type definition
interface BlogPageProps {
  params: {
    id: string;
  };
}

const BlogPage = ({ params }: BlogPageProps) => {
  // Access the id from params
  const { id } = params;

  return <div>Blog Post {id}</div>;
};

export default BlogPage;
