"use client";

import React from "react";
import Magnet from "../../common/Magnet";

const CallToActionButton = ({ text }) => {
  return (
    <Magnet padding={50} disabled={false} magnetStrength={1} >
  <p>{text}</p>
</Magnet>
  );
};

export default CallToActionButton;
