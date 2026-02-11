import React from 'react';
import NovaLooper from './NovaLooper';
import './Frame.css';
import '@fontsource/montserrat';
import Spline from '@splinetool/react-spline';

const Frame = () => {
    return (
        <div className="frame-container max-md:hidden">
            <div className="overlay-container">
                <svg viewBox="0 0 2200 700" className="text-svg" style={{ marginTop: '300px', transform: 'translateY(-20px)' }}>
                    <defs>
                        <linearGradient id="gradientNOVA" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#7D0D82', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#150116', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="gradientLABS" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#05EAFE', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#19021B', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#7D0D82', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#05EAFE', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    {/* "N" from "NOVA" */}
                    <text x="0" y="200" textAnchor="start" dominantBaseline="middle" fill="none" stroke="url(#gradientNOVA)" strokeWidth="11" fontSize="400" fontFamily="Arial">
                        N
                    </text>
                    {/* Video to replace the "O" */}
                    <foreignObject x="240" y="-10" width="400" height="400" style={{ overflow: 'visible', zIndex: 20 }}>
                    <Spline scene="https://prod.spline.design/c9efMss1n37WPhPw/scene.splinecode" />

                    </foreignObject>
                    {/* "VA" from "NOVA" */}
                    <text x="600" y="200" textAnchor="start" dominantBaseline="middle" fill="none" stroke="url(#gradientNOVA)" strokeWidth="11" fontSize="400" fontFamily="Arial">
                        VA
                    </text>
                    {/* "LABS" */}
                    <text x="2200" y="200" textAnchor="end" dominantBaseline="middle" fill="none" stroke="url(#gradientLABS)" strokeWidth="11" fontSize="400" fontFamily="Arial">
                        LABS
                    </text>
                    <rect x={475} y={333} width={180} height={38} fill="#180123" opacity="1" />
                    <text x={570} y={355} fill="url(#textGradient)" fontSize="32" textAnchor="middle" dominantBaseline="middle"></text>
                </svg>
                <div className="nova-looper-wrapper">
                    <NovaLooper />
                </div>
                <div className="spline-wrapper">
                    <div className="nova-container" style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        mixBlendMode: 'screen',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                    }}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Frame;