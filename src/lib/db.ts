import { supabase } from "../../supabase/supabase";
import { useAuth } from "../../supabase/auth";
import { Tables } from "@/types/supabase";

// Consultation types
export interface ConsultationData {
  id?: string;
  patientId?: string;
  patientName?: string;
  query?: string;
  status?: "in-progress" | "completed";
  consensusLevel?: number;
  finalRecommendation?: string;
  symptoms?: string[];
}

export interface ConsultationMessage {
  id?: string;
  consultationId: string;
  sender: "user" | "ai";
  content: string;
  aiType?: "central" | "cardiology" | "neurology" | "radiology" | "general";
}

export interface ConsultationAgent {
  id?: string;
  consultationId: string;
  agentId: string;
  opinion?: string;
  reasoning?: string;
  confidence?: number;
  sources?: Array<{ title: string; url?: string }>;
}

export interface ConsultationFile {
  id?: string;
  consultationId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize?: number;
  isImage?: boolean;
}

// Create a new consultation
export async function createConsultation(data: ConsultationData) {
  const { user } = useAuth();
  if (!user) throw new Error("User not authenticated");

  const { data: consultation, error } = await supabase
    .from("consultations")
    .insert({
      user_id: user.id,
      patient_id: data.patientId,
      patient_name: data.patientName,
      query: data.query,
      status: data.status || "in-progress",
      consensus_level: data.consensusLevel,
      final_recommendation: data.finalRecommendation,
      symptoms: data.symptoms ? JSON.stringify(data.symptoms) : null,
    })
    .select()
    .single();

  if (error) throw error;
  return consultation;
}

// Update an existing consultation
export async function updateConsultation(
  id: string,
  data: Partial<ConsultationData>,
) {
  const { error } = await supabase
    .from("consultations")
    .update({
      patient_id: data.patientId,
      patient_name: data.patientName,
      query: data.query,
      status: data.status,
      consensus_level: data.consensusLevel,
      final_recommendation: data.finalRecommendation,
      symptoms: data.symptoms ? JSON.stringify(data.symptoms) : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

// Get a consultation by ID
export async function getConsultation(id: string) {
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Get all consultations for the current user
export async function getUserConsultations() {
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Add a message to a consultation
export async function addConsultationMessage(message: ConsultationMessage) {
  const { data, error } = await supabase
    .from("consultation_messages")
    .insert({
      consultation_id: message.consultationId,
      sender: message.sender,
      content: message.content,
      ai_type: message.aiType,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get all messages for a consultation
export async function getConsultationMessages(consultationId: string) {
  const { data, error } = await supabase
    .from("consultation_messages")
    .select("*")
    .eq("consultation_id", consultationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

// Add an agent contribution to a consultation
export async function addAgentContribution(agent: ConsultationAgent) {
  const { data, error } = await supabase
    .from("consultation_agents")
    .insert({
      consultation_id: agent.consultationId,
      agent_id: agent.agentId,
      opinion: agent.opinion,
      reasoning: agent.reasoning,
      confidence: agent.confidence,
      sources: agent.sources ? JSON.stringify(agent.sources) : null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get all agent contributions for a consultation
export async function getAgentContributions(consultationId: string) {
  const { data, error } = await supabase
    .from("consultation_agents")
    .select("*, agent:agent_id(*)")
    .eq("consultation_id", consultationId);

  if (error) throw error;
  return data;
}

// Upload a file for a consultation
export async function uploadConsultationFile(
  consultationId: string,
  file: File,
  isImage: boolean = false,
) {
  // Create a unique file path
  const filePath = `consultations/${consultationId}/${Date.now()}_${file.name}`;

  // Upload the file to storage
  const { error: uploadError } = await supabase.storage
    .from("consultation-files")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("consultation-files").getPublicUrl(filePath);

  // Add file record to the database
  const { data, error } = await supabase
    .from("consultation_files")
    .insert({
      consultation_id: consultationId,
      file_name: file.name,
      file_path: publicUrl,
      file_type: file.type,
      file_size: file.size,
      is_image: isImage,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get all files for a consultation
export async function getConsultationFiles(consultationId: string) {
  const { data, error } = await supabase
    .from("consultation_files")
    .select("*")
    .eq("consultation_id", consultationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

// Get all images for a consultation
export async function getConsultationImages(consultationId: string) {
  const { data, error } = await supabase
    .from("consultation_files")
    .select("*")
    .eq("consultation_id", consultationId)
    .eq("is_image", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
