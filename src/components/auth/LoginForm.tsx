import { useState, useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import OfflineLoginForm from "./OfflineLoginForm";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOfflineMode, setShowOfflineMode] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Check for connection issues on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Import the connection check function from supabase.ts
        const { checkSupabaseConnection } = await import(
          "../../../supabase/supabase"
        );

        // Try multiple times with increasing timeouts
        let isConnected = false;

        // First quick check
        try {
          isConnected = await checkSupabaseConnection();
        } catch (quickCheckError) {
          console.warn("Quick connection check failed:", quickCheckError);
        }

        // If quick check failed, try again with longer timeout
        if (!isConnected) {
          try {
            // Try to fetch from Supabase URL to check connection with longer timeout
            const supabaseUrl =
              import.meta.env.VITE_SUPABASE_URL ||
              "https://vnixswtxvuqtytneqgos.supabase.co";
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

            const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
              method: "GET",
              signal: controller.signal,
              // Add cache control to prevent caching issues
              headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
              },
            });

            clearTimeout(timeoutId);
            isConnected = response.ok;
          } catch (fetchError) {
            console.error("Extended connection check failed:", fetchError);
            isConnected = false;
          }
        }

        if (!isConnected) {
          console.log(
            "All connection attempts failed, switching to offline mode",
          );
          setShowOfflineMode(true);
        }
      } catch (error) {
        console.error("Connection check process failed:", error);
        setShowOfflineMode(true);
      }
    };

    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Check connection before attempting to sign in
      try {
        const { checkSupabaseConnection } = await import(
          "../../../supabase/supabase"
        );
        const isConnected = await checkSupabaseConnection();

        if (!isConnected) {
          console.log(
            "Connection check failed before sign in, switching to offline mode",
          );
          setShowOfflineMode(true);
          return;
        }
      } catch (connError) {
        console.error("Connection check error before sign in:", connError);
        setShowOfflineMode(true);
        return;
      }

      // Proceed with sign in if connection is available
      await signIn(email, password);
      navigate("/dashboard"); // Navigate to dashboard instead of root
    } catch (error) {
      console.error("Error during sign in:", error);

      // Check if it's a connection error
      if (
        error instanceof Error &&
        (error.message.includes("fetch") ||
          error.message.includes("network") ||
          error.message.includes("timeout") ||
          error.message.includes("abort") ||
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError") ||
          error.message.includes("ERR_NAME_NOT_RESOLVED"))
      ) {
        console.log(
          "Connection error detected during sign in, switching to offline mode",
        );
        setShowOfflineMode(true);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showOfflineMode) {
    return <OfflineLoginForm />;
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              className="text-xs text-muted-foreground"
              onClick={() => setShowOfflineMode(true)}
            >
              Use offline mode
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
