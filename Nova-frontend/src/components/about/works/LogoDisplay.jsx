import React from "react";
import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

function LogoDisplay() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      {/* First Row - Social Icons */}
      <motion.div className="flex flex-row gap-1 overflow-hidden w-full">
        {[
          { icon: "entypo-social:tiktok", width: "w-[8%]" },
          { icon: "entypo-social:linkedin", width: "w-[21%]" },
          { icon: "entypo-social:instagram", width: "w-[21%]" },
          { icon: "entypo-social:facebook", width: "w-[21%]" },
          { icon: "fa6-brands:tiktok", width: "w-[21%]" },
          { icon: "entypo-social:tiktok", width: "w-[8%]" }
        ].map((item, index) => (
          <motion.span
            key={index}
            className={`text-white text-4xl ${item.width} h-[300px] bg-[#171717] rounded-xl`}
            variants={itemVariants}
            custom={index}
          >
            <Icon 
              icon={item.icon} 
              style={{color: "#ffffff"}} 
              width={40} 
              height={40} 
              className="m-auto mt-28 items-center justify-center"
            />
          </motion.span>
        ))}
      </motion.div>

      {/* Second Row - Client Logos */}
      <motion.div className="flex flex-row gap-1 mt-6 overflow-hidden w-full">
        {[
          { type: "empty", width: "w-[8%]" },
          { type: "image", src: "/images/clients/digaf.png", width: "w-[21%]", mt: "mt-32", imageWidth: "60", imageHeight: "60" },
          { type: "image", src: "/images/clients/matrix.png", width: "w-[21%]", mt: "mt-32", imageWidth: "100", imageHeight: "100" },
          { type: "image", src: "/images/clients/ease.png", width: "w-[21%]", mt: "mt-[110px]", imageWidth: "100", imageHeight: "100" },
          { type: "image", src: "/images/clients/safari.png", width: "w-[21%]", mt: "mt-[120px]", imageWidth: "100", imageHeight: "100" },
          { type: "icon", icon: "entypo-social:tiktok", width: "w-[8%]" }
        ].map((item, index) => (
          <motion.span
            key={index}
            className={`text-white text-4xl ${item.width} h-[300px] bg-[#171717] rounded-xl`}
            variants={itemVariants}
            custom={index}
          >
            {item.type === "image" ? (
              <img 
                src={item.src} 
                alt="" 
                width={item.imageWidth} 
                height={item.imageHeight} 
                className={`m-auto ${item.mt} items-center justify-center`}
              />
            ) : item.type === "icon" ? (
              <Icon 
                icon={item.icon} 
                style={{color: "#ffffff"}} 
                width={60} 
                height={60} 
                className="m-auto mt-24 items-center justify-center"
              />
            ) : null}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default LogoDisplay;