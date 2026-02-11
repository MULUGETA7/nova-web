import React from "react";
import HeroImage from "./HeroImage";
import HeroSection from "./HeroSection";

const ImageComponent = () => {  
  return (
    <div className="relative">
      {/* First Screen - Hero Image and Video */}
        <div className="w-full relative z-10">
          <HeroImage /> 
        </div>

      {/* Second Screen - Integrated Components */}
      <div className="min-h-screen flex flex-col items-center justify-center relative ">
        {/* Background Title */}

        {/* Content Layer */}
        <div className="relative z-10 w-full">
          {/* Hero Section (which includes NovaLabsHead) */}
          <div className="mb-32">
            <HeroSection /> {/* Replaced NovaLabsHead with HeroSection */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
