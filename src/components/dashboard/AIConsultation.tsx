import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../../supabase/auth";
import {
  Brain,
  Send,
  Paperclip,
  HeartPulse,
  Microscope,
  Stethoscope,
  RotateCw,
} from "lucide-react";
import { createConsultation, addConsultationMessage } from "@/lib/db";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  aiType?: "central" | "cardiology" | "neurology" | "radiology" | "general";
}

interface AIConsultationProps {
  patientName?: string;
  patientId?: string;
  initialMessages?: Message[];
}

const AIConsultation = ({
  patientName = "Sarah Johnson",
  patientId = "P-1001",
  initialMessages = [],
}: AIConsultationProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("central");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [consultationId, setConsultationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use the AI consultation",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Import the Gemini API dynamically to avoid issues with SSR
      const { generateMedicalResponse } = await import("@/lib/gemini");
      const aiType = activeTab as Message["aiType"];

      // Map AI type to specialty for the Gemini API
      let specialty = "";
      switch (aiType) {
        case "central":
          specialty = "general medicine with a focus on coordinating care";
          break;
        case "cardiology":
          specialty = "cardiology";
          break;
        case "neurology":
          specialty = "neurology";
          break;
        case "radiology":
          specialty = "radiology and medical imaging";
          break;
        case "general":
          specialty = "general medicine and primary care";
          break;
        default:
          specialty = "medical AI assistant";
      }

      // Create a consultation if this is the first message
      if (!consultationId) {
        try {
          const consultation = await createConsultation({
            patientId,
            patientName,
            query: inputValue,
            status: "in-progress",
          });

          setConsultationId(consultation.id);

          // Save the user message to the database
          await addConsultationMessage({
            consultationId: consultation.id,
            sender: "user",
            content: inputValue,
          });
        } catch (dbError) {
          console.error("Error creating consultation:", dbError);
          toast({
            title: "Database error",
            description:
              "There was an error saving your consultation. The conversation will continue but may not be saved.",
            variant: "destructive",
          });
        }
      } else {
        // Save the user message to the database
        try {
          await addConsultationMessage({
            consultationId,
            sender: "user",
            content: inputValue,
          });
        } catch (dbError) {
          console.error("Error saving message:", dbError);
        }
      }

      // Generate response using Gemini API
      const prompt = `You are a medical AI assistant specializing in ${specialty}. 
      You are analyzing a patient named ${patientName} (ID: ${patientId}). 
      The user has asked: "${inputValue}"
      
      Provide a detailed, professional medical response from the perspective of a ${specialty} specialist. 
      Include relevant medical insights, potential diagnoses, and recommendations for further evaluation or treatment if appropriate.
      Keep your response concise and focused on the medical aspects of the query.`;

      const responseContent = await generateMedicalResponse(prompt, specialty);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "ai",
        timestamp: new Date(),
        aiType,
      };

      // Save the AI response to the database
      if (consultationId) {
        try {
          await addConsultationMessage({
            consultationId,
            sender: "ai",
            content: responseContent,
            aiType,
          });
        } catch (dbError) {
          console.error("Error saving AI response:", dbError);
        }
      }

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast({
        title: "AI response error",
        description:
          "There was an error generating the AI response. Please try again.",
        variant: "destructive",
      });

      // Fallback response in case of error
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
        aiType: activeTab as Message["aiType"],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIAvatar = (aiType?: Message["aiType"]) => {
    switch (aiType) {
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

  const getAIName = (aiType?: Message["aiType"]) => {
    switch (aiType) {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden h-[calc(100vh-180px)]">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              AI Consultation
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Patient: {patientName} ({patientId})
            </p>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-auto"
          >
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="central"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <Brain className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Central AI</span>
              </TabsTrigger>
              <TabsTrigger
                value="cardiology"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
              >
                <HeartPulse className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Cardiology</span>
              </TabsTrigger>
              <TabsTrigger
                value="neurology"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm"
              >
                <Brain className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Neurology</span>
              </TabsTrigger>
              <TabsTrigger
                value="radiology"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <Microscope className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Radiology</span>
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">General</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[calc(100%-64px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start a new AI consultation
              </h3>
              <p className="text-gray-500 max-w-md">
                Select an AI specialist and start asking questions about the
                patient's condition, symptoms, or treatment options.
              </p>
            </div>
          ) : (
            messages.map((message) => (
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
                    getAIAvatar(message.aiType)
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {message.sender === "user"
                          ? "You"
                          : getAIName(message.aiType)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {message.aiType && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 bg-blue-50 text-blue-700 border-blue-200"
                        >
                          AI
                        </Badge>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                {getAIAvatar(activeTab as Message["aiType"])}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {getAIName(activeTab as Message["aiType"])}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 h-4 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      AI
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 text-gray-800 flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin text-blue-600" />
                    <span>Analyzing and generating response...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            <Textarea
              placeholder={`Ask the ${getAIName(activeTab as Message["aiType"])} about this patient...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] resize-none rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-300"
            />
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg border-gray-200"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-10 w-10 rounded-lg bg-blue-600 hover:bg-blue-700"
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConsultation;
