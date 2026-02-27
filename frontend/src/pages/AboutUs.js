import React from 'react';
import './AboutUs.css'; // Import the CSS file
import HeroSection from '../components/about/hero/HeroSection';
import StatsSection from '../components/about/stat/StatsSection';
// import TeamSection from '../components/about/team/TeamSection'; // Hidden - can be enabled later
import OurClient from '../components/OurClient';
import ConnectButton from '../components/about/works/ConnectButton';

import AnimateOnScroll from '../components/animations/AnimateOnScroll';
import FAQSection from '../components/works/faqs/FAQSection';
import FooterLinks from '../components/FooterLinks';

const AboutUs = () => {
  return (
    <>
      <HeroSection />

      <AnimateOnScroll animation="fadeIn" delay={0.2}>
        <StatsSection />
      </AnimateOnScroll>

      {/* Our Team Section - Hidden but code preserved for later fixes */}
      {/* <AnimateOnScroll animation="slideUp">
        <TeamSection />
      </AnimateOnScroll> */}

      <AnimateOnScroll animation="fadeIn">
        <OurClient />
        <div className="flex justify-center pb-20">
          <ConnectButton />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideUp">
        <FAQSection showContact={false} />
      </AnimateOnScroll>

      {/* <AnimateOnScroll animation="slideUp" delay={0.3}>
        <HonorsAndAwards />
      </AnimateOnScroll> */}


    </>
  );
};

export default AboutUs;