import React from "react";
import CallToActionButton from "./CallToActionButton";
import AboutSection from "./AboutSection";
import SplitText from "../../common/SplitText";
const HeroSection = () => {
  return (
    <div className="flex flex-col">
    <section className="flex flex-col self-center px-20 pt-32 w-full text-9xl leading-none  max-md:px-5 max-md:pt-24 max-md:max-w-full max-md:text-4xl">
      <header>
        <h1 className="w-full md:w-[80%] mx-auto font-bold mb-12 text-8xl tracking-tighter text-center leading-[79px] max-md:text-5xl max-md:leading-[55px] max-sm:mb-16 max-sm:text-4xl max-sm:leading-10">

      <SplitText 
        text="Create. Grow. Elevate. Shaping the Future of Digital Innovation"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
      />
        </h1>
        {/* <h2 className="px-48 w-full text-center text-white max-md:px-5 max-md:max-w-full max-md:text-4xl">
          Grow your brand
        </h2>
        <h2 className="w-full text-center text-white max-md:max-w-full max-md:text-4xl">
          Shaping digital experiences
        </h2> */}
      </header>

      <div className="overflow-hidden pt-7 w-full text-xs font-medium leading-tight text-center text-gray-200 uppercase max-md:max-w-full">
        <p>
        At Nova Labs, we combine creativity with cutting-edge technology to craft exceptional digital experiences. 
        </p>
      </div>

      <div className="overflow-hidden px-20 pb-9 w-full text-xs font-medium leading-tight text-center text-gray-200 uppercase max-md:px-5 max-md:max-w-full">
        <p>We don’t just build brands — we transform them into powerful forces in the digital world.</p>
      </div>

      <div className="flex justify-center mt-4">
        <CallToActionButton text="book a free strategy call!" />
      </div>
      </section>
      <AboutSection />
    </div>
  );
};

export default HeroSection;
