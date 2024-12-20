"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

// Add loading skeleton component
const PricingCardSkeleton = () => (
  <div className="rounded-lg shadow-lg overflow-hidden border-gray-200 animate-pulse">
    <div className="px-6 py-8 bg-white dark:bg-gray-800">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
    <div className="px-6 pt-6 pb-8 bg-gray-50 dark:bg-gray-800/50">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"
        ></div>
      ))}
      <div className="mt-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  </div>
);

export default function Pricing() {
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<number | null>(null);

  // This is a temporary function to sync the plans with the button
  const syncPlansWithButton = async () => {
    const res = await fetch("/api/temp");
    console.log(res);
  };

  // Generate the pricing link
  const generatePricingLink = async (planId: number) => {
    setIsLoading(planId);
    if (!user) {
      toast({
        variant: "destructive",
        title: "Please login",
        description: "You must be logged in to buy a plan",
      });
      return;
    }
    try {
      const res = await fetch("/api/pricing", {
        method: "POST",
        body: JSON.stringify({
          variantId: planId,
          embed: false,
          email: user?.emailAddresses[0]?.emailAddress,
          userId: user?.id,
        }),
      });
      const data = await res.json();
      console.log(data);
      window.open(data.url, "_blank");
    } catch (error) {
      console.error("Error generating pricing link:", error);
      toast({
        variant: "destructive",
        title: "Please login",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(null);
    }
  };

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const res = await fetch("/api/pricing");
      const data = await res.json();
      setPricingPlans(data);
    };
    fetchPricingPlans();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center">
        <div className="text-pink-600 mb-2">Pricing</div>
        <h1 className="text-4xl font-bold mb-4">
          Flexible plans for every team
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that best fits your team's needs. Whether you're just
          getting started or managing large projects, YowManage offers
          affordable solutions to help you stay organized and productive
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {pricingPlans.length === 0 ? (
          <>
            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </>
        ) : (
          pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-gray-200 p-6 bg-white"
            >
              {/* Plan Icon */}
              <div className="mb-4">
                {/* Add appropriate icon based on plan type */}
              </div>

              {/* Plan Name & Description */}
              <h3 className="text-xl font-semibold mb-2">{plan.productName}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {plan.description.split(",")[0]}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {plan.price === 0
                    ? "FREE"
                    : `$${(Number(plan.price) / 100).toFixed(0)}`}
                </span>
                {plan.price !== 0 && (
                  <span className="text-gray-600 ml-1">/month</span>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.description
                  .split(",")
                  .map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                      <span className="text-gray-600">{feature.trim()}</span>
                    </li>
                  ))}
              </ul>

              {/* Action Button */}
              <Button
                className={`w-full ${
                  plan.price === 0
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 text-indigo-600 hover:bg-gray-200"
                }`}
                onClick={() => generatePricingLink(plan.id)}
                disabled={isLoading === plan.id}
              >
                {isLoading === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Start Now"
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
