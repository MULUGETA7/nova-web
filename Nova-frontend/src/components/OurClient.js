import React from "react";
import LogoWall from "./LogoWall";

const logos = [
  { imgUrl: require('../icon/tenaminstir.png'), altText: "My Logo" }, // Your own logo
  { imgUrl: require('../icon/tele.png'), altText: "My Logo" },
  { imgUrl: require('../icon/dgaf.png'), altText: "My Logo" },
  { imgUrl: require('../icon/etv.png'), altText: "My Logo" },
  { imgUrl: require('../icon/unknown.png'), altText: "My Logo" },
  { imgUrl: require('../icon/feres.png'), altText: "My Logo" },
  { imgUrl: require('../icon/tenaminstir.png'), altText: "My Logo" },
  { imgUrl: require('../icon/tele.png'), altText: "My Logo" },
  { imgUrl: require('../icon/dgaf.png'), altText: "My Logo" },
  { imgUrl: require('../icon/etv.png'), altText: "My Logo" },
];

function OurClient() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'left', marginLeft: '64px' }} className="text-2xl font-bold my-5">Our Clients</h1>
      <LogoWall 
        items={logos} 
        duration="40s" 
        
        pauseOnHover={true}
        size="clamp(5rem, 1rem + 20vmin, 15rem)"
      />
    </div>
  );
}

export default OurClient;
