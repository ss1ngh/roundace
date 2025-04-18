import { Plus, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { Interview } from "../types";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const navigate = useNavigate();

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

  const stats = [
    { icon: Calendar, label: "Total Interviews", value: interviews.length },
  ];

  return (
    <div className="min-h-screen bg-black relative isolate overflow-hidden">
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#6366f1_0%,_transparent_40%)] opacity-30 blur-2xl" />
        <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-indigo-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[15%] w-[240px] h-[240px] bg-violet-500/30 blur-3xl rounded-full" />
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
            <Link to="/generate/create">
              <button className="text-white/20 border bg-white/20 hover:text-white
                  border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center gap-x-2
                  transition-all mt-4">
                <Plus size={12} />
                <span className="font-mono text-white">New Interview</span>
              </button>
            </Link>
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
                onClick={() => handleInterviewClick(interview.id)}
                className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6
                  hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-slate-200 font-semibold">
                    {interview.position}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                    {interview.experience}+ YOE
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{interview.techStack}</p>
                <div className="h-2 bg-white/10 rounded-full" />
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
    </div>
  );
};

export default Dashboard;
