/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/config/firebase.config";
import type { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import { InterviewPin } from "@/components/pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebCam from "react-webcam";

export const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  if (!interview) {
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />

        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"} className="gap-2">
            Start <Sparkles className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {interview && <InterviewPin interview={interview} onMockPage />}

      {/* Enhanced Alert with Dark Mode Support */}
      <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 p-6 rounded-xl flex items-start gap-4 -mt-3 shadow-sm">
        <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <AlertTitle className="text-yellow-900 dark:text-yellow-200 font-bold text-lg">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
            Please enable your webcam and microphone to start the AI-generated
            mock interview. The interview consists of five questions. You'll
            receive a personalized report based on your responses at the end.
            <br />
            <br />
            <span className="font-semibold text-yellow-900 dark:text-yellow-100">Note:</span> Your video is{" "}
            <strong className="text-yellow-900 dark:text-yellow-100">never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>

      {/* Webcam Section with Dark Mode */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border-2 border-gray-300 dark:border-gray-700 p-6 bg-gray-50 dark:bg-slate-800 rounded-xl shadow-lg transition-all duration-300">
          {isWebCamEnabled ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <WebcamIcon className="w-24 h-24 text-gray-400 dark:text-gray-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Click "Enable Webcam" to start
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Webcam Toggle Button */}
      <div className="flex items-center justify-center">
        <Button 
          onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
          variant={isWebCamEnabled ? "destructive" : "default"}
          size="lg"
          className="gap-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <WebcamIcon className="w-5 h-5" />
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};
