"use client";
import React from "react";
import GlowingOrb from "./GlowingOrb";
import ActionButton from "./ActionButton";

function FutureProofSection() {
  return (
    <>
    <section className="flex flex-col justify-center items-center w-[81%] h-[700px] mx-auto z-20 bg-transparent rounded-3xl px-5 py-10">
      <article className="flex relative flex-col justify-center items-center w-full  rounded-[45px]">
      
        <GlowingOrb />
        <div className="flex absolute z-10 flex-col items-center px-5 mx-auto mt-[100px] md:mt-[80px] text-center max-w-[657px]">
          <h1 className="mb-8 text-7xl font-medium tracking-tighter leading-[64.5px] text-neutral-100 max-md:text-6xl max-md:leading-[65px] max-sm:text-4xl max-sm:leading-10">
            Future-Proof <br /> in Every Way
          </h1>
          {/* Desktop text only */}
          <p className="hidden md:block mb-8 text-base w-[70%] leading-9 text-neutral-100 md:text-lg md:leading-7">
            Nova Labs is leading the way towards a more responsible and
            sustainable infrastructure for all digital things.
          </p>
          <ActionButton text="Learn about Sustainability" />
        </div>
      </article>
    </section>
    </>
  );
}

export default FutureProofSection;
