import React from 'react';
import { motion } from 'framer-motion';
import './WhyChooseUs.css';
import VectorImage from '../assets/Vector (1).png';
import FirstWhyChoose from '../assets/card images/first_why_choose.png';
import ThirdWhyChoose from '../assets/card images/3rd_why_choose.png';
import GradientText from './GradientText';
import { Icon } from '@iconify/react';
import TerminalChat from './TerminalChat';
const WhyChooseUs = () => {

  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={VectorImage}
          alt="Nova Labs Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Mobile Header and Vision - Show only on mobile */}
        <div className="md:hidden mb-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-medium uppercase tracking-wider">WHY CHOOSE US</span>
          </div>

          {/* Experience Counter for Mobile */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-baseline gap-2 bg-black/50 backdrop-blur-lg rounded-xl p-3">
              <span className="text-4xl font-bold gradient-text">2+</span>
              <span className="text-base font-bold">Years Of<br />experience</span>
            </div>
          </div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <GradientText
              colors={["#FF1CF7", "#00F0FF"]}
              className="mb-4 text-3xl font-extrabold text-center"
            >
              Your Vision, Our Priority
            </GradientText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-300 mb-6 text-center px-4"
            >
              We deliver innovative solutions with exceptional talent. Our dedicated team is committed and ready to make your projects successful.
            </motion.p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Precise Positioning */}
          <div className="w-full md:w-1/2 flex items-start relative">
            <div className="relative h-auto md:h-[650px] lg:h-screen w-full">
              {/* First Rectangle - Responsive Positioning */}
              <div className="absolute hidden md:block 
  md:left-[2%] lg:left-0 
  md:top-[30px] lg:top-[100px] 
  md:w-[240px] lg:w-[267px] 
  md:h-[400px] lg:h-[464px] 
  bg-gradient-to-br from-white/10 to-white/5 
  rounded-3xl border border-white/20 
  shadow-xl backdrop-blur-sm 
  transform transition-transform hover:scale-105">
                <div className="absolute inset-0 rounded-3xl">
                  <img
                    src={FirstWhyChoose}
                    alt="Innovative Solutions"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl" // Added rounded-3xl here
                  />

                  <div className="relative z-10 flex flex-col justify-end p-4 md:p-5 h-full text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg">Innovative Solutions</h3>
                    <p className="text-sm md:text-base text-white font-bold bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 shadow-xl">Transforming challenges into breakthrough technologies with real-world impact.</p>
                  </div>
                </div>
              </div>

              {/* Mobile Rectangle Placeholder */}
              <div className="md:hidden w-full aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm mb-6">
                <div className="relative overflow-hidden rounded-3xl h-full">
                  <img
                    src={FirstWhyChoose}
                    alt="Innovative Solutions"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 p-6 text-white flex flex-col justify-end h-full">
                    <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg text-center">Innovative Solutions</h3>
                    <p className="text-base text-white font-bold bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 shadow-xl text-center">Transforming challenges into breakthrough technologies with real-world impact.</p>
                  </div>
                </div>
              </div>

              {/* Second Rectangle - Responsive Positioning */}
              <div className="absolute hidden md:block 
                md:left-[25%] lg:left-[300px] 
                md:top-[250px] lg:top-[180px] 
                md:w-[240px] lg:w-[282px] 
                md:h-[400px] lg:h-[464px] 
                bg-gradient-to-tr from-white/10 to-white/5 
                rounded-3xl border border-white/20 
                shadow-2xl backdrop-blur-sm 
                transform transition-transform hover:scale-105 hover:rotate-2">
                <div className="absolute inset-0 rounded-3xl">
                  <img
                    src={ThirdWhyChoose}
                    alt="Global Expertise"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl" // Added rounded-3xl here
                  />

                  <div className="relative z-10 flex flex-col justify-end p-4 md:p-5 h-full text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg">Global Expertise</h3>
                    <p className="text-sm font-bold md:text-base text-white bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 shadow-xl">Leveraging top talent to deliver cutting-edge solutions across industries.</p>
                  </div>
                </div>
              </div>

              {/* Mobile Second Rectangle Placeholder */}
              <div className="md:hidden w-full aspect-video bg-gradient-to-tr from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-sm mt-6">
                <div className="relative overflow-hidden rounded-3xl h-full">
                  <img
                    src={ThirdWhyChoose}
                    alt="Global Expertise"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative z-10 p-6 text-white flex flex-col justify-end h-full">
                    <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg text-center">Global Expertise</h3>
                    <p className="text-base text-white font-bold bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 shadow-xl text-center">Leveraging a network of top-tier talent to deliver cutting-edge solutions across diverse industries.</p>
                  </div>
                </div>
              </div>

              {/* Experience Counter - Desktop Only */}
              <div className="absolute z-10 hidden md:block
                md:left-[25%] lg:left-[295px] 
                md:top-[130px] lg:top-[90px] 
                md:w-auto">
                <div className="inline-flex items-baseline gap-2 bg-black/50 backdrop-blur-lg rounded-xl p-2 md:w-[240px] lg:w-[282px]">
                  <span className="text-4xl font-bold gradient-text">2+</span>
                  <span className="text-base font-bold">Years Of<br />experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Vision and White Boxes */}
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            {/* Header - Hidden on mobile, shown on desktop */}
            <div className="hidden md:flex items-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium uppercase tracking-wider">WHY CHOOSE US</span>
            </div>

            {/* Vision Section - Hidden on mobile, shown on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-0 hidden md:block" // Hidden on mobile
            >
              <GradientText
                colors={["#FF1CF7", "#00F0FF"]}
                className="mr-16 mb-4 text-4xl md:text-5xl font-extrabold py-2"
              >
                Your Vision, Our Priority
              </GradientText>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs md:text-sm ml-2 lg:text-base text-gray-300 mb-6 md:mb-10 max-w-3xl"
              >
                We deliver innovative solutions with exceptional talent. Our dedicated team is committed and ready to make your projects successful.
              </motion.p>
            </motion.div>



            {/* White Boxes */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Exceptional Talent Network Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-[40%] card-hover bg-white/5 backdrop-blur-lg rounded-3xl p-4 md:p-6 border border-white/10"
              >
                <div className="flex items-center gap-1 mb-2 md:mb-3">
                  <div className="p-3 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    {/* <svg className="w-10 h-10 text-purple-500" viewBox="-5 -5 35 35" fill="none">
                      <path d="M17 21V19C17 20.4704 21.7893 20.9987 21.4142 21.3738C21.0391 21.7489 20.5108 21.9596 19.96 21.96C16.4 22.28 13.03 21.94 9.96 20.95C7.07 20 4.47 18.44 2.34 16.31C0.21 14.18 -1.35 11.58 -2.3 8.69C-3.29 5.62 -3.63 2.25 -3.31 -1.31C-3.30947 -1.85716 -3.09825 -2.38314 -2.72325 -2.75674C-2.34825 -3.13034 -1.82169 -3.33974 -1.275 -3.34H1.725C2.73 -3.35 3.57 -2.65 3.72 -1.66C3.95 0.12 4.47 1.85 5.27 3.47C5.6 4.15 5.5 4.95 5.03 5.44L3.21 7.26C5.19 10.52 7.89 13.22 11.15 15.2L12.97 13.38C13.46 12.91 14.26 12.81 14.94 13.14C16.56 13.94 18.29 14.46 20.07 14.69C21.08 14.84 21.79 15.71 21.77 16.73L22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg> */}
                    <Icon icon="marketeq:work" className="text-purple-500 w-10 h-10" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold">Exceptional Talent Network</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-400 pl-8 md:pl-11">Access our network of top-tier talent,</p>
              </motion.div>

              {/* Streamlined Excellence Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 card-hover bg-white/5 backdrop-blur-lg rounded-3xl p-4 md:p-6 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <Icon icon="teenyicons:forward-outline" className="text-blue-500 w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold">Streamlined Excellence</h3>
                </div>
                <p className="text-gray-400 text-sm pl-11">Seamless execution with expert guidance. Your project, our priority.</p>
              </motion.div>
            </div>

            {/* Contact Section - Polished */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 w-full"
            >
              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <button className="px-8 py-3 bg-gradient-to-r from-[#ff1cf7] to-[#00f0ff] text-black font-bold rounded-full flex items-center gap-2 hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20">
                  Read More
                  <motion.svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M5 12H19M19 12L16 6M19 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </button>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Phone Card */}
                <a href="tel:+2517800800" className="group flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                  <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                    <Icon icon="mingcute:phone-line" className="text-purple-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Call Us</p>
                    <p className="text-sm font-semibold text-white">+251 780 0800</p>
                  </div>
                </a>

                {/* Email Card */}
                <a href="mailto:info@novalabs.et" className="group flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300">
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <Icon icon="mingcute:mail-line" className="text-cyan-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email Us</p>
                    <p className="text-sm font-semibold text-white">info@novalabs.et</p>
                  </div>
                </a>
              </div>

              {/* Terminal Chat Widget */}
              <TerminalChat />

              {/* Secondary Phone */}
              <p className="text-xs text-white mt-3 text-center sm:text-left">Also available at: +251 777 42999</p>
            </motion.div>


          </div>
        </div>

        {/* Collaborations Section - Centered Bottom */}
        <div className="mt-20 pt-10 border-t border-white/10 text-center mx-auto max-w-4xl">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Collaborations</h3>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Partnering with visionaries to redefine boundaries and creating impactful digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
