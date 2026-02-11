"use client";
import React from "react";
import LogoDisplay from "./LogoDisplay";
import ConnectButton from "./ConnectButton";

function ClientLogosSection() {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-center  leading-tight max-md:px-5">
      <div className="flex flex-col flex-1 pb-44 w-full max-md:py-24">
        <h2 className="self-center text-5xl mb-8 text-center text-neutral-100 max-md:text-4xl">
          We&apos;ve worked for...
        </h2>
        <LogoDisplay />
        <ConnectButton />
      </div>
    </section>
  );
}

export default ClientLogosSection;