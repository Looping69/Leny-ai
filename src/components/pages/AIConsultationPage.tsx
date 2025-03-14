import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import AgentSelectionPanel from "../dashboard/AgentSelectionPanel";
import ConsultationWorkspace from "../dashboard/ConsultationWorkspace";
import ConsultationHistory from "../dashboard/ConsultationHistory";
import SubscriptionManager from "../dashboard/SubscriptionManager";
import AICollaborativeConsultation from "../dashboard/AICollaborativeConsultation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, History, Settings, Users } from "lucide-react";

const AIConsultationPage = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([
    "central",
    "cardiology",
    "neurology",
  ]);
  const [showAgentSelection, setShowAgentSelection] = useState(true);
  const [consultationType, setConsultationType] = useState<
    "standard" | "collaborative"
  >("standard");
  const [userSubscription, setUserSubscription] = useState<"free" | "premium">(
    "free",
  );
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);

  const handleAgentSelectionChange = (agents: string[]) => {
    setSelectedAgents(agents);
  };

  const handleStartConsultation = () => {
    setShowAgentSelection(false);
  };

  const handleChangeAgents = () => {
    setShowAgentSelection(true);
  };

  const handleUpgradeClick = () => {
    setShowSubscriptionManager(true);
  };

  const handleUpgrade = (plan: string) => {
    setUserSubscription("premium");
    setShowSubscriptionManager(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">AI Consultation</h1>
          <div className="flex items-center gap-2">
            {userSubscription === "free" ? (
              <Button
                onClick={() => setShowSubscriptionManager(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors gap-2"
              >
                <Zap className="h-4 w-4" />
                Upgrade to Premium
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowSubscriptionManager(true)}
                className="rounded-lg px-4 h-9 gap-2"
              >
                <Settings className="h-4 w-4" />
                Manage Subscription
              </Button>
            )}
          </div>
        </div>

        {showSubscriptionManager ? (
          <div className="space-y-4">
            <SubscriptionManager
              currentPlan={userSubscription}
              onUpgrade={handleUpgrade}
              onCancel={() => setShowSubscriptionManager(false)}
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSubscriptionManager(false)}
              >
                Back to Consultation
              </Button>
            </div>
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
              <TabsTrigger
                value="new"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Brain className="h-4 w-4 mr-2" />
                New Consultation
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <History className="h-4 w-4 mr-2" />
                Consultation History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="mt-0">
              {showAgentSelection ? (
                <div className="space-y-4">
                  <AgentSelectionPanel
                    onAgentSelectionChange={handleAgentSelectionChange}
                    maxFreeAgents={3}
                    userSubscription={userSubscription}
                    onUpgradeClick={handleUpgradeClick}
                  />

                  <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4">
                    <h3 className="text-lg font-medium mb-4">
                      Consultation Type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${consultationType === "standard" ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setConsultationType("standard")}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Standard Consultation
                            </h4>
                            <p className="text-sm text-gray-500">
                              Single AI agent analysis
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Interact with one AI specialist at a time for focused
                          analysis and recommendations.
                        </p>
                      </div>

                      <div
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${consultationType === "collaborative" ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => setConsultationType("collaborative")}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Collaborative Consultation
                            </h4>
                            <p className="text-sm text-gray-500">
                              Multiple AI agents working together
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          AI specialists collaborate in real-time, sharing
                          insights to reach a comprehensive diagnosis.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleStartConsultation}
                      disabled={selectedAgents.length === 0}
                    >
                      Continue to Consultation
                    </Button>
                  </div>
                </div>
              ) : consultationType === "standard" ? (
                <ConsultationWorkspace
                  selectedAgents={selectedAgents}
                  onAgentSelectionChange={handleChangeAgents}
                />
              ) : (
                <AICollaborativeConsultation
                  selectedAgents={selectedAgents}
                  onConsultationComplete={(result) => {
                    console.log("Collaborative consultation complete:", result);
                  }}
                />
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <ConsultationHistory />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIConsultationPage;
