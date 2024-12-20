import { SubscriptionInReturn } from "@/app/(types)/returnObjects";
import { db } from "@/utils/database/db";
import { plans, subscriptions } from "@/utils/database/schema";
import { eq } from "drizzle-orm";

export const getSubscription = async (userId: string) => {
  const subscription = await getSubscriptionFromDB(userId);
  const planName = await getPlanName(subscription[0].planId);
  const returnObject = {
    ...subscription[0],
    planName: planName[0].name,
  };
  return returnObject;
};

const getSubscriptionFromDB = async (userId: string) => {
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));
  return subscription;
};

const getPlanName = async (planId: string) => {
  const plan = await db.select().from(plans).where(eq(plans.id, planId));
  return plan;
};

export const deleteSubscription = async (subscriptionId: string) => {
  try {
    const response = await db
      .delete(subscriptions)
      .where(eq(subscriptions.id, subscriptionId));
    return response;
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
};
