import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react";

import startInterview from '@/assets/startInterviews.mp4'

const HeroSection = () => {
  const {isSignedIn, isLoaded} = useUser();
  const navigate = useNavigate();

  return (
    <div className="relative isolate overflow-hidden">
      
      <div className="absolute inset-0 -z-10 rounded-b-[2rem] bg-[linear-gradient(to_bottom,_transparent_50%,_#8b5cf54d_70%,_#8f68f3_100%)]" />

      <div className="m-auto grid max-w-[90rem] grid-cols-[5fr_4fr] items-center gap-x-12 px-24 py-20">
        <div>
          <h1 className="text-slate-200 mt-8 mb-6 text-6xl/normal font-semibold tracking-tighter">
            AI-Powered Mock Interviews. Ace your Interview Rounds
          </h1>
          <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
            Practice with AI, receive instant feedback, <br />
            and continuously improve your performance
          </p>
          {isLoaded && isSignedIn ? (
            <button
            onClick={() => navigate("/generate")}
            className="text-white border border-white/30 bg-white/30 hover:bg-white/20 
                      hover:border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center w-fit gap-x-2
                      transition-all"
          >
            <p className="px-2 font-mono">Take an Interview</p>
            <ArrowRight />
            </button>
          ) : (
            <button
            onClick={() => navigate("/signup")}
            className="text-white border border-white/30 bg-white/30 hover:bg-white/20 
                      hover:border-white/10 backdrop-blur-lg rounded-xl px-4 py-2 flex items-center w-fit gap-x-2
                      transition-all"
          >
            <p className="px-2 font-mono">Get Started</p>
            <ArrowRight />
          </button>
          )}
        </div>

        <div>
        <video
            src={startInterview} 
            autoPlay muted loop playsInline
            className='rounded-3xl max-h-fit'
            />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
