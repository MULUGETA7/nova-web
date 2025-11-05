import React from "react";
import InnerOrbit from "./InnerOrbit";
import OutlineOrbit from "./OutlineOrbit";
import wavesVideo from '../../assets/gif/waves.mp4';

function GlowingOrb() {
  return (
    <div className="relative mx-auto w-full md:w-[90%] lg:w-[85%] aspect-square scale-[1.4] md:scale-100">
      {/* Gradient Glow effects */}
      <div className="absolute inset-0 bg-[#FF1CF7] bg-opacity-70 rounded-full blur-[90px]" />
      <div className="absolute inset-0 bg-[#00F0FF] bg-opacity-70 rounded-full opacity-90 blur-[18px]" />

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-[30px] md:top-[80px] lg:top-[100px] left-0 w-full rounded-[20px] md:rounded-[40px] lg:rounded-[50px] h-full object-cover"
      >
        <source src={wavesVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Orbits */}
      <div className="flex absolute justify-center items-center bottom-[-220px] left-[-139px] right-[-139px] top-[-60px]">
        <InnerOrbit />
      </div>
      <div className="flex absolute justify-center items-center bottom-[-350px] left-[-252px] right-[-252px] top-[-190px]">
        <OutlineOrbit />
      </div>
    </div>
  );
}

export default GlowingOrb;
