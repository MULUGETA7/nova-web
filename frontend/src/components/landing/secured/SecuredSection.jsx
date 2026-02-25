"use client";

import React from "react";

import ActionButton from "./ActionButton";
import BackgroundImages from "./BackgroundImages";

/**
 * EGLD Token Section component
 * Displays information about the EGLD token with call-to-action buttons
 */
const SecuredSection = () => {
  // SVG icons for buttons
  const stakeIcon = (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<svg id="1:1470" layer-name="SVG" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[23px] h-[23px]"> <path d="M22.5312 1.79639C22.5312 6.80615 18.7959 10.937 13.9619 11.5522C13.6543 9.22315 12.6435 7.11377 11.1055 5.44384C12.7754 2.45556 16.0273 0.390137 19.7188 0.390137H21.125C21.8721 0.390137 22.5312 1.04932 22.5312 1.79639ZM0.03125 4.60889C0.03125 3.86181 0.646484 3.20264 1.4375 3.20264H2.84375C8.24902 3.20264 12.6875 7.64112 12.6875 13.0464V14.4526V21.4839C12.6875 22.275 12.0283 22.8901 11.2812 22.8901C10.4902 22.8901 9.875 22.275 9.875 21.4839V14.4526C4.42578 14.4526 0.03125 10.0581 0.03125 4.60889Z" fill="#080808"></path> </svg>',
      }}
    />
  );

  const arrowIcon = (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<svg id="1:1474" layer-name="SVG" width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[23px] h-[23px]"> <path d="M22.2852 12.3575L16.5477 18.095C16.1258 18.5169 15.493 18.5169 15.1133 18.095C14.6914 17.7153 14.6914 17.0825 15.1133 16.6606L19.121 12.6528H1.99297C1.40234 12.6528 0.980469 12.231 0.980469 11.6403C0.980469 11.0919 1.40234 10.6278 1.99297 10.6278H19.121L15.1133 6.62002C14.6914 6.24033 14.6914 5.60752 15.1133 5.18564C15.493 4.80596 16.1258 4.80596 16.5477 5.18564L22.2852 10.9653C22.6649 11.345 22.6649 11.9778 22.2852 12.3575Z" fill="white"></path> </svg>',
      }}
    />
  );

  return (
    <section className="overflow-visible relative w-full ">
      <div className="relative px-4 md:px-20 pt-4 md:pt-20 pb-32 mx-auto ">
        <BackgroundImages />

        <div className="flex mt-0 md:mt-[150px] relative flex-col justify-center items-center mx-auto z-[1]">
          {/* <GradientBadge text="Innovating AI" className="mb-7" /> */}

          <h1 className="mb-5 text-6xl font-medium tracking-tighter text-center leading-[94.5px] text-neutral-100 max-md:text-6xl max-md:leading-[70px] max-sm:text-4xl max-sm:leading-10">
            Innovating with AI
          </h1>

          <p className="mb-10 text-base leading-9 text-center max-w-[520px] text-white/80 max-md:text-lg max-md:leading-7 max-sm:text-base max-sm:leading-6">
            Nova Labs is a leading provider of AI solutions — from custom-trained models and intelligent automation to feature-rich AI tools. If you're ready to bring AI into your product, we're the partner built for it.
          </p>

          <div className="flex gap-4 justify-center max-sm:flex-col max-sm:w-full">
            <ActionButton
              text="About Us"
              icon={arrowIcon}
              isPrimary={true}
              className="px-6"
            />

            <ActionButton
              text="Our Works"
              icon={stakeIcon}
              isPrimary={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuredSection;
