import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";
import MasterUserBanner from "./MasterUserBanner";
import { useAuth } from "../../../../supabase/auth";
import { supabase } from "../../../../supabase/supabase";
import { Tables } from "@/types/supabase";
import { LoadingScreen } from "@/components/ui/loading-spinner";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] =
    useState<Tables<"user_profiles"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const navigate = useNavigate();

  // Check if we're in offline mode
  useEffect(() => {
    const offlineUser = localStorage.getItem("offlineUser");
    if (!user && offlineUser) {
      setIsOfflineMode(true);
      try {
        const parsedUser = JSON.parse(offlineUser);
        setUserProfile({
          id: "offline-user",
          full_name: parsedUser.name || "Offline User",
          role: parsedUser.role || "doctor",
          created_at: new Date().toISOString(),
        } as any);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing offline user:", error);
        navigate("/login");
      }
    } else if (!user && !offlineUser) {
      // If no user and no offline mode, redirect to login
      navigate("/login");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    async function fetchUserProfile() {
      if (!user || isOfflineMode) {
        setLoading(false);
        return;
      }

      try {
        // Use a simpler query to avoid potential policy recursion issues
        const { data, error } = await supabase
          .from("user_profiles")
          .select("id, full_name, role, specialty, created_at")
          .eq("id", user.id)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user profile:", error);
          // Use a fallback profile
          const fallbackProfile = {
            id: user.id,
            full_name: user.email?.split("@")[0] || "User",
            role: "doctor",
            created_at: new Date().toISOString(),
          };

          // Try to create a profile if it doesn't exist
          if (error.code === "PGRST116") {
            try {
              // Use RPC function if available to avoid policy issues
              const { data: newProfile, error: insertError } = await supabase
                .from("user_profiles")
                .insert(fallbackProfile)
                .select("id, full_name, role, specialty, created_at")
                .single();

              if (insertError) {
                console.error("Error inserting user profile:", insertError);
                setUserProfile(fallbackProfile as any);
              } else {
                setUserProfile(newProfile);
              }
            } catch (insertErr) {
              console.error("Error in profile creation:", insertErr);
              setUserProfile(fallbackProfile as any);
            }
          } else {
            setUserProfile(fallbackProfile as any);
          }
        } else if (data) {
          setUserProfile(data);
        } else {
          // No data but also no error - create a default profile
          const defaultProfile = {
            id: user.id,
            full_name: user.email?.split("@")[0] || "User",
            role: "doctor",
            created_at: new Date().toISOString(),
          };

          try {
            const { data: newProfile, error: insertError } = await supabase
              .from("user_profiles")
              .insert(defaultProfile)
              .select("id, full_name, role, specialty, created_at")
              .single();

            if (insertError) {
              console.error("Error inserting user profile:", insertError);
              setUserProfile(defaultProfile as any);
            } else {
              setUserProfile(newProfile);
            }
          } catch (insertErr) {
            console.error("Error in profile creation:", insertErr);
            setUserProfile(defaultProfile as any);
          }
        }
      } catch (error) {
        console.error("Error in user profile handling:", error);
        // Set a fallback profile to prevent UI errors
        setUserProfile({
          id: user.id,
          full_name: user.email?.split("@")[0] || "User",
          role: "doctor",
          created_at: new Date().toISOString(),
        } as any);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user, isOfflineMode]);

  if (loading) {
    return <LoadingScreen text="Loading dashboard..." />;
  }

  const isMasterUser = userProfile?.role === "master";

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation userProfile={userProfile} isOfflineMode={isOfflineMode} />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar userRole={userProfile?.role || "doctor"} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-4 pb-2">
            {isOfflineMode && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ Offline Mode Active
                </p>
                <p className="text-xs text-yellow-700">
                  You are currently using the application in offline mode with
                  limited functionality.
                </p>
              </div>
            )}
            {isMasterUser && (
              <MasterUserBanner
                userName={
                  userProfile?.full_name || user?.email || "Administrator"
                }
              />
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
