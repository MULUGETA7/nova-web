import React from "react";
import HeroImage from "./HeroImage";
import NovaLabsHead from "./NovaLabsHead";

const ImageComponent = () => {
  return (
    <div className="relative">
      {/* Section 1: Hero content centered over video */}
      <div className="w-full h-screen relative z-10 flex items-center justify-center overflow-hidden">
        <HeroImage />
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <NovaLabsHead />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
