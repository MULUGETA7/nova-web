import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getApiUrl } from '../utils/apiConfig';

const fallbackLogos = [
  { imgUrl: require('../icon/tenaminstir.png'), altText: "Partner Logo" },
  { imgUrl: require('../icon/tele.png'), altText: "Partner Logo" },
  { imgUrl: require('../icon/dgaf.png'), altText: "Partner Logo" },
  { imgUrl: require('../icon/etv.png'), altText: "Partner Logo" },
  { imgUrl: require('../icon/feres.png'), altText: "Partner Logo" },
];

function OurClient() {
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
          const clientData = data.filter(item => !item.type || item.type === 'client');
          const formattedLogos = clientData.map(partner => ({
            imgUrl: `${apiUrl}${partner.logo}`,
            altText: partner.name
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

  return (
    <div className="bg-[#0f172a]/05 pt-14 pb-24 px-4 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-4">
            Used by creative professionals at
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
            Our Global Network
          </h1>
        </motion.div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60"
          >
            {partnerLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo.imgUrl}
                alt={logo.altText}
                whileHover={{ scale: 1.1, filter: "brightness(1.5)", opacity: 1 }}
                className="h-12 md:h-24 w-auto object-contain grayscale transition-all duration-300 cursor-pointer"
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default OurClient;
