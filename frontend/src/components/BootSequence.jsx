import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootSequence = ({ onEnter }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showEnterPrompt, setShowEnterPrompt] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const year = now.getFullYear();
    
    return `${dayName} ${monthName} ${day} ${hours}:${minutes}:${seconds} UTC+3 ${year}`;
  };

  const bootSequence = [
    { text: 'header', delay: 800, typeSpeed: 0, color: 'white' }, // Special marker for header
    { text: '[✔] Core ethics module online', delay: 200, typeSpeed: 25, color: 'green' },
    { text: '[✔] Responsible infrastructure loading', delay: 200, typeSpeed: 20, color: 'green' },
    { text: '[✔] Sustainability protocols activated', delay: 200, typeSpeed: 25, color: 'green' },
    { text: '[✔] Transparency layer verified', delay: 200, typeSpeed: 25, color: 'green' },
    { text: '[⚙] Calibrating creativity engines... done', delay: 200, typeSpeed: 30, color: 'yellow' },
    { text: '[🌍] Syncing with digital conscience... complete', delay: 200, typeSpeed: 25, color: 'cyan' },
    { text: '[🛰] Establishing secure connection to Nova Cloud...', delay: 200, typeSpeed: 20, color: 'cyan' },
    { text: 'progress-bar', delay: 1500, typeSpeed: 0, color: 'cyan' }, // Special marker for progress bar
    { text: "[✔] You're in. Welcome to Nova Labs.", delay: 300, typeSpeed: 35, color: 'green' },
  ];

  // Typewriter effect for current line
  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const currentText = bootSequence[currentLine].text;
      const typeSpeed = bootSequence[currentLine].typeSpeed;
      
      // Special handling for header
      if (currentText === 'header') {
        const timer = setTimeout(() => {
          setDisplayedText([...displayedText, currentText]);
          setCurrentLine(currentLine + 1);
          setCurrentCharIndex(0);
        }, bootSequence[currentLine].delay);
        return () => clearTimeout(timer);
      }
      
      // Special handling for progress bar
      if (currentText === 'progress-bar') {
        setShowProgressBar(true);
        // Don't use typewriter for progress bar, just wait for animation
        const timer = setTimeout(() => {
          setDisplayedText([...displayedText, currentText]);
          setCurrentLine(currentLine + 1);
          setCurrentCharIndex(0);
        }, bootSequence[currentLine].delay);
        return () => clearTimeout(timer);
      }
      
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1);
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        // Current line is complete, move to next line after delay
        const timer = setTimeout(() => {
          setDisplayedText([...displayedText, currentText]);
          setCurrentLine(currentLine + 1);
          setCurrentCharIndex(0);
        }, bootSequence[currentLine].delay);
        return () => clearTimeout(timer);
      }
    } else if (currentLine === bootSequence.length && !showEnterPrompt) {
      // All lines complete, show enter prompt
      setTimeout(() => setShowEnterPrompt(true), 500);
    }
  }, [currentLine, currentCharIndex, bootSequence, displayedText, showEnterPrompt]);

  // Animate progress bar from 0 to 100%
  useEffect(() => {
    if (showProgressBar && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 30); // Update every 30ms (faster animation)
      return () => clearTimeout(timer);
    }
  }, [showProgressBar, progress]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && showEnterPrompt && !isEntering) {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showEnterPrompt, isEntering]);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden font-mono">
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan" />
      </div>

      {/* CRT screen effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.1) 0px, transparent 1px, transparent 2px, rgba(0,255,255,0.1) 3px)',
        }} />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-3xl px-6 md:px-8">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-black/80 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden"
        >
          {/* Terminal header */}
          <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 px-4 py-2 flex items-center gap-2 border-b border-cyan-500/30">
            <span className="text-cyan-400/60 text-xs">nova-terminal@systems:~$</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 md:p-8 max-h-[70vh] overflow-y-auto terminal-scroll">
            {/* Display completed lines */}
            {displayedText.map((line, index) => {
              // Special rendering for header
              if (line === 'header') {
                return (
                  <div key={index} className="mb-4 md:mb-6">
                    <div className="text-white font-bold text-base md:text-lg mb-3">
                      Welcome to Nova OS v1.0.0 (Responsible Linux 9.9.9 x∞_∞)
                    </div>
                    <div className="text-cyan-400 text-xs md:text-sm space-y-1 mb-3">
                      <div> * Documentation:  <span className="underline">https://nova.labs/docs/ethics</span></div>
                      <div> * Management:     <span className="underline">https://nova.labs/control</span></div>
                      <div> * Support:        <span className="underline">https://nova.labs/help</span> (humans only, no bots... yet)</div>
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm mb-3">
                      System information as of {getCurrentDateTime()}
                    </div>
                    <div className="border-t border-gray-700 my-3"></div>
                  </div>
                );
              }
              
              // Skip rendering the 'progress-bar' marker
              if (line === 'progress-bar') return null;
              
              // Get color for this line
              const lineData = bootSequence.find(item => item.text === line);
              const colorClass = lineData?.color === 'green' ? 'text-green-400' :
                                lineData?.color === 'yellow' ? 'text-yellow-400' :
                                lineData?.color === 'cyan' ? 'text-cyan-400' :
                                'text-gray-300';
              
              return (
                <div
                  key={index}
                  className={`mb-2 md:mb-3 text-sm md:text-base ${colorClass}`}
                >
                  {line}
                </div>
              );
            })}
            
            {/* Display current line being typed */}
            {currentLine < bootSequence.length && 
             bootSequence[currentLine].text !== 'progress-bar' && 
             bootSequence[currentLine].text !== 'header' && (
              <div
                className={`mb-2 md:mb-3 text-sm md:text-base ${
                  bootSequence[currentLine].color === 'green' ? 'text-green-400' :
                  bootSequence[currentLine].color === 'yellow' ? 'text-yellow-400' :
                  bootSequence[currentLine].color === 'cyan' ? 'text-cyan-400' :
                  'text-gray-300'
                }`}
              >
                {bootSequence[currentLine].text.substring(0, currentCharIndex)}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block ml-0.5 w-2 h-4 bg-cyan-400"
                />
              </div>
            )}

            {/* Animated Progress Bar */}
            {showProgressBar && (
              <div className="mb-3 mt-2">
                <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                  <div className="flex-1 font-mono">
                    {/* Generate blocks based on progress */}
                    {Array.from({ length: 10 }).map((_, i) => {
                      const blockThreshold = (i + 1) * 10;
                      return (
                        <span
                          key={i}
                          className={`transition-colors duration-100 ${
                            progress >= blockThreshold ? 'text-cyan-400' : 'text-gray-600'
                          }`}
                        >
                          █
                        </span>
                      );
                    })}
                    <span className="ml-2 text-cyan-400 font-bold">{progress}%</span>
                    <span className="text-gray-400"> — Deploying innovation</span>
                  </div>
                </div>
              </div>
            )}

            {/* Enter prompt */}
            <AnimatePresence>
              {showEnterPrompt && !isEntering && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 md:mt-8 space-y-3 md:space-y-4"
                >
                  {/* Blinking cursor prompt */}
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span>{'>'}</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-3 h-5 bg-cyan-400"
                    />
                  </div>

                  {/* Enter button */}
                  <motion.button
                    onClick={handleEnter}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded border border-cyan-400/50 shadow-lg shadow-cyan-500/30 overflow-hidden text-sm md:text-base w-full md:w-auto"
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="text-xs md:text-sm opacity-70">[PRESS ENTER]</span>
                      <span className="text-sm md:text-base">Initialize System</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>

                  {/* Hint text */}
                  <p className="text-gray-500 text-xs md:text-sm">
                    Press <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-800 border border-gray-700 rounded text-cyan-400 text-xs">ENTER</kbd> or <kbd className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-800 border border-gray-700 rounded text-cyan-400 text-xs">SPACE</kbd> to continue
                  </p>
                </motion.div>
              )}

              {isEntering && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 space-y-2"
                >
                  <div className="text-cyan-400">{'> '} Launching Nova Labs interface...</div>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="text-center mt-3 md:mt-4 text-gray-600 text-xs md:text-sm"
        >
          Nova Labs © 2025 — Secure Terminal Session
        </motion.div>
      </div>

      {/* Add custom CSS for terminal scroll and animations */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .terminal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 4px;
        }
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default BootSequence;

