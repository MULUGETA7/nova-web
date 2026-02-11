import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import './WorldMap.css';

const WorldMap = () => {
  const [text, setText] = useState('');
  const fullText = "STAY IN THE KNOW. DON'T MISS AN UPDATE.";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className='world-map-container world-map'>
      <div className='world-map-content'>
        <div className='center-overlay'>
          <div className="ai-interface-header mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00f0ff]" />
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Neural Intelligence Feed</span>
            </div>

            <h1 className='text-2xl md:text-3xl font-black text-white text-center leading-tight tracking-tighter italic uppercase min-h-[4rem]'>
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-8 md:h-10 ml-1 bg-cyan-400 align-middle"
              />
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className='terminal-input-wrapper w-full max-w-lg relative group'
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex items-center gap-4 p-2 bg-[#0a131a]/80 border border-white/10 rounded-[2rem] backdrop-blur-2xl focus-within:border-cyan-400/40 transition-all shadow-2xl">
              <div className="pl-4 text-gray-500 font-mono text-xs select-none">nova@matrix:~$</div>

              <input
                type='email'
                placeholder='Identify your terminal (Email)...'
                className='flex-1 bg-transparent border-none outline-none text-white text-sm font-medium py-3 placeholder:text-gray-700'
                aria-label='Email address'
              />

              <button className='group relative px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[9px] rounded-full hover:scale-105 transition-all overflow-hidden'>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className='relative z-10'>AUTHORIZE</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 opacity-40">
              <div className="flex items-center gap-1.5">
                <Icon icon="ph:shield-check-bold" className="text-gray-500 w-3 h-3" />
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">RSA-4096 Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon icon="ph:cpu-bold" className="text-gray-500 w-3 h-3" />
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Real-time Sync</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
