import React, { useEffect, useRef } from "react";

export default function HeroImage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center relative w-full h-screen">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover absolute inset-0"
        onError={(e) => console.error("Video error:", e)}
              >
                <source 
                  src={encodeURI("/videoplayback (online-video-cutter.com).mp4")}
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>
  );
}