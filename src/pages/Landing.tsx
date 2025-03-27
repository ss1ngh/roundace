import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Upload, Timer, ChevronDown, MessagesSquare } from 'lucide-react';
import bgImage from '@/assets/bg.png'; // Import the spiral background
import phoneVideo from '@/assets/bw revolving blob.mp4';
import uploadVideo from '@/assets/uploadfiles.mp4';
import startInterviewVideo from '@/assets/startinterview.mp4';
import feedbackVideo from '@/assets/instantfeedback.mp4';

export default function Landing() {
  const detailedFeatures = [
    { title: 'Phone Interviews', description: 'Level Up with our AI tech interviewer', icon: Phone, media: phoneVideo, small: true  },
    { title: 'Upload JD with just one click', description: "Upload the Job Description in a single click—no hassle, no fuss", icon: Upload, media: uploadVideo, enlarged: true },
    { title: 'Start interviews in 5 seconds', description: 'Easiest way to practice interviews', icon: Timer, media: startInterviewVideo, enlarged: true },
    { title: 'Instant Feedback', description: 'Keep learning improving', icon: MessagesSquare, media : feedbackVideo, enlarged: true  }
  ];

  return (
    <div className="relative w-full bg-white text-black">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden">
        <img 
          src={bgImage} 
          alt="Background" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        />
        <div className="container px-4 w-full relative z-10">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Tech Interviews Simplified
          </h1>
          <p className="mt-6 text-xl text-gray-600 md:text-2xl">
          Master every round with AI-powered interview prep.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 min-[400px]:flex-row justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full min-[400px]:w-auto bg-black text-white hover:bg-black/90 text-lg px-8">
                Start Practicing
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce text-gray-500">
          <ChevronDown size={40} />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white text-black text-center">
        <h2 className="text-4xl font-bold mb-12 tracking-tight">Features</h2>
        <div className="flex flex-col max-w-6xl mx-auto">
          {detailedFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center md:py-16 text-left ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Video Placeholder */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div
                  className={`relative ${feature.enlarged ? 'scale-125' : feature.small ? 'scale-75' : ''}`}
                  style={{ transformOrigin: 'center' }}
                >
                  <video className="w-full max-w-sm h-48 rounded-xl" autoPlay loop muted>
                    <source src={feature.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Feature Text */}
              <div className="w-full md:w-1/2 px-6">
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-700 mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
