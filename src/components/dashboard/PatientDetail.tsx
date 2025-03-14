import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  HeartPulse,
  Activity,
  Pill,
  CalendarClock,
  MessageSquareText,
  ChevronLeft,
  Brain,
} from "lucide-react";
import AIConsultation from "./AIConsultation";

interface PatientDetailProps {
  patient?: {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition?: string;
    status: "active" | "scheduled" | "completed";
    lastVisit: string;
    avatar?: string;
    medicalHistory?: string[];
    medications?: string[];
    allergies?: string[];
    vitalSigns?: {
      bloodPressure: string;
      heartRate: number;
      temperature: number;
      respiratoryRate: number;
      oxygenSaturation: number;
    };
  };
  onBack?: () => void;
}

const defaultPatient = {
  id: "P-1001",
  name: "Sarah Johnson",
  age: 42,
  gender: "Female",
  condition: "Hypertension",
  status: "active",
  lastVisit: "2024-07-15",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  medicalHistory: [
    "Hypertension diagnosed in 2020",
    "Appendectomy in 2015",
    "Gestational diabetes during pregnancy in 2010",
    "Family history of cardiovascular disease",
  ],
  medications: [
    "Lisinopril 10mg daily",
    "Hydrochlorothiazide 12.5mg daily",
    "Atorvastatin 20mg daily",
  ],
  allergies: ["Penicillin", "Sulfa drugs"],
  vitalSigns: {
    bloodPressure: "138/85",
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
  },
};

const PatientDetail = ({
  patient = defaultPatient,
  onBack = () => {},
}: PatientDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold text-gray-900">
          Patient Details
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Info Card */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
            <CardHeader className="p-6 pb-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-blue-100 mb-4">
                  <AvatarImage src={patient.avatar} alt={patient.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 text-2xl">
                    {patient.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-semibold text-gray-900 mb-1">
                  {patient.name}
                </CardTitle>
                <div className="text-sm text-gray-500 mb-2">
                  {patient.id} • {patient.age} years • {patient.gender}
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(patient.status)} capitalize`}
                >
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Primary Condition
                  </h3>
                  <p className="text-gray-900">
                    {patient.condition || "None specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Last Visit
                  </h3>
                  <p className="text-gray-900">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Allergies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies?.map((allergy, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        {allergy}
                      </Badge>
                    ))}
                    {!patient.allergies?.length && (
                      <p className="text-gray-900">No known allergies</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full rounded-lg gap-2">
                  <FileText className="h-4 w-4" />
                  Records
                </Button>
                <Button className="w-full rounded-lg gap-2 bg-blue-600 hover:bg-blue-700">
                  <MessageSquareText className="h-4 w-4" />
                  Consult
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vital Signs Card */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Vital Signs
                </CardTitle>
                <span className="text-xs text-gray-500">
                  Last updated:{" "}
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">
                    Blood Pressure
                  </div>
                  <div className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                    {patient.vitalSigns?.bloodPressure}
                    <span className="text-xs font-normal text-gray-500">
                      mmHg
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Heart Rate</div>
                  <div className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                    {patient.vitalSigns?.heartRate}
                    <span className="text-xs font-normal text-gray-500">
                      bpm
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Temperature</div>
                  <div className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                    {patient.vitalSigns?.temperature}
                    <span className="text-xs font-normal text-gray-500">
                      °F
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Oxygen</div>
                  <div className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                    {patient.vitalSigns?.oxygenSaturation}
                    <span className="text-xs font-normal text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full bg-gray-100 p-1 rounded-lg mb-4">
              <TabsTrigger
                value="overview"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <HeartPulse className="h-4 w-4 mr-2" />
                Medical History
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Pill className="h-4 w-4 mr-2" />
                Medications
              </TabsTrigger>
              <TabsTrigger
                value="consultation"
                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Consultation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <CardHeader className="p-4 border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Patient Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Current Condition
                      </h3>
                      <p className="text-gray-700">
                        Sarah Johnson is a 42-year-old female with hypertension
                        diagnosed in 2020. She has been managing her condition
                        with medication and lifestyle modifications. Her blood
                        pressure has been generally well-controlled with
                        occasional elevations during periods of stress.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Recent Appointments
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CalendarClock className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">
                                Annual Physical Examination
                              </div>
                              <div className="text-sm text-gray-500">
                                Dr. Robert Williams
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              July 15, 2024
                            </div>
                            <div className="text-xs text-gray-500">
                              10:30 AM
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CalendarClock className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="font-medium">
                                Cardiology Consultation
                              </div>
                              <div className="text-sm text-gray-500">
                                Dr. Emily Chen
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              June 28, 2024
                            </div>
                            <div className="text-xs text-gray-500">2:15 PM</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Recent Lab Results
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 font-medium text-gray-500">
                                Test
                              </th>
                              <th className="text-left py-2 px-3 font-medium text-gray-500">
                                Result
                              </th>
                              <th className="text-left py-2 px-3 font-medium text-gray-500">
                                Reference Range
                              </th>
                              <th className="text-left py-2 px-3 font-medium text-gray-500">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="py-2 px-3">Cholesterol (Total)</td>
                              <td className="py-2 px-3 font-medium">
                                195 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                &lt;200 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                July 10, 2024
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-2 px-3">HDL Cholesterol</td>
                              <td className="py-2 px-3 font-medium">
                                58 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                &gt;40 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                July 10, 2024
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-2 px-3">LDL Cholesterol</td>
                              <td className="py-2 px-3 font-medium">
                                120 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                &lt;100 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                July 10, 2024
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-2 px-3">Triglycerides</td>
                              <td className="py-2 px-3 font-medium">
                                85 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                &lt;150 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                July 10, 2024
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">Glucose (Fasting)</td>
                              <td className="py-2 px-3 font-medium">
                                92 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                70-99 mg/dL
                              </td>
                              <td className="py-2 px-3 text-gray-500">
                                July 10, 2024
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <CardHeader className="p-4 border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">
                        Chronic Conditions
                      </h3>
                      <ul className="space-y-2">
                        {patient.medicalHistory
                          ?.filter((item) => item.includes("diagnosed"))
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                                <HeartPulse className="h-3 w-3 text-blue-600" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">
                        Surgical History
                      </h3>
                      <ul className="space-y-2">
                        {patient.medicalHistory
                          ?.filter(
                            (item) =>
                              item.includes("in 201") &&
                              !item.includes("diagnosed"),
                          )
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                                <Activity className="h-3 w-3 text-purple-600" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-3">
                        Family History
                      </h3>
                      <ul className="space-y-2">
                        {patient.medicalHistory
                          ?.filter((item) => item.includes("Family history"))
                          .map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                                <HeartPulse className="h-3 w-3 text-red-600" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="mt-0">
              <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <CardHeader className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Current Medications
                    </CardTitle>
                    <Button className="h-9 rounded-lg gap-2 bg-blue-600 hover:bg-blue-700">
                      <Pill className="h-4 w-4" />
                      Add Medication
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {patient.medications?.map((medication, index) => {
                      const [name, dosage] = medication.split(" ");
                      return (
                        <div
                          key={index}
                          className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Pill className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {dosage}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Active
                            </Badge>
                          </div>
                          <div className="mt-4 pl-13">
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <CalendarClock className="h-4 w-4" />
                              <span>Prescribed on: June 15, 2024</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consultation" className="mt-0">
              <AIConsultation
                patientName={patient.name}
                patientId={patient.id}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
