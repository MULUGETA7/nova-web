"use client";
import React from "react";

import { Icon } from "@iconify/react";

// Add different avatar images for each FAQ
const avatarImages = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
];

const FAQItem = ({ question, answer, isExpanded, onClick, avatarIndex = 0 }) => {
  return (
    <div className={`relative ${isExpanded ? "mb-12" : "mb-3.5"}`}>
      <div
        className={`flex ${isExpanded ? "justify-between items-start" : "justify-end items-center"}`}
      >
        {isExpanded ? (
          <>
            <div className="flex justify-center items-center w-11 h-11 rounded-full bg-neutral-900">
              <Icon icon="mdi:minus" className="text-white" />
            </div>
            <div className="p-5 ml-2 text-sm tracking-normal text-white rounded-3xl bg-neutral-900">
              {question}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onClick}
              className="flex relative justify-center items-center w-11 h-11 rounded-full border border-zinc-300"
              aria-expanded={isExpanded}
              aria-controls={`faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {
                isExpanded ? (
                  <Icon icon="mdi:minus" className="text-white" />
                ) : (
                  <Icon icon="mdi:plus" className="text-white" />
                )
              }
            </button>
            <button
              onClick={onClick}
              className="p-5 ml-2 text-black text-sm tracking-normal bg-gray-200 rounded-3xl text-left"
            >
              {question}
            </button>
          </>
        )}
      </div>

      {isExpanded && (
        <div
          id={`faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`}
          className="flex p-5 mt-4 w-[60%] ml-12 text-sm text-black tracking-normal leading-6 bg-white rounded-[24px_24px_24px_0] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          <img
            src={avatarImages[avatarIndex]}
            alt={`Avatar ${avatarIndex + 1}`}
            className="absolute left-1 bottom-[-10px] rounded-full border-[1px] border-white w-10 h-10 bg-white"
          />
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
