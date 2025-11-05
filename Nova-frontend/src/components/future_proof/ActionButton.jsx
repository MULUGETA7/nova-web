"use client";
import React from "react";
import ArrowIcon from "./ArrowIcon";

function ActionButton({ text, onClick }) {
  return (
    <button
      className="flex gap-2 justify-center items-center px-5 py-3.5 bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff] rounded-xl transition-opacity hover:opacity-90 ease-in-out cursor-pointer"
      onClick={onClick}
    >
      <span className="text-sm font-medium leading-7 text-stone-950">
        {text}
      </span>
      <ArrowIcon />
    </button>
  );
}

export default ActionButton;
