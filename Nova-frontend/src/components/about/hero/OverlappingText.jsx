import React from "react";

const OverlappingText = ({ text, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <h2 className="z-10 text-white max-md:max-w-full max-md:text-4xl">
        {text}
      </h2>

    </div>
  );
};

export default OverlappingText;
