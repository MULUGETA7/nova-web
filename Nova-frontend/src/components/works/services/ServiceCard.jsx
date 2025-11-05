"use client";

import React, { useState } from "react";

const ServiceCard = ({
  serviceName,
  imageLeft,
  imageRight,
  altTextLeft,
  altTextRight,
}) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (imageSide) => {
    setHoveredImage(imageSide);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredImage(null);
  };

  return (
    <div className="flex flex-col items-center max-sm:mb-5 relative group">
      <div className="relative mb-5 h-[132px] w-[178px]">
        {/* Left Image */}
        <div
          className="relative z-10"
          onMouseEnter={() => handleMouseEnter('left')}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imageLeft}
            className="absolute border-white border-solid transition-transform -rotate-12 border-[3px] duration-300 ease-in-out h-[69px] left-[18px] top-[31px] w-[99px] hover:scale-110"
            alt={altTextLeft}
          />
        </div>

        {/* Right Image */}
        <div
          className="relative z-10"
          onMouseEnter={() => handleMouseEnter('right')}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imageRight}
            className="absolute border-white border-solid transition-transform border-[3px] duration-300 ease-in-out h-[69px] left-[43px] rotate-[14deg] top-[31px] w-[99px] hover:scale-110"
            alt={altTextRight}
          />
        </div>

        {/* Hover Card */}
        {isHovering && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full z-20">
            <div className="relative bg-white rounded-lg shadow-2xl p-4 w-[300px] h-[300px] transition-all duration-300 transform">
              <div className="absolute inset-0  rounded-lg" />
              <img
                src={hoveredImage === 'left' ? imageLeft : imageRight}
                alt={hoveredImage === 'left' ? altTextLeft : altTextRight}
                className="w-full h-full object-fit rounded-lg border-4 border-white"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 rounded-b-lg">
                <h3 className="text-white text-lg font-bold text-center">
                  {serviceName}
                </h3>
              </div>
              {/* Decorative triangle */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-white clip-triangle" />
            </div>
          </div>
        )}
      </div>

      <div className="text-base text-center text-white relative z-10">
        {serviceName}
      </div>

      <style jsx global>{`
        .clip-triangle {
          clip-path: polygon(50% 100%, 0 0, 100% 0);
        }
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
        }
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;