// src/pages/LandingPage.tsx
import Header from "@/sections/header";
import HeroSection from "@/sections/hero-section";
import Navbar from "@/components/Navbar";
import Features from "@/sections/features";
import Main from "@/sections/main-section";
import FAQs from "@/sections/faqs/FAQs";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // small timeout in case transition/page load is async
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen relative">
      <div className="relative">
        <div className="max-w-full mx-auto px-6 pt-6">
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