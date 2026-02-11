"use client";
import React, { useState } from "react";
import TeamMember from "./TeamMember";
import CategoryFilter from "./CategoryFilter";
import ScrollFloat from "../../common/ScrollFloat";

const TeamSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Branding", "Technology", "Manager"];

  const teamMembers = [
    {
      id: 1,
      name: "Mulugeta Abrha",
      title: "Founder & CEO",
      category: "Manager",
      backgroundColor: "bg-[#8f3b39]",
      imageUrl:
        "https://cdn.bffuilder.io/api/v1/image/assets/TEMP/7d3e4d31d09ac6f36fc36083be82b5dd11185c3d",
    },
    {
      id: 2,
      name: "Feven Tadesse",
      title: "Product Design",
      category: "Branding",
      backgroundColor: "bg-[#b29ec1]",
      imageUrl:
        "https://cdn.builder.ios/api/v1/image/assets/TEMP/a302842851a15217ded0f04f4a3b2cc4a10781e3",
    },
    {
      id: 3,
      name: "Tewestya Teklay",
      title: "Curation Director",
      category: "Technology",
      backgroundColor: "bg-[#fdc101]",
      imageUrl:
        "https://cdn.builder.ios/api/v1/image/assets/TEMP/0d1d081c6db212dbbf85e2833db9bc49dbd56f75",
    },
    {
      id: 4,
      name: "Simret Tsegay",
      title: "CMO",
      category: "Branding",
      backgroundColor: "bg-[#3ba1af]",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/066ab5b2e2b8422d019b00fe953a62dca13582c2",
    },
    {
      id: 5,
      name: "Solomon Abrha",
      title: "Growth & Operations Management",
      category: "Manager",
      backgroundColor: "bg-[#f1b904]",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/45ac0f78332c77d04e8d37b9991a6e87cfceb798",
    },
    {
      id: 6,
      name: "Natnael Nigussie",
      title: "Operations & Management",
      category: "Branding",
      backgroundColor: "bg-[#a24037]",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/56bfd1435f805fc87f837fbdf01900fb52aa4231",
    },
    {
      id: 7,
      name: "Mahder Haile",
      title: "Branding & Project Management",
      category: "Technology",
      backgroundColor: "bg-[#f1d5d1]",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e843247e0c41b4009cd55e148342005758387090",
    },
    {
      id: 8,
      name: "Yordanos Dessalegn",
        title: "Director of IT",
        category: "Branding",
        backgroundColor: "bg-[#527066]",
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/a9f150df72a34b566c8de09b3402e8ecb364863f",
      },
      {
        id: 9,
        name: "Mulugeta Gebrekirstos",
        title: "Director of IT",
        category: "Technology",
        backgroundColor: "bg-[#527066]",
        imageUrl:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/a9f150df72a34b566c8de09b3402e8ecb364863f",
      },
      
  ];

  const filteredMembers =
    selectedCategory === "All"
      ? teamMembers
      : teamMembers.filter(
          (member) =>
            member.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <section className="relative px-28 pb-24 mx-auto my-0 max-md:px-5 max-md:py-12 ">
      <section className="box-border w-full flex flex-col md:flex-row relative px-9 py-0 mx-auto my-0 w-full  max-md:px-5 max-md:py-0 max-md:h-auto max-sm:px-4 max-sm:py-0">
      <header className="flex relative flex-col mt-24 max-md:mt-12">
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <h1 className="text-white font-bold mx-auto uppercase leading-[52.8px] text-[112px] max-md:text-9xl max-md:leading-[108px] max-sm:text-7xl max-sm:leading-[72px]">
        our
      </h1>
      <span className="ml-2.5 font-bold uppercase leading-[172.8px] text-[112px] text-zinc-200 max-md:text-9xl max-md:leading-[108px] max-sm:text-7xl max-sm:leading-[72px]">
        team!
      </span>
     
    </header>
    <article className="flex flex-col w-full md:w-1/3 ml-auto mt-auto ">
      <p className="pb-1.5 text-xl font-medium leading-8 text-gray-200 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-6">
        <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
      >
        Meet Our Dedicated Team That Can Make Impossible Things Come True
      </ScrollFloat>
      </p>
      
    </article>
    </section>
      <div className="my-8 w-full h-[1px] bg-gradient-to-b from-[#FF1CF7] to-[#00F0FF]" aria-hidden="true" />

      {/* <hr className="mx-0 my-10 mt-32 w-full h-px bg-fuchsia-500 border border-solid" /> */}

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="grid gap-9 grid-cols-[repeat(4,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
        {filteredMembers.map((member, index) => (
          <TeamMember
          className={`${index % 2 === 0 ? 'mt-10' : ''}`}
            key={member.id}
            name={member.name}
            title={member.title}
            category={member.category}
            backgroundColor={member.backgroundColor}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
