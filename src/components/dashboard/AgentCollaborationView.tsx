import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
} from "lucide-react";

interface AgentContribution {
  agentId: string;
  agentName: string;
  specialty: string;
  icon: React.ReactNode;
  confidence: number;
  opinion: string;
  reasoning: string;
  sources?: Array<{ title: string; url?: string }>;
}

interface AgentCollaborationViewProps {
  patientName?: string;
  patientId?: string;
  query?: string;
  collaborationStatus?: "in-progress" | "completed";
  consensusLevel?: number; // 0-100
  agentContributions?: AgentContribution[];
  finalRecommendation?: string;
}

const defaultAgentContributions: AgentContribution[] = [
  {
    agentId: "central",
    agentName: "Central AI Orchestrator",
    specialty: "Multi-specialty coordination",
    icon: <Brain className="h-5 w-5 text-indigo-600" />,
    confidence: 85,
    opinion:
      "Based on the collective analysis, the patient's symptoms are most consistent with hypertension with possible secondary complications.",
    reasoning:
      "The patient's elevated blood pressure readings over multiple visits, family history of cardiovascular disease, and current symptoms all point to hypertension as the primary diagnosis. The headaches and occasional dizziness are common symptoms of elevated blood pressure.",
    sources: [
      { title: "JNC 8 Hypertension Guidelines", url: "#" },
      { title: "American Heart Association - Hypertension", url: "#" },
    ],
  },
  {
    agentId: "cardiology",
    agentName: "Cardiology AI",
    specialty: "Heart & Circulatory System",
    icon: <HeartPulse className="h-5 w-5 text-red-600" />,
    confidence: 90,
    opinion:
      "The patient has Stage 2 Hypertension requiring medication adjustment and lifestyle modifications.",
    reasoning:
      "Multiple BP readings >140/90 mmHg, with risk factors including family history and obesity. Current medication appears to be insufficient for adequate control.",
    sources: [
      { title: "2023 ESC Guidelines for Hypertension", url: "#" },
      { title: "SPRINT Trial Results", url: "#" },
    ],
  },
  {
    agentId: "neurology",
    agentName: "Neurology AI",
    specialty: "Brain & Nervous System",
    icon: <Brain className="h-5 w-5 text-purple-600" />,
    confidence: 70,
    opinion:
      "The headaches are likely secondary to hypertension, but recommend monitoring for neurological complications.",
    reasoning:
      "Pattern of headaches is consistent with those caused by elevated blood pressure. No focal neurological symptoms or signs that would suggest primary neurological disorder.",
    sources: [
      { title: "Neurological Complications of Hypertension", url: "#" },
    ],
  },
  {
    agentId: "general",
    agentName: "General Medicine AI",
    specialty: "Primary Care",
    icon: <Stethoscope className="h-5 w-5 text-green-600" />,
    confidence: 85,
    opinion:
      "Hypertension with need for comprehensive management approach including medication adjustment, lifestyle changes, and regular monitoring.",
    reasoning:
      "Patient's overall health profile indicates hypertension as primary concern, with multiple modifiable risk factors that should be addressed alongside pharmacological treatment.",
    sources: [
      { title: "Primary Care Management of Hypertension", url: "#" },
      { title: "Lifestyle Modifications for Hypertension", url: "#" },
    ],
  },
];

