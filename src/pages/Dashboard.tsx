import { Plus, Calendar, Upload, Trash2 } from "lucide-react";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { Interview } from "../types";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const FormMockInterview = lazy(() => import("@/components/mock-interview-form"));

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [interviewToDelete, setInterviewToDelete] = useState<string | null>(null);
  const { userId } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching interviews:", error);
        toast.error("Error", {
          description: "Something went wrong. Try again later.",
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const handleInterviewClick = (interviewId: string) => {
    navigate(`/generate/interview/${interviewId}/load`);
  };

  const handleNewInterview = () => {
    setIsDialogOpen(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteInterview = async () => {
    if (!interviewToDelete) return;

    try {
      await deleteDoc(doc(db, "interviews", interviewToDelete));
      toast.success("Deleted!", { description: "Interview deleted successfully." });
      setInterviewToDelete(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Error", { description: "Failed to delete interview. Try again." });
    }
  };

  const handleOpenDeleteDialog = (interviewId: string) => {
    setInterviewToDelete(interviewId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setInterviewToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const stats = [
    { icon: Calendar, label: "Total Interviews", value: interviews.length },
  ];

  return (
    <div className="min-h-screen bg-black relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8b5cf54d_0%,_transparent_40%)] blur-3xl" />
        <div className="absolute top-[-10%] left-[40%] w-[200px] h-[200px] bg-violet-500/30 blur-2xl rounded-full" />
      </div>

      <div className="pt-6">
        <Navbar />
      </div>

      <div className="relative m-auto max-w-[90rem] px-8 md:px-24 py-12 pb-[120px]">
        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute -top-4 left-1/4 w-32 h-2 bg-indigo-500/30 blur-3xl" />
          <div className="absolute -top-4 left-1/3 w-24 h-28 bg-violet-500/30 blur-3xl" />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-slate-200 text-4xl font-semibold tracking-tight mb-2">
                Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Track and manage your AI mock interviews
              </p>
            </div>
            <Button
              onClick={handleNewInterview}
              className="text-white/20 border bg-white/20 hover:text-white
                border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center gap-x-2
                transition-all mt-4"
            >
              <Plus size={12} />
              <span className="font-mono text-white">New Interview</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-all">
                  <stat.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-slate-200 text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interview List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6 animate-pulse space-y-4"
              >
                <div className="h-6 bg-white/10 rounded w-2/3" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
                <div className="h-2 bg-white/10 rounded w-full" />
              </div>
            ))}
          </div>
        ) : interviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6
                  hover:bg-white/10 transition-all cursor-pointer relative"
              >
                <div
                  onClick={() => handleInterviewClick(interview.id)}
                  className="mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-slate-200 font-semibold">
                      {interview.position}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400">
                      {interview.experience}+ YOE
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{interview.techStack}</p>
                </div>
                <div className="h-2 bg-white/10 rounded-full" />
                <button
                  onClick={() => handleOpenDeleteDialog(interview.id)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white"
                  aria-label="Delete interview"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
            <h2 className="text-lg font-semibold text-slate-200">
              No Interviews Found
            </h2>
            <p className="w-full md:w-96 text-center text-sm text-slate-400 mt-4">
              There are no available interviews to show. Please create a new mock interview to get started.
            </p>
          </div>
        )}
      </div>

      {/* file upload */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white/5 backdrop-blur-lg border border-indigo-500/30 rounded-xl text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-200">Upload Job Description</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {!selectedFile ? (
              <>
                <p className="text-slate-400 text-sm">
                  Please upload a .txt or .pdf file containing the job description.
                </p>
                <Button
                  onClick={handleUploadClick}
                  className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/50 rounded-lg flex items-center gap-2"
                >
                  <Upload size={16} />
                  Upload File
                </Button>
                <input
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </>
            ) : (
              <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
                <FormMockInterview
                  initialData={null}
                  file={selectedFile}
                  onComplete={handleDialogClose}
                />
              </Suspense>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white/5 backdrop-blur-lg border border-indigo-500/30 rounded-xl text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-200">Delete Interview</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this interview? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleCloseDeleteDialog}
              className="bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteInterview}
              className="bg-white-500/20 hover:bg-red-500/30 text-white-400 border border-white-500/50"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;