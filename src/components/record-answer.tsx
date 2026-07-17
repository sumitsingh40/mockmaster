/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/clerk-react";
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useSpeechToText, { type ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { generateFeedback } from "@/services/feedback.service";
import { SaveModal } from "./save-modal";
import * as faceapi from "face-api.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
}: RecordAnswerProps) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faceDetected, setFaceDetected] = useState(true);
  const [multipleFaces, setMultipleFaces] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const webcamRef = useRef<WebCam>(null);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const recordUserAnswer = async () => {
    // Check browser support for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError("Speech Recognition not supported in your browser");
      toast.error("Mic Error", {
        description: "Speech Recognition not supported in your browser. Please use Chrome, Edge, or Safari.",
      });
      return;
    }

    if (isRecording) {
      stopSpeechToText();
      setMicError(null);

      if (userAnswer?.length < 30) {
        toast.error("Answer Too Short", {
          description: "Your answer should be more than 30 characters",
        });
        return;
      }

      // AI result generation
      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      setAiResult(aiResult);
    } else {
      try {
        // Request microphone permissions
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicError(null);
        startSpeechToText();
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Permission denied";
        setMicError("Microphone permission denied");
        toast.error("Mic Permission", {
          description: "Please allow microphone access to record your answer.",
        });
        console.error("Microphone permission error:", errMsg);
      }
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();
    console.log("Raw response:", cleanText);

    // Step 2: Remove markdown code blocks and common formatting
    cleanText = cleanText
      .replace(/```(?:json)?\n?/g, "") // Remove ```json ``` blocks
      .replace(/```/g, "") // Remove remaining ``` 
      .replace(/`/g, "") // Remove backticks
      .replace(/^[*\-\s]+/gm, "") // Remove markdown bullets/dashes
      .trim();

    console.log("After removing markdown:", cleanText);

    // Step 3: Try to extract JSON object
    // First, try to find a JSON object starting with { and ending with }
    let jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      // Try to extract from "json" wrapper or other common patterns
      const pattern1 = cleanText.match(/json[\s\n]*(\{[\s\S]*\})/i);
      const pattern2 = cleanText.match(/"ratings"[\s\S]*"feedback"[\s\S]*\}/);
      jsonMatch = pattern1 || pattern2;
    }

    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }

    console.log("Extracted JSON:", cleanText);

    // Step 4: Parse the clean JSON text
    try {
      const parsed = JSON.parse(cleanText);
      console.log("Successfully parsed JSON:", parsed);
      return parsed;
    } catch (error) {
      console.error("JSON parsing error:", error);
      console.error("Text that failed to parse:", cleanText);
      
      // Last attempt: Try to extract and fix common JSON errors
      try {
        // Remove any trailing commas or other common issues
        let fixedText = cleanText
          .replace(/,\s*}/g, "}") // Remove trailing commas
          .replace(/,\s*]/g, "]") // Remove trailing commas in arrays
          .replace(/\\'/g, "'") // Unescape single quotes if needed
          .replace(/[\n\r]/g, " "); // Replace newlines with spaces
        
        console.log("Attempting to parse fixed JSON:", fixedText);
        const parsed = JSON.parse(fixedText);
        console.log("Successfully parsed fixed JSON:", parsed);
        return parsed;
      } catch (innerError) {
        throw new Error("Invalid JSON format: " + (error as Error)?.message);
      }
    }
  };

  const generateResult = async (
    question: string,
    correctAnswer: string,
    userAnswer: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    
    try {
      console.log("🚀 Starting feedback generation...");
      const feedback = await generateFeedback(question, userAnswer, correctAnswer);
      console.log("✅ Feedback received:", feedback);
      
      return {
        ratings: feedback.ratings || 0,
        feedback: feedback.feedback || "No feedback generated",
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("❌ Feedback generation failed:", errorMsg);
      
      toast.error("Feedback Generation Failed", {
        description: errorMsg || "Unable to generate feedback. Please try again.",
      });
      
      return { 
        ratings: 0, 
        feedback: "Unable to generate feedback - " + errorMsg 
      };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  const saveUserAnswer = async () => {
    setLoading(true);

    // Validate that AI result exists
    if (!aiResult) {
      toast.error("No Feedback Generated", {
        description: "Please wait for AI feedback before saving.",
      });
      setLoading(false);
      setOpen(false);
      return;
    }

    // Validate answer length
    if (!userAnswer || userAnswer.trim().length < 30) {
      toast.error("Answer Too Short", {
        description: "Your answer should be more than 30 characters",
      });
      setLoading(false);
      setOpen(false);
      return;
    }

    const currentQuestion = question.question;
    try {
      // Query Firebase to check if user answer already exists for this question
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const querySnap = await getDocs(userAnswerQuery);

      // If user already answered this question, don't save again
      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        setOpen(false);
        return;
      }

      // Save the user answer to Firebase
      const docRef = await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        feedback: aiResult.feedback,
        rating: aiResult.ratings,
        userId,
        createdAt: serverTimestamp(),
      });

      console.log("✅ Answer saved successfully with ID:", docRef.id);
      toast.success("Saved Successfully", {
        description: "Your answer has been saved.",
      });

      // Reset state after successful save
      setUserAnswer("");
      stopSpeechToText();
      setAiResult(null);
      setOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("❌ Error saving answer:", errorMessage);
      toast.error("Save Failed", {
        description: `Failed to save answer: ${errorMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  // Load face detection models from CDN
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
        console.log("✅ Face detection models loaded successfully");
      } catch (error) {
        console.error("❌ Error loading face detection models:", error);
        toast.error("Face detection unavailable", {
          description: "Using basic proctoring mode"
        });
      }
    };
    loadModels();
  }, []);

  // Check browser support for Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError("Speech Recognition API not supported in your browser");
      console.warn("⚠️ Speech Recognition API not available");
    } else {
      console.log("✅ Speech Recognition API available");
    }
  }, []);

  // Real ML face detection with position validation
  useEffect(() => {
    if (!isWebCam) {
      setFaceDetected(true);
      setMultipleFaces(false);
      return;
    }

    if (!modelsLoaded) {
      console.log("⏳ Waiting for models to load...");
      return;
    }

    const detectFaces = async () => {
      if (webcamRef.current?.video?.readyState === 4) {
        const video = webcamRef.current.video;
        
        try {
          const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions({ 
              inputSize: 224, 
              scoreThreshold: 0.5 
            })
          );

          const faceCount = detections.length;

          if (faceCount === 0) {
            // No face detected
            if (faceDetected || multipleFaces) {
              console.log("🔴 No face detected");
              setFaceDetected(false);
              setMultipleFaces(false);
            }
          } else if (faceCount === 1) {
            // One face detected - now check if it's centered
            const detection = detections[0];
            const box = detection.box;
            
            // Get video dimensions
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            
            // Calculate face center
            const faceCenterX = box.x + box.width / 2;
            const faceCenterY = box.y + box.height / 2;
            
            // Define center region (oval guide area - middle 50% of frame)
            const centerMinX = videoWidth * 0.25;
            const centerMaxX = videoWidth * 0.75;
            const centerMinY = videoHeight * 0.20;
            const centerMaxY = videoHeight * 0.80;
            
            // Check if face is within the center region
            const isCentered = 
              faceCenterX >= centerMinX && 
              faceCenterX <= centerMaxX &&
              faceCenterY >= centerMinY && 
              faceCenterY <= centerMaxY;
            
            if (isCentered) {
              // Face properly centered
              if (!faceDetected || multipleFaces) {
                console.log("🟢 Face detected and centered");
                setFaceDetected(true);
                setMultipleFaces(false);
              }
            } else {
              // Face detected but NOT centered
              if (faceDetected || multipleFaces) {
                console.log("🟡 Face detected but not centered");
                setFaceDetected(false);
                setMultipleFaces(false);
              }
            }
          } else {
            // Multiple faces detected
            if (!multipleFaces) {
              console.log("🔴 Multiple faces detected");
              setFaceDetected(false);
              setMultipleFaces(true);
            }
          }
        } catch (error) {
          console.error("Face detection error:", error);
        }
      }
    };

    // Start detection immediately
    detectFaces();
    
    // Then check every 1 second
    const interval = setInterval(detectFaces, 1000);
    return () => clearInterval(interval);
  }, [isWebCam, modelsLoaded, faceDetected, multipleFaces]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      {/* save modal */}
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      {/* Webcam Container with Proctoring Features */}
      <div className="w-full md:w-[600px] relative">
        {/* Live Recording Indicator - Only shows when webcam is on */}
        {isWebCam && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full animate-ping" />
            <span className="font-semibold text-sm">LIVE PROCTORING</span>
          </div>
        )}

        {/* Warning Only When Issue Detected */}
        {isWebCam && (!faceDetected || multipleFaces) && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg animate-pulse">
              {multipleFaces ? '🚫 Multiple faces detected!' : '⚠ Stay in frame'}
            </div>
          </div>
        )}

        {/* Face Guide Overlay - Shows when webcam is on */}
        {isWebCam && (
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <div className="relative">
              {/* Oval Face Guide - Dynamic color based on detection */}
              <div className={`w-48 h-64 border-4 rounded-full opacity-50 shadow-lg transition-colors duration-300 ${
                faceDetected && !multipleFaces
                  ? 'border-emerald-400 shadow-emerald-400/50' 
                  : 'border-red-500 shadow-red-500/50 animate-pulse'
              }`} />
              {/* Detection Status Text */}
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-md transition-colors duration-300 ${
                faceDetected && !multipleFaces
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-red-600 text-white animate-pulse'
              }`}>
                {multipleFaces 
                  ? '🚫 Only one person allowed' 
                  : faceDetected 
                    ? '✓ Face detected' 
                    : '⚠ Face not detected'}
              </div>
            </div>
          </div>
        )}

        {/* Proctoring Info Banner */}
        {isWebCam && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 text-white px-4 py-2 rounded-lg text-xs backdrop-blur-sm">
            <p className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${faceDetected && !multipleFaces ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`} />
              {multipleFaces 
                ? 'Multiple faces detected - Only one person allowed' 
                : faceDetected 
                  ? 'Your session is being monitored for integrity' 
                  : 'Face not detected - Please stay in frame'}
            </p>
          </div>
        )}

        {/* Webcam Display */}
        <div className="w-full h-[450px] flex flex-col items-center justify-center border-4 border-emerald-200 dark:border-emerald-700 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-2xl overflow-hidden">
          {isWebCam ? (
            <WebCam
              ref={webcamRef}
              onUserMedia={() => {
                setIsWebCam(true);
                console.log("📹 Webcam started");
              }}
              onUserMediaError={() => {
                setIsWebCam(false);
                console.log("❌ Webcam error");
              }}
              className="w-full h-full object-cover rounded-lg"
              mirrored={true}
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
                Enable your webcam to start proctored interview
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex itece justify-center gap-3">
        <TooltipButton
          content={isWebCam ? "Turn Off" : "Turn On"}
          icon={
            isWebCam ? (
              <VideoOff className="min-w-5 min-h-5" />
            ) : (
              <Video className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setIsWebCam(!isWebCam)}
        />

        <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onClick={recordUserAnswer}
        />

        <TooltipButton
          content="Record Again"
          icon={<RefreshCw className="min-w-5 min-h-5" />}
          onClick={recordNewAnswer}
        />

        <TooltipButton
          content="Save Result"
          icon={
            isAiGenerating ? (
              <Loader className="min-w-5 min-h-5 animate-spin" />
            ) : (
              <Save className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setOpen(!open)}
          disabled={!aiResult}
        />
      </div>

      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold">Your Answer:</h2>

        {micError && (
          <div className="text-sm text-red-600 mt-2 p-2 bg-red-50 rounded border border-red-200">
            ⚠️ {micError}
          </div>
        )}

        <p className="text-sm mt-2 text-gray-700 whitespace-normal">
          {userAnswer || "Start recording to see your answer here"}
        </p>

        {interimResult && (
          <p className="text-sm text-gray-500 mt-2">
            <strong>Current Speech:</strong>
            {interimResult}
          </p>
        )}
      </div>
    </div>
  );
};
