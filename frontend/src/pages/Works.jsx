import React from 'react';
import HeroSection from '../components/works/hero/HeroSection';
import TestimonialSection from '../components/works/testimonials/TestimonialSection';
import AchievementSection from '../components/works/achievements/AchievementSection';
import ServiceShowcase from '../components/works/services/ServiceShowcase';
import WhyChooseUs from '../components/works/why_choose_us/WhyChooseUs';
import FAQSection from '../components/works/faqs/FAQSection';
import EliteClub from '../components/works/elite_club/EliteClub';
import WorkSample from '../components/works/WorkSample';
import WorkShowcase from '../components/works/work_showcase/WorkShowcase';
import SectionMaskGroup from '../components/works/logos/SectionMaskGroup';

import AnimateOnScroll from '../components/animations/AnimateOnScroll';

const Works = () => {
  return (
    <div className='bg-black'>
      <HeroSection />

      <TestimonialSection />

      <AnimateOnScroll animation="fadeIn">
        <SectionMaskGroup />
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideUp">
        <AchievementSection />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fadeIn" delay={0.2}>
        <ServiceShowcase />
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideUp">
        <WorkShowcase />
      </AnimateOnScroll>

      <AnimateOnScroll animation="slideRight">
        <WhyChooseUs />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fadeIn">
        <WorkSample />
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