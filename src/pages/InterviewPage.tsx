/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "@/pages/LoaderPage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { QuestionSection } from "@/components/question-section";
import Navbar from "@/components/Navbar";

export const InterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className=" max-h-100vh flex flex-col w-full gap-8 py-5 ">
      <div>
        <Navbar />
      </div>
      <div className="w-full">
        <Alert className="max-h-fit bg-white/5 backdrop-blur-lg border border-indigo-500/30 rounded-xl flex items-start gap-3 py-3 px-3">
          <Lightbulb className="h-5 w-5 text-indigo-400" />
          <div>
            <AlertTitle className="text-slate-200 font-bold text-xs">
              Important Note
            </AlertTitle>
            <AlertDescription className="text-xs text-slate-400 mt-0.5 leading-tight">
              Press "🎙️" to begin answering the question.  <strong>Note:</strong> <span className="font-medium">Your video is never recorded.</span> You can disable the webcam anytime if preferred.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview?.questions && interview?.questions.length > 0 && (
        <div className="w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  );
};