import { syncPlans } from "@/utils/lemonsqueecy/lemonsqueezyHelperFunctions";

export async function GET() {
  await syncPlans();
  return new Response("Plans synced");
}
