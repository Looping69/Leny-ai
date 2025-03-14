import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
  Lock,
  CheckCircle,
  Info,
} from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  specialty: string;
  description: string;
  icon: React.ReactNode;
  isPremium: boolean;
  isSelected: boolean;
}

interface AgentSelectionPanelProps {
  onAgentSelectionChange?: (selectedAgents: string[]) => void;
  maxFreeAgents?: number;
  userSubscription?: "free" | "premium";
  onUpgradeClick?: () => void;
}

const AgentSelectionPanel = ({
  onAgentSelectionChange = () => {},
  maxFreeAgents = 3,
  userSubscription = "free",
  onUpgradeClick = () => {},
}: AgentSelectionPanelProps) => {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: "central",
      name: "Central AI Orchestrator",
      specialty: "Multi-specialty coordination",
      description:
        "Coordinates between specialist AIs to provide comprehensive insights and recommendations.",
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      isPremium: false,
      isSelected: true,
    },
    {
      id: "cardiology",
      name: "Cardiology AI",
      specialty: "Heart & Circulatory System",
      description:
        "Specializes in heart conditions, ECG analysis, and cardiovascular treatment recommendations.",
      icon: <HeartPulse className="h-6 w-6 text-red-600" />,
      isPremium: false,
      isSelected: false,
    },
    {
      id: "neurology",
      name: "Neurology AI",
      specialty: "Brain & Nervous System",
      description:
        "Focuses on neurological disorders, brain imaging analysis, and cognitive assessments.",
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      isPremium: false,
      isSelected: false,
    },
    {
      id: "radiology",
      name: "Radiology AI",
      specialty: "Medical Imaging",
      description:
        "Analyzes X-rays, MRIs, CT scans and other medical images to assist in diagnosis.",
      icon: <Microscope className="h-6 w-6 text-blue-600" />,
      isPremium: true,
      isSelected: false,
    },
    {
      id: "general",
      name: "General Medicine AI",
      specialty: "Primary Care",
      description:
        "Provides general medical advice, preventive care recommendations, and initial assessments.",
      icon: <Stethoscope className="h-6 w-6 text-green-600" />,
      isPremium: false,
      isSelected: false,
    },
    {
      id: "pediatrics",
      name: "Pediatrics AI",
      specialty: "Child & Adolescent Health",
      description:
        "Specializes in the health and development of children and adolescents.",
      icon: <Stethoscope className="h-6 w-6 text-cyan-600" />,
      isPremium: true,
      isSelected: false,
    },
    {
      id: "dermatology",
      name: "Dermatology AI",
      specialty: "Skin Conditions",
      description:
        "Analyzes skin conditions, lesions, and rashes to assist in dermatological diagnosis.",
      icon: <Microscope className="h-6 w-6 text-orange-600" />,
      isPremium: true,
      isSelected: false,
    },
    {
      id: "psychiatry",
      name: "Psychiatry AI",
      specialty: "Mental Health",
      description:
        "Assists with mental health assessments, treatment recommendations, and therapy guidance.",
      icon: <Brain className="h-6 w-6 text-teal-600" />,
      isPremium: true,
      isSelected: false,
    },
  ]);

  const selectedAgents = agents.filter((agent) => agent.isSelected);
  const selectedFreeAgents = selectedAgents.filter((agent) => !agent.isPremium);
  const canSelectMoreFreeAgents =
    userSubscription === "free"
      ? selectedFreeAgents.length < maxFreeAgents
      : true;

  const handleAgentToggle = (agentId: string) => {
    const updatedAgents = agents.map((agent) => {
      if (agent.id === agentId) {
        // If agent is premium and user doesn't have premium subscription, don't toggle
        if (agent.isPremium && userSubscription !== "premium") {
          return agent;
        }

        // If agent is not selected and we're at the free limit, don't select more
        if (!agent.isSelected && !canSelectMoreFreeAgents && !agent.isPremium) {
          return agent;
        }

        return { ...agent, isSelected: !agent.isSelected };
      }
      return agent;
    });

    setAgents(updatedAgents);
    onAgentSelectionChange(
      updatedAgents.filter((a) => a.isSelected).map((a) => a.id),
    );
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              AI Agent Selection
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {userSubscription === "free" ? (
                <>
                  Select up to {maxFreeAgents} free agents or{" "}
                  <span className="text-blue-600 font-medium">
                    upgrade to premium
                  </span>
                </>
              ) : (
                <>
                  All specialist AI agents available with your premium
                  subscription
                </>
              )}
            </p>
          </div>
          {userSubscription === "free" && (
            <Button
              onClick={onUpgradeClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors"
            >
              Upgrade to Premium
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => {
            const isLocked = agent.isPremium && userSubscription === "free";
            const isSelectable =
              !isLocked &&
              (agent.isSelected || canSelectMoreFreeAgents || agent.isPremium);

            return (
              <div
                key={agent.id}
                className={`relative p-4 border rounded-xl transition-all ${agent.isSelected ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"} ${isSelectable ? "cursor-pointer" : "opacity-70"}`}
                onClick={() => isSelectable && handleAgentToggle(agent.id)}
              >
                {agent.isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {isLocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center mb-3 ${agent.isSelected ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    {agent.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {agent.specialty}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {agent.isPremium ? (
                      <Badge
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 border-indigo-200"
                      >
                        Premium
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Free
                      </Badge>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                          >
                            <Info className="h-3.5 w-3.5 text-gray-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs p-3 bg-gray-900 text-white text-xs rounded-lg">
                          <p>{agent.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedAgents.length}</span> agents
            selected
            {userSubscription === "free" && (
              <span>
                {" "}
                ({selectedFreeAgents.length}/{maxFreeAgents} free agents)
              </span>
            )}
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors"
            disabled={selectedAgents.length === 0}
          >
            Start Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentSelectionPanel;
