import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeftIcon,
    GlobeAltIcon,
    PlusIcon,
    TrashIcon,
    CloudArrowUpIcon,
    InformationCircleIcon,
    CheckBadgeIcon,
    DocumentTextIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PageEditor = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: {}, // Map of section key to content string
        sectionImages: [] // Array of { label, url }
    });

    const [newContentKey, setNewContentKey] = useState('');
    const [newImageLabel, setNewImageLabel] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isEdit) {
            fetchPage();
        }
    }, [id]);

    const fetchPage = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/pages`); // We might need a single page GET route, but for now filtering
            const page = response.data.find(p => p._id === id);
            if (page) {
                setFormData({
                    title: page.title,
                    slug: page.slug,
                    content: page.content || {},
                    sectionImages: page.sectionImages || []
                });
            } else {
                setError('Page not found in quantum flux.');
            }
        } catch (err) {
            setError('Data retrieval failed: ' + err.message);
        } finally {
            setFetching(false);
        }
    };

    const handleContentChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, [key]: value }
        }));
    };

    const addContentSection = () => {
        if (!newContentKey) return;
        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, [newContentKey]: '' }
        }));
        setNewContentKey('');
    };

    const removeContentSection = (key) => {
        const newContent = { ...formData.content };
        delete newContent[key];
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const handleImageUpload = async (e, label) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('image', file);

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/api/pages/upload`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const newImages = [...formData.sectionImages];
            const existingIndex = newImages.findIndex(img => img.label === label);

            if (existingIndex > -1) {
                newImages[existingIndex].url = response.data.url;
            } else {
                newImages.push({ label, url: response.data.url });
            }

            setFormData(prev => ({ ...prev, sectionImages: newImages }));
            setSuccess(`Image for "${label}" uploaded.`);
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            setError('Upload failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const addImageSection = () => {
        if (!newImageLabel) return;
        if (formData.sectionImages.find(img => img.label === newImageLabel)) {
            setError('Label already exists.');
            return;
        }
        setFormData(prev => ({
            ...prev,
            sectionImages: [...prev.sectionImages, { label: newImageLabel, url: '' }]
        }));
        setNewImageLabel('');
    };

    const removeImageSection = (label) => {
        setFormData(prev => ({
            ...prev,
            sectionImages: prev.sectionImages.filter(img => img.label !== label)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await axios.post(`${API_BASE_URL}/api/pages`, { ...formData, id }); // Using existing createOrUpdate logic
            } else {
                await axios.post(`${API_BASE_URL}/api/pages`, formData);
            }
            setSuccess('Page state synchronized successfully.');
            setTimeout(() => navigate('/admin/pages'), 1500);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-20 text-center text-cyan-400">Synchronizing with Archive...</div>;

    return (
        <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8 text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">
                            {isEdit ? 'Reconstruct' : 'Manifest'} <span className="nova-gradient-text uppercase">Page</span>
                        </h1>
                        <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Logical Structure & Content Interface</p>
                    </div>

                    <button
                        onClick={() => navigate('/admin/pages')}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-all shadow-lg"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Abort Procedure
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Content Form */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="glass-card rounded-[3rem] p-10 border-white/5">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Page Designation (Title)</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/20 focus:border-[#00F0FF]/40 transition-all font-bold"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Quantum Slug (URL Path)</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#B537F5]/20 focus:border-[#B537F5]/40 transition-all font-bold"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                        />
                                    </div>
                                </div>

                                {/* Content Sections */}
                                <div className="space-y-6 pt-8 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold flex items-center gap-3">
                                            <DocumentTextIcon className="w-6 h-6 text-[#00F0FF]" />
                                            Content Modules
                                        </h3>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="New module key..."
                                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none"
                                                value={newContentKey}
                                                onChange={(e) => setNewContentKey(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={addContentSection}
                                                className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {Object.keys(formData.content).map(key => (
                                            <div key={key} className="space-y-2 relative group">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{key}</label>
                                                    <button type="button" onClick={() => removeContentSection(key)} className="opacity-0 group-hover:opacity-100 p-1 text-red-500 transition-opacity">
                                                        <TrashIcon className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <textarea
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all min-h-[100px]"
                                                    value={formData.content[key]}
                                                    onChange={(e) => handleContentChange(key, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full py-5 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:scale-[1.01] disabled:opacity-50 overflow-hidden"
                                    >
                                        {loading ? 'Synchronizing...' : 'Save Matrix Structure'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar: Images */}
                    <div className="space-y-8">
                        <div className="glass-card rounded-[3rem] p-10 border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <PhotoIcon className="w-6 h-6 text-[#B537F5]" />
                                    Visual Assets
                                </h3>
                            </div>

                            <div className="space-y-2 mb-8">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Asset label..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none"
                                        value={newImageLabel}
                                        onChange={(e) => setNewImageLabel(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={addImageSection}
                                        className="p-3 rounded-xl bg-[#B537F5]/10 text-[#B537F5] hover:bg-[#B537F5]/20"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {formData.sectionImages.map((img, idx) => (
                                    <div key={idx} className="space-y-3 p-4 rounded-3xl bg-white/[0.02] border border-white/5 relative group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{img.label}</span>
                                            <button type="button" onClick={() => removeImageSection(img.label)} className="text-red-500/50 hover:text-red-500 transition-colors">
                                                <TrashIcon className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="relative aspect-video rounded-2xl bg-white/5 overflow-hidden flex flex-col items-center justify-center group-hover:bg-white/[0.08] transition-all">
                                            {img.url ? (
                                                <img src={`${API_BASE_URL}${img.url}`} alt={img.label} className="w-full h-full object-cover" />
                                            ) : (
                                                <CloudArrowUpIcon className="w-8 h-8 text-gray-700" />
                                            )}
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleImageUpload(e, img.label)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center gap-3">
                                    <InformationCircleIcon className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-3">
                                    <CheckBadgeIcon className="w-4 h-4 flex-shrink-0" />
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PageEditor;
