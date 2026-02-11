"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const ServiceShowcase = () => {
  const services = [
    {
      name: "Website development",
      imageLeft:
        "/mockups/Web.png",
      imageRight:
        "/mockups/Web1.png",
      altTextLeft: "Website development document 1",
      altTextRight: "Website development document 2",
    },
    {
      name: "Mobile App",
      imageLeft:
        "/mockups/Mobile.png",
      imageRight:
        "/mockups/Mobile1.png",
      altTextLeft: "Mobile App document 1",
      altTextRight: "Mobile App document 2",
    },
    {
      name: "AR/VR Development",
      imageLeft:
        "/mockups/VR.png",
      imageRight:
        "/mockups/VR1.png",
      altTextLeft: "Custom Software document 1",
      altTextRight: "Custom Software document 2",
    },
    {
      name: "AI and Machine Learning",
      imageLeft:
        "/mockups/AI.png",
      imageRight:
        "/mockups/AI1.png",
      altTextLeft: "AI and Machine Learning document 1",
      altTextRight: "AI and Machine Learning document 2",
    },
    {
      name: "Game Development",
      imageLeft:
        "/mockups/Game.png",
      imageRight:
        "/mockups/Game1.png",
      altTextLeft: "Game Development document 1",
      altTextRight: "Game Development document 2",
    },
    {
      name: "Branding",
      imageLeft:
        "/mockups/Branding.png",
      imageRight:
        "/mockups/Branding1.png",
      altTextLeft: "Branding document 1",
      altTextRight: "Branding document 2",
    },
    {
      name: "End-to-End Product Development",
      imageLeft:
        "/mockups/Product.png",
      imageRight:
        "/mockups/Product1.png",
      altTextLeft: "End-to-End Product Development document 1",
      altTextRight: "End-to-End Product Development document 2",
    },
    {
      name: "UI/UX Design & Research",
      imageLeft:
        "/mockups/ux.png",
      imageRight:
        "/mockups/ux1.png",
      altTextLeft: "UI/UX Design & Research document 1",
      altTextRight: "UI/UX Design & Research document 2",
    },
    {
      name: "Product Strategy & Consulting",
      imageLeft:
        "/mockups/menged.png",
      imageRight:
        "/mockups/saas.png",
      altTextLeft: "Product Strategy & Consulting document 1",
      altTextRight: "Product Strategy & Consulting document 2",
    },
  ];

  return (
    <section className="px-5 py-12 mx-auto my-0 text-center max-w-[1100px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <header>
        <h2 className="mb-4 text-4xl font-bold tracking-tighter text-white max-sm:text-3xl">
          We are here to Serve...
        </h2>
        <p className="mb-10 text-base leading-tight text-white max-sm:text-sm">
          Stop stressing yourself in finding out the perfect person for a
          particular design needs
        </p>
      </header>

      <p className="mx-0 mt-5 mb-10 text-base text-white">
        Tip: Hover on the images
      </p>

      <div className="grid gap-8 mb-10 grid-cols-[repeat(3,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            serviceName={service.name}
            imageLeft={service.imageLeft}
            imageRight={service.imageRight}
            altTextLeft={service.altTextLeft}
            altTextRight={service.altTextRight}
          />
        ))}
      </div>

      <p className="mt-10 text-base text-black">
        <span>That's not it we do even</span>
        <span className="ml-1.5 text-2xl font-semibold">More...</span>
      </p>
    </section>
  );
};

export default ServiceShowcase;
