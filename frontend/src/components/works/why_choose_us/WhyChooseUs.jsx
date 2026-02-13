"use client";
import React from "react";
import SectionHeader from "./SectionHeader";
import SauceText from "./SauceText";
import FeatureCard from "./FeatureCard";

function WhyChooseUs() {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-8 items-center px-8 py-12 w-full max-w-[1100px]">
        <SectionHeader
          title="Why choose us?"
          subtitle="Check out what Nova Labs offers Vs employees and other agencies. It's quite a lot!"
        />

        <SauceText />

        <FeatureCard
          headline={["Compare our ", "Design With Others"]}
          description="Our Design Will not Be near other agencies and you saw it yourself if you came this far."
          buttonText="Have A discussion with us"
        />
      </div>
    </section>
  );
}

export default WhyChooseUs;
