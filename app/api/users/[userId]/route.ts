import { getSubscription } from "@/utils/subscriptions";
import { NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId }: { userId: string } = await params;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const subscription = await getSubscription(userId);
  //   console.log(subscription[0]);
  return NextResponse.json(subscription, { status: 200 });
}
