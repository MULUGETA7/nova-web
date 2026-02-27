import React from 'react';
import Frame from './Frame';
import Circular from './Circular';

import './HeroSection.css';

const HeroSection = () => {


    return (
        <div className="hero-section w-full relative">
            <div className="frame flex flex-col items-center justify-center w-full h-full relative">
                <Frame />
                <Circular />
            </div>
        </div>
    );
};

export default HeroSection;