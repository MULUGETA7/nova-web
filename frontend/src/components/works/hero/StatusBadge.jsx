import React from "react";

const StatusBadge = () => {
  return (
    <div className="flex justify-center items-center px-4 py-2 mb-8 rounded-[46px] bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="relative mr-3">
        {/* Outer glow animation */}
        <div className="absolute -inset-1 bg-green-500 rounded-full opacity-75 animate-ping" />

        {/* Main circle */}
        <div className="relative w-2 h-2 bg-green-500 rounded-full">
          {/* Inner highlight */}
          <div className="absolute top-0.5 left-0.5 bg-green-200 rounded-full h-[2px] w-[2px]" />
        </div>
      </div>
      <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Now Partnering on Q3 Web3 & AI Initiatives</div>
    </div>
  );
};

export default StatusBadge;
