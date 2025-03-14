import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Brain,
  Upload,
  FileText,
  RotateCw,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";

interface AgentTrainingInterfaceProps {
  agentId?: string;
  agentName?: string;
  specialty?: string;
  onTrainingComplete?: () => void;
}

const AgentTrainingInterface = ({
  agentId = "central",
  agentName = "Central AI Orchestrator",
  specialty = "Multi-specialty coordination",
  onTrainingComplete = () => {},
}: AgentTrainingInterfaceProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [trainingData, setTrainingData] = useState<File | null>(null);
  const [trainingText, setTrainingText] = useState("");
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingNotes, setTrainingNotes] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTrainingData(e.target.files[0]);
    }
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleStartTraining = async () => {
    if (!trainingData && !trainingText.trim()) {
      toast({
        title: "Training data required",
        description: "Please upload a file or enter training text",
        variant: "destructive",
      });
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    // Simulate training completion after some time
    setTimeout(() => {
      clearInterval(interval);
      setTrainingProgress(100);
      setIsTraining(false);
      setTrainingComplete(true);
      onTrainingComplete();
      toast({
        title: "Training complete",
        description: `${agentName} has been successfully trained with new data.`,
      });
    }, 10000);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Training {agentName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Provide specialized medical literature, case studies, or
                    clinical guidelines to enhance this AI agent's knowledge and
                    capabilities in {specialty}.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">
                Upload Training Data
              </h4>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.txt,.csv,.json"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  Select File
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, TXT, CSV, JSON
                </p>
              </div>
              {trainingData && (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium">
                    {trainingData.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({(trainingData.size / 1024).toFixed(1)} KB)
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 text-gray-500"
                    onClick={() => setTrainingData(null)}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">
                Or Enter Training Text
              </h4>
              <Textarea
                placeholder="Paste medical literature, case studies, or clinical guidelines here..."
                value={trainingText}
                onChange={(e) => setTrainingText(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Training Configuration
                  </h4>
                  <p className="text-sm text-gray-600">
                    Configure how the AI agent should learn from the provided
                    data. These settings affect how the knowledge is integrated
                    into the agent's decision-making process.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">
                Training Notes
              </h4>
              <Textarea
                placeholder="Add notes about this training data (e.g., source, relevance, special instructions)..."
                value={trainingNotes}
                onChange={(e) => setTrainingNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Knowledge Integration
                </h4>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  defaultValue="balanced"
                >
                  <option value="conservative">
                    Conservative (Prioritize existing knowledge)
                  </option>
                  <option value="balanced">Balanced (Equal weight)</option>
                  <option value="aggressive">
                    Aggressive (Prioritize new data)
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Specialty Focus
                </h4>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  defaultValue={specialty.toLowerCase().replace(/ /g, "_")}
                >
                  <option value="multi_specialty">
                    Multi-specialty coordination
                  </option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="radiology">Radiology</option>
                  <option value="general_medicine">General Medicine</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">
                Training Priority
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Low</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  defaultValue="3"
                  className="flex-1"
                />
                <span className="text-xs text-gray-500">High</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Review and Start Training
                  </h4>
                  <p className="text-sm text-gray-600">
                    Review your training configuration and start the training
                    process. This may take several minutes depending on the
                    amount of data.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">
                Training Summary
              </h4>
              <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Agent:</span>
                  <span className="text-sm font-medium">{agentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Specialty:</span>
                  <span className="text-sm font-medium">{specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Data Source:</span>
                  <span className="text-sm font-medium">
                    {trainingData
                      ? trainingData.name
                      : trainingText
                        ? "Manual text input"
                        : "None"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Data Size:</span>
                  <span className="text-sm font-medium">
                    {trainingData
                      ? `${(trainingData.size / 1024).toFixed(1)} KB`
                      : trainingText
                        ? `${trainingText.length} characters`
                        : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Integration Method:
                  </span>
                  <span className="text-sm font-medium">Balanced</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Priority:</span>
                  <span className="text-sm font-medium">Medium</span>
                </div>
              </div>
            </div>

            {isTraining ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">
                    Training in Progress
                  </span>
                  <span className="text-gray-500">{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} className="h-2" />
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <RotateCw className="h-4 w-4 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                  <div>
                    {trainingProgress < 30 && "Preprocessing training data..."}
                    {trainingProgress >= 30 &&
                      trainingProgress < 60 &&
                      "Analyzing medical knowledge..."}
                    {trainingProgress >= 60 &&
                      trainingProgress < 90 &&
                      "Integrating with existing knowledge base..."}
                    {trainingProgress >= 90 && "Finalizing agent training..."}
                  </div>
                </div>
              </div>
            ) : trainingComplete ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="text-base font-medium text-gray-900 mb-1">
                  Training Complete
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {agentName} has successfully integrated the new knowledge.
                </p>
                <Badge className="bg-green-100 text-green-800 border-green-200 mx-auto">
                  Knowledge Base Updated
                </Badge>
              </div>
            ) : null}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-semibold text-gray-900">
              AI Agent Training
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            {specialty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center">
            <div className="flex-1 flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                1
              </div>
              <div
                className={`h-1 flex-1 ${activeStep > 1 ? "bg-blue-600" : "bg-gray-200"}`}
              ></div>
            </div>
            <div className="flex-1 flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                2
              </div>
              <div
                className={`h-1 flex-1 ${activeStep > 2 ? "bg-blue-600" : "bg-gray-200"}`}
              ></div>
            </div>
            <div className="flex-1 flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span
              className={
                activeStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Upload Data
            </span>
            <span
              className={
                activeStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Configure
            </span>
            <span
              className={
                activeStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Train
            </span>
          </div>
        </div>

        <div className="p-6">{renderStepContent()}</div>

        <div className="p-4 border-t border-gray-100 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={activeStep === 1 || isTraining}
          >
            Previous
          </Button>
          <div className="space-x-2">
            {activeStep < 3 ? (
              <Button
                onClick={handleNextStep}
                disabled={
                  activeStep === 1 && !trainingData && !trainingText.trim()
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleStartTraining}
                disabled={isTraining || trainingComplete}
                className="bg-green-600 hover:bg-green-700 gap-2"
              >
                {isTraining ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Training...
                  </>
                ) : trainingComplete ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Start Training
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentTrainingInterface;