const AgentCollaborationView = ({
  patientName = "Sarah Johnson",
  patientId = "P-1001",
  query = "What could be causing the patient's persistent headaches and elevated blood pressure?",
  collaborationStatus = "completed",
  consensusLevel = 85,
  agentContributions = defaultAgentContributions,
  finalRecommendation = "The patient has Stage 2 Hypertension requiring medication adjustment and lifestyle modifications. Current antihypertensive therapy should be optimized, with consideration of adding a calcium channel blocker to the current regimen. Recommend dietary sodium restriction, weight management program, and increased physical activity. Follow-up in 2 weeks to reassess blood pressure control.",
}: AgentCollaborationViewProps) => {
  // Load Gemini API and generate collaborative analysis when component mounts
  React.useEffect(() => {
    const loadGeminiAnalysis = async () => {
      try {
        // Only run this if we're using the default query (meaning this is a new consultation)
        if (
          query ===
          "What could be causing the patient's persistent headaches and elevated blood pressure?"
        ) {
          const { generateCollaborativeAnalysis } = await import(
            "@/lib/gemini"
          );

          // Get specialties from agent contributions
          const specialties = agentContributions.map(
            (agent) => agent.agentName,
          );

          // Generate collaborative analysis
          const analysis = await generateCollaborativeAnalysis(
            `Analyze patient ${patientName} (ID: ${patientId}) who has persistent headaches and elevated blood pressure.`,
            specialties,
          );

          // We're not setting state here to avoid changing the component's behavior
          // In a real implementation, you would update the component state with the analysis results
          console.log("Gemini collaborative analysis:", analysis);
        }
      } catch (error) {
        console.error("Error loading Gemini analysis:", error);
      }
    };

    loadGeminiAnalysis();
  }, []);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const getConsensusColor = (level: number) => {
    if (level >= 80) return "text-green-600";
    if (level >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId === selectedAgent ? null : agentId);
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              AI Collaboration Results
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Patient: {patientName} ({patientId}) • Query: "{query}"
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Consensus Level:</div>
            <div className="flex items-center gap-2">
              <Progress
                value={consensusLevel}
                className="w-24 h-2 bg-gray-100"
              />
              <span
                className={`text-sm font-bold ${getConsensusColor(consensusLevel)}`}
              >
                {consensusLevel}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-100">
            <TabsList className="h-12 w-full rounded-none bg-transparent border-b px-4">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Agent Details
              </TabsTrigger>
              <TabsTrigger
                value="recommendation"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Final Recommendation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4">
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-xl">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <Brain className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border-4 border-white">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {collaborationStatus === "completed"
                    ? "Analysis Complete"
                    : "Analysis in Progress"}
                </h3>
                <p className="text-gray-600 max-w-lg mb-4">
                  {collaborationStatus === "completed"
                    ? `${agentContributions.length} AI specialists have analyzed this case with ${consensusLevel}% consensus.`
                    : "Multiple AI specialists are currently analyzing this case..."}
                </p>
                {collaborationStatus === "completed" && (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 h-9 shadow-sm transition-colors">
                    View Full Report
                  </Button>
                )}
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Contributing AI Agents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agentContributions.map((agent) => (
                  <div
                    key={agent.agentId}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedAgent === agent.agentId ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                    onClick={() => handleAgentSelect(agent.agentId)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {agent.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {agent.agentName}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {agent.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Confidence</span>
                        <span className="font-medium">{agent.confidence}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getConfidenceColor(agent.confidence)}`}
                          style={{ width: `${agent.confidence}%` }}
                        ></div>
                      </div>
                      {selectedAgent === agent.agentId && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-700">
                            {agent.opinion}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0"
                            onClick={() => setActiveTab("details")}
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-4">
            <div className="space-y-6">
              {agentContributions.map((agent) => (
                <div key={agent.agentId} className="p-6 border rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {agent.icon}
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {agent.agentName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {agent.specialty}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            Confidence:
                          </span>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={agent.confidence}
                              className="w-24 h-2 bg-gray-100"
                              indicatorClassName={getConfidenceColor(
                                agent.confidence,
                              )}
                            />
                            <span className="text-sm font-bold">
                              {agent.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            Opinion
                          </h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {agent.opinion}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            Reasoning
                          </h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {agent.reasoning}
                          </p>
                        </div>

                        {agent.sources && agent.sources.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                              Sources
                            </h4>
                            <ul className="text-sm space-y-1">
                              {agent.sources.map((source, index) => (
                                <li
                                  key={index}
                                  className="text-blue-600 hover:underline"
                                >
                                  <a href={source.url || "#"}>{source.title}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendation" className="p-4">
            <div className="space-y-6">
              <div className="p-6 border rounded-xl bg-blue-50 border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Final Recommendation
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {consensusLevel}% Consensus
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {agentContributions.length} AI Specialists
                      </Badge>
                    </div>
                    <p className="text-gray-700">{finalRecommendation}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" className="gap-2">
                  <Info className="h-4 w-4" />
                  Request Clarification
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Disagree
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Accept Recommendation
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgentCollaborationView;
