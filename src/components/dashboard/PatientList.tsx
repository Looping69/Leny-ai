import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition?: string;
  status: "active" | "scheduled" | "completed";
  lastVisit: string;
  avatar?: string;
}

interface PatientListProps {
  patients?: Patient[];
  onPatientSelect?: (patient: Patient) => void;
  isLoading?: boolean;
}

const defaultPatients: Patient[] = [
  {
    id: "P-1001",
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    condition: "Hypertension",
    status: "active",
    lastVisit: "2024-07-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "P-1002",
    name: "Michael Chen",
    age: 65,
    gender: "Male",
    condition: "Diabetes Type 2",
    status: "scheduled",
    lastVisit: "2024-07-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "P-1003",
    name: "Emily Rodriguez",
    age: 29,
    gender: "Female",
    condition: "Pregnancy",
    status: "active",
    lastVisit: "2024-07-18",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "P-1004",
    name: "Robert Williams",
    age: 58,
    gender: "Male",
    condition: "Coronary Artery Disease",
    status: "completed",
    lastVisit: "2024-07-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    id: "P-1005",
    name: "Sophia Kim",
    age: 34,
    gender: "Female",
    condition: "Asthma",
    status: "active",
    lastVisit: "2024-07-12",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: "P-1006",
    name: "James Wilson",
    age: 72,
    gender: "Male",
    condition: "Parkinson's Disease",
    status: "scheduled",
    lastVisit: "2024-06-30",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
];

const PatientList = ({
  patients = defaultPatients,
  onPatientSelect = () => {},
  isLoading = false,
}: PatientListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.id.toLowerCase().includes(query) ||
          patient.condition?.toLowerCase().includes(query),
      );
      setFilteredPatients(filtered);
    }
  };

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Patients
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9 h-10 rounded-lg border-gray-200 w-full"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-lg border-gray-200"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white gap-1">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Add Patient</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  Patient
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  ID
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  Age/Gender
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  Condition
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  Last Visit
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onPatientSelect(patient)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {patient.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {patient.condition || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(patient.status)} capitalize`}
                    >
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientList;
