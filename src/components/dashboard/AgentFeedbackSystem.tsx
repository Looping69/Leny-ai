import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Brain,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  RotateCw,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

interface AgentFeedbackSystemProps {
  consultationId: string;
  agentId?: string;
  agentName?: string;
  recommendation?: string;
  onFeedbackSubmitted?: (feedback: {
    rating: "positive" | "negative" | "neutral";
    comments: string;
    improvementAreas: string[];
  }) => void;
}

const AgentFeedbackSystem = ({
  consultationId,
  agentId = "central",
  agentName = "AI Assistant",
  recommendation = "",
  onFeedbackSubmitted = () => {},
}: AgentFeedbackSystemProps) => {
  const [rating, setRating] = useState<"positive" | "negative" | "neutral">(
    "neutral",
  );
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [improvementAreas, setImprovementAreas] = useState<string[]>([]);
  const { toast } = useToast();

  const handleRatingChange = (
    newRating: "positive" | "negative" | "neutral",
  ) => {
    setRating(newRating);
  };

  const handleImprovementAreaToggle = (area: string) => {
    if (improvementAreas.includes(area)) {
      setImprovementAreas(improvementAreas.filter((a) => a !== area));
    } else {
      setImprovementAreas([...improvementAreas, area]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // In a real implementation, this would send the feedback to your backend
      // await submitFeedback({
      //   consultationId,
      //   agentId,
      //   rating,
      //   comments,
      //   improvementAreas,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the callback with the feedback data
      onFeedbackSubmitted({
        rating,
        comments,
        improvementAreas,
      });

      setSubmitted(true);
      toast({
        title: "Feedback submitted",
        description: "Thank you for helping us improve our AI assistants.",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error submitting feedback",
        description:
          "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Feedback Submitted
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for your feedback! Your input helps us improve our AI
            assistants.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mx-auto"
          >
            Submit Another Feedback
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Assistant Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                Help Improve {agentName}
              </h4>
              <p className="text-sm text-gray-600">
                Your feedback helps our AI assistants learn and improve. Please
                rate the quality and helpfulness of the recommendation.
              </p>
            </div>
          </div>
        </div>

        {recommendation && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Recommendation
            </h4>
            <p className="text-sm text-gray-700">{recommendation}</p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">
            How would you rate this recommendation?
          </h4>
          <div className="flex gap-2">
            <Button
              variant={rating === "positive" ? "default" : "outline"}
              className={`flex-1 gap-2 ${rating === "positive" ? "bg-green-600 hover:bg-green-700" : ""}`}
              onClick={() => handleRatingChange("positive")}
            >
              <ThumbsUp className="h-4 w-4" />
              Helpful
            </Button>
            <Button
              variant={rating === "neutral" ? "default" : "outline"}
              className={`flex-1 gap-2 ${rating === "neutral" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
              onClick={() => handleRatingChange("neutral")}
            >
              <Info className="h-4 w-4" />
              Neutral
            </Button>
            <Button
              variant={rating === "negative" ? "default" : "outline"}
              className={`flex-1 gap-2 ${rating === "negative" ? "bg-red-600 hover:bg-red-700" : ""}`}
              onClick={() => handleRatingChange("negative")}
            >
              <ThumbsDown className="h-4 w-4" />
              Not Helpful
            </Button>
          </div>
        </div>

        {(rating === "negative" || rating === "neutral") && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">
              What areas need improvement?
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Accuracy",
                "Clarity",
                "Completeness",
                "Relevance",
                "Medical Terminology",
                "Evidence-Based",
                "Actionable Advice",
              ].map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className={`cursor-pointer ${improvementAreas.includes(area) ? "bg-blue-100 border-blue-300 text-blue-800" : ""}`}
                  onClick={() => handleImprovementAreaToggle(area)}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">
            Additional Comments
          </h4>
          <Textarea
            placeholder="Please provide any additional feedback or suggestions..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <RotateCw className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4" />
              Submit Feedback
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentFeedbackSystem;
