import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../utils/apiConfig';

const TerminalChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0); // 0=idle, 1=email, 2=message, 3=sending, 4=done
    const [email, setEmail] = useState('');
    const [lines, setLines] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [lastReplyTime, setLastReplyTime] = useState(null);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const pollingRef = useRef(null);

    const addLine = (text, type = 'output') => {
        setLines(prev => [...prev, { text, type, id: Date.now() + Math.random() }]);
    };

    const fetchReplies = useCallback(async (userEmail) => {
        try {
            const apiUrl = getApiUrl();
            const response = await fetch(`${apiUrl}/api/messages/replies/${userEmail}`);
            if (response.ok) {
                const data = await response.json();
                // Find new replies based on timestamp
                const newReplies = data.filter(r => !lastReplyTime || new Date(r.repliedAt) > new Date(lastReplyTime));

                if (newReplies.length > 0) {
                    newReplies.reverse().forEach(reply => {
                        addLine('', 'output');
                        addLine('╔══════════════════════════════════════╗', 'system');
                        addLine('║   📟 INCOMING TRANSMISSION — ADMIN     ║', 'system');
                        addLine('╚══════════════════════════════════════╝', 'system');
                        addLine(`RE: ${reply.subject}`, 'success');
                        addLine(`${reply.reply}`, 'success');
                        addLine('', 'output');
                    });
                    setLastReplyTime(newReplies[0].repliedAt);
                }
            }
        } catch (err) {
            console.error('Polling error:', err);
        }
    }, [lastReplyTime]);

    useEffect(() => {
        if (isOpen && email && step >= 2) {
            // Start polling when email is set and terminal is open
            fetchReplies(email); // Initial fetch
            pollingRef.current = setInterval(() => fetchReplies(email), 5000);
        } else {
            if (pollingRef.current) clearInterval(pollingRef.current);
        }
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [isOpen, email, step, fetchReplies]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, step]);

    const handleOpen = () => {
        setIsOpen(true);
        setStep(1);
        setLines([
            { text: '╔══════════════════════════════════════╗', type: 'system', id: 1 },
            { text: '║   NOVA LABS — Direct Message Terminal  ║', type: 'system', id: 2 },
            { text: '╚══════════════════════════════════════╝', type: 'system', id: 3 },
            { text: '', type: 'output', id: 4 },
            { text: '> Initializing secure connection...', type: 'success', id: 5 },
            { text: '> Connection established ✓', type: 'success', id: 6 },
            { text: '', type: 'output', id: 7 },
            { text: 'Please enter your email address:', type: 'prompt', id: 8 },
        ]);
        setEmail('');
        setCurrentInput('');
    };

    const handleClose = () => {
        setIsOpen(false);
        setStep(0);
        setLines([]);
        setCurrentInput('');
        setEmail('');
    };

    const validateEmail = (e) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = currentInput.trim();
        if (!value) return;

        if (step === 1) {
            // Email step
            addLine(`$ ${value}`, 'input');
            if (!validateEmail(value)) {
                addLine('✗ Invalid email address. Please try again:', 'error');
                setCurrentInput('');
                return;
            }
            setEmail(value);
            setCurrentInput('');
            addLine('', 'output');
            addLine('> Email registered ✓', 'success');
            addLine('', 'output');
            addLine('Type your message below (press Enter to send):', 'prompt');
            setStep(2);
        } else if (step === 2) {
            // Message step
            const userEmail = email; // Capture current email state
            addLine(`$ ${value}`, 'input');
            setCurrentInput('');
            setStep(3);
            addLine('', 'output');
            addLine('> Establishing secure uplink...', 'success');
            addLine('> Transmitting intelligence data...', 'success');

            try {
                const apiUrl = getApiUrl();
                const response = await axios.post(`${apiUrl}/api/messages`, {
                    name: userEmail.split('@')[0],
                    email: userEmail,
                    subject: 'Direct Message from Website',
                    content: value,
                    source: 'chat_widget',
                });

                if (response.status === 201 || response.status === 200) {
                    addLine('', 'output');
                    addLine('╔══════════════════════════════════════╗', 'system');
                    addLine('║    ✓ Transmission successful!          ║', 'system');
                    addLine('║    Admin will respond shortly.         ║', 'system');
                    addLine('╚══════════════════════════════════════╝', 'system');
                    addLine('', 'output');
                    addLine('> Session locked. Type "new" to send another signal.', 'prompt');
                    setStep(4);
                }
            } catch (err) {
                console.error('Terminal transmission error:', err);
                addLine('', 'output');
                addLine('✗ Uplink failed: Server connection timeout.', 'error');
                addLine('> Attempting to re-establish... Type your message again:', 'prompt');
                setStep(2);
            }
        } else if (step === 4) {
            addLine(`$ ${value}`, 'input');
            if (value.toLowerCase() === 'new') {
                handleOpen();
            } else {
                addLine('> Signal rejected. Type "new" to re-open uplink.', 'error');
                setCurrentInput('');
            }
        }
    };

    const getPromptSymbol = () => {
        if (step === 1) return 'email@';
        if (step === 2) return 'msg>';
        if (step === 4) return '$';
        return '>';
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <motion.button
                    onClick={handleOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-green-500/30 hover:bg-white/10 transition-all duration-300 w-full"
                >
                    <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                        <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 9h8M8 13h6M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Direct Message</p>
                        <p className="text-sm font-semibold text-white">Chat with us</p>
                    </div>
                </motion.button>
            )}

            {/* Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-full"
                    >
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                            {/* Terminal Header */}
                            <div className="bg-[#1a1a2e] px-4 py-2 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <button onClick={handleClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-gray-500 ml-3 font-mono">nova-labs@terminal ~ direct-message</span>
                                </div>
                                <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Terminal Body */}
                            <div
                                ref={terminalRef}
                                className="bg-[#0d0d1a] p-4 font-mono text-sm h-64 overflow-y-auto custom-scrollbar"
                                onClick={() => inputRef.current?.focus()}
                            >
                                {lines.map((line) => (
                                    <div
                                        key={line.id}
                                        className={`leading-relaxed ${line.type === 'system' ? 'text-cyan-400' :
                                            line.type === 'success' ? 'text-green-400' :
                                                line.type === 'error' ? 'text-red-400' :
                                                    line.type === 'input' ? 'text-yellow-300' :
                                                        line.type === 'prompt' ? 'text-purple-400' :
                                                            'text-gray-400'
                                            }`}
                                    >
                                        {line.text || '\u00A0'}
                                    </div>
                                ))}

                                {/* Input Line */}
                                {(step === 1 || step === 2 || step === 4) && (
                                    <form onSubmit={handleSubmit} className="flex items-center mt-1">
                                        <span className="text-green-400 mr-2 flex-shrink-0">{getPromptSymbol()}</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={currentInput}
                                            onChange={(e) => setCurrentInput(e.target.value)}
                                            className="bg-transparent border-none outline-none text-white flex-1 font-mono text-sm caret-green-400"
                                            autoFocus
                                            placeholder={step === 1 ? 'you@example.com' : step === 2 ? 'Type your message...' : ''}
                                        />
                                        <span className="animate-pulse text-green-400">▊</span>
                                    </form>
                                )}

                                {step === 3 && (
                                    <div className="flex items-center mt-1">
                                        <span className="text-yellow-400 animate-pulse">⏳ Sending...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TerminalChat;
