import React from "react";
import './NovaLabsHead.css';

export default function NovaLabsHead() {
  return (
    <div className="nova-labs-head flex flex-col items-center justify-center">
      <span
        className="nova-labs-head-title"
        style={{
          background: 'linear-gradient(-84deg, #00F0FF 0%, #FF1CF7 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          display: 'inline-block',
          fontWeight: '900',
          letterSpacing: '1.6px'
        }}
      >
        Innovating Tomorrow
      </span>
      <span
        className="nova-labs-head-subtitle block"
        style={{
          fontWeight: '900',
          letterSpacing: '1.6px',
          display: 'block',
          marginTop: '0px'
        }}
      >
        Today
      </span>
      <div className="nova-labs-head-description mt-6">
        <p className="tracking-widest text-sm md:text-base font-bold mb-2">PRODUCT ENGINEERING AND DESIGN STUDIO</p>
        <p className="tracking-widest text-xs md:text-sm text-gray-300 uppercase">A LEADING WEB3 AND AI PRODUCT ENGINEERING COMPANY</p>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-16 flex flex-col items-center animate-bounce">
        <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>
    </div>
  );
}