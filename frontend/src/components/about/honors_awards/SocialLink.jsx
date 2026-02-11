"use client";

import React from "react";

const SocialLink = ({ iconSrc }) => {
  return (
    <a
      href="/social-link"
      className="flex justify-center items-center px-3 bg-gray-200 rounded-3xl h-[50px] min-h-[50px] w-[50px]"
    >
      <div className="self-stretch my-auto min-h-[27px] w-[27px]">
        {iconSrc ? (
          <img
            src={iconSrc}
            alt="Social media icon"
            className="object-contain w-full aspect-square"
          />
        ) : (
          <div className="flex w-full min-h-[27px]"></div>
        )}
      </div>
    </a>
  );
};

export default SocialLink;