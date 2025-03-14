import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clock,
  Phone,
  CheckCircle,
  AlertCircle,
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
  RotateCw,
  User,
  CalendarClock,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppointmentFollowUpProps {
  patientId?: string;
  patientName?: string;
  appointmentDate?: string;
  procedureType?: string;
  onFollowUpComplete?: (result: any) => void;
}

const AppointmentFollowUp = ({
  patientId = "P-1001",
  patientName = "Sarah Johnson",
  appointmentDate = "2023-05-15",
  procedureType = "Knee Arthroscopy",
  onFollowUpComplete = () => {},
}: AppointmentFollowUpProps) => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["central"]);
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([
    "How is your pain level on a scale of 1-10?",
    "Have you been able to follow the prescribed medication regimen?",
    "Are you experiencing any unusual symptoms or complications?",
    "Have you been able to perform the recommended exercises?",
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "scheduled" | "in-progress" | "completed" | "failed" | null
  >(null);
  const [callSummary, setCallSummary] = useState("");
  const { toast } = useToast();

  const handleAgentSelection = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter((id) => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      setFollowUpQuestions([...followUpQuestions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setFollowUpQuestions(followUpQuestions.filter((_, i) => i !== index));
  };

  const handleScheduleFollowUp = async () => {
    if (!followUpDate || !followUpTime) {
      toast({
        title: "Missing information",
        description: "Please select a date and time for the follow-up call",
        variant: "destructive",
      });
      return;
    }

    if (selectedAgents.length === 0) {
      toast({
        title: "No agents selected",
        description:
          "Please select at least one AI agent to conduct the follow-up call",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);

    try {
      // Simulate API call to schedule follow-up
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setIsScheduled(true);
      setCallStatus("scheduled");
      setActiveTab("status");

      toast({
        title: "Follow-up scheduled",
        description: `AI follow-up call scheduled for ${followUpDate} at ${followUpTime}`,
      });

      // Simulate call happening after some time (for demo purposes)
      setTimeout(() => {
        setCallStatus("in-progress");

        // After some time, complete the call
        setTimeout(() => {
          setCallStatus("completed");
          setCallSummary(
            `Patient ${patientName} reported moderate pain (4/10) following ${procedureType}. ` +
              `They have been following the medication regimen as prescribed and performing the recommended exercises daily. ` +
              `No unusual symptoms reported. Patient has questions about when they can resume normal activities. ` +
              `Recommendation: Schedule in-person follow-up appointment within the next 2 weeks.`,
          );

          onFollowUpComplete({
            patientId,
            patientName,
            callDate: followUpDate,
            callTime: followUpTime,
            status: "completed",
            summary: callSummary,
            agentsUsed: selectedAgents,
          });
        }, 5000);
      }, 3000);
    } catch (error) {
      console.error("Error scheduling follow-up:", error);
      toast({
        title: "Scheduling error",
        description:
          "There was an error scheduling the follow-up call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const getAgentIcon = (agentId: string) => {
    switch (agentId) {
      case "cardiology":
        return <HeartPulse className="h-5 w-5 text-red-600" />;
      case "neurology":
        return <Brain className="h-5 w-5 text-purple-600" />;
      case "radiology":
        return <Microscope className="h-5 w-5 text-blue-600" />;
      case "general":
        return <Stethoscope className="h-5 w-5 text-green-600" />;
      default: // central
        return <Brain className="h-5 w-5 text-indigo-600" />;
    }
  };

  const getAgentName = (agentId: string) => {
    switch (agentId) {
      case "cardiology":
        return "Cardiology AI";
      case "neurology":
        return "Neurology AI";
      case "radiology":
        return "Radiology AI";
      case "general":
        return "General Medicine AI";
      default:
        return "Central AI Orchestrator";
    }
  };

  const getCallStatusBadge = () => {
    switch (callStatus) {
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Scheduled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              AI Follow-Up Call
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Patient: {patientName} ({patientId}) • Procedure: {procedureType}
            </p>
          </div>
          {callStatus && getCallStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-100">
            <TabsList className="h-12 w-full rounded-none bg-transparent border-b px-4">
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                disabled={isScheduled}
              >
                Schedule Call
              </TabsTrigger>
              <TabsTrigger
                value="agents"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                disabled={isScheduled}
              >
                Select Agents
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                disabled={isScheduled}
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="status"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Call Status
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="schedule" className="p-6 space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Schedule AI Follow-Up Call
                  </h4>
                  <p className="text-sm text-gray-600">
                    Schedule an AI-powered follow-up call to check on the
                    patient's recovery progress after {procedureType}. The AI
                    will ask a series of questions and provide a summary report.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="follow-up-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Follow-Up Date
                  </label>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <Input
                      id="follow-up-date"
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="follow-up-time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Follow-Up Time
                  </label>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <Input
                      id="follow-up-time"
                      type="time"
                      value={followUpTime}
                      onChange={(e) => setFollowUpTime(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="follow-up-type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Follow-Up Type
                  </label>
                  <Select defaultValue="post-procedure">
                    <SelectTrigger>
                      <SelectValue placeholder="Select follow-up type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post-procedure">
                        Post-Procedure Check
                      </SelectItem>
                      <SelectItem value="medication">
                        Medication Adherence
                      </SelectItem>
                      <SelectItem value="therapy">Therapy Progress</SelectItem>
                      <SelectItem value="general">General Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="follow-up-notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notes for AI (Optional)
                  </label>
                  <Textarea
                    id="follow-up-notes"
                    placeholder="Add any specific instructions or notes for the AI to consider during the call..."
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="p-6 space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Select AI Agents for Follow-Up Call
                  </h4>
                  <p className="text-sm text-gray-600">
                    Choose which AI agents should participate in the follow-up
                    call. Different specialists can provide insights relevant to
                    their expertise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: "central",
                  name: "Central AI Orchestrator",
                  description:
                    "Coordinates the call and synthesizes information",
                },
                {
                  id: "cardiology",
                  name: "Cardiology AI",
                  description: "Specialized in heart-related follow-ups",
                },
                {
                  id: "neurology",
                  name: "Neurology AI",
                  description: "Specialized in neurological assessments",
                },
                {
                  id: "radiology",
                  name: "Radiology AI",
                  description: "Specialized in imaging follow-ups",
                },
                {
                  id: "general",
                  name: "General Medicine AI",
                  description: "Broad medical knowledge for general follow-ups",
                },
              ].map((agent) => (
                <div
                  key={agent.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedAgents.includes(agent.id) ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                  onClick={() => handleAgentSelection(agent.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      {getAgentIcon(agent.id)}
                    </div>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{agent.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="p-6 space-y-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CalendarClock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Customize Follow-Up Questions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Customize the questions that the AI will ask during the
                    follow-up call. These questions will help assess the
                    patient's recovery progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new follow-up question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddQuestion}>Add</Button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Current Questions:
                </h4>
                <div className="space-y-2">
                  {followUpQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="text-sm">{question}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status" className="p-6 space-y-6">
            {!isScheduled ? (
              <div className="text-center py-8">
                <CalendarClock className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Follow-Up Call Scheduled
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Schedule a follow-up call by completing the information in the
                  Schedule tab.
                </p>
                <Button
                  onClick={() => setActiveTab("schedule")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Schedule Now
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Follow-Up Call Details
                        </h4>
                        <p className="text-sm text-gray-500">
                          Scheduled for {followUpDate} at {followUpTime}
                        </p>
                      </div>
                    </div>
                    {getCallStatusBadge()}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Patient Information
                      </h5>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">{patientName}</p>
                            <p className="text-xs text-gray-500">
                              ID: {patientId}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Procedure Information
                      </h5>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <Stethoscope className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">
                              {procedureType}
                            </p>
                            <p className="text-xs text-gray-500">
                              Original Date: {appointmentDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      AI Agents Assigned
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgents.map((agentId) => (
                        <Badge
                          key={agentId}
                          variant="outline"
                          className="bg-indigo-50 border-indigo-200 text-indigo-700 flex items-center gap-1 py-1.5"
                        >
                          {getAgentIcon(agentId)}
                          <span>{getAgentName(agentId)}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {callStatus === "in-progress" && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">
                          Call in Progress
                        </span>
                        <span className="text-gray-500">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <RotateCw className="h-4 w-4 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                        <div>
                          AI agents are conducting the follow-up call with the
                          patient...
                        </div>
                      </div>
                    </div>
                  )}

                  {callStatus === "completed" && callSummary && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Call Summary
                      </h5>
                      <div className="p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">{callSummary}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {callStatus === "failed" && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-medium text-red-700 mb-1">
                            Call Failed
                          </h5>
                          <p className="text-sm text-red-600">
                            The follow-up call could not be completed. The
                            patient may not have been available or there was a
                            technical issue.
                          </p>
                          <Button
                            variant="outline"
                            className="mt-3 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Reschedule Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {!isScheduled && (
          <div className="p-4 border-t border-gray-100 flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setActiveTab(
                  activeTab === "schedule"
                    ? "schedule"
                    : activeTab === "agents"
                      ? "schedule"
                      : activeTab === "questions"
                        ? "agents"
                        : "schedule",
                )
              }
            >
              Back
            </Button>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFollowUpDate("");
                  setFollowUpTime("");
                  setFollowUpNotes("");
                  setSelectedAgents(["central"]);
                  setFollowUpQuestions([
                    "How is your pain level on a scale of 1-10?",
                    "Have you been able to follow the prescribed medication regimen?",
                    "Are you experiencing any unusual symptoms or complications?",
                    "Have you been able to perform the recommended exercises?",
                  ]);
                }}
              >
                Reset
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleScheduleFollowUp}
                disabled={isScheduling}
              >
                {isScheduling ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin mr-2" />
                    Scheduling...
                  </>
                ) : (
                  "Schedule Follow-Up Call"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentFollowUp;
