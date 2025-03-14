import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export default function OfflineLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In offline mode, we'll just simulate a successful login
      // with some basic validation
      if (email.includes("@") && password.length >= 6) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Store a flag in localStorage to indicate the user is "logged in"
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({
            email,
            name: email.split("@")[0],
            role: email.includes("master") ? "master" : "doctor",
          }),
        );

        toast({
          title: "Offline mode activated",
          description: "You are now using the application in offline mode.",
        });

        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid credentials",
          description:
            "Please enter a valid email and password (min 6 characters).",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Offline Mode</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to continue in offline mode
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 mb-1">
              Connection Issue Detected
            </h4>
            <p className="text-xs text-yellow-700">
              Unable to connect to authentication services. You can continue in
              offline mode with limited functionality.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in (Offline Mode)"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
