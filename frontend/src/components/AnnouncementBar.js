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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="w-full bg-transparent relative z-50 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center flex-wrap">
                        <div className="flex items-center">
                            <span className="flex p-1 rounded-lg bg-black/20 mr-3">
                                <span className="animate-pulse flex h-2 w-2 rounded-full bg-white"></span>
                            </span>
                            <p className="font-bold text-white text-sm sm:text-base tracking-wide">
                                <span className="md:inline uppercase">{announcement.text}</span>
                            </p>
                        </div>
                        {announcement.link && (
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto ml-0 sm:ml-4">
                                <a
                                    href={announcement.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-4 py-1 border border-black rounded-full shadow-sm text-xs font-black text-black bg-white hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-tighter"
                                >
                                    Access Now
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnnouncementBar;
