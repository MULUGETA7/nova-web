import React from "react";
import ActionButton from "./ActionButton";

function FeatureCard({ headline, description, buttonText }) {
  return (
    <article className="px-8 py-20 w-full bg-neutral-300 rounded-[40px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-8">
      <div className="flex flex-col gap-8 justify-center items-center mx-auto text-center max-w-[800px]">
        <h3 className="text-8xl font-bold tracking-tighter text-black leading-[87px] max-md:text-6xl max-md:leading-[65px] max-sm:text-4xl max-sm:leading-10">
          {Array.isArray(headline) ? (
            headline.map((line, index) => (
              <React.Fragment key={index}>
                <span>{line}</span>
                {index < headline.length - 1 && <br />}
              </React.Fragment>
            ))
          ) : (
            <span>{headline}</span>
          )}
        </h3>
        <p className="text-base tracking-tight leading-5 max-w-[296px] text-black text-opacity-70">
          {description}
        </p>
        <div className="relative">
          <ActionButton text={buttonText} />
        </div>
      </div>
    </article>
  );
}

export default FeatureCard;
