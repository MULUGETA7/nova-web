"use client";
import React from "react";

import TaskSection from "./TaskSection";

function EliteClub() {
  return (
    <section className="flex flex-col items-center px-8 py-24 w-full bg-neutral-900 rounded-[40px]">
      <div className="flex flex-col items-center w-full max-w-[1820px]">
        {/* <h2 className="mb-8 text-4xl font-bold tracking-tighter leading-10 text-center text-white">
          If you scrolled this far, It's time to LEVEL UP
        </h2>

        <EliteClubButton /> */}

        <TaskSection />
      </div>
    </section>
  );
}

export default EliteClub;
