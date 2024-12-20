"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠" },
    { name: "My Tasks", href: "/dashboard/tasks", icon: "📋" },
    { name: "Projects", href: "/dashboard/projects", icon: "📁" },
    { name: "Schedule", href: "/dashboard/schedule", icon: "📅" },
    { name: "Pricing", href: "/dashboard/pricing", icon: "📊" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 border-r bg-background p-4 hidden md:block">
      {/* Logo and Plan */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-md bg-primary">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
        </div>
        <div>
          <div className="font-semibold">Design Yow</div>
          <div className="text-xs text-muted-foreground">Professional Plan</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search anything"
          className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm"
        />
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === item.href
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 rounded-md border p-3">
          <UserButton />
          <div className="flex-1 min-w-0">
            <div className="font-medium">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user?.emailAddresses[0].emailAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64">
        <main>{children}</main>
      </div>
    </div>
  );
}
