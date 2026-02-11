"use client";

import React from "react";

/**
 * A pill-shaped badge with gradient background
 * @param {Object} props - Component props
 * @param {string} props.text - Text to display in the badge
 * @param {string} props.className - Additional CSS classes
 */
const GradientBadge = ({ text, className = "" }) => {
  return (
    <div
      className={`flex relative justify-center items-center h-[38px] rounded-[36px] w-[164px] ${className}`}
    >
      <div className="absolute inset-0 opacity-30 border border-green bg-[linear-gradient(90deg,rgba(0,230,118,0.60)_0%,rgba(35,247,221,0.60)_100%)] rounded-[36px]" />
      <div className="flex justify-center items-center m-px h-9 bg-gray-900 rounded-[31px] w-[162px]">
        <p className="text-lg font-medium bg-[clip-text]">{text}</p>
      </div>
    </div>
  );
};

export default GradientBadge;
