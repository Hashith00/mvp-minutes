import { getBlogById } from "@/utils/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id }: { id: string } = await params;
  const blog = await getBlogById(id);
  return NextResponse.json(blog);
}
