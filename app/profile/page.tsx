"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { SubscriptionInReturn } from "@/app/(types)/returnObjects";

const ProfilePage = () => {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionInReturn | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.id) return;
      const response = await fetch(`/api/users/${(user?.id).toString()}`);
      const data: SubscriptionInReturn = await response.json();
      console.log(data);
      setSubscription(data);
    };
    fetchSubscription();
  }, [user?.id]);

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/subscriptions/${subscription?.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Refresh subscription data
        if (!user?.id) return;
        const updatedResponse = await fetch(
          `/api/users/${(user?.id).toString()}`
        );
        const updatedData: SubscriptionInReturn = await updatedResponse.json();
        setSubscription(updatedData);
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        {subscription ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Subscription Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium text-gray-600">
                  {subscription.planName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-600">
                  {subscription.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan ID</span>
                <span className="font-medium text-gray-600">
                  {subscription.planId}
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCancelSubscription}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {isLoading ? "Canceling..." : "Cancel Subscription"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-500 text-center">No active subscription</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
