"use client";

import React from "react";
import SocialLink from "./SocialLink";

const Footer = () => {
  return (
    <footer className="flex flex-col items-start pt-32 w-full max-md:pt-24 max-md:pr-5 max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <section className="flex flex-col items-center max-md:max-w-full">
          <div className="flex overflow-hidden  pt-16  pb-28 w-full max-w-[2016px] max-md:pb-24 max-md:max-w-full">
            <h2 className="tracking-wider ml-[-150px] font-extrabold leading-tight text-gray-200 text-[180px] max-md:max-w-full max-md:text-4xl">
            CREATE!-LET&apos;S 
            </h2>
          </div>
        </section>
        <div className="flex gap-2.5 self-start mt-40 ml-32 max-md:mt-10 max-md:ml-2.5">
          <SocialLink iconSrc="https://cdn.builder.io/api/v1/image/assets/c95d7ed1b46245fe99ca63e5b9b593ad/356dd459a3f4fba3f172495dc595b89727798d3b?placeholderIfAbsent=true" />
          <SocialLink iconSrc="" />
          <SocialLink iconSrc="https://cdn.builder.io/api/v1/image/assets/c95d7ed1b46245fe99ca63e5b9b593ad/55129f5d38ae4852182295b5251d1450fbc48dde?placeholderIfAbsent=true" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;