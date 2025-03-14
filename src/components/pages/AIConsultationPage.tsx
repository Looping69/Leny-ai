import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import AgentSelectionPanel from "../dashboard/AgentSelectionPanel";
import ConsultationWorkspace from "../dashboard/ConsultationWorkspace";
import ConsultationHistory from "../dashboard/ConsultationHistory";
import SubscriptionManager from "../dashboard/SubscriptionManager";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, History, Settings } from "lucide-react";

const AIConsultationPage = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([
    "central",
    "cardiology",
    "neurology",
  ]);
  const [showAgentSelection, setShowAgentSelection] = useState(true);
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
              ) : (
                <ConsultationWorkspace
                  selectedAgents={selectedAgents}
                  onAgentSelectionChange={handleChangeAgents}
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
