import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Database, Settings, AlertTriangle, Clock } from "lucide-react";
import MasterUserModal from "../dashboard/MasterUserModal";
import UserRoleManager from "../dashboard/UserRoleManager";
import AuditLogViewer from "../dashboard/AuditLogViewer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import { Tables } from "@/types/supabase";
import { LoadingScreen } from "@/components/ui/loading-spinner";

const MasterUserSystemPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [userProfile, setUserProfile] =
    useState<Tables<"user_profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchUserProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return <LoadingScreen text="Loading master user system..." />;
  }

  // Redirect or show error if not a master user
  const isMasterUser = userProfile?.role === "master";

  if (!isMasterUser) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <AlertDescription className="text-sm font-medium">
                You do not have permission to access the Master User System.
                This area is restricted to users with Master privileges.
              </AlertDescription>
            </div>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Master User System
          </h1>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors gap-2"
          >
            <Shield className="h-4 w-4" />
            System Controls
          </Button>
        </div>

        <Alert className="bg-amber-50 border-amber-200 text-amber-800 mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <AlertDescription className="text-sm font-medium">
              Master User Mode is active. All actions performed in this mode are
              logged for security audit purposes. Use these privileges
              responsibly.
            </AlertDescription>
          </div>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
            <TabsTrigger
              value="users"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              System Parameters
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Database className="h-4 w-4 mr-2" />
              Data Interventions
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Clock className="h-4 w-4 mr-2" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-0">
            <UserRoleManager currentUserRole="master" />
          </TabsContent>

          <TabsContent value="system" className="mt-0">
            <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-8 text-center">
              <Settings className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                System Parameters
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Access and modify core system parameters through the Master
                Control Panel.
              </p>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Open Control Panel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-0">
            <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-8 text-center">
              <Database className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Data Interventions
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Perform system-wide data interventions through the Master
                Control Panel.
              </p>
              <Button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Open Control Panel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-0">
            <AuditLogViewer />
          </TabsContent>
        </Tabs>
      </div>

      <MasterUserModal defaultOpen={showModal} />
    </DashboardLayout>
  );
};

export default MasterUserSystemPage;
