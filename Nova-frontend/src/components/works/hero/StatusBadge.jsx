import React from "react";

const StatusBadge = () => {
  return (
    <div className="flex justify-center items-center px-4 py-2 mb-5 rounded-[46px]">
      <div className="relative">
        {/* Outer glow animation */}
        <div className="absolute -inset-1 bg-green-500 rounded-full opacity-75 animate-ping" />
        
        {/* Main circle */}
        <div className="relative w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse">
          {/* Inner highlight */}
          <div className="absolute top-1 left-1 bg-green-400 rounded-full h-[3px] w-[3px]" />
        </div>
      </div>
      <div className="ml-1 text-sm text-white">Now Partnering on Q3 Web3 & AI Initiatives</div>
    </div>
  );
};

export default StatusBadge;
