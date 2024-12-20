import { BlogPost } from "@/app/(types)/blogs";
import { db } from "@/utils/database/db";
import { blogs as blogsTable } from "@/utils/database/schema"; // Fixing the naming issue
import { eq } from "drizzle-orm";

export const getBlogs = async () => {
  const blogs = await db.select().from(blogsTable);
  return blogs;
};

export const getBlogById = async (id: string) => {
  const blog = await db.select().from(blogsTable).where(eq(blogsTable.id, id));
  return blog;
};

export const createBlog = async (blog: BlogPost) => {
  const newBlog = await db.insert(blogsTable).values(blog);
  return newBlog;
};
