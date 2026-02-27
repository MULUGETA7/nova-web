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
        className="flex justify-center items-center rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm h-[50px] w-[50px]"
        animate={{
          y: [0, -2, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <IconSVG svgContent={icon} />
      </motion.div>
      <motion.p
        className="text-base font-bold text-white tracking-tight"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default FeatureItem;
