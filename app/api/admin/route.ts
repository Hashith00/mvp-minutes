import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();
  console.log(username, password);
  if (
    username === process.env.ADMIN_PAGE_USERNAME &&
    password === process.env.ADMIN_PAGE_PASSWORD
  ) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
};
