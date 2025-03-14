import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Search, Clock, Filter, Download } from "lucide-react";
import { supabase } from "../../../supabase/supabase";
import { useToast } from "@/components/ui/use-toast";

interface AuditLog {
  id: string;
  user_id: string;
  action_type: string;
  action_details: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
  user?: {
    full_name: string;
  };
}

export default function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionTypeFilter, setActionTypeFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [searchQuery, actionTypeFilter, logs]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("master_user_audit_logs")
        .select(`*, user:user_id(full_name)`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLogs(data || []);
      setFilteredLogs(data || []);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      toast({
        title: "Error fetching audit logs",
        description: "There was a problem loading the audit logs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    if (actionTypeFilter) {
      filtered = filtered.filter((log) => log.action_type === actionTypeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.action_type.toLowerCase().includes(query) ||
          log.user_id.toLowerCase().includes(query) ||
          (log.user?.full_name?.toLowerCase().includes(query) ?? false) ||
          JSON.stringify(log.action_details).toLowerCase().includes(query),
      );
    }

    setFilteredLogs(filtered);
  };

  const getActionTypeColor = (actionType: string) => {
    switch (actionType) {
      case "user_role_change":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "system_parameter_change":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "data_intervention":
        return "bg-red-50 text-red-700 border-red-200";
      case "login":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const downloadLogs = () => {
    const jsonString = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `master_user_audit_logs_${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uniqueActionTypes = Array.from(
    new Set(logs.map((log) => log.action_type)),
  );

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Master User Audit Logs
            </CardTitle>
            <CardDescription>
              Track and review all actions performed by master users
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-lg border-gray-200 w-full"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-lg border-gray-200"
              onClick={() => setActionTypeFilter(null)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-lg border-gray-200 gap-2"
              onClick={downloadLogs}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <Label className="flex items-center h-9 px-2">
            Filter by action:
          </Label>
          {uniqueActionTypes.map((actionType) => (
            <Badge
              key={actionType}
              variant="outline"
              className={`${getActionTypeColor(actionType)} cursor-pointer ${actionTypeFilter === actionType ? "ring-2 ring-offset-1 ring-blue-500" : ""}`}
              onClick={() =>
                setActionTypeFilter(
                  actionTypeFilter === actionType ? null : actionType,
                )
              }
            >
              {actionType.replace(/_/g, " ")}
            </Badge>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gray-500">Loading audit logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-900 mb-1">
              No audit logs found
            </p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getActionTypeColor(log.action_type)}
                    >
                      {log.action_type.replace(/_/g, " ")}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      by {log.user?.full_name || log.user_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(log.created_at)}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(log.action_details, null, 2)}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-x-4">
                  <span>IP: {log.ip_address || "N/A"}</span>
                  <span className="truncate max-w-xs">
                    User Agent: {log.user_agent || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
