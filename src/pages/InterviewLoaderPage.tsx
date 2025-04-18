import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { doc, getDoc } from "firebase/firestore";
import { Lightbulb, Sparkles, Webcam as WebcamIcon } from "lucide-react";
import { db } from "../config/firebase.config";
import { Interview } from "../types/index";
import { LoaderPage } from "./LoaderPage"; // Make sure this is a component
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { InterviewPin } from "../components/pin";

export const InterviewLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        if (!interviewId) {
          navigate("/generate", { replace: true });
          return;
        }

        const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
        if (interviewDoc.exists()) {
          setInterview({
            id: interviewDoc.id,
            ...interviewDoc.data(),
          } as Interview);
        } else {
          navigate("/generate", { replace: true });
        }
      } catch (error) {
        console.error(error);
        navigate("/generate", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage />; // Use <LoaderPage /> instead of LoaderPage
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <div /> {/* Empty spacer */}
        <Link to={`/generate/interview/${interviewId}/load`}>
          <Button size="sm">
            Start <Sparkles className="ml-2" size={16} />
          </Button>
        </Link>
      </div>

      {interview && <InterviewPin interview={interview} onMockPage />}

      <Alert className="bg-yellow-100/50 border-yellow-200 p-4 rounded-lg flex items-start gap-3 -mt-3">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <div>
          <AlertTitle className="text-yellow-800 font-semibold">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-yellow-700 mt-1">
            Please enable your webcam and microphone to start the AI-generated
            mock interview. The interview consists of five questions. You&apos;ll
            receive a personalized report based on your responses at the end.{" "}
            <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>

      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebcamEnabled ? (
            <Webcam
              onUserMedia={() => setIsWebcamEnabled(true)}
              onUserMediaError={() => setIsWebcamEnabled(false)}
              className="w-full h-full object-cover rounded-md"
              mirrored
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button onClick={() => setIsWebcamEnabled(!isWebcamEnabled)}>
          {isWebcamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};
