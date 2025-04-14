// src/pages/LandingPage.tsx
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/Navbar";
import Features from "@/components/features";
import Main from "@/components/main-section";
import FAQs from "@/components/faqs/FAQs";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <div className="relative">
        <div className="max-w-full mx-auto px-6 py-4">
          <Header>
            <Navbar />
            <HeroSection />
          </Header>
        </div>
      </div>

      <div className="relative">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_90%,#000_40%,#63e_100%)]" />
        <div className="max-w-full mx-auto px-6 py-4">
          <Main>
            <Features/>
          </Main>
        </div>
      </div>


      <div className="relative">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_90%,#000_40%,#63e_100%)]" />
        <div className="max-w-full mx-auto px-6 py-4">
          <Main>
            <FAQs/>
          </Main>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;