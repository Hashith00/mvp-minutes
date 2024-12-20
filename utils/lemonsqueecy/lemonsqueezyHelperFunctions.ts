import { revalidatePath } from "next/cache";
import { configureLemonSqueezy } from "@/utils/lemonsqueecy/configureLemonsqueezy";
import { db } from "@/utils/database/db";
import { eq } from "drizzle-orm";
import { webhookHasMeta, webhookHasData } from "@/lib/typeGurds";
import {
  plans,
  webhookEvents,
  NewWebhookEvent,
  NewSubscription,
  subscriptions,
} from "@/utils/database/schema";
import {
  listProducts,
  getProduct,
  listPrices,
  type Variant,
  createCheckout,
  getPrice,
} from "@lemonsqueezy/lemonsqueezy.js";
import { Plan } from "@/app/(types)/lemonsqueezy";
import crypto from "crypto";

export async function syncPlans() {
  configureLemonSqueezy();

  // Fetch all the variants from the database.
  const productVariants: Plan[] = await db.select().from(plans);

  // Helper function to add a variant to the productVariants array and sync it with the database.
  async function _addVariant(variant: Plan) {
    // eslint-disable-next-line no-console -- allow
    console.log(`Syncing variant ${variant.name} with the database...`);

    // Sync the variant with the plan in the database.
    await db
      .insert(plans)
      .values(variant)
      .onConflictDoUpdate({ target: plans.variantId, set: variant });

    /* eslint-disable no-console -- allow */
    console.log(`${variant.name} synced with the database...`);

    productVariants.push(variant);
  }

  try {
    // Fetch products from the Lemon Squeezy store.
    const products = await listProducts({
      filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
      include: ["variants"],
    });

    // Loop through all the variants.
    const allVariants = products.data?.included as
      | Variant["data"][]
      | undefined;

    if (!allVariants) return productVariants;

    // for...of supports asynchronous operations, unlike forEach.
    /* eslint-disable no-await-in-loop -- allow */
    for (const v of allVariants) {
      const variant = v.attributes;

      // Skip draft variants or if there's more than one variant, skip the default variant.
      if (
        variant.status === "draft" ||
        (allVariants.length !== 1 && variant.status === "pending")
      ) {
        continue;
      }

      // Fetch the Product name.
      const product = await getProduct(variant.product_id);
      const productName = product.data?.data.attributes.name ?? "";

      // Fetch the Price object.
      const variantPriceObject = await listPrices({
        filter: {
          variantId: v.id,
        },
      });

      const currentPriceObj = variantPriceObject.data?.data.at(0);
      if (!currentPriceObj) continue;

      const isUsageBased =
        currentPriceObj.attributes.usage_aggregation !== null;
      const interval = currentPriceObj.attributes.renewal_interval_unit;
      const intervalCount =
        currentPriceObj.attributes.renewal_interval_quantity;
      const trialInterval = currentPriceObj.attributes.trial_interval_unit;
      const trialIntervalCount =
        currentPriceObj.attributes.trial_interval_quantity;

      const price = isUsageBased
        ? currentPriceObj.attributes.unit_price_decimal
        : currentPriceObj.attributes.unit_price;

      const priceString = price?.toString() ?? "";

      const isSubscription =
        currentPriceObj.attributes.category === "subscription";

      // If not a subscription, skip it.
      if (!isSubscription) {
        continue;
      }

      await _addVariant({
        id: v.id,
        name: variant.name,
        description: variant.description,
        price: priceString,
        interval: interval ?? null,
        intervalCount: intervalCount ?? null,
        isUsageBased: isUsageBased ?? false,
        productId: variant.product_id,
        productName,
        variantId: parseInt(v.id),
        trialInterval: trialInterval ?? null,
        trialIntervalCount: trialIntervalCount ?? null,
        sort: variant.sort ?? null,
      });
    }

    return productVariants;
  } catch (error) {
    console.error("Error syncing plans:", error);
    throw error;
  }
}
export async function getCheckoutURL(
  variantId: string,
  embed = false,
  email: string,
  userId: string
) {
  configureLemonSqueezy();

  try {
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    if (!storeId) throw new Error("LEMONSQUEEZY_STORE_ID is not defined");

    const checkout = await createCheckout(storeId, variantId, {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: email ?? undefined,
        custom: {
          user_id: userId,
        },
      },
      productOptions: {
        redirectUrl: ` https://8ddc-2402-4000-2140-3530-a1a8-ee1d-20d6-7e06.ngrok-free.app`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
      },
    });
    console.log(checkout.data);

    console.log(checkout.data?.data.attributes.url);

    return checkout.data?.data.attributes.url;
  } catch (error) {
    console.log(error);
  }
}

