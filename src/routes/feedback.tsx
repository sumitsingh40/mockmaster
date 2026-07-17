import { db } from "@/config/firebase.config";
import type { Interview, UserAnswer } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CircleCheck, Star } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [activeFeed, setActiveFeed] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewId) {
      navigate("/generate", { replace: true });
      return;
    }

    if (interviewId) {
      const fetchInterview = async () => {
        if (interviewId) {
          try {
            const interviewDoc = await getDoc(
              doc(db, "interviews", interviewId)
            );
            if (interviewDoc.exists()) {
              setInterview({
                id: interviewDoc.id,
                ...interviewDoc.data(),
              } as Interview);
            }
          } catch (error) {
            console.error("Error fetching interview:", error);
          }
        }
      };

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as UserAnswer;
          });

          setFeedbacks(interviewData);
        } catch (error) {
          console.error("Error fetching feedbacks:", error);
          toast("Error", {
            description: "Something went wrong. Please try again later..",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>

      <Headings
        title="Congratulations !"
        description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
      />

      {/* Overall Rating with Dark Mode */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-6 shadow-lg">
        <p className="text-base text-gray-700 dark:text-gray-300 mb-2">
          Your overall interview rating:
        </p>
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
            {overAllRating}
          </span>
          <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            / 10
          </span>
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 ml-2" />
        </div>
      </div>

      {interview && <InterviewPin interview={interview} onMockPage />}

      <Headings title="Interview Feedback" isSubHeading />

      {feedbacks && feedbacks.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-6">
          {feedbacks.map((feed) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
              className="border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <AccordionTrigger
                onClick={() => setActiveFeed(feed.id)}
                className={cn(
                  "px-6 py-4 flex items-center justify-between text-base rounded-t-xl transition-all duration-300 hover:no-underline",
                  activeFeed === feed.id
                    ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-gray-900 dark:text-white"
                    : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100"
                )}
              >
                <span className="font-medium">{feed.question}</span>
              </AccordionTrigger>

              <AccordionContent className="px-6 py-6 bg-gray-50 dark:bg-slate-900 rounded-b-xl space-y-5">
                {/* Rating Section */}
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span>Rating:</span>
                  <span className="text-yellow-600 dark:text-yellow-400">
                    {feed.rating}/10
                  </span>
                </div>

                {/* Expected Answer - Green */}
                <Card className="border-l-4 border-green-500 dark:border-green-400 space-y-3 p-5 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-md">
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <CircleCheck className="mr-2 w-5 h-5 text-green-600 dark:text-green-400" />
                    Expected Answer
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                    {feed.correct_ans}
                  </CardDescription>
                </Card>

                {/* Your Answer - Yellow */}
                <Card className="border-l-4 border-yellow-500 dark:border-yellow-400 space-y-3 p-5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-md">
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <CircleCheck className="mr-2 w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    Your Answer
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                    {feed.user_ans}
                  </CardDescription>
                </Card>

                {/* Feedback - Red/Blue */}
                <Card className="border-l-4 border-blue-500 dark:border-blue-400 space-y-3 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md">
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <CircleCheck className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-400" />
                    AI Feedback
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                    {feed.feedback}
                  </CardDescription>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center border-2 border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Feedback Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Complete the interview to receive detailed feedback.
          </p>
        </div>
      )}
    </div>
  );
};
