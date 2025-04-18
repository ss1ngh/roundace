import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Lightbulb, Sparkles, Webcam as WebcamIcon } from "lucide-react";
import { db } from "../config/firebase.config";
import { Interview } from "../types/index";
import { LoaderPage } from "./LoaderPage";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { InterviewPin } from "../components/pin";
import { toast } from "sonner";

export const InterviewLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null); // Track webcam error
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        if (!interviewId) {
          console.log("No interviewId provided, navigating to /generate");
          navigate("/generate", { replace: true });
          return;
        }

        const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
        if (interviewDoc.exists()) {
          console.log("Interview fetched:", interviewDoc.data());
          setInterview({
            id: interviewDoc.id,
            ...interviewDoc.data(),
          } as Interview);
        } else {
          console.log("Interview not found, navigating to /generate");
          navigate("/generate", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
        navigate("/generate", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia not supported in this browser");
      toast.error("Browser Unsupported", {
        description: "Your browser does not support webcam access. Please use Chrome or Edge.",
      });
      setWebcamError("Browser does not support webcam access.");
    }
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
      });
      console.log("Native webcam stream accessed:", stream);
      setWebcamStream(stream);
      setIsWebcamEnabled(true);
      setWebcamError(null); // Clear any previous error
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error: any) {
      console.error("Native webcam error:", error);
      setIsWebcamEnabled(false);
      if (error.name === "NotFoundError") {
        setWebcamError("No webcam device found. You can still proceed with the interview without a webcam.");
        toast.warning("Webcam Not Found", {
          description: "No webcam device was found. You can proceed without a webcam as it is optional.",
        });
      } else if (error.name === "NotAllowedError") {
        setWebcamError("Webcam access denied. Please grant permissions to use your webcam.");
        toast.error("Webcam Access Denied", {
          description: "Please grant permissions to access your webcam and try again.",
        });
      } else {
        setWebcamError("Failed to access webcam. Please try again.");
        toast.error("Webcam Error", {
          description: "An unexpected error occurred while accessing the webcam.",
        });
      }
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
      setIsWebcamEnabled(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const toggleWebcam = () => {
    if (isWebcamEnabled) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <div />
        <Link to={`/generate/interview/${interviewId}/start`}>
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
            mock interview. The interview consists of five questions. You'll
            receive a personalized report based on your responses at the end.{" "}
            <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>

      {webcamError && (
        <Alert className="bg-red-100/50 border-red-200 p-4 rounded-lg flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-red-600" />
          <div>
            <AlertTitle className="text-red-800 font-semibold">
              Webcam Issue
            </AlertTitle>
            <AlertDescription className="text-sm text-red-700 mt-1">
              {webcamError}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebcamEnabled ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button onClick={toggleWebcam}>
          {isWebcamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};