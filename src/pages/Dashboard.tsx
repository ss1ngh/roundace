import { Plus, Clock, Calendar, BarChart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Interview } from '../types';
import { toast } from 'sonner';
import Navbar from '../sections/Navbar';

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const navigate = useNavigate(); // Add useNavigate for navigation

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
        console.log("Error on fetching: ", error);
        toast.error("Error", {
          description: "Something went wrong. Try again later.",
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const totalPracticeTime = interviews.length * 0.5;
  const totalQuestions = interviews.reduce((acc, curr) => acc + curr.questions.length, 0);

  // Add handler to navigate to InterviewLoadPage
  const handleInterviewClick = (interviewId: string) => {
    navigate(`/generate/interview/${interviewId}/load`);
  };

  return (
    <div className="min-h-screen bg-black relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4f46e5_0%,_transparent_50%)] opacity-30" />
      </div>

      <div className="pt-6">
        <Navbar />
      </div>

      <div className="relative m-auto max-w-[90rem] px-8 md:px-24 py-12">
        {/* Header section */}
        <div className="relative mb-12">
          <div className="absolute -top-4 left-1/4 w-32 h-28 bg-indigo-700 rounded-full blur-3xl" />
          <div className="absolute -top-4 left-1/3 w-24 h-28 bg-indigo-700 rounded-full blur-3xl" />
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-slate-200 text-4xl/normal font-semibold tracking-tighter mb-2">
                Interview Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Track and manage your AI mock interviews
              </p>
            </div>
            <Link to="/generate/create" className="mt-4">
              <button className="text-white/20 border bg-white/20 hover:text-white
                        border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center gap-x-2
                        transition-all">
                <Plus size={12} />
                <span className="font-mono text-white">New Interview</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Clock, label: "Total Practice Time", value: `${totalPracticeTime} hrs` },
            { icon: Calendar, label: "Total Interviews", value: interviews.length.toString() },
            { icon: BarChart, label: "Total Questions", value: totalQuestions.toString() }
          ].map((stat, index) => (
            <div key={index} className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6
                        hover:bg-white/10 transition-all group">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded mb-4" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : interviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="border border-white/10 bg-white/5 backdrop-blur-lg rounded-xl p-6
                         hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => handleInterviewClick(interview.id)} // Add onClick handler
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-slate-200 font-semibold">{interview.position}</h3>
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                    {interview.experience}+ YOE
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{interview.techStack}</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${(interview.questions.length / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-slate-200 text-sm">{interview.questions.length} Q's</span>
                </div>
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