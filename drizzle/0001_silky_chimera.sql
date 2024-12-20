CREATE TABLE "plans" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"productName" text,
	"variantId" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" text NOT NULL,
	"isUsageBased" boolean DEFAULT false,
	"interval" text,
	"intervalCount" integer,
	"trialInterval" text,
	"trialIntervalCount" integer,
	"sort" integer,
	CONSTRAINT "plans_variantId_unique" UNIQUE("variantId")
);
--> statement-breakpoint
CREATE TABLE "variants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"status" text,
	"productId" integer,
	"attributes" jsonb,
	"sort" integer,
	"interval" text,
	"intervalCount" integer
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE text;