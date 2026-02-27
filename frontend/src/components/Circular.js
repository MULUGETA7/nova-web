import React from "react";
import './Circular.css';
const Circular = () => {
  return (
    <div className="w-[493px] h-[493px]">
      <div className="absolute w-[493px] h-[493px] top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#7d2fdf] rounded-full rotate-180 blur-[500px]" />
    </div>
  );
};
export default Circular;