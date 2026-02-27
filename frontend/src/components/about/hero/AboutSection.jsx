import React from "react";

const AboutSection = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-center w-full max-md:px-5 max-md:max-w-full">
      <div className="flex-1 px-9 py-24 w-full max-md:px-5 max-md:max-w-full">
        <section className="box-border mt-0 md:mt-[-80px] w-full flex flex-col md:flex-row relative px-9 py-0 mx-auto my-0 max-md:px-5 max-md:py-0 max-md:h-auto max-sm:px-4 max-sm:py-0">
          <header className="flex mt-4 roboto relative flex-col w-1/3 mr-auto">
            <link
              href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500&display=swap"
              rel="stylesheet"
            />
            <h1 className="text-white font-bold mx-auto uppercase leading-[10px] text-[100px] max-md:text-9xl max-md:leading-[108px] max-sm:text-7xl max-sm:leading-[72px]">
              We are
            </h1>
            <span className="ml-2.5 font-[1000] uppercase leading-[172.8px] text-[110px] text-zinc-200 max-md:text-9xl max-md:leading-[108px] max-sm:text-7xl max-sm:leading-[72px]">
              Novas
            </span>
          </header>
          <article className="flex flex-col w-full md:w-1/3 ml-auto">
            <p className="pb-1.5 text-sm font-medium leading-8 text-gray-200 max-md:text-2xl max-md:leading-7 max-sm:text-lg max-sm:leading-6">
              Nova Labs is a collective of thinkers, builders, designers, and disruptors. We specialize in digital transformation — helping businesses of all sizes thrive through strategic design, intelligent development, and immersive branding.
            </p>
          </article>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;
