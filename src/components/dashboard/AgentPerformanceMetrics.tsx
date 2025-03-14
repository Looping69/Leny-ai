import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  Download,
} from "lucide-react";

interface AgentMetric {
  name: string;
  value: number;
  change: number;
  target?: number;
}

interface AgentPerformanceData {
  accuracy: AgentMetric;
  relevance: AgentMetric;
  speed: AgentMetric;
  userSatisfaction: AgentMetric;
  consensusRate: AgentMetric;
  evidenceQuality: AgentMetric;
}

interface AgentPerformanceMetricsProps {
  agentId?: string;
  agentName?: string;
  timeRange?: "week" | "month" | "quarter" | "year";
  onTimeRangeChange?: (range: "week" | "month" | "quarter" | "year") => void;
}

const AgentPerformanceMetrics = ({
  agentId = "central",
  agentName = "Central AI Orchestrator",
  timeRange = "month",
  onTimeRangeChange = () => {},
}: AgentPerformanceMetricsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample performance data - in a real implementation, this would come from your analytics backend
  const performanceData: Record<string, AgentPerformanceData> = {
    central: {
      accuracy: {
        name: "Diagnostic Accuracy",
        value: 92,
        change: 3.5,
        target: 95,
      },
      relevance: {
        name: "Response Relevance",
        value: 88,
        change: 2.1,
        target: 90,
      },
      speed: { name: "Response Time (s)", value: 2.3, change: -0.4 },
      userSatisfaction: {
        name: "User Satisfaction",
        value: 87,
        change: 5.2,
        target: 90,
      },
      consensusRate: {
        name: "Consensus Rate",
        value: 84,
        change: 7.5,
        target: 85,
      },
      evidenceQuality: {
        name: "Evidence Quality",
        value: 90,
        change: 4.2,
        target: 92,
      },
    },
    cardiology: {
      accuracy: {
        name: "Diagnostic Accuracy",
        value: 94,
        change: 2.1,
        target: 95,
      },
      relevance: {
        name: "Response Relevance",
        value: 91,
        change: 3.5,
        target: 92,
      },
      speed: { name: "Response Time (s)", value: 2.1, change: -0.6 },
      userSatisfaction: {
        name: "User Satisfaction",
        value: 89,
        change: 4.3,
        target: 90,
      },
      consensusRate: {
        name: "Consensus Rate",
        value: 86,
        change: 5.2,
        target: 88,
      },
      evidenceQuality: {
        name: "Evidence Quality",
        value: 93,
        change: 2.8,
        target: 95,
      },
    },
    neurology: {
      accuracy: {
        name: "Diagnostic Accuracy",
        value: 91,
        change: 4.2,
        target: 93,
      },
      relevance: {
        name: "Response Relevance",
        value: 87,
        change: 3.8,
        target: 90,
      },
      speed: { name: "Response Time (s)", value: 2.5, change: -0.3 },
      userSatisfaction: {
        name: "User Satisfaction",
        value: 85,
        change: 6.1,
        target: 88,
      },
      consensusRate: {
        name: "Consensus Rate",
        value: 82,
        change: 8.4,
        target: 85,
      },
      evidenceQuality: {
        name: "Evidence Quality",
        value: 88,
        change: 5.3,
        target: 90,
      },
    },
    radiology: {
      accuracy: {
        name: "Diagnostic Accuracy",
        value: 93,
        change: 1.8,
        target: 94,
      },
      relevance: {
        name: "Response Relevance",
        value: 89,
        change: 2.7,
        target: 91,
      },
      speed: { name: "Response Time (s)", value: 3.2, change: -1.1 },
      userSatisfaction: {
        name: "User Satisfaction",
        value: 86,
        change: 3.9,
        target: 89,
      },
      consensusRate: {
        name: "Consensus Rate",
        value: 83,
        change: 6.2,
        target: 86,
      },
      evidenceQuality: {
        name: "Evidence Quality",
        value: 91,
        change: 3.5,
        target: 93,
      },
    },
    general: {
      accuracy: {
        name: "Diagnostic Accuracy",
        value: 90,
        change: 5.1,
        target: 92,
      },
      relevance: {
        name: "Response Relevance",
        value: 86,
        change: 4.3,
        target: 89,
      },
      speed: { name: "Response Time (s)", value: 1.9, change: -0.5 },
      userSatisfaction: {
        name: "User Satisfaction",
        value: 88,
        change: 7.2,
        target: 90,
      },
      consensusRate: {
        name: "Consensus Rate",
        value: 81,
        change: 9.3,
        target: 84,
      },
      evidenceQuality: {
        name: "Evidence Quality",
        value: 87,
        change: 6.1,
        target: 90,
      },
    },
  };

  // Get the performance data for the current agent
  const agentData = performanceData[agentId] || performanceData.central;

  // Helper function to get color based on value and target
  const getMetricColor = (metric: AgentMetric) => {
    if (!metric.target) return "text-blue-600";
    return metric.value >= metric.target ? "text-green-600" : "text-amber-600";
  };

  // Helper function to get progress color
  const getProgressColor = (metric: AgentMetric) => {
    if (!metric.target) return "bg-blue-500";
    return metric.value >= metric.target
      ? "bg-green-500"
      : metric.value >= metric.target * 0.9
        ? "bg-amber-500"
        : "bg-red-500";
  };

  // Helper function to format change value
  const formatChange = (change: number) => {
    const prefix = change > 0 ? "+" : "";
    return `${prefix}${change.toFixed(1)}%`;
  };

  const getAgentIcon = () => {
    switch (agentId) {
      case "cardiology":
        return <HeartPulse className="h-5 w-5 text-red-600" />;
      case "neurology":
        return <Brain className="h-5 w-5 text-purple-600" />;
      case "radiology":
        return <Microscope className="h-5 w-5 text-blue-600" />;
      case "general":
        return <Stethoscope className="h-5 w-5 text-green-600" />;
      default:
        return <Brain className="h-5 w-5 text-indigo-600" />;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {getAgentIcon()}
            <CardTitle className="text-xl font-semibold text-gray-900">
              {agentName} Performance
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {[
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "quarter", label: "Quarter" },
                { value: "year", label: "Year" },
              ].map((range) => (
                <Button
                  key={range.value}
                  variant="ghost"
                  size="sm"
                  className={`rounded-md px-3 py-1 text-xs ${timeRange === range.value ? "bg-white shadow-sm" : ""}`}
                  onClick={() => onTimeRangeChange(range.value as any)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-100">
            <TabsList className="h-12 w-full rounded-none bg-transparent border-b px-4">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="accuracy"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Accuracy
              </TabsTrigger>
              <TabsTrigger
                value="satisfaction"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                User Satisfaction
              </TabsTrigger>
              <TabsTrigger
                value="evidence"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Evidence Quality
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(agentData).map((metric) => (
                <div key={metric.name} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      {metric.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-lg font-bold ${getMetricColor(metric)}`}
                      >
                        {metric.name === "Response Time (s)"
                          ? `${metric.value}s`
                          : `${metric.value}%`}
                      </span>
                      <span
                        className={`text-xs ${metric.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {formatChange(metric.change)}
                      </span>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold inline-block text-gray-600">
                          {metric.target ? `Target: ${metric.target}%` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${metric.value}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(metric)}`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <BarChart className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-medium">Performance Insights</h3>
              </div>
              <p className="text-sm text-gray-700">
                {agentName} has shown significant improvement in user
                satisfaction (+{agentData.userSatisfaction.change.toFixed(1)}%)
                and evidence quality (+
                {agentData.evidenceQuality.change.toFixed(1)}%) over the past{" "}
                {timeRange}. Response time has decreased by{" "}
                {Math.abs(agentData.speed.change).toFixed(1)}s, indicating
                improved efficiency. Focus areas for improvement include{" "}
                {agentData.accuracy.value < (agentData.accuracy.target || 100)
                  ? "diagnostic accuracy"
                  : "consensus rate"}
                to reach target performance metrics.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="accuracy" className="p-4">
            <div className="flex items-center justify-center p-8 text-gray-500">
              <LineChart className="h-8 w-8 mr-3 text-gray-300" />
              <span>
                Detailed accuracy metrics and trends would be displayed here
              </span>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="p-4">
            <div className="flex items-center justify-center p-8 text-gray-500">
              <PieChart className="h-8 w-8 mr-3 text-gray-300" />
              <span>
                User satisfaction breakdown and feedback analysis would be
                displayed here
              </span>
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="p-4">
            <div className="flex items-center justify-center p-8 text-gray-500">
              <BarChart className="h-8 w-8 mr-3 text-gray-300" />
              <span>
                Evidence quality metrics and source reliability would be
                displayed here
              </span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceMetrics;
