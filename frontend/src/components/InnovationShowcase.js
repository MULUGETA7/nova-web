import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../utils/apiConfig';

const InnovationShowcase = () => {
    const [projects, setProjects] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const apiUrl = getApiUrl();
                // Switching to /api/partner to separate Innovation Showcase from Portfolio
                const response = await fetch(`${apiUrl}/api/partner`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                console.log("Innovation Showcase Fetch Success:", data);

                const processedData = data.slice(0, 6).map((item, idx) => {
                    console.log(`Processing Item ${idx}:`, item);
                    return {
                        ...item,
                        imageUrl: `${apiUrl}${item.logo}`,
                        category: item.category || 'TECHNOLOGY / R&D',
                        subtitle: item.subtitle || 'FUTURE-PROOF ARCHITECTURE',
                        content: item.description
                    };
                });

                setProjects(processedData);
                setIsLoaded(true);
            } catch (error) {
                console.error("DEBUG: InnovationShowcase Fetch Error:", error);
                // Fallback data
                const fallback = [
                    {
                        _id: '1',
                        title: "NEURAL SYNC",
                        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80',
                        category: "AI / MACHINE LEARNING",
                        subtitle: "QUANTUM INTERNET CORE",
                        content: "Implementing the next generation of neural synchronization protocols for ultra-low latency distributed computing across global nodes.",
                        author: "Nova Labs Team",
                        linkedinUrl: "#",
                        instagramUrl: "#"
                    },
                    {
                        _id: '2',
                        title: "NEO TOKYO 2049",
                        imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80',
                        category: "R&D / INFRASTRUCTURE",
                        subtitle: "POST-SILICON COMPUTING",
                        content: "Exploring the intersections of high-tech architecture and urban density in a post-catastrophic future through optical processing layers.",
                        author: "Nova Labs Team",
                        linkedinUrl: "#",
                        instagramUrl: "#"
                    },
                ];
                setProjects(fallback);
                setIsLoaded(true);
            }
        };
        fetchProjects().catch(err => console.error("Unhandled fetchProjects error:", err));
    }, []);

    // Auto-Play Logic
    useEffect(() => {
        if (!isLoaded || projects.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 8000); // 8 seconds interval

        return () => clearInterval(timer);
    }, [isLoaded, projects.length]);

    const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
    const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

    if (!isLoaded || projects.length === 0) return null;

    const current = projects[activeIndex];

    return (
        <section className="bg-black font-montserrat pb-32">
            {/* Global Section Header */}
            <div className="container mx-auto px-8 md:px-16 pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-cyan-400/60 text-xs font-bold tracking-[0.4em] uppercase mb-4">Discovery Lab</h2>
                    <h3 className="text-white text-4xl md:text-5xl font-black uppercase mb-6">Innovation Showcase</h3>
                    <div className="w-20 h-1 bg-cyan-400 mb-6" />
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                        A curated collection of our latest experimental designs and technical breakthroughs.
                        Each project represents a leap forward in how we interact with the digital world.
                    </p>
                </motion.div>
            </div>

            {/* BIG CARD CONTAINER */}
            <div className="container mx-auto px-4 md:px-8">
                <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">

                    {/* Top Meta Navigation (Inside Card) */}
                    <div className="absolute top-8 left-0 right-0 z-30 flex justify-center gap-8 pointer-events-none">
                        <span className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">SYSTEMS</span>
                        <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase underline underline-offset-8 decoration-cyan-400">CORE LABS</span>
                    </div>

                    {/* 1. Background Image with Cross-fade */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0 z-0"
                        >
                            <img
                                src={current.imageUrl}
                                alt={current.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Cinematic Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
                        </motion.div>
                    </AnimatePresence>

                    {/* 2. Content Overlay (Centered Left) */}
                    <div className="relative z-20 h-full flex items-center px-12 md:px-24">
                        <motion.div
                            key={current._id + "_content"}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-xl"
                        >
                            <div className="mb-6">
                                <span className="text-cyan-400 text-[10px] font-black tracking-[0.4em] uppercase block mb-2">{current.category}</span>
                                <h2 className="text-white text-5xl md:text-7xl font-black mb-2 leading-tight uppercase tracking-tighter">
                                    {current.title}
                                </h2>
                                <div className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">{current.subtitle}</div>
                            </div>

                            <p className="text-gray-400 text-sm md:text-base leading-[1.8] font-medium mb-10 max-w-lg border-l-2 border-white/10 pl-6">
                                {current.content || "Experience the future of digital innovation through our latest showcase of experimental design and technical excellence."}
                            </p>

                            <div className="flex items-center gap-6 mb-10">
                                {current.linkedinUrl && (
                                    <a
                                        href={current.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                )}
                                {current.instagramUrl && (
                                    <a
                                        href={current.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-purple-400/50 hover:bg-purple-400/5 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                )}
                            </div>

                            <button className="group relative px-12 py-4 bg-white text-black text-[10px] font-black tracking-[0.3em] uppercase hover:scale-105 transition-all duration-500 rounded-full overflow-hidden">
                                <span className="relative z-10 transition-colors group-hover:text-cyan-600">Explore Innovation</span>
                                <div className="absolute inset-x-0 bottom-0 h-0 bg-cyan-50 group-hover:h-full transition-all duration-500" />
                            </button>
                        </motion.div>
                    </div>

                    {/* 3. Navigation Controls */}
                    <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center items-center gap-12">
                        {/* Prev Arrow */}
                        <button
                            onClick={prevProject}
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Thumbnails */}
                        <div className="flex gap-4">
                            {projects.map((project, idx) => (
                                <motion.button
                                    key={project._id + "_thumb"}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-500 ${activeIndex === idx ? 'border-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'border-white/5 opacity-40 hover:opacity-100 hover:scale-105'
                                        }`}
                                    whileHover={{ scale: activeIndex === idx ? 1.1 : 1.05 }}
                                >
                                    <img
                                        src={project.imageUrl}
                                        className="w-full h-full object-cover"
                                        alt={project.title}
                                    />
                                </motion.button>
                            ))}
                        </div>

                        {/* Next Arrow */}
                        <button
                            onClick={nextProject}
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    {/* Progress Bar (Bottom Edge) */}
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-40">
                        <motion.div
                            className="h-full bg-cyan-400"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InnovationShowcase;
