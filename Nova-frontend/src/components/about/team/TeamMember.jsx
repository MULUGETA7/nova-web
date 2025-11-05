import React from "react";

const TeamMember = ({ name, title, category, backgroundColor, imageUrl, className }) => {
  return (
    <article className={`relative ${className}`}>
      {/* <img
        src={imageUrl}
        alt={name}
        className="object-cover  rounded-3xl h-[320px] w-[350px]"
      /> */}
      <div
        className={`h-[300px] rounded-3xl ${backgroundColor}`}
      ></div>
      <span className="absolute top-2 px-3 py-1.5 text-xs leading-4 capitalize bg-[linear-gradient(180deg,#FF1CF7_0%,#00F0FF_100%)] inline-block text-white rounded-3xl left-[5px]">
        {category}
      </span>
      <h3 className="mt-4 text-xl font-medium text-gray-200">{name}</h3>
      <p className="mt-1 text-base text-gray-200">{title}</p>
    </article>
  );
};

export default TeamMember;
