import SampleImage from '@/assets/sample-image.jpg'

const Features = () => {
  return (
    <section className='overflow-hidden'>
        <div className='relative m-auto max-w-[90rem] px-24 py-24'>
            <h2 className='text-center text-slate-300 text-6xl/normal font-semibold tracking-tighter mb-32'> 
                Everything You Need to <br/>
                <span className='text-[#ffff]'>Supercharge </span> Your Interview Prep
            </h2>

            <div className='grid grid-cols-2 items-center mb-20 gap-x-16'>
                <figure>
                    <img src={SampleImage}
                        className="relative max-h-[45rem] rounded-xl"/>
                </figure>
                <div className='max-w-lg justify-self-end'>
                    <p className=' text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter'>Real-Time Feedback</p>
                    <p  className= 'text-slate-300 mb-10 text-xl/loose font-semibold-thin'>Get real-time AI insights on your answers instantly, sharpening your skills to ace every interview with ease and step into your dream role with unstoppable confidence.</p>
                </div>
            </div>
            <div className='grid grid-cols-2 items-center mb-20 gap-x-16'>
                <div className='max-w-lg justify-self-start'>
                    <p className='text-slate-200 mb-12 text-4xl/8 font-semibold tracking-tighter'>Upload JD in one click</p>
                    <p className='text-slate-300 mb-10 text-xl/loose font-semibold-thin'>Upload your job description, and get AI generated highly tailored, role-specific questions that perfectly match your unique job requirements.</p>
                </div>
                <figure>
                    <img src={SampleImage} 
                    className="relative max-h-[50rem] rounded-xl" />
                </figure>
            </div>
        </div>
    </section>
  )
}

export default Features