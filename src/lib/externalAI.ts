import { supabase } from "../../supabase/supabase";

/**
 * Interface for external AI integration data
 */
export interface ExternalAIIntegration {
  id: string;
  name: string;
  provider: string;
  specialty?: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  // API key and endpoint are only available to master users
  api_key?: string;
  api_endpoint?: string;
  configuration?: Record<string, any>;
}

/**
 * Interface for external AI request parameters
 */
export interface ExternalAIRequestParams {
  integrationId: string;
  prompt: string;
  parameters?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    systemPrompt?: string;
    [key: string]: any;
  };
}

/**
 * Interface for external AI response
 */
export interface ExternalAIResponse {
  provider: string;
  response: any;
  text: string;
}

/**
 * Get all available external AI integrations
 * Note: API keys are only visible to master users
 */
export async function getExternalAIIntegrations(): Promise<
  ExternalAIIntegration[]
> {
  try {
    // For master users, we'll get all integrations
    // For regular users, we'll only get active integrations with limited fields
    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("role")
      .single();

    const isMaster = userProfile?.role === "master";

    if (isMaster) {
      // Master users get full access
      const { data, error } = await supabase
        .from("external_ai_integrations")
        .select("*")
        .order("name");

      if (error) throw error;
      return data || [];
    } else {
      // Regular users get limited access
      const { data, error } = await supabase
        .from("external_ai_integrations")
        .select(
          "id, name, provider, specialty, description, is_active, created_at",
        )
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return data || [];
    }
  } catch (error) {
    console.error("Error fetching external AI integrations:", error);
    throw error;
  }
}

/**
 * Get a specific external AI integration by ID
 * Uses the secure RPC function to handle permissions
 */
export async function getExternalAIIntegration(
  id: string,
): Promise<ExternalAIIntegration | null> {
  try {
    const { data, error } = await supabase.rpc("get_external_ai_integration", {
      integration_id: id,
    });

    if (error) throw error;
    return data as ExternalAIIntegration;
  } catch (error) {
    console.error(`Error fetching external AI integration ${id}:`, error);
    return null;
  }
}

/**
 * Create a new external AI integration (master users only)
 */
export async function createExternalAIIntegration(
  integration: Omit<ExternalAIIntegration, "id" | "created_at">,
): Promise<ExternalAIIntegration> {
  try {
    const { data, error } = await supabase
      .from("external_ai_integrations")
      .insert(integration)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating external AI integration:", error);
    throw error;
  }
}

/**
 * Update an existing external AI integration (master users only)
 */
export async function updateExternalAIIntegration(
  id: string,
  updates: Partial<ExternalAIIntegration>,
): Promise<ExternalAIIntegration> {
  try {
    // Always update the updated_at timestamp
    const updatesWithTimestamp = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("external_ai_integrations")
      .update(updatesWithTimestamp)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating external AI integration ${id}:`, error);
    throw error;
  }
}

/**
 * Delete an external AI integration (master users only)
 */
export async function deleteExternalAIIntegration(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from("external_ai_integrations")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error(`Error deleting external AI integration ${id}:`, error);
    throw error;
  }
}

/**
 * Send a request to an external AI integration
 * This uses the secure edge function to handle the API key securely
 */
export async function queryExternalAI(
  params: ExternalAIRequestParams,
): Promise<ExternalAIResponse> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "supabase-functions-external-ai-proxy",
      {
        body: params,
      },
    );

    if (error) throw error;
    return data as ExternalAIResponse;
  } catch (error) {
    console.error("Error querying external AI:", error);
    throw error;
  }
}
