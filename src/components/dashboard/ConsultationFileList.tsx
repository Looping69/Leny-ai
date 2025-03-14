import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FileText, Image as ImageIcon, Download, Eye, X } from "lucide-react";
import { getConsultationFiles, getConsultationImages } from "@/lib/db";

interface ConsultationFileListProps {
  consultationId: string;
  onlyImages?: boolean;
  onFileSelect?: (file: any) => void;
}

const ConsultationFileList = ({
  consultationId,
  onlyImages = false,
  onFileSelect,
}: ConsultationFileListProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
  }, [consultationId, onlyImages]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      let data;
      if (onlyImages) {
        data = await getConsultationImages(consultationId);
      } else {
        data = await getConsultationFiles(consultationId);
      }
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error loading files",
        description: "There was a problem loading the consultation files.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = (file: any) => {
    if (onFileSelect) {
      onFileSelect(file);
    } else {
      window.open(file.file_path, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner size="sm" text="Loading files..." />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        {onlyImages ? (
          <>
            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No images uploaded yet.</p>
          </>
        ) : (
          <>
            <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>No files uploaded yet.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {onlyImages ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="relative group">
              <div
                className="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => handleFileClick(file)}
              >
                <img
                  src={file.file_path}
                  alt={file.file_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 truncate mt-1">
                {file.file_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {file.is_image ? (
                  <ImageIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.file_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {file.file_size
                      ? `${(file.file_size / 1024).toFixed(1)} KB`
                      : ""}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  onClick={() => handleFileClick(file)}
                >
                  {file.is_image ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultationFileList;
