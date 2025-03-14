import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import AppointmentFollowUp from "../dashboard/AppointmentFollowUp";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, History, Calendar, Plus } from "lucide-react";

const AppointmentFollowUpPage = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [followUps, setFollowUps] = useState<any[]>([
    {
      id: "fu-1001",
      patientId: "P-1002",
      patientName: "Michael Chen",
      appointmentDate: "2023-06-10",
      procedureType: "Appendectomy",
      followUpDate: "2023-06-17",
      followUpTime: "14:30",
      status: "completed",
      summary:
        "Patient reported minimal pain (2/10) and is recovering well. No signs of infection at the incision site. Patient has been able to gradually increase activity as recommended.",
    },
    {
      id: "fu-1002",
      patientId: "P-1003",
      patientName: "Emily Rodriguez",
      appointmentDate: "2023-06-12",
      procedureType: "Cataract Surgery",
      followUpDate: "2023-06-19",
      followUpTime: "10:15",
      status: "scheduled",
    },
  ]);

  const handleFollowUpComplete = (result: any) => {
    // In a real implementation, this would update the database
    // For now, we'll just update the local state
    setFollowUps([...followUps, { id: `fu-${Date.now()}`, ...result }]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Follow-Ups
          </h1>
          <Button
            onClick={() => setActiveTab("new")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors gap-2"
          >
            <Plus className="h-4 w-4" />
            New Follow-Up
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
            <TabsTrigger
              value="new"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Phone className="h-4 w-4 mr-2" />
              New Follow-Up
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <History className="h-4 w-4 mr-2" />
              Follow-Up History
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Scheduled Follow-Ups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-0">
            <AppointmentFollowUp onFollowUpComplete={handleFollowUpComplete} />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Follow-Up History
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Date
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Patient
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Procedure
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Status
                      </th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {followUps
                      .filter((fu) => fu.status === "completed")
                      .map((followUp) => (
                        <tr key={followUp.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {followUp.followUpDate}
                              </span>
                              <span className="text-xs text-gray-500">
                                {followUp.followUpTime}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-gray-900">
                              {followUp.patientName}
                            </span>
                            <div className="text-xs text-gray-500">
                              ID: {followUp.patientId}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-700">
                              {followUp.procedureType}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {followUps.filter((fu) => fu.status === "completed").length ===
                  0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Phone className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No completed follow-ups
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Completed follow-up calls will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-0">
            <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Scheduled Follow-Ups
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Date
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Patient
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Procedure
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Status
                      </th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {followUps
                      .filter((fu) => fu.status === "scheduled")
                      .map((followUp) => (
                        <tr key={followUp.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {followUp.followUpDate}
                              </span>
                              <span className="text-xs text-gray-500">
                                {followUp.followUpTime}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-gray-900">
                              {followUp.patientName}
                            </span>
                            <div className="text-xs text-gray-500">
                              ID: {followUp.patientId}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-700">
                              {followUp.procedureType}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Scheduled
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {followUps.filter((fu) => fu.status === "scheduled").length ===
                  0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No scheduled follow-ups
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Schedule a follow-up call to check on patients after
                      procedures.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentFollowUpPage;
