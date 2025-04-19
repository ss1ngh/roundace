/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Lightbulb, Sparkles, Webcam } from "lucide-react";
import { db } from "../config/firebase.config";
import { Interview } from "../types/index";
import { LoaderPage } from "./LoaderPage";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export const InterviewLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [,setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      setWebcamStream(stream);
      setIsWebcamEnabled(true);
      setWebcamError(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error: any) {
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
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="max-h-100vh bg-black relative isolate overflow-hidden">
      <div className="pt-5">
        <Navbar />
      </div>
      <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-700 rounded-full blur-3xl opacity-20 -z-10" />

      </div>

      <div className="relative m-auto max-w-[90rem] px-8 md:px-24 py-12 flex flex-col gap-8">
        <div className="w-full">
        <Alert className="bg-white/5 backdrop-blur-lg border border-indigo-500/30 rounded-xl flex items-start gap-3 py-3 px-3">
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

        {webcamError && (
          <div className="w-full">
            <Alert className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl flex items-start gap-3 py-3 px-3 hover:bg-white/10 transition-all">
              <Lightbulb className="h-5 w-5 text-indigo-400" />
              <div>
                <AlertTitle className="text-slate-200 font-semibold text-sm">
                  Webcam Issue
                </AlertTitle>
                <AlertDescription className="text-xs text-slate-400 mt-0.5 leading-tight">
                  {webcamError}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full gap-6 mt-7">
        <div className="absolute left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-700 rounded-full blur-3xl opacity-20 -z-10" />
          <div className="w-full max-w-xs h-[300px] border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden transition-all">
            {isWebcamEnabled ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              
              <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_#4f46e5_0%,_transparent_50%)] opacity-20">
                <Webcam className="h-24 w-24 text-indigo-400/50" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={toggleWebcam}
              className="text-white/20 border bg-white/20 hover:text-white border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center gap-x-2 transition-all"
            >
              <Webcam size={16} />
              <span className="font-mono text-white">
                {isWebcamEnabled ? "Disable Webcam" : "Enable Webcam"}
              </span>
            </button>
            <Link to={`/generate/interview/${interviewId}/start`}>
              <button className="text-white/20 border bg-white/20 hover:text-white border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center gap-x-2 transition-all">
                <Sparkles size={16} />
                <span className="font-mono text-white">Start Interview</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};