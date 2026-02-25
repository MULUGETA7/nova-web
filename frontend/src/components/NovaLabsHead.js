import React from "react";
import { motion } from "framer-motion";
import './NovaLabsHead.css';

export default function NovaLabsHead() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className="nova-labs-head flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Headline block */}
      <motion.div className="nova-labs-head-headline" variants={itemVariants}>
        <span className="nova-labs-head-title">
          <span className="nlh-pink">In</span><span className="nlh-white">nova</span><span className="nlh-gradient">ting Tomorrow</span>
        </span>
        <span className="nova-labs-head-subtitle">
          TODAY
        </span>
      </motion.div>

      <motion.div className="nova-labs-head-description mt-10" variants={itemVariants}>
        <p className="studio-tag tracking-[0.3em] text-sm md:text-base font-black mb-3">
          PRODUCT ENGINEERING AND DESIGN STUDIO
        </p>
        <div className="description-divider"></div>
        <p className="company-tag tracking-[0.2em] text-[10px] md:text-xs text-gray-400 uppercase font-bold max-w-xl mx-auto mt-4 px-6">
          A LEADING WEB3 AND AI PRODUCT ENGINEERING COMPANY
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="mt-20 flex flex-col items-center"
        variants={itemVariants}
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-6 font-bold">
          Scroll to Explore
        </span>
        <div className="scroll-track">
          <motion.div
            className="scroll-thumb"
            animate={{
              y: [0, 40, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}