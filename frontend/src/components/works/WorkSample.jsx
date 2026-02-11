"use client";
import * as React from "react";

function WorkSample() {
  return (
    <section className="flex overflow-hidden justify-center items-center px-60 max-md:px-5">
      <figure className="flex relative flex-col flex-1 shrink justify-center self-stretch py-12 my-auto w-full basis-0">
        <div className="overflow-hidden z-0 w-full max-md:max-w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/c95d7ed1b46245fe99ca63e5b9b593ad/7549d16d2e8c7cef6873c52fa7bbf564ec6b482e?placeholderIfAbsent=true"
            alt="Featured content"
            className="object-contain w-full aspect-[1.41] rounded-[40px] max-md:max-w-full"
          />
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c95d7ed1b46245fe99ca63e5b9b593ad/c61973612470ef1e9b726d36a377b02ca0ba6b57?placeholderIfAbsent=true"
          alt="Background decoration"
          className="object-contain absolute inset-0 z-0 w-full aspect-[1.25]"
        />
      </figure>
    </section>
  );
}

export default WorkSample;
