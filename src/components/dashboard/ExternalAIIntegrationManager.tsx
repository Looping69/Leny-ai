import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Plus,
  Trash2,
  Edit,
  Key,
  Globe,
  Settings,
  AlertTriangle,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import {
  getExternalAIIntegrations,
  createExternalAIIntegration,
  updateExternalAIIntegration,
  deleteExternalAIIntegration,
  queryExternalAI,
  type ExternalAIIntegration,
} from "@/lib/externalAI";

export default function ExternalAIIntegrationManager() {
  const [integrations, setIntegrations] = useState<ExternalAIIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [currentIntegration, setCurrentIntegration] =
    useState<ExternalAIIntegration | null>(null);
  const [formData, setFormData] = useState<Partial<ExternalAIIntegration>>({
    name: "",
    provider: "openai",
    api_key: "",
    api_endpoint: "",
    specialty: "",
    description: "",
    is_active: true,
    configuration: {},
  });
  const [testPrompt, setTestPrompt] = useState(
    "Explain the role of AI in healthcare in one paragraph.",
  );
  const [testResponse, setTestResponse] = useState("");
  const [testLoading, setTestLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const { toast } = useToast();

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    setLoading(true);
    try {
      const data = await getExternalAIIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error("Error fetching integrations:", error);
      toast({
        title: "Error",
        description: "Failed to load external AI integrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfigChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      configuration: { ...prev.configuration, [key]: value },
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      provider: "openai",
      api_key: "",
      api_endpoint: "",
      specialty: "",
      description: "",
      is_active: true,
      configuration: {},
    });
    setActiveTab("basic");
  };

  const handleAddIntegration = async () => {
    try {
      await createExternalAIIntegration(
        formData as Omit<ExternalAIIntegration, "id" | "created_at">,
      );
      toast({
        title: "Success",
        description: "External AI integration added successfully",
      });
      setShowAddDialog(false);
      resetForm();
      fetchIntegrations();
    } catch (error) {
      console.error("Error adding integration:", error);
      toast({
        title: "Error",
        description: "Failed to add external AI integration",
        variant: "destructive",
      });
    }
  };

  const handleEditIntegration = (integration: ExternalAIIntegration) => {
    setCurrentIntegration(integration);
    setFormData({
      name: integration.name,
      provider: integration.provider,
      api_key: integration.api_key || "",
      api_endpoint: integration.api_endpoint || "",
      specialty: integration.specialty || "",
      description: integration.description || "",
      is_active: integration.is_active,
      configuration: integration.configuration || {},
    });
    setShowEditDialog(true);
  };

  const handleUpdateIntegration = async () => {
    if (!currentIntegration) return;

    try {
      await updateExternalAIIntegration(currentIntegration.id, formData);
      toast({
        title: "Success",
        description: "External AI integration updated successfully",
      });
      setShowEditDialog(false);
      resetForm();
      fetchIntegrations();
    } catch (error) {
      console.error("Error updating integration:", error);
      toast({
        title: "Error",
        description: "Failed to update external AI integration",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (integration: ExternalAIIntegration) => {
    setCurrentIntegration(integration);
    setShowDeleteDialog(true);
  };

  const handleDeleteIntegration = async () => {
    if (!currentIntegration) return;

    try {
      await deleteExternalAIIntegration(currentIntegration.id);
      toast({
        title: "Success",
        description: "External AI integration deleted successfully",
      });
      setShowDeleteDialog(false);
      setCurrentIntegration(null);
      fetchIntegrations();
    } catch (error) {
      console.error("Error deleting integration:", error);
      toast({
        title: "Error",
        description: "Failed to delete external AI integration",
        variant: "destructive",
      });
    }
  };

  const handleTestClick = (integration: ExternalAIIntegration) => {
    setCurrentIntegration(integration);
    setTestPrompt("Explain the role of AI in healthcare in one paragraph.");
    setTestResponse("");
    setShowTestDialog(true);
  };

  const handleTestIntegration = async () => {
    if (!currentIntegration) return;

    setTestLoading(true);
    setTestResponse("");

    try {
      const response = await queryExternalAI({
        integrationId: currentIntegration.id,
        prompt: testPrompt,
      });

      setTestResponse(response.text);
      toast({
        title: "Test successful",
        description: "External AI integration is working properly",
      });
    } catch (error) {
      console.error("Error testing integration:", error);
      setTestResponse(
        `Error: ${error.message || "Failed to connect to external AI"}`,
      );
      toast({
        title: "Test failed",
        description: "Failed to connect to external AI integration",
        variant: "destructive",
      });
    } finally {
      setTestLoading(false);
    }
  };

  const renderProviderSpecificFields = () => {
    switch (formData.provider) {
      case "openai":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="api_endpoint">API Endpoint (Optional)</Label>
              <Input
                id="api_endpoint"
                name="api_endpoint"
                placeholder="https://api.openai.com/v1/chat/completions"
                value={formData.api_endpoint || ""}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500">
                Leave blank to use the default OpenAI API endpoint
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Default Model</Label>
              <Select
                value={formData.configuration?.model || "gpt-4"}
                onValueChange={(value) => handleConfigChange("model", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "anthropic":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="api_endpoint">API Endpoint (Optional)</Label>
              <Input
                id="api_endpoint"
                name="api_endpoint"
                placeholder="https://api.anthropic.com/v1/messages"
                value={formData.api_endpoint || ""}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500">
                Leave blank to use the default Anthropic API endpoint
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Default Model</Label>
              <Select
                value={
                  formData.configuration?.model || "claude-3-opus-20240229"
                }
                onValueChange={(value) => handleConfigChange("model", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claude-3-opus-20240229">
                    Claude 3 Opus
                  </SelectItem>
                  <SelectItem value="claude-3-sonnet-20240229">
                    Claude 3 Sonnet
                  </SelectItem>
                  <SelectItem value="claude-3-haiku-20240307">
                    Claude 3 Haiku
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case "azure":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="api_endpoint">API Endpoint</Label>
              <Input
                id="api_endpoint"
                name="api_endpoint"
                placeholder="https://your-resource.openai.azure.com/..."
                value={formData.api_endpoint || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource_name">Resource Name</Label>
              <Input
                id="resource_name"
                placeholder="your-azure-openai-resource"
                value={formData.configuration?.resource_name || ""}
                onChange={(e) =>
                  handleConfigChange("resource_name", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deployment_id">Deployment ID</Label>
              <Input
                id="deployment_id"
                placeholder="gpt-4"
                value={formData.configuration?.deployment_id || ""}
                onChange={(e) =>
                  handleConfigChange("deployment_id", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api_version">API Version</Label>
              <Input
                id="api_version"
                placeholder="2023-05-15"
                value={formData.configuration?.api_version || "2023-05-15"}
                onChange={(e) =>
                  handleConfigChange("api_version", e.target.value)
                }
              />
            </div>
          </>
        );
      case "custom":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="api_endpoint">API Endpoint</Label>
              <Input
                id="api_endpoint"
                name="api_endpoint"
                placeholder="https://api.example.com/v1/completions"
                value={formData.api_endpoint || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth_type">Authentication Type</Label>
              <Select
                value={formData.configuration?.auth_type || "header"}
                onValueChange={(value) =>
                  handleConfigChange("auth_type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select auth type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="header">Header Authentication</SelectItem>
                  <SelectItem value="body">Body Parameter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.configuration?.auth_type === "header" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="auth_header_name">Header Name</Label>
                  <Input
                    id="auth_header_name"
                    placeholder="Authorization"
                    value={
                      formData.configuration?.auth_header_name ||
                      "Authorization"
                    }
                    onChange={(e) =>
                      handleConfigChange("auth_header_name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth_header_prefix">Header Prefix</Label>
                  <Input
                    id="auth_header_prefix"
                    placeholder="Bearer"
                    value={
                      formData.configuration?.auth_header_prefix || "Bearer"
                    }
                    onChange={(e) =>
                      handleConfigChange("auth_header_prefix", e.target.value)
                    }
                  />
                </div>
              </>
            )}
            {formData.configuration?.auth_type === "body" && (
              <div className="space-y-2">
                <Label htmlFor="auth_body_param">Body Parameter Name</Label>
                <Input
                  id="auth_body_param"
                  placeholder="api_key"
                  value={formData.configuration?.auth_body_param || "api_key"}
                  onChange={(e) =>
                    handleConfigChange("auth_body_param", e.target.value)
                  }
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="request_template">
                Request Template (Optional)
              </Label>
              <Textarea
                id="request_template"
                placeholder='{"prompt":"{{prompt}}","max_tokens":1000}'
                value={formData.configuration?.request_template || ""}
                onChange={(e) =>
                  handleConfigChange("request_template", e.target.value)
                }
                className="font-mono text-sm h-24"
              />
              <p className="text-xs text-gray-500">
                JSON template with {{ prompt }} placeholder. Leave blank for
                default format.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="response_path">Response Path (Optional)</Label>
              <Input
                id="response_path"
                placeholder="choices.0.text"
                value={formData.configuration?.response_path || ""}
                onChange={(e) =>
                  handleConfigChange("response_path", e.target.value)
                }
              />
              <p className="text-xs text-gray-500">
                Dot notation path to extract text from response (e.g.,
                "choices.0.text")
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              External AI Integrations
            </CardTitle>
            <CardDescription>
              Connect to external AI providers to enhance the system's
              capabilities
            </CardDescription>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowAddDialog(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-gray-500">Loading integrations...</p>
          </div>
        ) : integrations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-900 mb-1">
              No external AI integrations found
            </p>
            <p className="mb-4">
              Add your first integration to enhance the system's capabilities
            </p>
            <Button
              onClick={() => {
                resetForm();
                setShowAddDialog(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Integration
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="border rounded-xl p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {integration.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {integration.provider}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      integration.is_active
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }
                  >
                    {integration.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {integration.specialty && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Specialty:</span>{" "}
                    {integration.specialty}
                  </p>
                )}
                {integration.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {integration.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleEditIntegration(integration)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleTestClick(integration)}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDeleteClick(integration)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                External AI Integration Security
              </h4>
              <p className="text-xs text-gray-500">
                API keys for external AI providers are stored securely and are
                only accessible to master users. All requests to external AI
                providers are proxied through a secure edge function to protect
                sensitive credentials.
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Add Integration Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add External AI Integration</DialogTitle>
            <DialogDescription>
              Connect to an external AI provider to enhance the system's
              capabilities
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="advanced">Provider Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Integration Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="OpenAI GPT-4"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) =>
                    handleSelectChange("provider", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="azure">Azure OpenAI</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty (Optional)</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  placeholder="Cardiology, Radiology, etc."
                  value={formData.specialty || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what this integration is used for"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="api_key" className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  API Key
                </Label>
                <Input
                  id="api_key"
                  name="api_key"
                  type="password"
                  placeholder="sk-..."
                  value={formData.api_key}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500">
                  API keys are stored securely and only accessible to master
                  users
                </p>
              </div>

              {renderProviderSpecificFields()}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIntegration}>Add Integration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Integration Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit External AI Integration</DialogTitle>
            <DialogDescription>
              Update the settings for this external AI integration
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="advanced">Provider Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Integration Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="OpenAI GPT-4"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) =>
                    handleSelectChange("provider", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="azure">Azure OpenAI</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty (Optional)</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  placeholder="Cardiology, Radiology, etc."
                  value={formData.specialty || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what this integration is used for"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="api_key" className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  API Key
                </Label>
                <Input
                  id="api_key"
                  name="api_key"
                  type="password"
                  placeholder="sk-..."
                  value={formData.api_key}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500">
                  API keys are stored securely and only accessible to master
                  users
                </p>
              </div>

              {renderProviderSpecificFields()}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateIntegration}>
              Update Integration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Integration</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this external AI integration? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-4 border rounded-lg bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-sm">
              Deleting this integration will remove all associated data and
              configurations.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteIntegration}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Integration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Integration Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test Integration</DialogTitle>
            <DialogDescription>
              Send a test prompt to verify the external AI integration is
              working correctly
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="test_prompt">Test Prompt</Label>
              <Textarea
                id="test_prompt"
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="Enter a test prompt..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Response</Label>
                {testLoading && (
                  <div className="flex items-center text-xs text-gray-500">
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Processing...
                  </div>
                )}
              </div>
              <div className="border rounded-lg p-3 bg-gray-50 min-h-[150px] max-h-[300px] overflow-y-auto">
                {testResponse ? (
                  <p className="whitespace-pre-wrap text-sm">{testResponse}</p>
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    Response will appear here after testing
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>
              Close
            </Button>
            <Button
              onClick={handleTestIntegration}
              disabled={testLoading}
              className="gap-2"
            >
              {testLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Integration</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
