import { createBlog, getBlogs } from "@/utils/blog";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const blogs = await getBlogs();
  return NextResponse.json(blogs);
}
export async function POST(request: Request) {
  const { title, content, author, image } = await request.json();
  const newBlog = await createBlog({
    id: crypto.randomUUID(),
    title,
    content,
    author,
    image,
    createdAt: new Date(),
  });
  return NextResponse.json(newBlog);
}
