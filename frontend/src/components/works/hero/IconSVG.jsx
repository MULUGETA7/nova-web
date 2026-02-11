import React from "react";

const IconSVG = ({ svgContent }) => {
  return <div className="animate-pulse" dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default IconSVG;
