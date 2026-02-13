import React from 'react';
import HeroSection from '../components/works/hero/HeroSection';
import WhyChooseUs from '../components/works/why_choose_us/WhyChooseUs';
import FAQSection from '../components/works/faqs/FAQSection';
import EliteClub from '../components/works/elite_club/EliteClub';
import OurClient from '../components/OurClient';
import InnovationShowcase from '../components/InnovationShowcase';

import AnimateOnScroll from '../components/animations/AnimateOnScroll';

const Works = () => {
  return (
    <div className='bg-black'>
      <HeroSection />

      <AnimateOnScroll animation="slideUp">
        <InnovationShowcase />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fadeIn">
        <OurClient />
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideRight">
        <WhyChooseUs />
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideUp">
        <FAQSection />
      </AnimateOnScroll>

      <AnimateOnScroll animation="scale">
        <EliteClub />
      </AnimateOnScroll>
    </div>
  );
};

export default Works;