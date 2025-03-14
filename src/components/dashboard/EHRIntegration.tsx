import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRightLeft,
  Server,
  Shield,
  Clock
} from "lucide-react";

interface EHRIntegrationProps {
  systemStatus?: {
    status: "connected" | "disconnected" | "syncing";
    lastSync?: string;
    syncProgress?: number;
  };
  connectedSystems?: Array<{
    id: string;
    name: string;
    type: string;
    status: "active" | "inactive" | "error";
    lastSync?: string;
  }>;
}

const defaultConnectedSystems = [
  {
    id: "sys-001",
    name: "Epic EHR",
    type: "Electronic Health Record",
    status: "active" as const,
    lastSync: "2024-07-20T14:30:00Z"
  },
  {
    id: "sys-002",
    name: "Cerner Millennium",
    type: "Clinical Data Repository",
    status: "active" as const,
    lastSync: "2024-07-19T10:15:00Z"
  },
  {
    id: "sys-003",
    name: "Allscripts Professional",
    type: "Practice Management",
    status: "inactive" as const,
    lastSync: "2024-07-15T08:45:00Z"
  },
  {
    id: "sys-004",
    name: "NextGen Healthcare",
    type: "Electronic Health Record",
    status: "error" as const,
    lastSync: "2024-07-18T16:20:00Z"
  }
];

const EHRIntegration = ({
  systemStatus = {
    status: "connected",
    lastSync: "2024-07-20T14:30:00Z",
    syncProgress: 100
  },
  connectedSystems = defaultConnectedSystems
}: EHRIntegrationProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>;
      case "disconnected":
      case "inactive":
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Disconnected</Badge>;
      case "syncing":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Syncing</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">EHR Integration</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Now
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          <CardHeader className="p-4 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                {systemStatus.status === "connected" ? (
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                ) : systemStatus.status === "syncing" ? (
                  <RefreshCw className="h-