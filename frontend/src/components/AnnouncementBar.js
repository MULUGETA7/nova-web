import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBar = () => {
    const [announcement, setAnnouncement] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/announcements`);
                if (response.data && response.data.isActive) {
                    setAnnouncement(response.data);
                }
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncement();
    }, [apiUrl]);

    if (!announcement || !announcement.isActive) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="w-full fixed top-0 left-0 z-[100] pointer-events-none"
            >
                <div className="max-w-[90%] md:max-w-2xl mx-auto mt-4 pointer-events-auto">
                    <div className="relative group">
                        {/* Outer Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                        {/* Main Bar */}
                        <div className="relative flex items-center justify-between gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-4 overflow-hidden">
                                <div className="flex-shrink-0 relative">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping absolute"></div>
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 relative"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-cyan-500/80 uppercase tracking-[0.2em] leading-none mb-1">Live Broadcast</span>
                                    <p className="text-sm font-bold text-white tracking-tight uppercase truncate">
                                        {announcement.text}
                                    </p>
                                </div>
                            </div>

                            {announcement.link && (
                                <a
                                    href={announcement.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 flex items-center justify-center px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 no-underline whitespace-nowrap"
                                >
                                    Verify Output
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnnouncementBar;
