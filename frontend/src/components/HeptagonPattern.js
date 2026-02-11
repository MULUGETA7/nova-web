import React, { useEffect, useState } from "react";
import "./styles.css";  // Import the CSS file

const HeptagonPattern = () => {
  const [phase, setPhase] = useState(0);

  // Animation effect
  useEffect(() => {
    let animationFrameId;
    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      setPhase(elapsed * Math.PI * 0.25); // Reduced to 1/4 speed (8-second cycle)
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // SVG dimensions and calculations
  const svgWidth = 1600;  // Increased width
  const svgHeight = 800;
  const baseRadius = 40;  // Slightly smaller initial size
  const spacing = 15;     // Reduced spacing between shapes
  
  // Calculate number of shapes needed to fill width
  const numberOfShapes = Math.ceil((svgWidth - 40) / spacing) + 5; // Add extra shapes for safety

  // Function to generate the heptagon points
  const generateHeptagonPoints = (radius, centerX, centerY, sides = 7) => {
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (2 * Math.PI * i) / sides - Math.PI / 2; // Start from top point
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  // Wave parameters
  const maxAmplitude = 120; // Increased height for single wave
  const frequency = 0.005; // Reduced frequency for single wave

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="heptagonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9932CC" /> {/* Dark purple */}
          <stop offset="50%" stopColor="#4169E1" /> {/* Royal blue */}
          <stop offset="100%" stopColor="#00FFFF" /> {/* Cyan */}
        </linearGradient>
      </defs>
      {Array.from({ length: numberOfShapes }).map((_, index) => {
        // Calculate size and position with more dramatic increase
        const radius = baseRadius + index * 2.5;  // Smaller increment
        const xPos = 20 + index * spacing;  // Start more to the left with consistent spacing
        
        // Calculate wave position with phase shift for animation
        const waveOffset = Math.sin((xPos * frequency) + phase) * maxAmplitude;
        const yPos = svgHeight / 2 + waveOffset; // Center vertically with wave offset

        // Calculate opacity based on vertical position
        const heightFactor = (svgHeight - yPos) / svgHeight;
        const opacity = Math.max(0.3, 1 - heightFactor);

        // Calculate rotation based on wave position
        const rotation = waveOffset * 0.2; // Subtle rotation

        return (
          <polygon
            key={index}
            points={generateHeptagonPoints(radius, xPos, yPos)}
            stroke="url(#heptagonGradient)"
            strokeWidth="2"
            fill="none"
            style={{ 
              opacity,
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${xPos}px ${yPos}px`,
              transition: 'transform 0.3s ease-out' // Slightly longer transition
            }}
            className="heptagon"
          />
        );
      })}
    </svg>
  );
};

export default HeptagonPattern;
