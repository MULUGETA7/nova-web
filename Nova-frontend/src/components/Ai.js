import React, { useState, useEffect } from 'react';
import AnimateOnScroll from '../components/animations/AnimateOnScroll';
import SecuredSection from '../components/landing/secured/SecuredSection';
import FutureProofSection from '../components/future_proof/FutureProofSection';

const ShinyButton = ({ children, className = '', disabled = false, speed = 5 }) => {
  const animationDuration = `${speed}s`;

  return (
    <button
      className={`
        text-white bg-transparent border-2 border-white 
        px-4 sm:px-6 md:px-8 
        py-2 sm:py-2.5 md:py-3 
        text-sm sm:text-base md:text-lg
        rounded-full font-semibold 
        transition duration-300 ease-in-out transform hover:scale-105 
        ${disabled ? '' : 'animate-shine'}
        ${className}
      `}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        animationDuration: animationDuration,
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {children}
    </button>
  );
};

const Ai = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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