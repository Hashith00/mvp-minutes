import { db } from "@/utils/database/db";
import { plans } from "@/utils/database/schema";
import { getCheckoutURL } from "@/utils/lemonsqueecy/lemonsqueezyHelperFunctions";
export async function GET() {
  try {
    const response = await db.select().from(plans).orderBy(plans.id); // Need to add this ordered by term

    // Here you can specifies the feature by adding conditions
    for (const plan of response) {
      plan.description =
        "Task Management Tools, Team Collaboration (up to 3 members), Basic Project Tracking, Limited File Storage";
    }

    if (!response || response.length === 0) {
      console.log("No plans found in database");
    }

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  const { variantId, embed, email, userId } = await request.json();
  const url = await getCheckoutURL(variantId, embed, email, userId);
  return new Response(JSON.stringify({ url }));
}
