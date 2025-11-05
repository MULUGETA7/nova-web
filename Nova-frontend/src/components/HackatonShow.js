"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './HackatonShow.css';
import GradientText from './GradientText';
import ShinyText from './ShinyText';
import { getApiUrl } from '../utils/apiConfig';

function HackatonShow() {
  const [firstRowContent, setFirstRowContent] = useState([]);
  const [secondRowContent, setSecondRowContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/hackathon`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch hackathon images');
        }
        
        const data = await response.json();
        console.log('Hackathon data loaded:', data); // Debug log
        console.log('Hackathon API URL:', apiUrl); // Debug log
        
        // Define the pattern and sizes
        const pattern = ['large', 'medium', 'small', 'medium', 'small', 'small'];
        const sizes = {
          small: 'w-[200px]',
          medium: 'w-[300px]',
          large: 'w-[600px]'
        };

        // Create images with the specific pattern
        const images = data.map((item, index) => ({
          src: `${apiUrl}${item.images[0]}`,
          alt: item.alt || "Hackathon Image",
          width: sizes[pattern[index % pattern.length]]
        }));

        // First row content (6 images with alternating sizes)
        const firstRow = [
          { ...images[0], width: 'w-[600px]' },
          { ...images[1], width: 'w-[300px]' },
          { 
            type: "stats", 
            number: "2.6k", 
            title: "XDay 2023 Attendees",
            gradient: 'bg-[#BE99F8]'
          },
          { ...images[2], width: 'w-[300px]' },
          { ...images[3], width: 'w-[200px]' },
          { ...images[4], width: 'w-[200px]' }
        ];

        // Second row content (4 images + 2 special cards)
        const secondRow = [
          { ...images[3], width: 'w-[300px]' },
          { 
            type: "stats", 
            number: "1k+", 
            description: "Participants in the Nova days\n2023 hackathon",
            gradient: 'bg-[#FDF5A3]'
          },
          { ...images[4], width: 'w-[200px]' },
          { 
            type: "stats", 
            number: "39k", 
            description: "On Discord\nand Telegram",
            gradient: 'bg-[#A5FCF0]'
          },
          { ...images[0], width: 'w-[300px]' },
          { ...images[1], width: 'w-[200px]' }
        ];

        setFirstRowContent(firstRow);
        setSecondRowContent(secondRow);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathon images:', error);
        console.log('Using fallback content for hackathon');
        // Create fallback content with placeholder images
        const placeholderImage = { src: '/logo192.png', alt: 'Placeholder', width: 'w-[300px]' };
        
        const fallbackFirstRow = [
          { ...placeholderImage, width: 'w-[600px]' },
          { ...placeholderImage, width: 'w-[300px]' },
          { 
            type: "stats", 
            number: "2.6k", 
            title: "XDay 2023 Attendees",
            gradient: 'bg-[#BE99F8]'
          },
          { ...placeholderImage, width: 'w-[300px]' },
          { ...placeholderImage, width: 'w-[200px]' },
          { ...placeholderImage, width: 'w-[200px]' }
        ];
        
        const fallbackSecondRow = [
          { ...placeholderImage, width: 'w-[300px]' },
          { 
            type: "stats", 
            number: "1k+", 
            description: "Participants in the Nova days\n2023 hackathon",
            gradient: 'bg-[#FDF5A3]'
          },
          { ...placeholderImage, width: 'w-[200px]' },
          { 
            type: "stats", 
            number: "39k", 
            description: "On Discord\nand Telegram",
            gradient: 'bg-[#A5FCF0]'
          },
          { ...placeholderImage, width: 'w-[300px]' },
          { ...placeholderImage, width: 'w-[200px]' }
        ];
        
        setFirstRowContent(fallbackFirstRow);
        setSecondRowContent(fallbackSecondRow);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-screen hackaton-scroll-container">
      <div className="relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <p className="text-sm text-gray-500 mb-8">
              Integrations and tools from leading companies around the globe
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 px-4">
              {['google cloud', 'Telekom 1', 'tencent-cloud 1', 'logo-aws 1', 'AXELAR 1', 'Ledger 1', 'ethio'].map((icon) => (
                <img
                  key={icon}
                  src={require(`../icon/${icon}.png`)}
                  alt={icon.split(' ')[0]}
                  className={`h-6 md:h-8 grayscale hover:grayscale-0 ${icon === 'ethio' ? 'invert' : ''}`}
                />
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center items-center p-6">
            <div className="relative w-[83px] h-11 left-0 top-[7px] bg-[#0a201d] rounded-[26px] border border-[#114539] flex items-center justify-center">
              <ShinyText 
                text="Dev" 
                disabled={false} 
                speed={3} 
                className="text-[#07a182] text-[22px] font-bold font-['Plus Jakarta Sans'] leading-[60px]"
              />
            </div>
          </div>

          <div className="w-full px-4 md:px-12 relative py-6">
            <GradientText
              colors={["#ff1cf7", "#00f0ff", "#ff1cf7", "#00f0ff", "#00f0ff"]}
              animationSpeed={3}
              showBorder={false}
              className="text-4xl md:text-4xl font-bold mb-6 leading-tight mx-auto"
              style={{ lineHeight: '1.5' }}
            >
              Let's make this decision
              <br />
              easy for you
            </GradientText>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Nova labs provide the infrastructure you need to tackle any use case.
          </motion.p>

          <div className="mt-20 relative px-0 overflow-hidden">
            {/* First Row - Scroll Left */}
            <div className="scroll-container">
              <motion.div 
                className="scroll-content"
                animate={{ 
                  x: ["-50%", "0%"],
                }}
                transition={{
                  duration: 120,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 0
                }}
              >
                {[...firstRowContent, ...firstRowContent].map((item, i) => (
                  item.type === "stats" ? (
                    <div 
                      key={`row1-stats-${i}`}
                      className={`flex-shrink-0 w-[200px] h-[321.651625px] special-card flex flex-col justify-center items-center p-4 mx-0.5 ${item.gradient}`}
                    >
                      <h2 className="text-7xl font-bold text-black mb-2">{item.number}</h2>
                      <p className="text-lg text-black text-center font-medium whitespace-pre-line">{item.title}</p>
                    </div>
                  ) : (
                    <div 
                      key={`row1-img-${i}`}
                      className={`flex-shrink-0 ${item.width} h-[321.651625px] mx-0.5`}
                    >
                      <img 
                        src={item.src} 
                        alt={item.alt}
                        className="hackaton-img w-full h-full"
                      />
                    </div>
                  )
                ))}
              </motion.div>
            </div>

            {/* Second Row - Scroll Right */}
            <div className="scroll-container mt-2">
              <motion.div 
                className="scroll-content"
                animate={{ 
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 120,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 0
                }}
              >
                {[...secondRowContent, ...secondRowContent].map((item, i) => (
                  item.type === "stats" ? (
                    <div 
                      key={`row2-stats-${i}`}
                      className={`flex-shrink-0 w-[200px] h-[321.651625px] special-card flex flex-col justify-center items-center p-4 mx-0.5 ${item.gradient}`}
                    >
                      <h2 className="text-7xl font-bold text-black mb-2">{item.number}</h2>
                      <p className="text-lg text-black text-center font-medium whitespace-pre-line">{item.description}</p>
                    </div>
                  ) : (
                    <div 
                      key={`row2-img-${i}`}
                      className={`flex-shrink-0 ${item.width} h-[321.651625px] mx-0.5`}
                    >
                      <img 
                        src={item.src} 
                        alt={item.alt}
                        className="hackaton-img w-full h-full"
                      />
                    </div>
                  )
                ))}
              </motion.div>
            </div>

            <div className="w-full px-4 md:px-12 relative"> 
              <GradientText
                colors={["#ff1cf7", "#00f0ff", "#ff1cf7", "#00f0ff", "#00f0ff"]}
                animationSpeed={3}
                showBorder={false}
                className="text-[40px] font-bold font-['Montserrat'] uppercase leading-[26.50px] motivational-text text-left"
                style={{ lineHeight: '1.5' }}
              >
                Individually, our impact is limited, but together,
                <br />
                we have the power to achieve the extraordinary.
              </GradientText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HackatonShow;