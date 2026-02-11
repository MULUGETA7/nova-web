"use client";
import React from "react";

function AchievementSection() {
  const achievements = [
    {
      image: "/images/achievements/1.png",
      title: "17+ Brands Transformed",
      description: "Helping businesses across various industries achieve their goals"
    },
    {
      image: "/images/achievements/2.png",
      title: "2 Years of Experience",
      description: "Bringing seasoned expertise to every project"
    },
    {
      image: "/images/achievements/3.png",
      title: "$100,000+ Saved for Brands",
      description: "So they can reinvest where it matters the most"
    }
  ];

  return (
    <section className="flex justify-center items-center px-0 py-12">
      <div className="px-4 py-0 mx-auto my-0 w-full max-w-[1100px] max-md:p-5 max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <header className="mb-10 text-center">
          <h2 className="mb-3.5 text-4xl font-bold tracking-tighter leading-10 text-white max-sm:text-2xl max-sm:leading-8">
            Our Achievement
          </h2>
          <p className="mx-auto my-0 text-base tracking-tight leading-5 text-white max-w-[600px] max-sm:text-sm max-sm:leading-5">
            Curious about what we've accomplished? Let our track record speak
            for itself.
          </p>
        </header>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 ">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl border-[5px] border-white overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Image Container */}
              <div className="w-full h-[270px] overflow-hidden">
                <img 
                  src={achievement.image} 
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text Content */}
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-black mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AchievementSection;
