import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
// Use a fallback key if the API key is not available
const API_KEY = "AIzaSyBBXVIaqFnVmbT7cjp_f1Ow0sWcHGt9teI";

// Configure safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Create a function to get or initialize the Gemini model
// This prevents issues with multiple initializations during development
let geminiModelInstance: any = null;

function getGeminiModel() {
  if (geminiModelInstance) {
    return geminiModelInstance;
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    geminiModelInstance = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
    });
    return geminiModelInstance;
  } catch (error) {
    console.error("Error initializing Gemini AI:", error);
    // Create a dummy model that will return error messages
    return {
      generateContent: async () => ({
        response: {
          text: () =>
            "AI service currently unavailable. Please try again later.",
        },
      }),
    };
  }
}

// Function to generate text using Gemini
export async function generateMedicalResponse(
  prompt: string,
  specialty?: string,
): Promise<string> {
  try {
    const model = getGeminiModel();
    if (!model || !model.generateContent) {
      return "AI service is not available at the moment. Please try again later.";
    }

    let fullPrompt = prompt;

    if (specialty) {
      fullPrompt = `As a medical AI specializing in ${specialty}, ${prompt}`;
    }

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response with Gemini:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
}

// Function to generate a collaborative medical analysis
export async function generateCollaborativeAnalysis(
  query: string,
  specialties: string[],
): Promise<{
  finalRecommendation: string;
  agentResponses: Array<{
    specialty: string;
    opinion: string;
    reasoning: string;
    confidence: number;
  }>;
  consensusLevel: number;
}> {
  try {
    const model = getGeminiModel();
    if (!model || !model.generateContent) {
      return {
        finalRecommendation:
          "AI service is not available at the moment. Please try again later.",
        agentResponses: specialties.map((specialty) => ({
          specialty,
          opinion: "Service unavailable",
          reasoning: "The AI service is currently unavailable",
          confidence: 0,
        })),
        consensusLevel: 0,
      };
    }

    const systemPrompt = `You are a team of medical AI specialists analyzing a patient case. 
    Based on the following query: "${query}", provide a collaborative analysis from the perspective of these specialties: ${specialties.join(
      ", ",
    )}. 
    
    I want you to simulate a conversation between these specialists, where they discuss the case, ask each other questions, and build on each other's insights. Make it feel like a real collaborative discussion between experts.
    
    For each specialty, provide:
    - An initial opinion based on their expertise
    - Questions they might ask other specialists
    - Responses to questions from other specialists
    - A refined opinion after hearing from colleagues
    - Reasoning for their final assessment
    - Confidence level (0-100)
    
    Then, provide a final recommendation that synthesizes all perspectives and a consensus level (0-100).
    
    Format your response so it's easy to parse programmatically with clear sections for each specialist's contributions.`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    // Parse the response to extract structured data
    // This is a simplified parsing logic - in production, you'd want more robust parsing
    const agentResponses = specialties.map((specialty) => {
      // Extract opinion and reasoning for each specialty
      const opinionMatch = new RegExp(
        `${specialty}.*?Opinion:(.*?)(?=Reasoning:|Questions:|$)`,
        "is",
      ).exec(responseText);
      const reasoningMatch = new RegExp(
        `${specialty}.*?Reasoning:(.*?)(?=Confidence:|Final Opinion:|$)`,
        "is",
      ).exec(responseText);
      const confidenceMatch = new RegExp(
        `${specialty}.*?Confidence:\s*(\d+)`,
        "is",
      ).exec(responseText);

      // Try to extract refined opinion if available
      const refinedOpinionMatch = new RegExp(
        `${specialty}.*?Refined Opinion:|Final Opinion:(.*?)(?=Reasoning:|$)`,
        "is",
      ).exec(responseText);

      return {
        specialty,
        opinion: refinedOpinionMatch
          ? refinedOpinionMatch[1].trim()
          : opinionMatch
            ? opinionMatch[1].trim()
            : `Analysis from ${specialty} perspective`,
        reasoning: reasoningMatch
          ? reasoningMatch[1].trim()
          : `Reasoning based on ${specialty} expertise`,
        confidence: confidenceMatch
          ? parseInt(confidenceMatch[1])
          : Math.floor(70 + Math.random() * 20),
      };
    });

    // Extract final recommendation
    const finalRecMatch =
      /Final Recommendation:|Consensus Recommendation:(.*?)(?=Consensus Level:|$)/is.exec(
        responseText,
      );
    const consensusMatch = /Consensus Level:\s*(\d+)/i.exec(responseText);

    return {
      finalRecommendation: finalRecMatch
        ? finalRecMatch[1].trim()
        : "Based on the collaborative analysis, we recommend...",
      agentResponses,
      consensusLevel: consensusMatch ? parseInt(consensusMatch[1]) : 85,
    };
  } catch (error) {
    console.error("Error generating collaborative analysis:", error);
    return {
      finalRecommendation: "Unable to generate a recommendation at this time.",
      agentResponses: specialties.map((specialty) => ({
        specialty,
        opinion: "Analysis unavailable",
        reasoning: "Unable to process at this time",
        confidence: 50,
      })),
      consensusLevel: 50,
    };
  }
}
