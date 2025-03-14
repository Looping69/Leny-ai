import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import AuditLogViewer from "../dashboard/AuditLogViewer";
import MasterUserModal from "../dashboard/MasterUserModal";
import UserRoleManager from "../dashboard/UserRoleManager";
import ExternalAIIntegrationManager from "../dashboard/ExternalAIIntegrationManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Database, Settings, Users } from "lucide-react";

const MasterUserSystemPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showModal, setShowModal] = useState(false);

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
            className="bg-red-600 hover:bg-red-700 text-white gap-2"
          >
            <Settings className="h-4 w-4" />
            System Controls
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
            <TabsTrigger
              value="users"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="external"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              External AI
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
              <Shield className="h-4 w-4 mr-2" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-0">
            <UserRoleManager currentUserRole="master" />
          </TabsContent>

          <TabsContent value="external" className="mt-0">
            <ExternalAIIntegrationManager />
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
