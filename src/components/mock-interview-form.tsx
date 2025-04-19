import Navbar from "@/components/Navbar";
import { Interview } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader } from "lucide-react";
import { db } from "@/config/firebase.config";
import { addDoc, collection, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { generateAIContent } from "@/scripts";
import { debounce } from "lodash";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

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

const generateAiResponse = async (data: FormData) => {
  const prompt = `
      As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

      [
        { "question": "<Question text>", "answer": "<Answer text>" },
        ...
      ]

      Job Information:
      - Job Position: ${data?.position}
      - Job Description: ${data?.description}
      - Years of Experience Required: ${data?.experience}
      - Tech Stacks: ${data?.techStack}

      The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
      `;
  
  try {
    const aiResult = await generateAIContent(prompt);
    return cleanAiResponse(aiResult);
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate interview questions. Please try again.");
  }
};

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData
    ? initialData.position
    : "Create a new mock interview";

  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  const debouncedSubmit = debounce(async (data: FormData) => {
    try {
      setLoading(true);

      let aiResult;
      try {
        console.log(`Submitting form at ${new Date().toISOString()}`);
        aiResult = await generateAiResponse(data);
      } catch (error: any) {
        console.error('AI Generation error:', error);
        if (error.message.includes('Rate limit')) {
          toast.error('Rate Limit Exceeded', {
            description: 'Too many requests to the AI service. Please wait a minute and try again.',
          });
        } else {
          toast.error('AI Generation Failed', {
            description: 'Unable to generate interview questions. Please try again later.',
          });
        }
        return;
      }

      if (!aiResult || !Array.isArray(aiResult)) {
        toast.error('Invalid AI Response', {
          description: 'Please try again.',
        });
        return;
      }

      if (initialData) {
        await updateDoc(doc(db, "interviews", initialData.id), {
          questions: aiResult,
          ...data,
          updatedAt: serverTimestamp(),
        });
        navigate(`/generate/interview/${initialData.id}/load`, { replace: true });
      } else {
        const newInterviewRef = await addDoc(collection(db, "interviews"), {
          ...data,
          userId,
          questions: aiResult,
          createdAt: serverTimestamp(),
        });
        navigate(`/generate/interview/${newInterviewRef.id}/load`, { replace: true });
      }

      toast(toastMessage.title, { description: toastMessage.description });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Error', {
        description: 'Failed to save the interview. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }, 1000);

  const onSubmit = (data: FormData) => {
    debouncedSubmit(data);
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  return (
    <div className="min-h-screen bg-black relative isolate overflow-hidden flex flex-col">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8b5cf54d_0%,_transparent_40%)] blur-3xl" />
        {/* <div className="absolute top-[-10%] left-[40%] w-[200px] h-[200px] bg-violet-500/30 blur-2xl rounded-full" /> */}
      </div>

      <div className="pt-2">
        <Navbar />
      </div>

      <div className="flex-1 overflow-auto px-6 py-6 md:px-16 md:py-8 max-w-5xl mx-auto w-full">
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-200 tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              {initialData
                ? "Update your mock interview details."
                : "Fill out the details to generate a personalized AI interview."}
            </p>
          </div>

          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-md flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-slate-300">Job Position</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Frontend Developer"
                        className="bg-black/30 text-white border-white/10"
                        disabled={loading}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-slate-300">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe the role..."
                        className="bg-black/30 text-white border-white/10"
                        disabled={loading}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-slate-300">Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="e.g. 3"
                        className="bg-black/30 text-white border-white/10"
                        disabled={loading}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="techStack"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-slate-300">Tech Stack</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g. React, Node.js, TypeScript..."
                        className="bg-black/30 text-white border-white/10"
                        disabled={loading}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="reset"
                  variant="outline"
                  disabled={isSubmitting || loading}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || loading}
                >
                  {loading ? (
                    <Loader className="animate-spin text-white" size={20} />
                  ) : (
                    actions
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormMockInterview;
