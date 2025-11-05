import React from 'react';
import './WorldMap.css';

const WorldMap = () => {
  return (
    <div className='world-map-container world-map'>
      <div className='world-map-content'>
        <div className='center-overlay'>
          <div className="heading-container">
            <h1 className='text-[2rem] font-bold mb-2 sm:mb-3 md:mb-4 text-center leading-[1.3] xs:leading-[1.35] sm:leading-[1.4]'>
              <span className="block mb-1 xs:mb-2">Stay In The Know <br/> Don't Miss An Update</span>
            </h1>
          </div>
          <div className='email-input-container text-left'>
            <input 
              type='email' 
              placeholder='Enter a valid email address' 
              className='email-input'
              aria-label='Email address'
            />
            <button className='subscribe-button bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff]'>
              <span className='hidden sm:inline'>Sign up</span>
              <span className='sm:hidden'>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
