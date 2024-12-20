import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const plans = pgTable("plans", {
  id: text("id").primaryKey(),
  productId: integer("productId").notNull(),
  productName: text("productName"),
  variantId: integer("variantId").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  interval: text("interval"),
  intervalCount: integer("intervalCount"),
  trialInterval: text("trialInterval"),
  trialIntervalCount: integer("trialIntervalCount"),
  sort: integer("sort"),
});

export const variants = pgTable("variants", {
  id: text("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  status: text("status"),
  productId: integer("productId"),
  attributes: jsonb("attributes"),
  sort: integer("sort"),
  interval: text("interval"),
  intervalCount: integer("intervalCount"),
});

export const webhookEvents = pgTable("webhookEvents", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  eventName: text("eventName").notNull(),
  processed: boolean("processed").default(false),
  body: jsonb("body").notNull(),
  processingError: text("processingError"),
});

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  lemonSqueezyId: text("lemonSqueezyId").unique().notNull(),
  orderId: integer("orderId").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull(),
  statusFormatted: text("statusFormatted").notNull(),
  renewsAt: text("renewsAt"),
  endsAt: text("endsAt"),
  trialEndsAt: text("trialEndsAt"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  isPaused: boolean("isPaused").default(false),
  subscriptionItemId: text("subscriptionItemId"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  planId: text("planId")
    .notNull()
    .references(() => plans.id),
});

export const blogs = pgTable("blogs", {
  id: text("id").primaryKey(),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  author: text("author"),
  image: text("image"),
});

export type NewWebhookEvent = typeof webhookEvents.$inferInsert;
export type NewSubscription = typeof subscriptions.$inferInsert;
