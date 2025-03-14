import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import AgentCollaborationView from "../dashboard/AgentCollaborationView";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoadingScreen } from "@/components/ui/loading-spinner";
import {
  ChevronLeft,
  Download,
  Share,
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
  AlertTriangle,
} from "lucide-react";
import {
  getConsultation,
  getAgentContributions,
  getConsultationMessages,
} from "@/lib/db";

const ConsultationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<any | null>(null);
  const [agentContributions, setAgentContributions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchConsultationData(id);
    }
  }, [id]);

  const fetchConsultationData = async (consultationId: string) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch the consultation details
      const consultationData = await getConsultation(consultationId);
      setConsultation(consultationData);

      // Fetch agent contributions
      const contributionsData = await getAgentContributions(consultationId);
      setAgentContributions(contributionsData);

      // Fetch messages
      const messagesData = await getConsultationMessages(consultationId);
      setMessages(messagesData);
    } catch (err) {
      console.error("Error fetching consultation data:", err);
      setError(
        "There was an error loading the consultation data. Please try again later.",
      );
      toast({
        title: "Error loading consultation",
        description: "There was a problem retrieving the consultation data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/consultation");
  };

  // Format agent contributions for the AgentCollaborationView
  const formatAgentContributions = () => {
    return agentContributions.map((contribution) => {
      // Map agent data to the format expected by AgentCollaborationView
      let icon;
      switch (contribution.agent_id) {
        case "central":
          icon = <Brain className="h-5 w-5 text-indigo-600" />;
          break;
        case "cardiology":
          icon = <HeartPulse className="h-5 w-5 text-red-600" />;
          break;
        case "neurology":
          icon = <Brain className="h-5 w-5 text-purple-600" />;
          break;
        case "radiology":
          icon = <Microscope className="h-5 w-5 text-blue-600" />;
          break;
        case "general":
          icon = <Stethoscope className="h-5 w-5 text-green-600" />;
          break;
        default:
          icon = <Brain className="h-5 w-5 text-gray-600" />;
      }

      return {
        agentId: contribution.agent_id,
        agentName:
          contribution.agent?.name ||
          `${contribution.agent_id.charAt(0).toUpperCase()}${contribution.agent_id.slice(1)} AI`,
        specialty: contribution.agent?.specialty || "Medical AI",
        icon,
        confidence: contribution.confidence || 75,
        opinion: contribution.opinion || "No opinion provided",
        reasoning: contribution.reasoning || "No reasoning provided",
        sources: contribution.sources ? JSON.parse(contribution.sources) : [],
      };
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingScreen text="Loading consultation data..." />
      </DashboardLayout>
    );
  }

  if (error || !consultation) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-semibold text-gray-900">
              Consultation Not Found
            </h2>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error ||
                "This consultation could not be found or you don't have permission to view it."}
            </h3>
            <Button
              onClick={handleBack}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Return to Consultations
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-semibold text-gray-900">
              Consultation Details
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Display the consultation data using AgentCollaborationView */}
        <AgentCollaborationView
          patientName={consultation.patient_name || "Unknown Patient"}
          patientId={consultation.patient_id || "Unknown ID"}
          query={consultation.query || "No query specified"}
          collaborationStatus="completed"
          consensusLevel={consultation.consensus_level || 85}
          agentContributions={formatAgentContributions()}
          finalRecommendation={
            consultation.final_recommendation || "No recommendation available"
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default ConsultationDetailPage;
