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
          fontWeight: '900', // Set to 900 for extra bold
          letterSpacing: '1.6px' // Ensure consistent letter spacing
        }}
      >
        Innovating Tomorrow
      </span>
      <span 
        className="nova-labs-head-subtitle" 
        style={{ 
          fontWeight: '900',
          letterSpacing: '1.6px' // Ensure consistent letter spacing
        }}
      >
        Today
      </span>
      <p className="nova-labs-head-description">
        <span>PRODUCT ENGINEERING AND DESIGN STUDIO</span>
        <br />
        <span>A LEADING WEB3 AND AI PRODUCT ENGINEERING COMPANY</span>
      </p>
    </div>
  );
}