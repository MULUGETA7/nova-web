import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CollaborationShowcase = () => {
    return (
        <section className="bg-black py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden relative border border-white/5 shadow-2xl">
                {/* Lush Background Ambience */}
                <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#4F46E5]/20 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#F97316]/20 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#06B6D4]/15 blur-[100px] rounded-full" />

                {/* Main Flex Container */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 p-8 md:p-16 lg:p-20 bg-black/40 backdrop-blur-sm">

                    {/* Left Content Side */}
                    <div className="flex-1 text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-white text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight"
                        >
                            Our Collaborations <br />
                            <span className="text-gray-400">Hub Spaces</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-gray-400 text-lg mb-10 max-w-sm leading-relaxed"
                        >
                            All your tools. All your workflows. One Infinite canvas.
                            Built for professionals who want to work smarter, together.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-cyan-50 transition-colors"
                        >
                            Try Spaces
                            <Icon icon="ph:arrow-right-bold" />
                        </motion.button>
                    </div>

                    {/* Right UI Interface Side */}
                    <div className="flex-[1.5] w-full relative">
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-video rounded-3xl bg-[#0f1115] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pt-1"
                        >
                            {/* Top Bar */}
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/50">
                                    <Icon icon="ph:text-t-bold" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Text</span>
                                </div>
                                <div className="bg-white/5 px-3 py-1 rounded text-[10px] text-white/40 uppercase font-bold">Unmute</div>
                            </div>

                            {/* Main Typing Area */}
                            <div className="flex-1 p-10 flex flex-col relative">
                                {/* Glowing Border Overlay like in screenshot */}
                                <div className="absolute inset-8 rounded-2xl border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.1)] pointer-events-none" />

                                <div className="text-2xl md:text-3xl text-gray-500 font-medium tracking-tight">
                                    Select the option number 1, don't make any changes.|
                                </div>

                                {/* Radial dot pattern background (subtle) */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                                />
                            </div>

                            {/* Bottom Video Controls Mock */}
                            <div className="px-6 py-4 bg-black/50 backdrop-blur-xl border-t border-white/5 relative">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 text-white/50">
                                        <Icon icon="ph:play-fill" />
                                        <span className="text-[10px] font-bold">0:30 / 1:07</span>
                                    </div>
                                    <div className="flex-1 h-1 bg-white/10 rounded-full relative">
                                        <div className="absolute top-0 left-0 h-full w-[40%] bg-white" />
                                    </div>
                                    <div className="flex items-center gap-4 text-white/50">
                                        <Icon icon="ph:speaker-simple-high-bold" />
                                        <Icon icon="ph:corners-out-bold" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CollaborationShowcase;
