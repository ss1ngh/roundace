import React from 'react';
// Import your gradient background image with the correct filename
import gradientBackground from "@/assets/moon-gradient-bg.png";

type BackgroundHeroContainerProps = {
  children: React.ReactNode;
  backgroundImage?: string;
  height?: string;
};

const BackgroundHeroContainer: React.FC<BackgroundHeroContainerProps> = ({
  children,
  backgroundImage = gradientBackground,
  height = "95vh"
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div 
        className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          height: height
        }}
      />
      
      {/* Content positioned above the background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundHeroContainer;