import React from "react";

/**
 * Component to handle all decorative background images
 */
const BackgroundImages = () => {
  return (
    <>
    <div className="w-full inset-0 overflow-visible">
      <img
        src="/images/rocket.png"
        alt=""
        className="w-[201px] h-[151px] absolute left-[378px] top-[36px] max-lg:hidden"
      />
      <img
        src="/images/droid.png"
        alt=""
        className="w-[464px] h-[444px] absolute left-0 top-[150px] max-lg:hidden"
      />
      
      <img
        src="/images/starship1.png"
        alt=""
        className="w-[190px] h-[140px] absolute right-[450px] top-[150px] max-lg:hidden"
      />
      <img
        src="/images/keyboard.png"
        alt=""
        className="w-[300px] h-[200px] absolute right-[500px] top-[-150px] max-lg:hidden"
      />
      <img
        src="/images/key.png"
        alt=""
        className="w-[500px] h-[350px] absolute left-[-4%] bottom-[-200px] max-lg:hidden"
      />
      <img
        src="/images/droid.png"
        alt=""
          className="w-[600px] h-[[500px] transform rotate-[7.735deg] absolute right-[-50px] top-[-120px] max-lg:hidden"
        />
      </div>
    </>
  );
};

export default BackgroundImages;
