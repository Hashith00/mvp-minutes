import { getBlogById } from "@/utils/blog";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const blog = await getBlogById(params.id);
  return NextResponse.json(blog, { status: 200 });
}
