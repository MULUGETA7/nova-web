"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './HackatonShow.css';
// import GradientText from './GradientText';
import ShinyText from './ShinyText';
import DevTerminal from './DevTerminal';
import { getApiUrl } from '../utils/apiConfig';

function HackatonShow() {
  const [firstRowContent, setFirstRowContent] = useState([]);
  const [secondRowContent, setSecondRowContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/hackathon`);

        if (!response.ok) {
          throw new Error('Failed to fetch hackathon data');
        }

        const data = await response.json();

        // Define pattern for image widths
        const pattern = ['large', 'medium', 'small', 'medium', 'small', 'small'];
        const sizes = {
          small: 'w-[200px]',
          medium: 'w-[300px]',
          large: 'w-[600px]'
        };

        // Transform API data into frontend components
        const allItems = data.map((item, index) => {
          if (item.type === 'stat') {
            return {
              id: item._id,
              type: "stats",
              number: item.metric,
              description: item.subtext,
              // Rotate gradients for stats cards
              gradient: index % 3 === 0 ? 'bg-[#BE99F8]' : (index % 3 === 1 ? 'bg-[#FDF5A3]' : 'bg-[#A5FCF0]')
            };
          } else {
            return {
              id: item._id,
              type: "image",
              src: `${apiUrl}${item.images[0]}`,
              alt: item.title,
              width: sizes[pattern[index % pattern.length]]
            };
          }
        });

        // Split items into two rows
        const firstRow = allItems.filter((_, i) => i % 2 === 0);
        const secondRow = allItems.filter((_, i) => i % 2 !== 0);

        // Ensure rows aren't empty for infinite scroll
        while (firstRow.length < 3) firstRow.push({ type: "image", src: '/logo192.png', width: 'w-[300px]' });
        while (secondRow.length < 3) secondRow.push({ type: "image", src: '/logo192.png', width: 'w-[300px]' });

        setFirstRowContent(firstRow);
        setSecondRowContent(secondRow);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathon images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-black text-cyan-500">Initializing Archive...</div>;
  }

  const renderItem = (item, i, rowPrefix) => {
    if (item.type === "stats") {
      return (
        <div
          key={`${rowPrefix}-stats-${i}`}
          className={`flex-shrink-0 w-[240px] h-[321.65px] special-card flex flex-col justify-center items-center p-6 mx-1 ${item.gradient} rounded-[2.5rem] shadow-xl transition-all hover:scale-105`}
        >
          <h2 className="text-6xl font-black text-black mb-2 tracking-tighter italic">{item.number}</h2>
          <p className="text-sm text-black text-center font-black uppercase tracking-widest leading-tight whitespace-pre-line">{item.description}</p>
        </div>
      );
    } else {
      return (
        <div
          key={`${rowPrefix}-img-${i}`}
          className={`flex-shrink-0 ${item.width} h-[321.65px] mx-1 rounded-[2.5rem] overflow-hidden group border border-white/5 transition-all hover:border-cyan-500/30`}
        >
          <img
            src={item.src}
            alt={item.alt || "Hackathon"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      );
    }
  };

  return (
    <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-screen hackaton-scroll-container">
      <div className="relative">
        <div className="text-center">


          <div className="flex justify-center items-center p-6 mt-8">
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="relative w-24 h-12 bg-[#0a201d] rounded-2xl border border-[#114539] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
            >
              <div className="absolute inset-0 bg-[#07a182]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <ShinyText
                text="Dev"
                disabled={false}
                speed={3}
                className="text-[#07a182] text-xl font-black uppercase tracking-widest"
              />
            </button>
          </div>

          <div className="w-full px-4 md:px-12 relative py-4">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none mx-auto">
              ACCELERATING THE
              <br />
              NEXT GEN OF BUILDS
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
          >
            Nova Labs empowers developers with peak-performance tooling and seamless integrations.
          </motion.p>

          <div className="mt-20 relative px-0 overflow-hidden">
            {/* First Row - Scroll Left */}
            <div className="scroll-container">
              <motion.div
                className="scroll-content flex"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 120, ease: "linear", repeat: Infinity }}
              >
                {[...firstRowContent, ...firstRowContent].map((item, i) => renderItem(item, i, 'row1'))}
              </motion.div>
            </div>

            {/* Second Row - Scroll Right */}
            <div className="scroll-container mt-4">
              <motion.div
                className="scroll-content flex"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 120, ease: "linear", repeat: Infinity }}
              >
                {[...secondRowContent, ...secondRowContent].map((item, i) => renderItem(item, i, 'row2'))}
              </motion.div>
            </div>

            <div className="w-full px-4 md:px-12 relative mt-16 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col border-l-2 border-white/20 pl-6 text-left"
              >
                <h3 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                  A Product Studio Building the <br />
                  Next Generation of Intelligent Systems,
                </h3>
                <p className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] leading-tight">
                  Powered by a Collective of Engineers and Designers
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <DevTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default HackatonShow;