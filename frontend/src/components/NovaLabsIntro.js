import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { WorldMapCard } from './WorldMapCard';
import LeftNovaLabsIntro from '../assets/images/leftnovalabsintro.png';
import RightNovaLabsIntro from '../assets/images/rightnvalabsintro.png';
import './NovaLabsIntro.css';

const NovaLabsIntro = () => {
  return (
    <div className="intro-container px-4 md:px-6 py-20 lg:py-32">
      {/* Background Ambience */}
      <div className="intro-glow-center"></div>

      {/* Wave Assets - Absolute Positioned */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full bg-no-repeat opacity-50 pointer-events-none hidden lg:block"
        style={{ backgroundImage: `url(${LeftNovaLabsIntro})`, backgroundPosition: 'left center', backgroundSize: 'contain' }}
      ></div>
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-no-repeat opacity-50 pointer-events-none hidden lg:block"
        style={{ backgroundImage: `url(${RightNovaLabsIntro})`, backgroundPosition: 'right center', backgroundSize: 'contain' }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">

        {/* New Product Tag */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tag-badge"
          >
            <div className="tag-pill">NEW</div>
            <div className="tag-text">Casting.io System Live on Ecosystem</div>
          </motion.div>
        </div>


        {/* Hero Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="intro-title">
            Nova Labs <br />
            <span className="gradient-text-brand">Redefining Digital Innovation</span>
          </h1>
          <p className="intro-desc">
            Empowering businesses with cutting-edge solutions and transformative technology.
            We design for growth and engineer for scale.
          </p>
        </motion.div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary-nova"
          >
            Explore Ecosystem
            <Icon icon="solar:round-alt-arrow-right-bold-duotone" width="24" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary-nova"
          >
            Start Building
            <Icon icon="solar:rocket-bold-duotone" width="24" />
          </motion.button>
        </div>

        {/* Reverted Original Cards Grid */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-6 p-2 sm:p-4 sm:ml-8 md:ml-16 lg:ml-36 items-center">
          {/* Left Column - Stacked Cards */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[426px] items-center sm:items-end">
            {/* Integration Card */}
            <div className="relative w-full max-w-[347px]">
              <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 w-full h-auto min-h-[80px] group transition-all duration-300 hover:bg-[#1A1A1A]/80">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-white text-left">
                  Seamless Integration
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#ff1cf7] to-[#00f0ff] text-left">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold">100%</span> Customizable Solutions
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8680FB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="relative w-full max-w-[426px]">
              <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 w-full h-auto min-h-[110px] group transition-all duration-300 hover:bg-[#1A1A1A]/80">
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-white mb-2 sm:mb-4 md:mb-6 pl-2 sm:pl-3 md:pl-4 text-left">
                  Completed Projects
                </h2>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff] pl-2 sm:pl-3 md:pl-4 text-left">
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
                <WorldMapCard />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-3">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff]">
                  12+ Countries
                </p>
              </div>
            </div>
          </div>

          {/* Innovation and Solutions Card - Right */}
          <div className="flex justify-center sm:justify-start items-start px-2 sm:px-4 w-full max-w-[300px]">
            <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 w-full h-[220px] sm:h-[250px] md:h-[274px] group transition-all duration-300 hover:bg-[#1A1A1A]/80 relative overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#ff1cf7]/20 via-[#1A1A1A] to-[#00f0ff]/20"></div>

              <div className="relative z-10 flex flex-col h-full text-left">
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
                    <Icon icon="solar:arrow-right-up-bold" width="16" />
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