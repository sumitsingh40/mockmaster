import { chatSession } from "@/scripts";

interface FeedbackResponse {
  ratings: number;
  feedback: string;
}

const parseJsonFromText = (text: string): Record<string, any> | null => {
  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
};

export const generateFeedback = async (
  question: string,
  userAnswer: string,
  correctAnswer: string
): Promise<FeedbackResponse> => {
  console.log("🔍 Starting feedback generation service...");
  
  if (!chatSession) {
    console.error("❌ CRITICAL: Chat session is null");
    throw new Error(
      "AI Feedback service not initialized.\n\n" +
      "Please:\n" +
      "1. Visit https://aistudio.google.com\n" +
      "2. Create a new API key\n" +
      "3. Update .env.local with the key\n" +
      "4. Restart dev server and refresh browser"
    );
  }

  try {
    console.log("📤 Sending feedback request to API...");
    
    const prompt = `Evaluate this interview answer and provide feedback.

Question: ${question}

Candidate Answer: ${userAnswer}

Expected Answer: ${correctAnswer}

Respond ONLY with JSON (no markdown):
{"ratings": <1-10>, "feedback": "<feedback text>"}`;

    const response = await chatSession.sendMessage(prompt);
    
    if (!response?.response) {
      throw new Error("Empty response from API");
    }

    const responseText = response.response.text();
    
    if (!responseText?.trim()) {
      throw new Error("API returned empty text response");
    }

    console.log("✅ Got response:", responseText.substring(0, 100));

    const parsedData = parseJsonFromText(responseText);
    
    if (!parsedData) {
      console.error("❌ Could not parse JSON:", responseText);
      throw new Error("Invalid JSON response");
    }

    let ratings = parsedData.ratings || parsedData.rating || 5;
    let feedback = parsedData.feedback || parsedData.comment || "Good answer";

    ratings = Number(ratings) || 5;
    ratings = Math.max(1, Math.min(10, ratings));

    feedback = String(feedback || "").trim() || "Good answer";

    console.log("✅ Feedback ready:", { ratings, feedback: feedback.substring(0, 50) });
    
    return { ratings, feedback };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ Feedback generation failed:", errorMsg);
    console.error("Error:", error);
    throw error;
  }
};
