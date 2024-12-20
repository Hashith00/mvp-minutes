import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  createUserWithClerk,
  updateUserWithClerk,
} from "@/utils/users/clerkWebhook";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  // Create user in database when user is created
  if (eventType === "user.created") {
    const userId = evt.data.id;
    const email = evt.data.email_addresses[0].email_address;
    const name = evt.data.first_name + " " + evt.data.last_name;
    const user = await createUserWithClerk(userId, email, name);
  }

  // Update user in database when user is updated
  if (eventType === "user.updated") {
    const userId = evt.data.id;
    const email = evt.data.email_addresses[0].email_address;
    const name = evt.data.first_name + " " + evt.data.last_name;
    const user = await updateUserWithClerk(userId, email, name);
  }

  // For debugging
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  return new Response("Webhook received", { status: 200 });
}
