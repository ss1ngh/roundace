// src/pages/LandingPage.tsx
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Navbar from "@/components/Navbar"
import Reviews from "@/components/reviews"

const LandingPage = () => {
  return(
    <div className="min-h-screen relative">
      {/* gradient background */}
      <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      {/* hero section */}
      <div className="relative h-full">
        <div className="max-w-full mx-auto px-6 py-4">
            <Header>
                <Navbar/>
              <HeroSection/>
              <Reviews/>
            </Header>
          </div>
        </div>
      </div>
  )
}

export default LandingPage