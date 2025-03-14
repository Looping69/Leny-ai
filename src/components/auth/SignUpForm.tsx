import { useState, useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useToast } from "@/components/ui/use-toast";
import OfflineSignUpForm from "./OfflineSignUpForm";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOfflineMode, setShowOfflineMode] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

      // Check connection before attempting to sign up
      try {
        const { checkSupabaseConnection } = await import(
          "../../../supabase/supabase"
        );
        const isConnected = await checkSupabaseConnection();

        if (!isConnected) {
          console.log(
            "Connection check failed before sign up, switching to offline mode",
          );
          setShowOfflineMode(true);
          return;
        }
      } catch (connError) {
        console.error("Connection check error before sign up:", connError);
        setShowOfflineMode(true);
        return;
      }

      // Proceed with sign up if connection is available
      await signUp(email, password, fullName);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
        duration: 5000,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during sign up:", error);

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
          "Connection error detected during sign up, switching to offline mode",
        );
        setShowOfflineMode(true);
      } else {
        setError("Error creating account");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showOfflineMode) {
    return <OfflineSignUpForm />;
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-xs text-center text-gray-500 mt-6">
            By creating an account, you agree to our{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </div>

          <div className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
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
