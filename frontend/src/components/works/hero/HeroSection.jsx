"use client";
import React from "react";
import StatusBadge from "./StatusBadge";
import FeatureItem from "./FeatureItem";

const HeroSection = () => {
  const features = [
    {
      icon: `<svg id="1:4624" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[34px] h-[34px]"> <mask id="mask0_1_4624" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="35"> <path d="M34.3594 0.379883H0.359375V34.3799H34.3594V0.379883Z" fill="white"></path> </mask> <g mask="url(#mask0_1_4624)"> <path d="M20.1022 28.1068C14.8641 27.3414 10.8418 22.8303 10.8418 17.3798C10.8418 11.3922 15.6957 6.53833 21.6833 6.53833C27.6708 6.53833 32.5247 11.3922 32.5247 17.3798C32.5247 23.1051 28.0867 27.7938 22.4632 28.1936" stroke="#121330" stroke-width="1.15104" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M21.6777 17.3751V10.5261" stroke="#121330" stroke-width="1.15104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M28.5267 17.375H21.6777" stroke="#121330" stroke-width="1.15104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M23.5549 17.3797C23.5549 18.4131 22.7171 19.2509 21.6837 19.2509C20.6503 19.2509 19.8125 18.4131 19.8125 17.3797C19.8125 16.3463 20.6503 15.5085 21.6837 15.5085C22.7171 15.5085 23.5549 16.3463 23.5549 17.3797Z" fill="black"></path> <path d="M2.20117 12.4214H9.01357" stroke="#121330" stroke-width="1.15104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.19531 22.3381H9.00771" stroke="#121330" stroke-width="1.15104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4.71094 17.3799H9.01489" stroke="#121330" stroke-width="1.15104" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>`,
      text: "48 Hours Delivery",
    },
    {
      icon: `<svg id="1:4630" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[39px] h-[39px]"> <mask id="mask0_1_4630" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"> <path d="M39.9199 0.879883H0.919922V39.8799H39.9199V0.879883Z" fill="white"></path> </mask> <g mask="url(#mask0_1_4630)"> <mask id="mask1_1_4630" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="5" width="21" height="20"> <path d="M22.6981 16.577L12.2161 21.2224C11.6509 21.4729 11.2085 21.9375 10.9859 22.5143L10.4845 23.8138C10.36 24.1367 9.90722 24.1478 9.76701 23.8314L5.11037 13.3242C4.5888 12.1473 5.11998 10.7706 6.29685 10.249L17.6615 5.21238C18.8384 4.69081 20.2151 5.22199 20.7367 6.39887L23.8846 13.5018C24.4061 14.6786 23.875 16.0554 22.6981 16.577Z" fill="black"></path> </mask> <g mask="url(#mask1_1_4630)"> <path d="M19.4907 14.3843L17.1456 19.6771L16.9619 20.0909C16.4395 21.2674 16.9699 22.6445 18.1464 23.1668L28.6255 27.8189C29.1905 28.0697 29.6326 28.5346 29.8548 29.1115L30.3554 30.4114C30.4797 30.7343 30.9325 30.7457 31.0729 30.4294L35.7362 19.9251C36.2585 18.7486 35.7282 17.3715 34.5516 16.8492L33.1667 16.2344L29.3491 14.5383L21.8233 11.2158" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> </g> <path d="M22.6981 16.577L12.2161 21.2224C11.6509 21.4729 11.2085 21.9375 10.9859 22.5143L10.4845 23.8138C10.36 24.1367 9.90722 24.1478 9.76701 23.8314L5.11037 13.3242C4.5888 12.1473 5.11998 10.7706 6.29685 10.249L17.6615 5.21238C18.8384 4.69081 20.2151 5.22199 20.7367 6.39887L23.8846 13.5018C24.4061 14.6786 23.875 16.0554 22.6981 16.577Z" stroke="black" stroke-width="1.30339" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M10.4961 13.5674L15.6101 11.3009" stroke="black" stroke-width="1.30339" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M11.7305 16.353L16.9007 14.0617" stroke="black" stroke-width="1.30339" stroke-miterlimit="10" stroke-linecap="round"></path> </g> </svg>`,
      text: "Access to Private Design Portal",
    },
    {
      icon: `<svg id="1:4636" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[39px] h-[39px]"> <mask id="mask0_1_4636" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40"> <path d="M39.6406 0.879883H0.640625V39.8799H39.6406V0.879883Z" fill="white"></path> </mask> <g mask="url(#mask0_1_4636)"> <path d="M20.4609 17.0867L20.2307 23.183" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22.85 26.1027C22.7932 27.608 21.5269 28.7822 20.0216 28.7253C18.5164 28.6685 17.3422 27.4021 17.399 25.8969C17.4559 24.3916 18.7222 23.2175 20.2275 23.2743C21.7327 23.3311 22.9069 24.5975 22.85 26.1027Z" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.1348 16.9606L17.0067 20.1272C14.8453 21.2809 13.3812 23.5924 13.4912 26.2705C13.6203 29.4106 16.0107 32.0829 19.1192 32.546C23.1052 33.1399 26.611 30.1459 26.7588 26.2328C26.8512 23.7858 25.6031 21.6036 23.675 20.3791L23.7893 17.2122L17.1348 16.9606Z" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.877 13.4907L20.4695 16.8618" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.8731 13.5254L16.6269 12.6661C13.7113 12.0761 11.826 9.2342 12.416 6.3186L16.7014 7.19122C19.6019 7.78185 21.472 10.6147 20.8754 13.5139" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.8777 13.4907L25.0333 14.7155C27.8866 15.5564 30.8815 13.9251 31.7225 11.0717L30.5757 10.7367L27.4674 9.85537C26.5757 9.60254 25.6302 9.55644 24.7308 9.7804C22.9432 10.2255 21.4333 11.5827 20.881 13.4795" stroke="black" stroke-width="1.30339" stroke-linecap="round" stroke-linejoin="round"></path> </g> </svg>`,
      text: "Unlimited Design Requests",
    },
  ];

  return (
    <section className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[1200px]">
        <div className="w-full backdrop-blur-[[2.5px]] h-[83px]" />
        <div className="flex flex-col items-center px-12 py-12 max-md:px-8 max-sm:px-5">
          <div className="flex flex-col items-center w-full max-w-[900px]">
            <StatusBadge />
            <h1 className="w-full mb-12 text-6xl md:text-8xl font-black tracking-tighter text-center leading-[0.9] text-white uppercase">
              Launch Your Groundbreaking Web3 & AI Product
            </h1>
            <div className="flex justify-center">
              <button className="px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-black bg-white rounded-full relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <span className="relative z-10">Discuss Your Project Vision</span>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-12 w-full max-md:flex-col max-md:gap-10 max-md:items-center">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                text={feature.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
