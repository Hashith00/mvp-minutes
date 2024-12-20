import { cancelSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { deleteSubscription } from "@/utils/subscriptions";
import { NextResponse } from "next/server";
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const response = await cancelSubscription(id);
  console.log(response);
  const deletedSubscription = await deleteSubscription(id);
  if (deletedSubscription) {
    return NextResponse.json(
      { message: "Subscription deleted" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Subscription not found" },
      { status: 404 }
    );
  }
}
