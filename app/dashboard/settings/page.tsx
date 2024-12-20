import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserProfile />
    </div>
  );
};

export default Settings;
