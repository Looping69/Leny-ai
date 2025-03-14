import { createContext, useContext, useEffect, useState } from "react";
import { User, AuthError } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: AuthError | Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | Error | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    const checkSession = async () => {
      try {
        setLoading(true);

        // First check if we're in offline mode
        const offlineUser = localStorage.getItem("offlineUser");
        if (offlineUser) {
          console.log("Found offline user in localStorage, using offline mode");
          setLoading(false);
          return;
        }

        // Check connection before attempting to get session
        let isConnected = false;
        try {
          isConnected = await checkSupabaseConnection();
        } catch (connError) {
          console.error("Connection check error in auth provider:", connError);
        }

        if (!isConnected) {
          console.log("Connection check failed in auth provider");
          setLoading(false);
          return;
        }

        // Add timeout to the session request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const { data, error } = await supabase.auth.getSession();
        clearTimeout(timeoutId);

        if (error) {
          console.error("Error getting session:", error);
          setError(error);
        } else {
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        console.error("Unexpected error getting session:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      setError(null);

      // Add timeout to the auth request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Authentication request timed out")),
          10000,
        );
      });

      const authPromise = supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      // Race between the auth request and the timeout
      const { error } = (await Promise.race([
        authPromise,
        timeoutPromise,
      ])) as any;

      if (error) {
        setError(error);
        throw error;
      }
    } catch (err) {
      console.error("Error during sign up:", err);
      const authError = err instanceof Error ? err : new Error(String(err));
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Add timeout to the auth request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Authentication request timed out")),
          10000,
        );
      });

      const authPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Race between the auth request and the timeout
      const { error } = (await Promise.race([
        authPromise,
        timeoutPromise,
      ])) as any;

      if (error) {
        setError(error);
        throw error;
      }
    } catch (err) {
      console.error("Error during sign in:", err);
      const authError = err instanceof Error ? err : new Error(String(err));
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we're in offline mode
      const offlineUser = localStorage.getItem("offlineUser");
      if (offlineUser) {
        localStorage.removeItem("offlineUser");
        setUser(null);
        return;
      }

      // Add timeout to the auth request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Sign out request timed out")), 5000);
      });

      const authPromise = supabase.auth.signOut();

      // Race between the auth request and the timeout
      const { error } = (await Promise.race([
        authPromise,
        timeoutPromise,
      ])) as any;

      if (error) {
        setError(error);
        throw error;
      }
    } catch (err) {
      console.error("Error during sign out:", err);
      const authError = err instanceof Error ? err : new Error(String(err));
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
