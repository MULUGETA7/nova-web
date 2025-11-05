import React from "react";

function LogoItem({ src, width, aspectRatio }) {
  return (
    <img
      src={src}
      alt="Logo"
      className="object-contain shrink-0 max-w-full"
      style={{
        width,
        aspectRatio,
        height: "auto",
      }}
    />
  );
}

export default LogoItem;
