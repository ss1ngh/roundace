import SampleImage from '@/assets/sample-image.jpg';
import InstantFeedback from '@/assets/instantfeedback .mp4';

const Features = () => {
  return (
    <section id="features" className="relative isolate overflow-hidden bg-black">
      {/* 🔮 Background Gradient & Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#8b5cf54d_0%,_transparent_40%)] blur-2xl" />
        <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-indigo-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] right-[15%] w-[240px] h-[240px] bg-violet-500/30 blur-3xl rounded-full" />
      </div>

      <div className="relative m-auto max-w-[90rem] px-24 py-24 z-10">
        {/* Header */}
        <div className="relative">
          <div className="absolute -top-4 left-1/4 w-32 h-32 bg-indigo-700 rounded-full blur-3xl" />
          <div className="absolute -top-4 left-1/3 w-32 h-32 bg-indigo-700 rounded-full blur-3xl" />
          <h2 className="relative text-center text-slate-300 text-6xl/normal font-semibold tracking-tighter mb-32">
            Everything You Need to <br />
            <span className="text-white">Supercharge </span> Your Interview Prep
          </h2>
        </div>

        {/* Real-Time Feedback */}
        <div className="grid grid-cols-2 items-center mb-20 gap-x-16">
          <figure>
            <video src={InstantFeedback} autoPlay muted loop className="relative max-h-[45rem] rounded-xl" />
          </figure>
          <div className="max-w-lg justify-self-end">
            <p className="text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter">Real-Time Feedback</p>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
              Get real-time AI insights on your answers instantly, sharpening your skills to ace every interview with
              ease and step into your dream role with unstoppable confidence.
            </p>
          </div>
        </div>

        {/* Upload JD */}
        <div className="grid grid-cols-2 items-center mb-20 gap-x-16">
          <div className="max-w-lg justify-self-start">
            <p className="text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter">Upload JD in one click</p>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
              Upload your job description, and get AI generated highly tailored, role-specific questions that perfectly
              match your unique job requirements.
            </p>
          </div>
          <figure>
            <img src={SampleImage} className="relative max-h-[50rem] rounded-xl" alt="Upload JD" />
          </figure>
        </div>

        {/* Mock Interview */}
        <div className="grid grid-cols-2 items-center mb-20 gap-x-16">
          <figure>
            <img src={SampleImage} className="relative max-h-[45rem] rounded-xl" alt="Mock Interview" />
          </figure>
          <div className="max-w-lg justify-self-end">
            <p className="text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter">
              Start your mock interview instantly
            </p>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
              Start practicing for interviews in seconds. Simply click to engage in a structured, AI-generated session
              designed to simulate real-world interview experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
