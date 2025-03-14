import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Search,
  Clock,
  Calendar,
  Brain,
  FileText,
  Filter,
  Download,
} from "lucide-react";
import { getUserConsultations } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface ConsultationHistoryProps {
  onSelectConsultation?: (consultationId: string) => void;
}

const ConsultationHistory = ({
  onSelectConsultation,
}: ConsultationHistoryProps) => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    filterConsultations();
  }, [searchQuery, statusFilter, consultations]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const data = await getUserConsultations();
      setConsultations(data || []);
      setFilteredConsultations(data || []);
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast({
        title: "Error fetching consultations",
        description: "There was a problem loading your consultation history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterConsultations = () => {
    let filtered = consultations;

    if (statusFilter) {
      filtered = filtered.filter(
        (consultation) => consultation.status === statusFilter,
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (consultation) =>
          (consultation.patient_name?.toLowerCase().includes(query) ?? false) ||
          (consultation.patient_id?.toLowerCase().includes(query) ?? false) ||
          (consultation.query?.toLowerCase().includes(query) ?? false),
      );
    }

    setFilteredConsultations(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 border-gray-200"
          >
            {status}
          </Badge>
        );
    }
  };

  const handleConsultationSelect = (consultationId: string) => {
    if (onSelectConsultation) {
      onSelectConsultation(consultationId);
    } else {
      navigate(`/dashboard/consultation/${consultationId}`);
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Consultation History
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search consultations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-lg border-gray-200 w-full"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-lg border-gray-200"
              onClick={() => setStatusFilter(statusFilter ? null : "completed")}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-lg border-gray-200 gap-2"
              onClick={() => fetchConsultations()}
            >
              <Clock className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner text="Loading consultations..." />
          </div>
        ) : filteredConsultations.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No consultations found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchQuery || statusFilter
                ? "Try adjusting your search or filter criteria"
                : "Start a new AI consultation to get insights and recommendations for your patients."}
            </p>
            {!searchQuery && !statusFilter && (
              <Button
                onClick={() => navigate("/dashboard/consultation")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start New Consultation
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Patient
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Query
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Consensus
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredConsultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleConsultationSelect(consultation.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(
                            consultation.created_at,
                          ).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(
                            new Date(consultation.created_at),
                            { addSuffix: true },
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {consultation.patient_name || "Unknown Patient"}
                      </span>
                      {consultation.patient_id && (
                        <div className="text-xs text-gray-500">
                          ID: {consultation.patient_id}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs truncate text-sm text-gray-700">
                        {consultation.query || "No query specified"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(consultation.status)}
                    </td>
                    <td className="py-3 px-4">
                      {consultation.consensus_level ? (
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${consultation.consensus_level >= 80 ? "bg-green-500" : consultation.consensus_level >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{
                                width: `${consultation.consensus_level}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {consultation.consensus_level}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConsultationSelect(consultation.id);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsultationHistory;
