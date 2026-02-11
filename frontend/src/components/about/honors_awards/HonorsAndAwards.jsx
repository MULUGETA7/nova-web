"use client";

import React from "react";
import AwardItem from "./AwardItem";
import Footer from "./Footer";

const HonorsAndAwards = () => {
  const awards = [
    {
      organization: "A' Design Awards & Competition",
      achievement: "Silver Medal"
    },
    {
      organization: "AWWWARDS",
      achievement: "2X - Honnerable Mention"
    },
    {
      organization: "CSS Design",
      achievement: "2X - Website of the day"
    },
    {
      organization: "CSS Winners",
      achievement: "2X - Website of the day"
    },
    {
      organization: "Web Gurus",
      achievement: "2X - Guru of the day"
    }
  ];

  return (
    <div className="flex flex-col items-end">
      <section className="flex overflow-hidden flex-col justify-center items-center px-20 w-full leading-tight text-gray-200 capitalize max-w-[1920px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col flex-1 items-center px-16 pt-60 pb-20 w-full max-w-[1650px] max-md:px-5 max-md:pt-24 max-md:max-w-full">
          <h1 className="w-full ml-20 md:w-[70%] z-10 self-start  leading-none text-white font-extrabold uppercase text-[100px]">
            honors 
          </h1>
          <h1 className="w-full md:w-[70%] z-10 self-start  leading-none text-white font-extrabold uppercase text-[100px]">& awards</h1>
          <div className="mt-[62px] w-full md:w-[75%] max-md:mt-10">
            {awards.map((award, index) => (
              <AwardItem
                key={index}
                organization={award.organization}
                achievement={award.achievement}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex overflow-hidden flex-col justify-center items-center w-full max-w-[1920px] max-md:px-5 max-md:max-w-full">
        <div className="flex-1 pt-24 pb-11 w-full max-md:px-5">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default HonorsAndAwards;