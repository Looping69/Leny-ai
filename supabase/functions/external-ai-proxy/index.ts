import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ExternalAIRequest {
  integrationId: string;
  prompt: string;
  parameters?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Get the user's profile to check role
    const { data: userProfile, error: profileError } = await supabaseClient
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return new Response(
        JSON.stringify({ error: "Error fetching user profile" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Parse the request body
    const { integrationId, prompt, parameters } =
      (await req.json()) as ExternalAIRequest;

    if (!integrationId || !prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get the integration details using the secure function
    const { data: integration, error: integrationError } =
      await supabaseClient.rpc("get_external_ai_integration", {
        integration_id: integrationId,
      });

    if (integrationError || !integration) {
      return new Response(
        JSON.stringify({ error: "Integration not found or access denied" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        },
      );
    }

    // Check if integration is active
    if (!integration.is_active) {
      return new Response(
        JSON.stringify({ error: "Integration is not active" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Make the request to the external AI provider
    let response;
    switch (integration.provider) {
      case "openai":
        response = await callOpenAI(integration, prompt, parameters);
        break;
      case "anthropic":
        response = await callAnthropic(integration, prompt, parameters);
        break;
      case "azure":
        response = await callAzureOpenAI(integration, prompt, parameters);
        break;
      case "custom":
        response = await callCustomAPI(integration, prompt, parameters);
        break;
      default:
        return new Response(JSON.stringify({ error: "Unsupported provider" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
    }

    // Log the usage of the external AI (could be expanded to track usage metrics)
    await supabaseClient.from("master_user_audit_logs").insert({
      user_id: user.id,
      action_type: "external_ai_usage",
      action_details: {
        integration_id: integrationId,
        integration_name: integration.name,
        provider: integration.provider,
        prompt_length: prompt.length,
        timestamp: new Date().toISOString(),
      },
    });

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

async function callOpenAI(
  integration: any,
  prompt: string,
  parameters: any = {},
) {
  const endpoint =
    integration.api_endpoint || "https://api.openai.com/v1/chat/completions";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${integration.api_key}`,
    },
    body: JSON.stringify({
      model: parameters.model || "gpt-4",
      messages: [
        {
          role: "system",
          content:
            parameters.systemPrompt ||
            `You are an AI assistant specializing in ${integration.specialty || "medicine"}.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: parameters.temperature || 0.7,
      max_tokens: parameters.max_tokens || 1000,
      ...parameters,
    }),
  });

  const data = await response.json();
  return {
    provider: "openai",
    response: data,
    text: data.choices?.[0]?.message?.content || "",
  };
}

async function callAnthropic(
  integration: any,
  prompt: string,
  parameters: any = {},
) {
  const endpoint =
    integration.api_endpoint || "https://api.anthropic.com/v1/messages";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": integration.api_key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: parameters.model || "claude-3-opus-20240229",
      system:
        parameters.systemPrompt ||
        `You are an AI assistant specializing in ${integration.specialty || "medicine"}.`,
      messages: [{ role: "user", content: prompt }],
      temperature: parameters.temperature || 0.7,
      max_tokens: parameters.max_tokens || 1000,
      ...parameters,
    }),
  });

  const data = await response.json();
  return {
    provider: "anthropic",
    response: data,
    text: data.content?.[0]?.text || "",
  };
}

async function callAzureOpenAI(
  integration: any,
  prompt: string,
  parameters: any = {},
) {
  // Extract configuration from the integration
  const config = integration.configuration || {};
  const apiVersion = config.api_version || "2023-05-15";
  const deploymentId = config.deployment_id || "gpt-4";

  const endpoint =
    integration.api_endpoint ||
    `https://${config.resource_name}.openai.azure.com/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": integration.api_key,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            parameters.systemPrompt ||
            `You are an AI assistant specializing in ${integration.specialty || "medicine"}.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: parameters.temperature || 0.7,
      max_tokens: parameters.max_tokens || 1000,
      ...parameters,
    }),
  });

  const data = await response.json();
  return {
    provider: "azure",
    response: data,
    text: data.choices?.[0]?.message?.content || "",
  };
}

async function callCustomAPI(
  integration: any,
  prompt: string,
  parameters: any = {},
) {
  const config = integration.configuration || {};
  const endpoint = integration.api_endpoint;

  if (!endpoint) {
    throw new Error("API endpoint is required for custom integrations");
  }

  // Prepare headers based on configuration
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add API key to headers or body based on configuration
  if (config.auth_type === "header") {
    headers[config.auth_header_name || "Authorization"] =
      `${config.auth_header_prefix || "Bearer"} ${integration.api_key}`;
  }

  // Prepare request body based on configuration
  let body: any = {};
  if (config.request_template) {
    // Use the template from configuration
    body = JSON.parse(config.request_template.replace("{{prompt}}", prompt));
  } else {
    // Default structure
    body = {
      prompt: prompt,
      ...parameters,
    };

    // Add API key to body if configured
    if (config.auth_type === "body") {
      body[config.auth_body_param || "api_key"] = integration.api_key;
    }
  }

  const response = await fetch(endpoint, {
    method: config.method || "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  // Extract the text response based on configuration
  let text = "";
  if (config.response_path) {
    // Navigate the response object using the path
    const path = config.response_path.split(".");
    let current = data;
    for (const key of path) {
      if (current && typeof current === "object") {
        current = current[key];
      } else {
        current = undefined;
        break;
      }
    }
    text = current || "";
  } else {
    // Default to the entire response
    text = JSON.stringify(data);
  }

  return {
    provider: "custom",
    response: data,
    text,
  };
}
