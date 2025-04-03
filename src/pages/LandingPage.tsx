import BackgroundHeroContainer from "@/components/bg-image"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Navbar from "@/components/Navbar"

const LandingPage = () => {
  return(
    <div className="min-h-screen bg-black">
      <div className="max-w-full mx-auto px-1">
        <div className="rounded-b-xl border-t-0 overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <BackgroundHeroContainer>
            <div className="">
              <Header>
                <Navbar/>
                <HeroSection/>
              </Header>
            </div>
          </BackgroundHeroContainer>
        </div>
      </div>
    </div>
  )
}

export default LandingPage