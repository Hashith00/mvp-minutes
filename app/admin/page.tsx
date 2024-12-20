"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AdminPageAuth = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      router.push(`/admin/${username}`);
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password",
        variant: "destructive",
      });
      setError("Invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Admin Login</h2>
          <p className="text-muted-foreground">
            Enter your credentials to continue
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminPageAuth;
