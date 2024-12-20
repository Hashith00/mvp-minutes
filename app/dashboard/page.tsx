"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import React from "react";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();
  const stats = [
    { title: "Project Finished", value: "12", icon: "✓" },
    { title: "Time Tracked (week)", value: "20h 30m", icon: "🕒" },
    { title: "Total Revenue", value: "$2190", icon: "💰" },
    { title: "Total Members", value: "21", icon: "👥" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
          <p className="text-muted-foreground">Let's get things done!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </Button>
          <Button>+ New Task</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Ongoing Tasks Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ongoing Tasks</h2>
          <Button variant="ghost" className="text-sm">
            View All
          </Button>
        </div>
        {/* Add your task cards here */}
      </div>
    </div>
  );
};

export default DashboardPage;
