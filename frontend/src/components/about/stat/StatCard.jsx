"use client";
import React from "react";
import PixelCard from "../../common/PixelCard";

const StatCard = ({ number, suffix = "+", description }) => {
  // Split description by line breaks to handle multi-line text
  const descriptionLines = description.split("<br>");

  return (
    <div className="relative">
      {/* Main Content Card */}
      <article className="relative flex flex-col px-12 w-full h-[250px] rounded-3xl bg-neutral-900 max-md:max-w-full">
        <header className="flex mt-8 gap-1.5 self-start text-6xl font-bold leading-none whitespace-nowrap max-md:text-4xl">
          <span className="grow max-md:text-2xl">{number}</span>
          <span className="self-start text-4xl font-bold leading-none max-md:text-2xl">
            {suffix}
          </span>
        </header>
        <p className="self-end pb-4 mt-16 text-3xl font-bold tracking-tighter leading-10 text-right max-md:mt-10 max-md:text-4xl max-md:leading-9">
          {descriptionLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < descriptionLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </article>

      {/* Hover Effect Card - Positioned absolutely over the content */}
      <div className="absolute top-0 left-0 w-full h-full">
        <PixelCard 
          variant="blue" 
          className="h-full w-full rounded-3xl bg-transparent"
        />
      </div>
    </div>
  );
};

export default StatCard;
