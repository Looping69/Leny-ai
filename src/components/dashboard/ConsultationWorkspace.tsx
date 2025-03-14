import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../../supabase/auth";
import {
  Brain,
  Send,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Stethoscope,
  RotateCw,
  X,
  Plus,
  ChevronRight,
} from "lucide-react";
import AgentCollaborationView from "./AgentCollaborationView";
import ConsultationFileUploader from "./ConsultationFileUploader";
import ConsultationFileList from "./ConsultationFileList";
import {
  createConsultation,
  uploadConsultationFile,
  addAgentContribution,
  updateConsultation,
} from "@/lib/db";

interface ConsultationWorkspaceProps {
  patientName?: string;
  patientId?: string;
  selectedAgents?: string[];
  onAgentSelectionChange?: () => void;
}

const ConsultationWorkspace = ({
  patientName = "Sarah Johnson",
  patientId = "P-1001",
  selectedAgents = ["central", "cardiology", "neurology", "general"],
  onAgentSelectionChange = () => {},
}: ConsultationWorkspaceProps) => {
  const [activeTab, setActiveTab] = useState("query");
  const [queryText, setQueryText] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [uploadedImages, setUploadedImages] = useState<
    { name: string; preview: string }[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; size: string }[]
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleAddSymptom = () => {
    if (newSymptom.trim() !== "") {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom("");
    }
  };

  const handleRemoveSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = files.map((file) => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index: number) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(uploadedImages[index].preview);
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const [consultationId, setConsultationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleStartAnalysis = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start an AI consultation",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Import the Gemini API dynamically
      const { generateCollaborativeAnalysis } = await import("@/lib/gemini");

      // Start progress animation
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          // Cap progress at 90% until we get the actual response
          return prev >= 90 ? 90 : prev + 5;
        });
      }, 300);

      // Prepare the query based on available data
      let analysisQuery = queryText;
      if (analysisQuery.trim() === "" && symptoms.length > 0) {
        analysisQuery = `Patient with the following symptoms: ${symptoms.join(", ")}`;
      }
      if (analysisQuery.trim() === "" && symptoms.length === 0) {
        analysisQuery = `Analyze patient ${patientName} (ID: ${patientId})`;
      }

      // Get specialties from selected agents
      const specialties = selectedAgents.map((agentId) => {
        switch (agentId) {
          case "central":
            return "Central AI Orchestrator";
          case "cardiology":
            return "Cardiology";
          case "neurology":
            return "Neurology";
          case "radiology":
            return "Radiology";
          case "general":
            return "General Medicine";
          default:
            return agentId;
        }
      });

      // Create a consultation record in the database
      try {
        const consultation = await createConsultation({
          patientId,
          patientName,
          query: analysisQuery,
          status: "in-progress",
          symptoms,
        });

        setConsultationId(consultation.id);

        // Upload any files that were added
        if (uploadedFiles.length > 0) {
          for (const file of uploadedFiles) {
            // This is a simplified version since we don't have the actual File objects
            // In a real implementation, you would upload the actual files
            console.log(`Would upload file: ${file.name}`);
          }
        }

        // Upload any images that were added
        if (uploadedImages.length > 0) {
          for (const image of uploadedImages) {
            // This is a simplified version since we don't have the actual File objects
            console.log(`Would upload image: ${image.name}`);
          }
        }

        // Generate collaborative analysis using Gemini
        const analysis = await generateCollaborativeAnalysis(
          analysisQuery,
          specialties,
        );

        // Save the agent contributions to the database
        if (analysis.agentResponses) {
          for (const agentResponse of analysis.agentResponses) {
            // Map the specialty back to an agent ID
            let agentId = "";
            switch (agentResponse.specialty) {
              case "Central AI Orchestrator":
                agentId = "central";
                break;
              case "Cardiology":
                agentId = "cardiology";
                break;
              case "Neurology":
                agentId = "neurology";
                break;
              case "Radiology":
                agentId = "radiology";
                break;
              case "General Medicine":
                agentId = "general";
                break;
              default:
                agentId = agentResponse.specialty
                  .toLowerCase()
                  .replace(/ /g, "_");
            }

            await addAgentContribution({
              consultationId: consultation.id,
              agentId,
              opinion: agentResponse.opinion,
              reasoning: agentResponse.reasoning,
              confidence: agentResponse.confidence,
              sources: [{ title: "AI Generated Analysis" }],
            });
          }
        }

        // Update the consultation with the final recommendation
        await updateConsultation(consultation.id, {
          status: "completed",
          consensusLevel: analysis.consensusLevel,
          finalRecommendation: analysis.finalRecommendation,
        });
      } catch (dbError) {
        console.error("Error saving consultation to database:", dbError);
        toast({
          title: "Database error",
          description:
            "There was an error saving your consultation. The analysis will continue but may not be saved.",
          variant: "destructive",
        });
      }

      // Complete the progress and finish analysis
      clearInterval(interval);
      setAnalysisProgress(100);

      // Short delay before showing completion
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 500);
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: "Analysis error",
        description:
          "There was an error during the AI analysis. Please try again.",
        variant: "destructive",
      });

      // Continue with the simulation in case of error
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && activeTab === "symptoms") {
      e.preventDefault();
      handleAddSymptom();
    }
  };

  return (
    <div className="space-y-6">
      {!analysisComplete ? (
        <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  New Consultation
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Patient: {patientName} ({patientId}) • {selectedAgents.length}{" "}
                  AI agents selected
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={onAgentSelectionChange}
                >
                  <Brain className="h-4 w-4" />
                  Change Agents
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  onClick={handleStartAnalysis}
                  disabled={
                    isAnalyzing ||
                    (queryText.trim() === "" && symptoms.length === 0)
                  }
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="h-4 w-4" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b border-gray-100">
                <TabsList className="h-12 w-full rounded-none bg-transparent border-b px-4">
                  <TabsTrigger
                    value="query"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                  >
                    Free Text Query
                  </TabsTrigger>
                  <TabsTrigger
                    value="symptoms"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                  >
                    Symptoms & Signs
                  </TabsTrigger>
                  <TabsTrigger
                    value="images"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                  >
                    Medical Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="files"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                  >
                    Medical Records
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="query" className="p-6">
                <div className="space-y-4">
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
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          AI Consultation Tips
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                          <li>
                            Be specific about symptoms, their duration, and
                            severity
                          </li>
                          <li>
                            Include relevant patient history and current
                            medications
                          </li>
                          <li>
                            Mention any recent changes in the patient's
                            condition
                          </li>
                          <li>
                            Ask about specific diagnoses if you have them in
                            mind
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="symptoms" className="p-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="symptoms"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Add patient symptoms and clinical signs
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="symptoms"
                        placeholder="e.g., Persistent headache for 2 weeks"
                        className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-300"
                        value={newSymptom}
                        onChange={(e) => setNewSymptom(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        onClick={handleAddSymptom}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div>
                    {symptoms.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Added Symptoms & Signs:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {symptoms.map((symptom, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 gap-1 h-auto"
                            >
                              {symptom}
                              <button
                                onClick={() => handleRemoveSymptom(index)}
                                className="ml-1 text-blue-400 hover:text-blue-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Stethoscope className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p>
                          No symptoms added yet. Add symptoms to help the AI
                          provide better insights.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images" className="p-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="images"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Upload medical images for AI analysis
                    </label>
                    {consultationId ? (
                      <ConsultationFileUploader
                        consultationId={consultationId}
                        acceptedFileTypes="image/*"
                        isImageUploader={true}
                        onFileUploaded={(file) => {
                          // Add the uploaded file to the list
                          setUploadedImages([
                            ...uploadedImages,
                            {
                              name: file.file_name,
                              preview: file.file_path,
                            },
                          ]);
                        }}
                      />
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="gap-2 border-dashed border-2 h-auto py-2 flex-1"
                          onClick={() => imageInputRef.current?.click()}
                        >
                          <ImageIcon className="h-4 w-4 text-gray-500" />
                          <span>Click to upload images</span>
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    {consultationId ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Uploaded Images:
                        </h4>
                        <ConsultationFileList
                          consultationId={consultationId}
                          onlyImages={true}
                        />
                      </div>
                    ) : uploadedImages.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Uploaded Images:
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                                <img
                                  src={image.preview}
                                  alt={image.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <p className="text-xs text-gray-500 truncate mt-1">
                                {image.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p>
                          No images uploaded yet. Upload medical images for AI
                          analysis.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="files" className="p-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="files"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Upload medical records and documents
                    </label>
                    {consultationId ? (
                      <ConsultationFileUploader
                        consultationId={consultationId}
                        acceptedFileTypes=".pdf,.doc,.docx,.txt"
                        onFileUploaded={(file) => {
                          // Add the uploaded file to the list
                          setUploadedFiles([
                            ...uploadedFiles,
                            {
                              name: file.file_name,
                              size: `${(file.file_size / 1024).toFixed(1)} KB`,
                            },
                          ]);
                        }}
                      />
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="gap-2 border-dashed border-2 h-auto py-2 flex-1"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>Click to upload files</span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, DOC, DOCX, TXT
                    </p>
                  </div>

                  <div>
                    {consultationId ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Uploaded Files:
                        </h4>
                        <ConsultationFileList consultationId={consultationId} />
                      </div>
                    ) : uploadedFiles.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Uploaded Files:
                        </h4>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {file.size}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveFile(index)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p>
                          No files uploaded yet. Upload medical records for
                          comprehensive analysis.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {isAnalyzing && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">
                      AI Analysis in Progress
                    </span>
                    <span className="text-gray-500">{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <RotateCw className="h-4 w-4 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                    <div>
                      {analysisProgress < 30 &&
                        "Analyzing patient data and symptoms..."}
                      {analysisProgress >= 30 &&
                        analysisProgress < 60 &&
                        "Consulting specialist AI agents..."}
                      {analysisProgress >= 60 &&
                        analysisProgress < 90 &&
                        "Generating consensus and recommendations..."}
                      {analysisProgress >= 90 &&
                        "Finalizing analysis results..."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <AgentCollaborationView
          patientName={patientName}
          patientId={patientId}
          query={
            queryText ||
            `Analysis of ${symptoms.length} symptoms and ${uploadedImages.length + uploadedFiles.length} uploaded files`
          }
        />
      )}
    </div>
  );
};

export default ConsultationWorkspace;
