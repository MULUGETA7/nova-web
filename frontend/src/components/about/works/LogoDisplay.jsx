import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { getApiUrl } from '../../../utils/apiConfig';

const fallbackLogos = [
  { src: require('../../../icon/tenaminstir.png'), width: "w-[21%]", mt: "mt-32", imageWidth: "60", imageHeight: "60" },
  { src: require('../../../icon/tele.png'), width: "w-[21%]", mt: "mt-32", imageWidth: "100", imageHeight: "100" },
  { src: require('../../../icon/dgaf.png'), width: "w-[21%]", mt: "mt-[110px]", imageWidth: "100", imageHeight: "100" },
  { src: require('../../../icon/etv.png'), width: "w-[21%]", mt: "mt-[120px]", imageWidth: "100", imageHeight: "100" },
  { src: require('../../../icon/feres.png'), width: "w-[21%]", mt: "mt-32", imageWidth: "100", imageHeight: "100" },
];

function LogoDisplay() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/clients`);
        if (!response.ok) throw new Error('Failed to fetch clients');
        const data = await response.json();

        if (data && data.length > 0) {
          const formattedLogos = data.map(partner => ({
            src: `${apiUrl}${partner.logo}`,
            width: "w-[21%]",
            mt: "mt-32",
            imageWidth: "100",
            imageHeight: "100"
          }));
          setPartnerLogos(formattedLogos);
        } else {
          setPartnerLogos(fallbackLogos);
        }
      } catch (error) {
        console.error("Error fetching partner logos:", error);
        setPartnerLogos(fallbackLogos);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

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

  if (loading) return <div className="text-center py-20 text-gray-500">Scanning client network...</div>;

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
            className={`text-white text-4xl ${item.width} h-[300px] bg-[#171717] rounded-xl flex items-center justify-center`}
            variants={itemVariants}
            custom={index}
          >
            <Icon
              icon={item.icon}
              style={{ color: "#ffffff" }}
              width={40}
              height={40}
            />
          </motion.span>
        ))}
      </motion.div>

      {/* Second Row - Client Logos */}
      <motion.div className="flex flex-row gap-1 mt-6 overflow-hidden w-full">
        {/* We want to show at most 4 logos in the middle, and icons on the edges */}
        {[
          { type: "empty", width: "w-[8%]" },
          ...(partnerLogos.slice(0, 4).map(logo => ({ ...logo, type: "image" }))),
          { type: "icon", icon: "entypo-social:tiktok", width: "w-[8%]" }
        ].map((item, index) => (
          <motion.span
            key={index}
            className={`text-white text-4xl ${item.width} h-[300px] bg-[#171717] rounded-xl flex items-center justify-center`}
            variants={itemVariants}
            custom={index}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt=""
                width={item.imageWidth}
                height={item.imageHeight}
                className="object-contain"
              />
            ) : item.type === "icon" ? (
              <Icon
                icon={item.icon}
                style={{ color: "#ffffff" }}
                width={60}
                height={60}
              />
            ) : null}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default LogoDisplay;