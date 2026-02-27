import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const InnovationShowcase = () => {
    const [showcaseItems, setShowcaseItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShowcase = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/partner`);
                if (response.data && response.data.length > 0) {
                    setShowcaseItems(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch innovation showcase data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchShowcase();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    };

    // Fallback data if none exists in admin
    const defaultData = {
        category: "Innovation Lab",
        name: "Innovation Showcase",
        subtitle: "Our Products",
        productName: "Casting.io",
        description: "Casting.io — The industry-leading AI casting platform. Streamlining talent discovery through intelligent neural matching, automated audition workflows, and data-driven profile analysis for world-class productions.",
        logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        buttonText: "Explore Casting.io",
        buttonUrl: "#"
    };

    const activeItem = showcaseItems.length > 0 ? showcaseItems[currentIndex] : null;

    if (loading) return null;

    return (
        <section className="bg-black py-24 px-4 md:px-8 lg:px-12 overflow-hidden relative">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: activeItem?.bgColor || '#00D1FF' }}>
                        {activeItem ? "Innovation Lab" : defaultData.category}
                    </h2>
                    <h3 className="text-white text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight">
                        Innovation Showcase
                    </h3>
                    <div className="w-20 h-1 mb-6 mx-auto lg:mx-0" style={{ backgroundColor: activeItem?.bgColor || '#00D1FF' }} />
                </motion.div>
            </div>

            {/* Main Carousel Wrapper */}
            <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto relative group">

                {/* Navigation Arrows (Only show if > 1 item) */}
                {showcaseItems.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                        >
                            <Icon icon="ph:caret-left-bold" className="text-xl" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10"
                        >
                            <Icon icon="ph:caret-right-bold" className="text-xl" />
                        </button>
                    </>
                )}

                <div className="rounded-[2rem] md:rounded-[3rem] relative overflow-hidden min-h-[650px] 2xl:min-h-[850px] flex items-center shadow-2xl bg-[#080808]">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center"
                        >
                            {/* Enhanced Dynamic Mesh Gradient Background */}
                            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                                {/* Base Dark Layer */}
                                <div className="absolute inset-0 bg-black opacity-90" />

                                {/* Dynamic Color Blobs */}
                                <div
                                    className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-40 animate-pulse"
                                    style={{
                                        backgroundColor: activeItem?.bgColor || '#00D1FF',
                                        transition: 'background-color 1s ease'
                                    }}
                                />
                                <div
                                    className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[100px] opacity-30"
                                    style={{
                                        backgroundColor: '#7000FF', // Purple accent
                                        animationDelay: '1s'
                                    }}
                                />
                                <div
                                    className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full blur-[130px] opacity-20"
                                    style={{
                                        backgroundColor: activeItem?.bgColor || '#00D1FF',
                                        filter: 'hue-rotate(45deg)'
                                    }}
                                />

                                {/* Blurred Image Overlay (Subtle) */}
                                <div
                                    className="absolute inset-0 z-0 opacity-20 scale-110"
                                    style={{
                                        backgroundImage: `url("${activeItem ? (API_BASE_URL + activeItem.logo) : defaultData.logo}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        filter: 'blur(80px) brightness(0.7)'
                                    }}
                                />
                            </div>

                            {/* Content Container (Full Width / Full Height Fill) */}
                            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-stretch justify-between overflow-hidden">

                                {/* Left: Text Content */}
                                <div className="flex-1 text-left p-12 md:p-16 lg:p-20 2xl:p-24 flex flex-col justify-center max-w-3xl">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                    >
                                        <span className="text-[10px] font-black tracking-[0.4em] uppercase block mb-4" style={{ color: activeItem?.bgColor || '#00D1FF' }}>
                                            {activeItem ? (activeItem.subtitle || "Our Products") : defaultData.subtitle}
                                        </span>
                                        <h2 className="text-white text-3xl md:text-5xl 2xl:text-6xl font-black mb-6 tracking-tight leading-tight uppercase">
                                            {activeItem ? activeItem.name : defaultData.productName}
                                        </h2>

                                        <p className="text-white/70 text-base md:text-lg 2xl:text-xl mb-10 leading-relaxed font-medium max-w-xl">
                                            {activeItem ? activeItem.description : defaultData.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                            <motion.a
                                                href={activeItem?.buttonUrl || defaultData.buttonUrl}
                                                target={(activeItem?.buttonUrl || defaultData.buttonUrl).startsWith('http') ? "_blank" : "_self"}
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-white text-black px-10 py-4 2xl:px-14 2xl:py-6 rounded-full font-black text-xs 2xl:text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl hover:bg-cyan-50 transition-all group no-underline"
                                            >
                                                {activeItem?.buttonText || defaultData.buttonText}
                                                <Icon icon="ph:arrow-right-bold" className="group-hover:translate-x-1 transition-transform" />
                                            </motion.a>

                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                <span>System Live</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right: The UI Mockup (Floating Card Style) */}
                                <div className="flex-[2] w-full h-full relative flex items-center justify-center p-8 md:p-12 lg:p-16 lg:pl-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                                        className="relative w-full h-full bg-[#080808] rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                                    >
                                        {/* Background Media */}
                                        <div className="absolute inset-0 z-0">
                                            {(() => {
                                                const mediaUrl = activeItem ? (API_BASE_URL + activeItem.logo) : defaultData.logo;
                                                const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl);

                                                if (isVideo) {
                                                    return (
                                                        <video
                                                            src={mediaUrl}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            className="w-full h-full object-cover"
                                                        />
                                                    );
                                                }
                                                return (
                                                    <img
                                                        src={mediaUrl}
                                                        alt="Showcase Visual"
                                                        className="w-full h-full object-cover"
                                                    />
                                                );
                                            })()}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                        </div>

                                        {/* Mockup Interface Overlays */}
                                        <div className="relative z-10 flex flex-col h-full justify-end">
                                            <div className="px-10 pb-10">
                                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                                        className="h-full"
                                                        style={{ backgroundColor: activeItem?.bgColor || '#00D1FF' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicators (Dots) */}
                {showcaseItems.length > 1 && (
                    <div className="flex justify-center gap-3 mt-12 pb-12">
                        {showcaseItems.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-12' : 'w-3 bg-white/20'}`}
                                style={currentIndex === idx ? { backgroundColor: activeItem?.bgColor || '#00D1FF' } : {}}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InnovationShowcase;
