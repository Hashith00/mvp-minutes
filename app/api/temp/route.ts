import { syncPlans } from "@/utils/lemonsqueecy/lemonsqueezyHelperFunctions";
import { ratelimit } from "@/utils/ratelimite/radis";

export async function GET() {
  await syncPlans();
  return new Response("Plans synced");
}

export async function POST() {
  const { success } = await ratelimit.limit("127.0.0.1");
  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
  return new Response("Hello");
}
