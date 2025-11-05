import React, { useEffect } from "react";
import './CustomCursorComponent.css';
import customCursor from '../assets/Vector.png'; // Your custom cursor image

const CustomCursorComponent = () => {
  // Apply custom cursor globally
  useEffect(() => {
    // Adjust the hotspot (0 0 is the top-left corner of the cursor image, adjust as needed)
    document.body.style.cursor = `url(${customCursor}) 0 0, auto`;

    return () => {
      document.body.style.cursor = 'auto'; // Reset to default when component unmounts
    };
  }, []);

  return (
    <div className="custom-cursor">
      {/* No splash elements are rendered */}
    </div>
  );
};

export default CustomCursorComponent;