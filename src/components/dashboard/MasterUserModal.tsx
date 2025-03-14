import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Database, Cpu, RefreshCw } from "lucide-react";

interface MasterUserModalProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
}

export default function MasterUserModal({
  trigger,
  defaultOpen = false,
}: MasterUserModalProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState("system");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Shield className="h-4 w-4" />
            Master Controls
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Master User System Controls
          </DialogTitle>
          <DialogDescription>
            Access system-wide data and perform administrative interventions.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="system"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="h-12 w-full rounded-none bg-transparent border-b px-6">
              <TabsTrigger
                value="system"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                System Parameters
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                AI Models
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
              >
                Data Access
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="system" className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">
                      System Configuration
                    </h3>
                    <p className="text-sm text-gray-500">
                      Modify core system parameters
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-timeout">API Timeout (ms)</Label>
                      <Input
                        id="api-timeout"
                        type="number"
                        defaultValue="30000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Max Response Tokens</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        defaultValue="4096"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="system-mode">System Mode</Label>
                    <select
                      id="system-mode"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="production"
                    >
                      <option value="development">Development</option>
                      <option value="staging">Staging</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">
                      AI Model Management
                    </h3>
                    <p className="text-sm text-gray-500">
                      Update and configure AI models
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">
                            Cardiology Specialist AI
                          </h4>
                          <p className="text-xs text-gray-500">
                            Version: 2.4.1
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">
                            Neurology Specialist AI
                          </h4>
                          <p className="text-xs text-gray-500">
                            Version: 1.9.3
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">
                            Central Orchestrator AI
                          </h4>
                          <p className="text-xs text-gray-500">
                            Version: 3.1.0
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Update Available
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Check for Updates</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Apply All Updates
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="data" className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">Data Intervention</h3>
                    <p className="text-sm text-gray-500">
                      Access and modify system data
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-id">Patient ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="patient-id"
                        placeholder="Enter patient ID"
                        className="flex-1"
                      />
                      <Button variant="outline">Search</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-id">User ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="user-id"
                        placeholder="Enter user ID"
                        className="flex-1"
                      />
                      <Button variant="outline">Search</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm text-center text-gray-500">
                      Enter a patient or user ID to view and modify their data
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="override-reason">Override Reason</Label>
                    <Input
                      id="override-reason"
                      placeholder="Document reason for data intervention"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Override Data
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
