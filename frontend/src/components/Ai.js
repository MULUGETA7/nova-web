import React from 'react';
import AnimateOnScroll from '../components/animations/AnimateOnScroll';
import SecuredSection from '../components/landing/secured/SecuredSection';
import FutureProofSection from '../components/future_proof/FutureProofSection';



const Ai = () => {


  return (
    <>
      <div className='bg-[#0a0a0a] pb-60 pt-60 overflow-visible'>
        <AnimateOnScroll animation="slideLeft">
          <SecuredSection />
        </AnimateOnScroll>

        <div className='w-full relative'>
          <img
            src="/images/key.png"
            alt=""
            className="w-[500px] h-[350px] z-0 absolute right-[0.5%] top-[-150px] max-lg:hidden"
          />

          <AnimateOnScroll animation="slideUp" delay={0.3}>
            <FutureProofSection />
          </AnimateOnScroll>
        </div>
      </div>
    </>
  );
};

export default Ai;