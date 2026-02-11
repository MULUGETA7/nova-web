import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { getApiUrl } from '../utils/apiConfig';

const DevTerminal = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        {
            id: 'init-1',
            type: 'agent-status',
            userCommand: 'boot mission-control --agent-mode',
            thoughts: [
                { text: 'Initializing Nova Neural Engine...', duration: '1.2s' },
                { text: 'Syncing with main-frame repositories...', duration: '0.8s' },
                { text: 'Establishing secure uplink...', duration: '0.4s' }
            ],
            question: {
                title: 'Nova Terminal Active',
                text: 'System heartbeat normal. How can I assist with your deployment today?',
                options: [
                    'List active builds',
                    'Check system status',
                    'Deploy new asset'
                ]
            }
        }
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = async (e) => {
        if (e.key === 'Enter' && input.trim()) {
            const val = input.trim();
            setInput('');
            processAgentFlow(val);
        }
    };

    const processAgentFlow = async (query) => {
        setLoading(true);
        const cmd = query.toLowerCase();

        // New history item
        const newItem = {
            id: Date.now(),
            type: 'agent-status',
            userCommand: query,
            thoughts: [],
            content: null,
            question: null
        };

        setHistory(prev => [...prev, newItem]);

        // Simulate agent "Thinking" phase
        setTimeout(async () => {
            let thoughts = [
                { text: 'Analyzing request intent...', duration: '0.5s' },
                { text: `Searching database for "${query}"...`, duration: '1s' }
            ];

            setHistory(prev => prev.map(item =>
                item.id === newItem.id ? { ...item, thoughts } : item
            ));

            setTimeout(async () => {
                if (cmd.includes('project') || cmd.includes('product') || cmd.includes('build') || cmd.includes('list')) {
                    try {
                        const apiUrl = getApiUrl();
                        const response = await fetch(`${apiUrl}/api/portfolio`);
                        const data = await response.json();

                        setHistory(prev => prev.map(item =>
                            item.id === newItem.id ? {
                                ...item,
                                thoughts: [...thoughts, { text: 'Manifesting build inventory...', duration: '2s' }],
                                content: {
                                    type: 'projects',
                                    data: data
                                }
                            } : item
                        ));
                    } catch (err) {
                        setHistory(prev => prev.map(item =>
                            item.id === newItem.id ? { ...item, type: 'error', content: 'Uplink Failed: Portfolio service unreachable.' } : item
                        ));
                    }
                } else if (cmd.includes('help')) {
                    setHistory(prev => prev.map(item =>
                        item.id === newItem.id ? {
                            ...item,
                            thoughts: [...thoughts, { text: 'Synthesizing help documentation...', duration: '0.3s' }],
                            question: {
                                title: 'Help Center',
                                text: 'I can assist you with the following directives:',
                                options: ['List builds', 'Check status', 'About Nova']
                            }
                        } : item
                    ));
                } else {
                    setHistory(prev => prev.map(item =>
                        item.id === newItem.id ? {
                            ...item,
                            thoughts: [...thoughts, { text: 'Intent unrecognized.', duration: '0.1s' }],
                            content: `Directives for "${query}" are not loaded in the current kernel.`
                        } : item
                    ));
                }
                setLoading(false);
            }, 1500);
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    className="w-full max-w-5xl h-[85vh] bg-[#0c0c0a] rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col overflow-hidden pointer-events-auto"
                    style={{ fontFamily: '"Fira Code", monospace' }}
                >
                    {/* Header */}
                    <div className="h-10 flex items-center justify-between px-6 border-b border-white/5 bg-[#141412]">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Nova Mission Control</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/5 rounded-md transition-colors text-white/30 hover:text-white"
                        >
                            <Icon icon="mdi:close" className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide pb-32">
                        {history.map((section) => (
                            <div key={section.id} className="space-y-6">
                                {/* User Input Section */}
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg max-w-2xl">
                                    <span className="text-white font-bold opacity-90">{section.userCommand}</span>
                                </div>

                                {/* Thoughts */}
                                <div className="space-y-3 pl-4">
                                    {section.thoughts.map((thought, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={idx}
                                            className="flex items-center gap-4 text-xs"
                                        >
                                            <Icon icon="lucide:hexagon" className="w-3.5 h-3.5 text-white/40" />
                                            <span className="text-white/60 font-medium">{thought.text}</span>
                                            <span className="text-white/20 ml-auto">{thought.duration}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Content Result */}
                                {section.content && (
                                    <div className="pl-4">
                                        {section.content.type === 'projects' ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {section.content.data.map((p, i) => (
                                                    <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-xl group hover:border-cyan-500/30 transition-all">
                                                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest">Build 0{i + 1}</div>
                                                        <div className="text-sm font-black text-white tracking-tight">{p.title}</div>
                                                        <div className="flex items-center gap-2 mt-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                            <span className="text-[10px] text-green-500/80 font-bold uppercase">System Deployed</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-xs text-red-400 font-medium italic">{section.content}</div>
                                        )}
                                    </div>
                                )}

                                {/* Question / Option Box */}
                                {section.question && (
                                    <div className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl max-w-3xl ml-4">
                                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Uplink Status</div>
                                        <h3 className="text-lg font-black text-white tracking-tight mb-2 italic underline underline-offset-8 decoration-cyan-500/50">{section.question.title}</h3>
                                        <p className="text-sm text-white/70 mb-8 font-medium">{section.question.text}</p>

                                        <div className="space-y-3">
                                            {section.question.options.map((opt, idx) => (
                                                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                                                    <div className="w-4 h-4 border border-white/20 rounded flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-sm opacity-0 group-hover:opacity-100" />
                                                    </div>
                                                    <span className="text-sm text-white/50 group-hover:text-white transition-colors">{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="flex items-center gap-4 pl-4">
                                <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                                <span className="text-xs text-white/20 font-black italic tracking-widest animate-pulse uppercase">Agent is thinking...</span>
                            </div>
                        )}
                    </div>

                    {/* Input Area (Follow-up style) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
                        <div className="relative group">
                            <input
                                autoFocus
                                className="w-full bg-[#1c1c1a]/90 backdrop-blur-xl border border-white/10 rounded-xl py-5 px-8 outline-none text-white font-medium text-sm focus:border-cyan-500/30 transition-all shadow-2xl pr-40"
                                placeholder="→ Add a follow-up"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                spellCheck="false"
                                autoComplete="off"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest hidden md:block">Esc to stop</span>
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center">
                                    <Icon icon="mdi:arrow-up" className="w-4 h-4 text-white/40" />
                                </div>
                            </div>
                        </div>

                        {/* Sub-footer */}
                        <div className="mt-4 flex flex-wrap justify-between items-center gap-4 px-2 opacity-30">
                            <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    <span>Agent (Shift+Tab to cycle)</span>
                                </div>
                                <span>Nova v10.0 Codex HighFast - 5%</span>
                            </div>
                            <div className="flex items-center gap-4 text-[9px] font-bold opacity-60">
                                <span>/ commands</span>
                                <span>@ files</span>
                                <span>! shell</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DevTerminal;
