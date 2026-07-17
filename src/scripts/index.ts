import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

console.log("🔍 Gemini API Initialization");
console.log("- API Key loaded:", !!apiKey);

if (!apiKey) {
  console.error("❌ No API key found!");
}

let genAI;
try {
  genAI = new GoogleGenerativeAI(apiKey || "");
  console.log("✅ GoogleGenerativeAI instance created");
} catch (error) {
  console.error("❌ Error creating GoogleGenerativeAI:", error);
  genAI = null;
}

// Try different models - ordered by reliability
const modelNames = [
  "gemini-2.0-flash",         // Latest and most reliable
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-pro",
  "gemini-1.0-pro",
];

let model;
let selectedModel = "";
let modelErrors: Record<string, string> = {};

for (const modelName of modelNames) {
  try {
    console.log(`🔄 Trying model: ${modelName}`);
    model = genAI?.getGenerativeModel({
      model: modelName,
    });
    selectedModel = modelName;
    console.log(`✅ Model ready: ${modelName}`);
    break;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    modelErrors[modelName] = msg;
    console.log(`  ⚠️ ${modelName}: ${msg}`);
  }
}

if (!model) {
  console.error("❌ NO MODELS AVAILABLE");
  console.error("Models tried:", Object.keys(modelErrors));
  console.error("Visit Google Cloud Console to enable Generative AI API");
}

const generationConfig = {
  temperature: 0.5,
  topP: 0.8,
  topK: 24,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

let chatSession;
try {
  chatSession = model?.startChat({
    generationConfig,
    safetySettings,
  }) || null;
  
  if (chatSession) {
    console.log(`✅ Chat session ready (model: ${selectedModel})`);
  } else {
    console.error("❌ Chat session creation failed");
  }
} catch (error) {
  console.error("❌ Error creating chat session:", error);
  chatSession = null;
}

export { chatSession, selectedModel };
