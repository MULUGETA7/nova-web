import React from 'react';
import { motion } from 'framer-motion';
import { WorldMapCard } from './WorldMapCard';
import LeftNovaLabsIntro from '../assets/images/leftnovalabsintro.png';
import RightNovaLabsIntro from '../assets/images/rightnvalabsintro.png';

const NovaLabsIntro = () => {
  return (
    
    <div className="py-0 sm:py-0 md:py-0 lg:py-0 relative overflow-hidden z-10 max-md:mt-[-600px]">
      {/* Left Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat pointer-events-none z-[1] hidden md:block" 
        style={{ 
          backgroundImage: `url(${LeftNovaLabsIntro})`, 
          backgroundPosition: 'bottom left',
          maxWidth: '50%',
          height: '100%',
          top: '-15%'
        }}
      />
      
      {/* Right Background Image */}
      <div 
        className="absolute top-0 right-0 w-full h-full bg-contain bg-no-repeat pointer-events-none z-[1] hidden md:block" 
        style={{ 
          backgroundImage: `url(${RightNovaLabsIntro})`, 
          backgroundPosition: 'bottom right',
          maxWidth: '50%',
          height: '120%',
          top: '-5%'
        }}
      />

      {/* Mobile Wave Backgrounds - Both left and right */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] md:hidden opacity-40"
        style={{
          backgroundImage: `url(${LeftNovaLabsIntro})`,
          backgroundPosition: 'left center',
          backgroundSize: '60%',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div 
        className="absolute top-0 right-0 w-full h-full pointer-events-none z-[1] md:hidden opacity-40"
        style={{
          backgroundImage: `url(${RightNovaLabsIntro})`,
          backgroundPosition: 'right center',
          backgroundSize: '60%',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Gradient background with center glow */}
      <div className="absolute inset-0 bg-transparent z-0">
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* New Tag Card - Centered */}
        <div className="flex justify-center mb-0 sm:mb-0 md:mb-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-[67vw] sm:w-[332px] h-[50px] sm:h-[57px] rounded-[33px] flex items-center justify-between px-2 sm:px-3 bg-[#0F4B4F] overflow-hidden"
          >
            <svg className="absolute inset-0 z-0 pointer-events-none" width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <linearGradient id="newTagGradient" x1="50%" y1="0%" x2="50%" y2="100%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff1cf7"/>
                <stop offset="100%" stopColor="#00f0ff"/>
              </linearGradient>
            </defs>
            <rect 
              x="0" 
              y="0" 
              width="100%" 
              height="100%" 
              rx="33"
              fill="none" 
              stroke="url(#newTagGradient)" 
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="w-[45px] sm:w-[70px] h-[40px] sm:h-[47px] rounded-[22px] flex items-center justify-center z-10 bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff]">
            <span className="text-sm sm:text-lg text-white font-extrabold">NEW</span>
          </div>
          <div className="flex-grow flex items-center justify-center z-10">
            <span className="text-base sm:text-lg font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff]">
              Casting.io System Live on
            </span>
          </div>
        </motion.div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-4 sm:px-0"
          >
            Nova Labs - Redefining Digital Innovation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-3xl mx-auto mt-2 sm:mt-3 md:mt-4 px-4 sm:px-6"
          >
            Empowering businesses with cutting-edge solutions and transformative technology for the digital age
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 lg:mb-16 relative z-10">
          <button className="w-[250px] sm:w-auto px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-[#1A1A1A] text-white rounded-[10px] flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-800 transition-colors">
            <span>Explore the Ecosystem</span>
            <svg className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="w-[250px] sm:w-auto px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff] text-black rounded-[10px] flex items-center justify-center gap-1 sm:gap-2 hover:bg-[#8A2BE2]/90 transition-colors">
            <span>Start building</span>
            <svg className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5" viewBox="0 0 24 24" fill="none">
              <path d="M14.7519 11.1679L11.5547 9.03647C10.8901 8.59343 10 9.06982 10 9.86852V14.1315C10 14.9302 10.8901 15.4066 11.5547 14.9635L14.7519 12.8321C15.3457 12.4362 15.3457 11.5638 14.7519 11.1679Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 sm:p-4 sm:ml-8 md:ml-16 lg:ml-36">
          {/* Left Column - Stacked Cards */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 justify-start">
            {/* Integration Card */}
            <div className="relative self-end">
              <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 w-[250px] sm:w-[300px] md:w-[347px] h-[80px] sm:h-[90px] md:h-[99px] group transition-all duration-300 hover:bg-[#1A1A1A]/80">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">
                  Seamless Integration
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff]">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold">100%</span> Customizable Solutions
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8680FB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="relative self-end">
              <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 w-[300px] sm:w-[380px] md:w-[426px] h-[110px] sm:h-[130px] md:h-[146px] group transition-all duration-300 hover:bg-[#1A1A1A]/80">
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white mb-2 sm:mb-4 md:mb-6 pl-2 sm:pl-3 md:pl-4">
                  Completed Projects
                </h2>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff] pl-2 sm:pl-3 md:pl-4">
                  30+ Worldwide
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2D22FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
              </div>
            </div>
          </div>

          {/* World Map Card - Middle */}
          <div className="flex justify-center items-center px-2 sm:px-4 mt-6">
            <div className="relative w-[426px] h-[230px] overflow-hidden rounded-[37px]">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <WorldMapCard class="w-[426px] h-[230px]" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-3">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff]">
                  12+ Countries
                </p>
              </div>
            </div>
          </div>

          {/* Innovation and Solutions Card - Right */}
          <div className="flex justify-start items-start px-2 sm:px-4">
            <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 w-[250px] sm:w-[300px] md:w-[249px] h-[220px] sm:h-[250px] md:h-[274px] group transition-all duration-300 hover:bg-[#1A1A1A]/80 relative overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ff1cf7]/20 via-[#1A1A1A] to-[#00f0ff]/20"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-auto">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">
                    Innovation at Scale
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-white">
                    Designed for Growth
                  </p>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff] mb-2 sm:mb-3 md:mb-4">
                    Future-Ready Solutions
                  </h2>
                  <button className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff] text-white rounded-[10px] hover:opacity-90 transition-opacity flex items-center gap-1 sm:gap-2">
                    <span>Sustainability</span>
                    <svg className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7" viewBox="0 0 24 24" fill="none">
                      <path d="M6.5 12H18M17 12L12 7M17 12L12 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-20 12 12)"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaLabsIntro;