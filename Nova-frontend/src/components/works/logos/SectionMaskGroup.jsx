"use client";
import * as React from "react";
import LogoItem from "./LogoItem";

function SectionMaskGroup() {
  const logos = [
    { src: "/images/clients/safari1.png", width: "90px", aspectRatio: "3.46" },
    { src: "/images/clients/matrix1.png", width: "91px", aspectRatio: "2.93" },
    { src: "/images/clients/digaf1.png", width: "89px", aspectRatio: "2.62" },
    { src: "/images/clients/maedot.png", width: "84px", aspectRatio: "1.91" },
    { src: "/images/clients/ease.png", width: "90px", aspectRatio: "2.81" },
    { src: "/images/clients/safari1.png", width: "90px", aspectRatio: "3.46" },
    { src: "/images/clients/matrix1.png", width: "91px", aspectRatio: "2.93" },
    { src: "/images/clients/digaf1.png", width: "89px", aspectRatio: "2.62" },
    { src: "/images/clients/maedot.png", width: "84px", aspectRatio: "1.91" },
    { src: "/images/clients/ease.png", width: "90px", aspectRatio: "2.81" },
    // { src: "/images/clients/safari.png", width: "80px", aspectRatio: "2.16" },
    // { src: "/images/clients/safari.png", width: "44px", aspectRatio: "1.69" },
  ];

  // Double the logos array for seamless looping
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="flex flex-col justify-center items-start py-2.5 overflow-hidden relative">
      <div className="flex gap-10 items-center w-full h-[100px] overflow-hidden">
        <div className="flex animate-marquee gap-10 items-center">
          {duplicatedLogos.map((logo, index) => (
            <LogoItem
              key={`${logo.src}-${index}`}
              src={logo.src}
              width={logo.width}
              aspectRatio={logo.aspectRatio}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          min-width: max-content;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default SectionMaskGroup;