import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Brain,
  Send,
  HeartPulse,
  Microscope,
  Stethoscope,
  RotateCw,
  MessageSquare,
  Users,
} from "lucide-react";
import { generateCollaborativeAnalysis } from "@/lib/gemini";

interface AICollaborativeConsultationProps {
  patientName?: string;
  patientId?: string;
  selectedAgents: string[];
  onConsultationComplete?: (result: any) => void;
}

const AICollaborativeConsultation = ({
  patientName = "Sarah Johnson",
  patientId = "P-1001",
  selectedAgents = ["central", "cardiology", "neurology"],
  onConsultationComplete = () => {},
}: AICollaborativeConsultationProps) => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [collaborationMessages, setCollaborationMessages] = useState<any[]>([]);
  const [finalRecommendation, setFinalRecommendation] = useState("");
  const [consensusLevel, setConsensusLevel] = useState(0);
  const { toast } = useToast();

  const getAgentName = (agentId: string) => {
    switch (agentId) {
      case "central":
        return "Central AI Orchestrator";
      case "cardiology":
        return "Cardiology AI";
      case "neurology":
        return "Neurology AI";
      case "radiology":
        return "Radiology AI";
      case "general":
        return "General Medicine AI";
      default:
        return agentId.charAt(0).toUpperCase() + agentId.slice(1) + " AI";
    }
  };

  const getAgentIcon = (agentId: string) => {
    switch (agentId) {
      case "cardiology":
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <HeartPulse className="h-4 w-4 text-red-600" />
          </div>
        );
      case "neurology":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Brain className="h-4 w-4 text-purple-600" />
          </div>
        );
      case "radiology":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Microscope className="h-4 w-4 text-blue-600" />
          </div>
        );
      case "general":
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-green-600" />
          </div>
        );
      default: // central
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <Brain className="h-4 w-4 text-indigo-600" />
          </div>
        );
    }
  };

  const getConsensusColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleStartAnalysis = async () => {
    if (query.trim() === "") {
      toast({
        title: "Query required",
        description:
          "Please enter a question or description of the patient's condition",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCollaborationMessages([]);

    // Add initial message from user
    setCollaborationMessages([
      {
        id: Date.now().toString(),
        sender: "user",
        content: query,
        timestamp: new Date(),
      },
    ]);

    // Start progress animation
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        // Cap progress at 90% until we get the actual response
        return prev >= 90 ? 90 : prev + 5;
      });
    }, 300);

    try {
      // Get specialties from selected agents
      const specialties = selectedAgents.map((agentId) =>
        getAgentName(agentId),
      );

      // Generate collaborative analysis
      const analysisResult = await generateCollaborativeAnalysis(
        `Patient ${patientName} (ID: ${patientId}) - ${query}`,
        specialties,
      );

      // Create messages for each agent contribution
      const agentMessages = analysisResult.agentResponses.map((response) => ({
        id: (Date.now() + Math.random() * 1000).toString(),
        sender: "ai",
        aiType: response.specialty.toLowerCase().includes("central")
          ? "central"
          : response.specialty.toLowerCase().includes("cardio")
            ? "cardiology"
            : response.specialty.toLowerCase().includes("neuro")
              ? "neurology"
              : response.specialty.toLowerCase().includes("radio")
                ? "radiology"
                : response.specialty.toLowerCase().includes("general")
                  ? "general"
                  : "central",
        content: `${response.opinion}\n\nReasoning: ${response.reasoning}`,
        timestamp: new Date(Date.now() + Math.random() * 10000),
        confidence: response.confidence,
      }));

      // Add final recommendation from central AI
      const finalMessage = {
        id: (Date.now() + Math.random() * 1000).toString(),
        sender: "ai",
        aiType: "central",
        content: `Based on our collaborative analysis, here is the final recommendation:\n\n${analysisResult.finalRecommendation}`,
        timestamp: new Date(Date.now() + 20000),
        isFinal: true,
      };

      // Sort messages by timestamp
      const allMessages = [...agentMessages, finalMessage].sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
      );

      // Add messages with delay to simulate conversation
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < allMessages.length) {
          setCollaborationMessages((prev) => [
            ...prev,
            allMessages[messageIndex],
          ]);
          messageIndex++;
        } else {
          clearInterval(messageInterval);
        }
      }, 1500);

      // Set final recommendation and consensus level
      setFinalRecommendation(analysisResult.finalRecommendation);
      setConsensusLevel(analysisResult.consensusLevel);

      // Complete the progress
      clearInterval(interval);
      setAnalysisProgress(100);

      // Notify parent component of completion
      onConsultationComplete({
        finalRecommendation: analysisResult.finalRecommendation,
        consensusLevel: analysisResult.consensusLevel,
        agentResponses: analysisResult.agentResponses,
      });

      // Keep analyzing state true until all messages are displayed
      setTimeout(
        () => {
          setIsAnalyzing(false);
        },
        allMessages.length * 1500 + 1000,
      );
    } catch (error) {
      console.error("Error during collaborative analysis:", error);
      toast({
        title: "Analysis error",
        description:
          "There was an error during the AI analysis. Please try again.",
        variant: "destructive",
      });

      clearInterval(interval);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              AI Collaborative Consultation
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Patient: {patientName} ({patientId}) • {selectedAgents.length} AI
              agents selected
            </p>
          </div>
          {consensusLevel > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Consensus Level:</div>
              <div className="flex items-center gap-2">
                <Progress
                  value={consensusLevel}
                  className="w-24 h-2 bg-gray-100"
                />
                <span className="text-sm font-bold">{consensusLevel}%</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {!isAnalyzing && collaborationMessages.length === 0 ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Collaborative AI Consultation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Multiple AI specialists will collaborate to analyze this
                    case, sharing insights from their respective fields to reach
                    a comprehensive diagnosis and treatment recommendation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What would you like to ask about this patient?
              </label>
              <Textarea
                id="query"
                placeholder="e.g., What could be causing the patient's persistent headaches and elevated blood pressure?"
                className="min-h-[120px] resize-none rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                onClick={handleStartAnalysis}
                disabled={query.trim() === ""}
              >
                <Users className="h-4 w-4" />
                Start Collaborative Analysis
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-4 max-h-[500px] overflow-y-auto p-2">
              {collaborationMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {message.sender === "user" ? (
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor"
                          alt="Doctor"
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          DR
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      getAgentIcon(message.aiType)
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {message.sender === "user"
                            ? "You"
                            : getAgentName(message.aiType)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {message.sender === "ai" && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 h-4 bg-blue-50 text-blue-700 border-blue-200"
                          >
                            AI
                          </Badge>
                        )}
                        {message.confidence && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 h-4 bg-green-50 text-green-700 border-green-200"
                          >
                            {message.confidence}% Confidence
                          </Badge>
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg whitespace-pre-wrap ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : message.isFinal
                              ? "bg-green-50 border border-green-200 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isAnalyzing && analysisProgress < 100 && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <RotateCw className="h-4 w-4 text-indigo-600 animate-spin" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          AI Collaboration
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                        AI specialists are collaborating on your query...
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isAnalyzing && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">
                      AI Collaboration in Progress
                    </span>
                    <span className="text-gray-500">{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <RotateCw className="h-4 w-4 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                    <div>
                      {analysisProgress < 30 && "Analyzing patient data..."}
                      {analysisProgress >= 30 &&
                        analysisProgress < 60 &&
                        "AI specialists are sharing insights..."}
                      {analysisProgress >= 60 &&
                        analysisProgress < 90 &&
                        "Generating consensus and recommendations..."}
                      {analysisProgress >= 90 &&
                        "Finalizing collaborative analysis..."}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isAnalyzing && collaborationMessages.length > 0 && (
              <div className="flex justify-end">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  onClick={() => {
                    setCollaborationMessages([]);
                    setQuery("");
                    setFinalRecommendation("");
                    setConsensusLevel(0);
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                  Start New Consultation
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AICollaborativeConsultation;
