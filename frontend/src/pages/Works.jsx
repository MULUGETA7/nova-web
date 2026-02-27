import React from 'react';
import HeroSection from '../components/works/hero/HeroSection';

import FAQSection from '../components/works/faqs/FAQSection';

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



      <AnimateOnScroll animation="slideUp">
        <FAQSection />
      </AnimateOnScroll>


    </div>
  );
};

export default Works;