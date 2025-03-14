import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import PatientList from "../dashboard/PatientList";
import PatientDetail from "../dashboard/PatientDetail";
import AIConsultation from "../dashboard/AIConsultation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Users, MessageSquareText, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Function to trigger loading state for demonstration
  const handleRefresh = () => {
    setLoading(true);
    // Reset loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handleBackToPatients = () => {
    setSelectedPatient(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedPatient ? "Patient Details" : "Medical Dashboard"}
          </h1>
          <Button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {!selectedPatient ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
              <TabsTrigger
                value="overview"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Brain className="h-4 w-4 mr-2" />
                Dashboard Overview
              </TabsTrigger>
              <TabsTrigger
                value="patients"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Patient Management
              </TabsTrigger>
              <TabsTrigger
                value="consultation"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <MessageSquareText className="h-4 w-4 mr-2" />
                AI Consultation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <PatientList
                    isLoading={loading}
                    onPatientSelect={handlePatientSelect}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patients" className="mt-0">
              <PatientList
                isLoading={loading}
                onPatientSelect={handlePatientSelect}
              />
            </TabsContent>

            <TabsContent value="consultation" className="mt-0">
              <AIConsultation />
            </TabsContent>
          </Tabs>
        ) : (
          <PatientDetail
            patient={selectedPatient}
            onBack={handleBackToPatients}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
