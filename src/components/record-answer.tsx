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
import { useEffect, useState } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { generateAIContent } from "@/scripts";
import { SaveModal } from "./save-modal";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { debounce } from "lodash";

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
    error: speechError,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      interimResults: true,
      lang: "en-US",
    },
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const handleWebcamError = (error: string | DOMException) => {
    console.error("Webcam error in RecordAnswer:", error);
    setIsWebCam(false);
    toast.error("Webcam Error", {
      description: "Failed to access webcam. Please ensure you have granted permissions and try again.",
    });
  };

  const recordUserAnswer = debounce(async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 10) {
        toast.error("Error", {
          description: "Your answer should be more than 10 characters",
        });
        return;
      }

      const cacheKey = `${interviewId}-${question.question}-${userAnswer}`;
      const cacheDoc = await getDoc(doc(db, 'cachedFeedback', cacheKey));
      if (cacheDoc.exists()) {
        console.log('Using cached AI feedback');
        setAiResult(cacheDoc.data() as AIResponse);
        setIsAiGenerating(false);
        return;
      }

      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      await setDoc(doc(db, 'cachedFeedback', cacheKey), {
        ...aiResult,
        createdAt: serverTimestamp(),
      });

      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  }, 1000);

  const cleanJsonResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;
  
    try {
      console.log(`Generating AI feedback at ${new Date().toISOString()}`);
      const responseText = await generateAIContent(prompt);
      const result: AIResponse = cleanJsonResponse(responseText);
      return result;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
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

    if (!aiResult) {
      return;
    }

    const currentQuestion = question.question;
    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const querySnap = await getDocs(userAnswerQuery);

      if (!querySnap.empty) {
        console.log("Query Snap Size", querySnap.size);
        toast.info("Already Answered", {
          description: "You have already answered this question",
        });
        return;
      } else {
        await addDoc(collection(db, "userAnswers"), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp(),
        });

        toast("Saved", { description: "Your answer has been saved.." });
      }

      setUserAnswer("");
      stopSpeechToText();
    } catch (error) {
      toast("Error", {
        description: "An error occurred while saving your answer.",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  useEffect(() => {
    if (speechError) {
      console.error("Speech-to-text error:", speechError);
      toast.error("Speech Recognition Error", {
        description: "Failed to detect speech. Please ensure your microphone is enabled and permissions are granted.",
      });
    }
  }, [speechError]);

  return (
    <div className="w-full flex flex-col gap-6 px-4 md:px-8">
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      <div className="w-full flex flex-col md:flex-row gap-6 py-2">
        {/* Webcam */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-xs h-[250px] flex items-center justify-center border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-lg shadow-inner shadow-black/10">
            {isWebCam ? (
              <WebCam
                onUserMedia={() => {
                  console.log("Webcam access granted in RecordAnswer");
                  setIsWebCam(true);
                }}
                onUserMediaError={handleWebcamError}
                className="w-full h-full object-cover rounded-2xl"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
              />
            ) : (
              <WebcamIcon className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Answer */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          <div className="w-full max-w-md h-[200px] overflow-y-auto border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-lg shadow-md shadow-black/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Your Answer
            </h2>

            <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              {userAnswer || "🎙️ Start recording to see your answer here..."}
            </p>

            {interimResult && (
              <p className="text-sm text-gray-400 mt-4">
                <strong>Current Speech:</strong> {interimResult}
              </p>
            )}
          </div>
        </div>

        
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <TooltipButton
          content={isWebCam ? "Turn Off" : "Turn On"}
          icon={
            isWebCam ? (
              <VideoOff className="w-5 h-5 text-white" />
            ) : (
              <Video className="w-5 h-5 text-white" />
            )
          }
          onClick={() => setIsWebCam(!isWebCam)}
          isActive={isWebCam}
        />

        <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="w-5 h-5 text-red" />
            ) : (
              <Mic className="w-5 h-5 text-red" />
            )
          }
          onClick={recordUserAnswer}
          disabled={isAiGenerating}
          isActive={isRecording}
        />

        <TooltipButton
          content="Record Again"
          icon={<RefreshCw className="w-5 h-5 text-white" />}
          onClick={recordNewAnswer}
          disabled={isAiGenerating}
        />

        <TooltipButton
          content="Save Result"
          icon={
            isAiGenerating ? (
              <Loader className="w-5 h-5 animate-spin text-white" />
            ) : (
              <Save className="w-5 h-5 text-white" />
            )
          }
          onClick={() => setOpen(!open)}
          disabled={!aiResult || isAiGenerating}
        />
      </div>

      {aiResult && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg text-white font-semibold mb-2">
                  AI Feedback
                </h3>
                <p className="text-sm text-green-300">
                  <strong>Rating:</strong> {aiResult.ratings}/10
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  <strong>Feedback:</strong> {aiResult.feedback}
                </p>
              </div>
            )}
    </div>
  );
};