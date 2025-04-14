import SampleImage from '@/assets/sample-image.jpg';

const Features = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 rounded-[2rem] border border-white/40" />

      <div
        className="absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background: 'linear-gradient(to top, #4f46e5 80%, #8f68f3 100%)',
        }}
      />

      {/* Inner content (padded) */}
      <div className="relative m-auto max-w-[90rem] px-24 py-24 z-10">
        <h2 className="text-center text-slate-300 text-6xl/normal font-semibold tracking-tighter mb-32">
          Everything You Need to <br />
          <span className="text-white">Supercharge </span> Your Interview Prep
        </h2>

        {/* Feature 1 */}
        <div className="grid grid-cols-2 items-center mb-20 gap-x-16">
          <figure>
            <img
              src={SampleImage}
              className="relative max-h-[45rem] rounded-xl"
              alt="Real-Time Feedback"
            />
          </figure>
          <div className="max-w-lg justify-self-end">
            <p className="text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter">Real-Time Feedback</p>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
              Get real-time AI insights on your answers instantly, sharpening your skills to ace every interview with ease and step into your dream role with unstoppable confidence.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-2 items-center mb-20 gap-x-16">
          <div className="max-w-lg justify-self-start">
            <p className="text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter">Upload JD in one click</p>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
              Upload your job description, and get AI generated highly tailored, role-specific questions that perfectly match your unique job requirements.
            </p>
          </div>
          <figure>
            <img
              src={SampleImage}
              className="relative max-h-[50rem] rounded-xl"
              alt="Upload JD"
            />
          </figure>
        </div>

        {/* Feature 3 */}
        <div className="grid grid-cols-2 items-center mb-20 gap-x-16">
          <figure>
            <img
              src={SampleImage}
              className="relative max-h-[45rem] rounded-xl"
              alt="Mock Interview"
            />
          </figure>
          <div className="max-w-lg justify-self-end">
            <p className="text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter">Start your mock interview instantly</p>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
              Start practicing for interviews in seconds. Simply click to engage in a structured, AI-generated session designed to simulate real-world interview experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
