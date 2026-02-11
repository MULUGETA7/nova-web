import React from 'react';
import Frame from './Frame';
import Circular from './Circular';
import NovaLabsHead from './NovaLabsHead';
import './HeroSection.css';

const HeroSection = () => {


    return (
        <div className="max-md:mt-[-300px] hero-section flex flex-col items-center justify-center">
            <NovaLabsHead />
            <div className="frame flex flex-col items-center justify-center w-full">
                <Frame />
                <Circular />
            </div>
        </div>
    );
};

export default HeroSection;