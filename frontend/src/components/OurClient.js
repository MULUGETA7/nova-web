import { useEffect, useState } from "react";
import LogoWall from "./LogoWall";
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
          const formattedLogos = data.map(partner => ({
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
    <div className="App py-10">
      <h1 style={{ textAlign: 'left', marginLeft: '64px' }} className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8">
        Our <span className="nova-gradient-text">Clients</span>
      </h1>

      {!loading && (
        <LogoWall
          items={partnerLogos}
          duration="40s"
          pauseOnHover={true}
          size="clamp(5rem, 1rem + 20vmin, 15rem)"
        />
      )}
    </div>
  );
}

export default OurClient;
