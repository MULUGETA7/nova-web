import * as React from "react";

export function NavigationLinks() {
  return (
    <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-[6099px] max-md:mt-10">
        <div className="self-end text-xs text-white max-md:mr-2.5">
          <div tabIndex="0">our product</div>
          <div tabIndex="0">our clients</div>
          <div tabIndex="0">about us</div>
        </div>
        <div className="flex flex-col items-start px-2 pt-2.5 pb-56 mt-96 rounded-3xl bg-neutral-900 max-md:pr-5 max-md:pb-24 max-md:mt-10">
          <div className="flex shrink-0 mb-0 bg-black rounded-3xl h-[178px] w-[140px] max-md:mb-2.5" />
        </div>
      </div>
    </div>
  );
}