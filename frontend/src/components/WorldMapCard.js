import React from 'react';

export function WorldMapCard() {
  return (
    <>
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={require('../assets/images/World.png')}
          alt="Nova Labs World Map"
          className="absolute inset-0 w-full h-full object-cover scale-[1.2] origin-center"
        />

        {/* Location Dots */}
        <div className="absolute top-[50%] left-[35%] w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"></div>
        <div className="absolute top-[8%] left-[30%] w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"></div>
        <div className="absolute top-[40%] left-[60%] w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"></div>
        <div className="absolute top-[10%] left-[75%] w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"></div>
      </div>
    </>
  );
}