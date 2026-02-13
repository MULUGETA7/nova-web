"use client";
import React from "react";
import StatCard from "./StatCard";

const StatsSection = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-center px-20 max-md:px-5">
      <div className="flex-1 px-9 max-w-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[1650px] max-md:px-5">
        <div className="flex gap-1 max-md:flex-col">
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <div className="text-gray-200 max-md:mt-10 max-md:max-w-full">
              <StatCard number="12+" description="projects<br>completed" />
              <div className="mt-7">
                <StatCard number="2+" description="years of<br>experience" />
              </div>
            </div>
          </div>

          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="grow mt-44 text-gray-200 max-md:mt-10 max-md:max-w-full">
              <StatCard number="50+" description="creative<br>minds" />
              <div className="mt-7">
                <StatCard number="5+" description="awwards &<br>recognition" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
