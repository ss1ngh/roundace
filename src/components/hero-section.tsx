import { ArrowRight} from "lucide-react"
import heroImage from "@/assets/sample-image.jpg"

const HeroSection = () => {
  return (
    <div className="m-auto grid max-w-[90rem] grid-cols-[5fr_4fr] items-center gap-x-8 px-24 py-30">
        <div className="mb-6">
            <h1 className="text-slate-200 mt-16 mb-6 text-6xl/normal font-semibold tracking-tighter">AI Powered Mock Interviews. Ace your Interview Rounds</h1>
            <p className="text-slate-200 mb-10 text-xl/loose font-semibold-thin">
                Practice with AI, receive instant feedback, <br/>
                and continuously improve your performance
            </p>
            <button className="text-black border-slate-500 bg-blue-500 hover:border-blue-400 hover:bg-blue-300 rounded-xl px-4 py-2 flex items-center">
                <p className="px-2">Get Started</p>
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