import React from 'react';
import './AboutUs.css'; // Import the CSS file
import HeroSection from '../components/about/hero/HeroSection';
import StatsSection from '../components/about/stat/StatsSection';
// import TeamSection from '../components/about/team/TeamSection'; // Hidden - can be enabled later
import ClientLogosSection from '../components/about/works/ClientLogosSection';

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
        <ClientLogosSection />
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideUp">
        <FAQSection showContact={false} />
      </AnimateOnScroll>

      {/* <AnimateOnScroll animation="slideUp" delay={0.3}>
        <HonorsAndAwards />
      </AnimateOnScroll> */}

      <AnimateOnScroll animation="fadeIn">
        <FooterLinks />
      </AnimateOnScroll>
    </>
  );
};

export default AboutUs;