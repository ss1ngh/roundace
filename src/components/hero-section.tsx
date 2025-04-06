import { ArrowRight} from "lucide-react"
import heroImage from "@/assets/sample-image.jpg"

const HeroSection = () => {
  return (
    <div className="m-auto grid max-w-[90rem] grid-cols-[5fr_4fr] items-center gap-x-12 px-24 py-6">
        <div className="6">
            <h1 className="text-slate-200 mt-16 mb-6 text-6xl/normal font-semibold tracking-tighter">AI-Powered Mock Interviews. Ace your Interview Rounds</h1>
            <p className="text-slate-300 mb-10 text-xl/loose font-semibold-thin">
                Practice with AI, receive instant feedback, <br/>
                and continuously improve your performance
            </p>
            <button 
                className="text-white border border-white/10 bg-white/20 hover:bg-white/30 
                            backdrop-blur-lg rounded-xl px-4 py-2 flex items-center w-fit gap-x-2
                            transition-all">
                <p className="px-2 font-mono">Get Started</p>
                <ArrowRight/>
            </button>
        </div>

        <div>
            <div/>
            <img
            src={heroImage}
            alt="Sample Image"
            className="relative max-h-[30rem] justify-self-end rounded-xl"
            />
        </div>
    </div>
  )
}

export default HeroSection