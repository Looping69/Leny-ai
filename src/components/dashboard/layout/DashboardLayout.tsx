import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";
import MasterUserBanner from "./MasterUserBanner";
import { useAuth } from "../../../../supabase/auth";
import { supabase } from "../../../../supabase/supabase";
import { Tables } from "@/types/supabase";
import { LoadingScreen } from "@/components/ui/loading-spinner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] =
    useState<Tables<"user_profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchUserProfile() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          // If the profile doesn't exist, create a default one
          if (error.code === "PGRST116") {
            try {
              // Create a default profile
              const defaultProfile = {
                id: user.id,
                full_name: user.email?.split("@")[0] || "User",
                role: "doctor",
                created_at: new Date().toISOString(),
              };

              // Insert the default profile
              const { data: newProfile, error: insertError } = await supabase
                .from("user_profiles")
                .insert(defaultProfile)
                .select()
                .single();

              if (insertError) {
                console.error("Error inserting user profile:", insertError);
                // Fallback to using the default profile object directly
                setUserProfile(defaultProfile as any);
              } else {
                setUserProfile(newProfile);
              }
            } catch (insertErr) {
              console.error("Error in profile creation:", insertErr);
              // Fallback profile
              setUserProfile({
                id: user.id,
                full_name: user.email?.split("@")[0] || "User",
                role: "doctor",
                created_at: new Date().toISOString(),
              } as any);
            }
          } else {
            console.error("Error fetching user profile:", error);
            throw error;
          }
        } else {
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Set a fallback profile to prevent UI errors
        setUserProfile({
          id: user.id,
          full_name: user.email?.split("@")[0] || "User",
          role: "doctor",
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return <LoadingScreen text="Loading dashboard..." />;
  }

  const isMasterUser = userProfile?.role === "master";

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation userProfile={userProfile} />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar userRole={userProfile?.role || "doctor"} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-4 pb-2">
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
