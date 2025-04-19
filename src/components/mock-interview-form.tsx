import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { db } from "@/config/firebase.config";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { parseJobDescription, generateAIContent } from "@/scripts";
import { Interview } from "@/types";
import { Button } from "./ui/button";
import pdfToText from 'react-pdftotext';

interface FormMockInterviewProps {
  initialData: Interview | null;
  file: File | null;
  onComplete: () => void; // Callback to close the dialog
}

const cleanAiResponse = (responseText: string) => {
  try {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|`)/g, "");
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (!jsonArrayMatch) {
      throw new Error("No JSON array found in response");
    }
    return JSON.parse(jsonArrayMatch[0]);
  } catch (error) {
    console.error("Error cleaning AI response:", error);
    throw new Error("Failed to parse AI response");
  }
};

const generateAiResponse = async (data: {
  position: string;
  description: string;
  experience: number;
  techStack: string;
}) => {
  const prompt = `
    As an experienced prompt engineer, generate a JSON array containing 5 unique, random technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

    [
      { "question": "<Question text>", "answer": "<Answer text>" },
      ...
    ]

    Job Information:
    - Job Position: ${data.position}
    - Job Description: ${data.description}
    - Years of Experience Required: ${data.experience}
    - Tech Stacks: ${data.techStack}

    The questions should:
    - Assess skills in ${data.techStack} development, best practices, problem-solving, and experience handling complex requirements.
    - Be randomly generated, unique, and not based on a predefined set.
    - Vary in type (e.g., coding, system design, behavioral, algorithmic).
    - Be relevant to the job position and tech stack.

    Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
  `;

  try {
    const aiResult = await generateAIContent(prompt);
    return cleanAiResponse(aiResult);
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate interview questions. Please try again.");
  }
};

const FormMockInterview = ({ initialData, file, onComplete }: FormMockInterviewProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const processJobDescription = async () => {
    if (!file) {
      toast.error("No file uploaded", {
        description: "Please upload a job description file.",
      });
      return;
    }

    setLoading(true);
    try {
      let jobDescriptionText = '';
      if (file.type === 'application/pdf') {
        jobDescriptionText = await pdfToText(file);
        if (!jobDescriptionText.trim()) {
          throw new Error("No text extracted from PDF");
        }
      } else {
        jobDescriptionText = await file.text();
      }

      const parsedData = await parseJobDescription(jobDescriptionText);
      const aiResult = await generateAiResponse(parsedData);

      if (!aiResult || !Array.isArray(aiResult)) {
        toast.error("Invalid AI Response", {
          description: "Please try again.",
        });
        return;
      }

      if (initialData) {
        await updateDoc(doc(db, "interviews", initialData.id), {
          questions: aiResult,
          ...parsedData,
          updatedAt: serverTimestamp(),
        });
        navigate(`/generate/interview/${initialData.id}/load`, { replace: true });
        toast("Updated..!", { description: "Changes saved successfully..." });
      } else {
        const newInterviewRef = await addDoc(collection(db, "interviews"), {
          ...parsedData,
          userId,
          questions: aiResult,
          createdAt: serverTimestamp(),
        });
        navigate(`/generate/interview/${newInterviewRef.id}/load`, { replace: true });
        toast("Created..!", { description: "New Mock Interview created..." });
      }

      onComplete(); // Close the dialog
    } catch (error) {
      console.error("Error processing job description:", error);
      toast.error("Processing Failed", {
        description: "Unable to process the job description. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-slate-400 text-sm">
        {initialData
          ? "Upload a new job description to update the interview."
          : `Processing ${file?.name || 'uploaded job description'}...`}
      </p>
      {file && (
        <Button
          onClick={processJobDescription}
          disabled={loading}
        >
          {loading ? (
            <Loader className="animate-spin text-white" size={20} />
          ) : (
            initialData ? "Update Interview" : "Generate Interview"
          )}
        </Button>
      )}
    </div>
  );
};

export default FormMockInterview;