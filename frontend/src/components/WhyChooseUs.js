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
    <section className="why-choose-us-section">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src={VectorImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Side: Visual Showcase */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:relative lg:min-h-[700px]">

            {/* Experience Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="hidden lg:block lg:absolute z-30 top-10 left-10 floating"
            >
              <div className="exp-badge">
                <span className="exp-number gradient-text-brand">2+</span>
                <span className="exp-text">Years Of<br />Experience</span>
              </div>
            </motion.div>

            {/* Innovative Solutions Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative lg:absolute lg:top-[60px] lg:left-0 w-full lg:w-[330px] aspect-[4/3] lg:aspect-[4/5] z-10 glass-card overflow-hidden"
            >
              <img src={FirstWhyChoose} alt="Innovative Solutions" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h3 className="text-2xl font-black text-white mb-2">Innovative Solutions</h3>
                <p className="text-sm text-gray-200 leading-relaxed font-medium">
                  Transforming complex challenges into breakthrough digital technologies.
                </p>
              </div>
            </motion.div>

            {/* Global Expertise Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:absolute lg:bottom-[20px] lg:right-[-40px] w-full lg:w-[330px] aspect-[4/3] lg:aspect-[4/5] z-20 glass-card overflow-hidden lg:rotate-6"
            >
              <img src={ThirdWhyChoose} alt="Global Expertise" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h3 className="text-2xl font-black text-white mb-2 text-right">Global Expertise</h3>
                <p className="text-sm text-gray-200 leading-relaxed font-medium text-right">
                  Leveraging a network of top-tier talent to deliver industry-leading results.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content & Actions */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-tag">
                <div className="tag-line"></div>
                WHY CHOOSE US
              </div>

              <GradientText
                colors={["#FF1CF7", "#00F0FF"]}
                className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]"
              >
                Your Vision,<br />Our Priority
              </GradientText>

              <p className="text-lg text-gray-400 mb-12 max-w-xl leading-relaxed">
                We bridge the gap between ambitious ideas and reality. Our dedicated team of engineers and designers is ready to scale your next project to the moon.
              </p>
            </motion.div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="glass-card p-6 flex flex-col gap-4">
                <div className="icon-box-pink w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Icon icon="solar:users-group-rounded-bold-duotone" width="32" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Exceptional Talent</h4>
                  <p className="text-sm text-gray-500">Access our elite network of verified tech specialists.</p>
                </div>
              </div>

              <div className="glass-card p-6 flex flex-col gap-4">
                <div className="icon-box-cyan w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Icon icon="solar:rocket-bold-duotone" width="32" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Streamlined Execution</h4>
                  <p className="text-sm text-gray-500">Seamless delivery from concept to production.</p>
                </div>
              </div>
            </div>

            {/* Contact & CTA */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <div className="contact-card-link flex-1 min-w-[240px]">
                  <div className="icon-box-pink w-12 h-12 rounded-xl flex items-center justify-center">
                    <Icon icon="solar:phone-calling-bold-duotone" width="24" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Call Us</span>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+2517800800" className="text-white font-bold hover:text-[#ff1cf7] transition-colors">+251 780 0800</a>
                      <a href="tel:+25177742999" className="text-[12px] text-gray-400 hover:text-[#ff1cf7] transition-colors font-medium">Support: +251 777 42999</a>
                    </div>
                  </div>
                </div>

                <a href="mailto:info@novalabs.et" className="contact-card-link flex-1 min-w-[200px]">
                  <div className="icon-box-cyan w-12 h-12 rounded-xl flex items-center justify-center">
                    <Icon icon="solar:letter-bold-duotone" width="24" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500">Email Us</span>
                    <span className="text-white font-bold">info@novalabs.et</span>
                  </div>
                </a>
              </div>

              {/* Terminal Chat Widget */}
              <TerminalChat />
            </div>
          </div>
        </div>

        {/* Footer Collaboration - Polished White Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl -z-10 h-1/2"></div>

          <div className="collaboration-glass-card">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-white/20"></div>
                <h3 className="text-sm md:text-base font-black text-white uppercase tracking-[0.5em] opacity-80">
                  Our Collaborations
                </h3>
                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-white/20"></div>
              </div>

              <div className="max-w-4xl px-4">
                <p className="collaboration-quote">
                  "Partnering with visionaries to redefine the boundaries of what's possible in the digital age."
                </p>
              </div>

              <div className="flex items-center gap-8 mt-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <Icon icon="simple-icons:ethereum" width="24" className="text-white" />
                <Icon icon="simple-icons:googlecloud" width="24" className="text-white" />
                <Icon icon="simple-icons:nvidia" width="32" className="text-white" />
                <Icon icon="simple-icons:openai" width="24" className="text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
