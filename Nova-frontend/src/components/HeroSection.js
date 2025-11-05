import React, { useState, useEffect } from 'react';
import Frame from './Frame';
import Circular from './Circular';
import NovaLabsHead from './NovaLabsHead';
import './HeroSection.css';

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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