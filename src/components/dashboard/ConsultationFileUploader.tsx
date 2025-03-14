import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { FileText, X, Upload, File, Image as ImageIcon } from "lucide-react";
import { uploadConsultationFile } from "@/lib/db";

interface ConsultationFileUploaderProps {
  consultationId: string;
  onFileUploaded?: (file: any) => void;
  acceptedFileTypes?: string;
  isImageUploader?: boolean;
}

const ConsultationFileUploader = ({
  consultationId,
  onFileUploaded,
  acceptedFileTypes = "*",
  isImageUploader = false,
}: ConsultationFileUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const uploadedFile = await uploadConsultationFile(
        consultationId,
        file,
        isImageUploader,
      );

      // Complete the progress
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });

      if (onFileUploaded) {
        onFileUploaded(uploadedFile);
      }

      // Reset after a short delay
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    } catch (error) {
      console.error("Error uploading file:", error);
      clearInterval(progressInterval);
      setUploading(false);
      setUploadProgress(0);

      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleFileChange}
      />
      {uploading ? (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-gray-500">Uploading...</span>
            <span className="text-gray-900">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full gap-2 border-dashed border-2 h-auto py-3"
          onClick={handleFileSelect}
        >
          {isImageUploader ? (
            <>
              <ImageIcon className="h-4 w-4 text-gray-500" />
              <span>Upload Image</span>
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Upload File</span>
            </>
          )}
        </Button>
      )}
      <p className="text-xs text-gray-500 mt-1">
        {isImageUploader
          ? "Supported formats: JPEG, PNG, DICOM"
          : "Supported formats: PDF, DOC, DOCX, TXT"}
      </p>
    </div>
  );
};

export default ConsultationFileUploader;
