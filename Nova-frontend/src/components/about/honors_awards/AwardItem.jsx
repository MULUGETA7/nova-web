"use client";

import React from "react";

const AwardItem = ({ organization, achievement }) => {
  return (
    <article className="justify-between items-start max-w-full relative flex w-[1050px]  py-[25px] border-b border-solid border-[#E1EAE9]">
      <h3 className="z-0 self-stretch my-auto text-xl">{organization}</h3>
      <p className="z-0 self-stretch my-auto text-base">{achievement}</p>
      <div className="flex absolute top-0 right-0 z-0 shrink-0 self-start h-[50px] min-w-60 w-[1050px] max-md:max-w-full"></div>
    </article>
  );
};

export default AwardItem;