import React from 'react';
import NovaLooper from './NovaLooper';
import './Frame.css';
import './FrameContent.css';

const Frame = () => {
    return (
        <div className="frame-container max-md:hidden">
            <div className="overlay-container">
                <svg viewBox="0 0 1100 440" className="text-svg">
                    {/* Custom NOVA Branding SVG - Top Left & Large */}
                    <image
                        href="/Group 1171275177.svg"
                        x="0"
                        y="0"
                        width="1100"
                        height="440"
                        preserveAspectRatio="xMinYMin meet"
                    />
                </svg>

                {/* New Generated Side Content */}
                <div className="frame-side-content">
                    <h3 className="discovery-title">Discovery Hub</h3>
                    <div className="feature-item">
                        <span className="feature-label">System Architecture</span>
                        <div className="flex items-center justify-between">
                            <span className="feature-value">Online Ecosystem</span>
                            <div className="status-badge">
                                <span className="status-dot"></span>
                                ACTIVE
                            </div>
                        </div>
                        <p className="feature-desc">Powering the next generation of decentralized digital products with autonomous neural engines.</p>
                    </div>

                    <h3 className="discovery-title mt-4">Our Focus</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="feature-item p-4 !bg-white/[0.02]">
                            <span className="feature-label !text-[10px]">AI Focus</span>
                            <span className="feature-value !text-lg">Neural Tech</span>
                        </div>
                        <div className="feature-item p-4 !bg-white/[0.02]">
                            <span className="feature-label !text-[10px]">Blockchain</span>
                            <span className="feature-value !text-lg">Web3 Core</span>
                        </div>
                    </div>

                    <div className="feature-item">
                        <span className="feature-label">Product Strategy</span>
                        <span className="feature-value">Design-First Growth</span>
                        <p className="feature-desc">We specialize in engineering products that don't just work, but scale and lead their respective markets.</p>
                    </div>
                </div>

                {/* Bottom Global Presence Stats */}
                <div className="absolute bottom-[200px] left-0 w-full px-16 flex items-center gap-12 pointer-events-none opacity-40 hover:opacity-100 transition-opacity duration-700">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[#00f0ff] font-black uppercase tracking-[0.4em] mb-2">Global Reach</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white">12+</span>
                            <span className="text-sm font-bold text-gray-500">Countries</span>
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-gradient-to-b from-white/20 to-transparent"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[#ff1cf7] font-black uppercase tracking-[0.4em] mb-2">Digital Products</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white">30+</span>
                            <span className="text-sm font-bold text-gray-500">Launchpads</span>
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-gradient-to-b from-white/20 to-transparent"></div>
                    <div className="flex-1 flex items-center justify-end">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-pulse"></div>
                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Autonomous Neural Network: Online</span>
                        </div>
                    </div>
                </div>

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