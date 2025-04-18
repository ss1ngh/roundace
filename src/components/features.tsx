import SampleImage from '@/assets/sample-image.jpg';

const Features = () => {
  return (
    <section id='features' className="relative isolate overflow-hidden min-h-screen py-24 px-4 md:px-24 bg-black">
      
      <div className="absolute inset-0 -z-20">
  
        <div className="absolute inset-0 bg-gradient-to-t from-[#3f38bc] via-[#aba8da] to-[#8f68f3] opacity-[0.07]" />

        <div className="absolute -top-32 left-1/3 w-[45rem] h-[30rem] bg-[#9894d0] opacity-30 rounded-full blur-[10rem]" />
        
        <div className="absolute top-0 right-1/4 w-[35rem] h-[25rem] bg-[#9d92ba] opacity-20 rounded-full blur-[10rem]" />
      </div>

      
      <div className="absolute inset-0 -z-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 m-auto max-w-[90rem]">
        <h2 className="text-center text-slate-300 text-6xl font-semibold tracking-tighter mb-32">
          Everything You Need to <br />
          <span className="text-white">Supercharge </span> Your Interview Prep
        </h2>

        {/* Feature #1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-20 gap-x-16">
          <figure>
            <img
              src={SampleImage}
              className="relative max-h-[45rem] rounded-xl shadow-xl shadow-violet-500/30"
              alt="Real-Time Feedback"
            />
          </figure>
          <div className="max-w-lg justify-self-end">
            <p className="text-slate-200 mb-6 text-4xl font-semibold tracking-tight">Real-Time Feedback</p>
            <p className="text-slate-300 text-xl font-light">
              Get real-time AI insights on your answers instantly, sharpening your skills to ace every interview with ease and step into your dream role with unstoppable confidence.
            </p>
          </div>
        </div>

        {/* Feature #2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-20 gap-x-16">
          <div className="max-w-lg justify-self-start order-2 md:order-1">
            <p className="text-slate-200 mb-6 text-4xl font-semibold tracking-tight">Upload JD in one click</p>
            <p className="text-slate-300 text-xl font-light">
              Upload your job description, and get AI-generated, highly tailored questions that perfectly match your unique job requirements.
            </p>
          </div>
          <figure className="order-1 md:order-2">
            <img
              src={SampleImage}
              className="relative max-h-[50rem] rounded-xl shadow-xl shadow-purple-600/30"
              alt="Upload JD"
            />
          </figure>
        </div>

        {/* Feature #3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-20 gap-x-16">
          <figure>
            <img
              src={SampleImage}
              className="relative max-h-[45rem] rounded-xl shadow-xl shadow-indigo-500/30"
              alt="Mock Interview"
            />
          </figure>
          <div className="max-w-lg justify-self-end">
            <p className="text-slate-200 mb-6 text-4xl font-semibold tracking-tight">Start your mock interview instantly</p>
            <p className="text-slate-300 text-xl font-light">
              Start practicing for interviews in seconds. Just click to engage in a structured, AI-generated session designed to simulate real-world interviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