// Webhook related functions
export async function storeWebhookEvent(
  eventName: string,
  body: NewWebhookEvent["body"]
) {
  if (!process.env.DATABASE_URL) {
    throw new Error("POSTGRES_URL is not set");
  }

  const id = crypto.randomInt(100000000, 1000000000).toString();

  const returnedValue = await db
    .insert(webhookEvents)
    .values({
      id,
      eventName,
      processed: false,
      body,
    })
    .onConflictDoNothing({ target: plans.id })
    .returning();

  return returnedValue[0];
}

/**
 * This action will process a webhook event in the database.
 */
export async function processWebhookEvent(webhookEvent: NewWebhookEvent) {
  configureLemonSqueezy();

  const dbwebhookEvent = await db
    .select()
    .from(webhookEvents)
    .where(eq(webhookEvents.id, webhookEvent.id));

  if (dbwebhookEvent.length < 1) {
    throw new Error(
      `Webhook event #${webhookEvent.id} not found in the database.`
    );
  }

  let processingError = "";
  const eventBody = webhookEvent.body;

  if (!webhookHasMeta(eventBody)) {
    processingError = "Event body is missing the 'meta' property.";
  } else if (webhookHasData(eventBody)) {
    if (webhookEvent.eventName.startsWith("subscription_payment_")) {
      // Save subscription invoices; eventBody is a SubscriptionInvoice
      // Not implemented.
    } else if (webhookEvent.eventName.startsWith("subscription_")) {
      // Save subscription events; obj is a Subscription
      const attributes = eventBody.data.attributes;
      const variantId = attributes.variant_id as string;

      // We assume that the Plan table is up to date.
      const plan = await db
        .select()
        .from(plans)
        .where(eq(plans.variantId, parseInt(variantId, 10)));

      if (plan.length < 1) {
        processingError = `Plan with variantId ${variantId} not found.`;
      } else {
        // Update the subscription in the database.

        const priceId = attributes.first_subscription_item.price_id;

        // Get the price data from Lemon Squeezy.
        const priceData = await getPrice(priceId);
        if (priceData.error) {
          processingError = `Failed to get the price data for the subscription ${eventBody.data.id}.`;
        }

        const isUsageBased = attributes.first_subscription_item.is_usage_based;
        const price = isUsageBased
          ? priceData.data?.data.attributes.unit_price_decimal
          : priceData.data?.data.attributes.unit_price;

        const updateData: NewSubscription = {
          id: crypto.randomInt(100000000, 1000000000).toString(),
          lemonSqueezyId: eventBody.data.id,
          orderId: attributes.order_id as number,
          name: attributes.user_name as string,
          email: attributes.user_email as string,
          status: attributes.status as string,
          statusFormatted: attributes.status_formatted as string,
          renewsAt: attributes.renews_at as string,
          endsAt: attributes.ends_at as string,
          trialEndsAt: attributes.trial_ends_at as string,
          price: price?.toString() ?? "",
          isPaused: false,
          subscriptionItemId: attributes.first_subscription_item.id.toString(),
          isUsageBased: attributes.first_subscription_item.is_usage_based,
          userId: eventBody.meta.custom_data.user_id,
          planId: plan[0].id,
        };

        // Create/update subscription in the database.
        try {
          await db.insert(subscriptions).values(updateData).onConflictDoUpdate({
            target: subscriptions.lemonSqueezyId,
            set: updateData,
          });
        } catch (error) {
          processingError = `Failed to upsert Subscription #${updateData.lemonSqueezyId} to the database.`;
          console.error(error);
        }
      }
    } else if (webhookEvent.eventName.startsWith("order_")) {
      // Save orders; eventBody is a "Order"
      /* Not implemented */
    } else if (webhookEvent.eventName.startsWith("license_")) {
      // Save license keys; eventBody is a "License key"
      /* Not implemented */
    }

    // Update the webhook event in the database.
    await db
      .update(webhookEvents)
      .set({
        processed: true,
        processingError,
      })
      .where(eq(webhookEvents.id, webhookEvent.id));
  }
}
