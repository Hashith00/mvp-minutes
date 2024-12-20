"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

function Header() {
  const { user } = useUser();
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggling sidebar:", !openSideBar);
    setOpenSideBar(!openSideBar);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 mx-8 py-2 mt-4 flex items-center justify-between rounded-xl bg-white/50 px-4 backdrop-blur-md shadow-sm">
        {!user ? (
          <div className="md:flex gap-2 hidden">
            <Button
              size="sm"
              className="bg-white/50 text-black hover:bg-white/80 text-xs"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-black/50 bg-transparent hover:bg-white/80 text-xs"
            >
              <Link href="/signin">Login</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex">
            <UserButton />
          </div>
        )}
        <div className="flex lg:hidden cursor-pointer" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </div>
      </div>
    </>
  );
}

export default Header;
