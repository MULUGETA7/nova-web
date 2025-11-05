"use client";
import React from "react";
import ShowcaseHeader from "./ShowcaseHeader";
import ImageGrid from "./ImageGrid";
import GlobalTimeFooter from "./GlobalTimeFooter";

function WorkShowcase() {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center px-5 w-full max-w-[1100px] max-md:px-4 max-sm:px-3">
        <ShowcaseHeader />
        <ImageGrid />
        <GlobalTimeFooter />
      </div>
    </section>
  );
}

export default WorkShowcase;
