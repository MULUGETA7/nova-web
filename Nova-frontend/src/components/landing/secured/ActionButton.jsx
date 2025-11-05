"use client";

import React from "react";

/**
 * A button component with primary and secondary variants
 * @param {Object} props - Component props
 * @param {string} props.text - Button text
 * @param {React.ReactNode} props.icon - Icon to display after text
 * @param {boolean} props.isPrimary - Whether to use primary styling
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler
 */
const ActionButton = ({
  text,
  icon,
  isPrimary = false,
  className = "",
  onClick = () => {},
}) => {
  const baseClasses =
    "flex gap-4 justify-center items-center px-5 py-3 rounded-xl cursor-pointer h-[50px]";
  const primaryClasses = "bg-[#FF1CF7]";
  const secondaryClasses = "bg-[#00F0FF]";
  const textClasses = isPrimary
    ? "text-lg font-semibold text-white"
    : "text-lg font-medium text-zinc-950";

  return (
    <button
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses} ${className}`}
      onClick={onClick}
    >
      <span className={textClasses}>{text}</span>
      {icon && <div>{icon}</div>}
    </button>
  );
};

export default ActionButton;
