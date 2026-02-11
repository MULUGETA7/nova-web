import React from "react";
import IconSVG from "./IconSVG";
import { motion } from "framer-motion";

const FeatureItem = ({ icon, text }) => {
  return (
    <motion.div 
      className="flex gap-5 items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-center items-center rounded-lg bg-neutral-200 h-[50px] w-[50px]"
        animate={{ 
          y: [0, -2, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 1, -1, 0],
        }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      >
        <IconSVG svgContent={icon} />
      </motion.div>
      <motion.p 
        className="text-base text-white"
        animate={{ 
          opacity: [1, 0.3, 1],
          x: [0, 1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default FeatureItem;
