import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  RocketLaunchIcon,
  LinkIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'INNOVATION / SHOWCASE',
    subtitle: 'Our Products',
    linkedinUrl: '',
    instagramUrl: '',
    buttonText: 'Explore Product',
    buttonUrl: '',
    logo: null,
    bgColor: '#00D1FF'
  });

  useEffect(() => {
    fetchPartners().catch(err => console.error("Unhandled fetchPartners error:", err));
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/partner`);
      setPartners(response.data || []);
    } catch (err) {
      setError('Failed to fetch showcase items');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || 'INNOVATION / SHOWCASE',
        subtitle: item.subtitle || 'Our Products',
        linkedinUrl: item.linkedinUrl || '',
        instagramUrl: item.instagramUrl || '',
        buttonText: item.buttonText || 'Explore Product',
        buttonUrl: item.buttonUrl || '',
        logo: null,
        bgColor: item.bgColor || '#00D1FF'
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        category: 'INNOVATION / SHOWCASE',
        subtitle: 'Our Products',
        linkedinUrl: '',
        instagramUrl: '',
        buttonText: 'Explore Product',
        buttonUrl: '',
        logo: null,
        bgColor: '#00D1FF'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('subtitle', formData.subtitle);
    data.append('linkedinUrl', formData.linkedinUrl);
    data.append('instagramUrl', formData.instagramUrl);
    data.append('buttonText', formData.buttonText);
    data.append('buttonUrl', formData.buttonUrl);
    if (formData.logo) {
      data.append('logo', formData.logo);
    }
    data.append('bgColor', formData.bgColor);

    try {
      const token = localStorage.getItem('token');
      if (editingItem) {
        await axios.put(`${API_BASE_URL}/api/partner/${editingItem._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        if (!formData.logo) throw new Error('Product banner image is required');
        await axios.post(`${API_BASE_URL}/api/partner`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      setModalOpen(false);
      fetchPartners();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this product from the showcase?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/partner/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchPartners();
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">
              INNOVATION <span className="nova-gradient-text uppercase">Vault</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Flagship Product Management</p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <PlusIcon className="w-3.5 h-3.5" />
            Add Showcase
          </button>
        </div>

        <div className="mb-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2 text-indigo-400">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Live Sync:
          </div>
          <span className="text-gray-500 font-medium normal-case tracking-normal">
            The primary item automatically initializes as the <span className="text-white border-b border-indigo-500/30">Flagship Hero</span> protocol.
          </span>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest flex items-center gap-3">
            <InformationCircleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Showcase Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner._id}
              variants={itemAnim}
              className={`glass-card rounded-[2.5rem] overflow-hidden group transition-all duration-500 border-white/5 
                ${index === 0 ? 'border-cyan-500/30 bg-cyan-500/5' : 'hover:border-white/10'}`}
            >
              <div className="relative h-44 bg-white/[0.02] flex items-center justify-center p-8 overflow-hidden">
                {index === 0 && (
                  <div
                    className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-black text-[8px] font-black uppercase tracking-widest shadow-lg"
                    style={{ backgroundColor: partner.bgColor || '#00D1FF' }}
                  >
                    LIVE HERO
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-50" />
                {partner.logo ? (
                  <img
                    src={`${API_BASE_URL}${partner.logo}`}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                ) : (
                  <RocketLaunchIcon className="w-12 h-12 text-gray-700 z-10" />
                )}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <button
                    onClick={() => handleOpenModal(partner)}
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="p-2 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2">{partner.subtitle || 'Product'}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:nova-gradient-text transition-all">
                  {partner.name}
                </h3>
                <p className="text-[10px] text-gray-500 line-clamp-3 font-medium leading-relaxed mb-4">
                  {partner.description}
                </p>
                <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest border-t border-white/5 pt-4">
                  <LinkIcon className="w-3 h-3 text-cyan-500/50" />
                  {partner.buttonText || 'Explore'}
                </div>
              </div>
            </motion.div>
          ))}

          {partners.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <RocketLaunchIcon className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-400">Showcase Vault Empty</h3>
              <p className="text-gray-600 text-sm mt-2">Initialize your first product showcase item.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl glass-card rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <h2 className="text-3xl font-black text-white mb-8 tracking-tighter italic">
                {editingItem ? 'REFINE' : 'ESTABLISH'} <span className="text-gray-500 font-light uppercase">Showcase</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Product Title</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-medium" placeholder="e.g. Casting.io" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Section Tag (Above Title)</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-medium" placeholder="e.g. Our Products" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Innovation Abstract (Description)</label>
                  <textarea rows="3" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white resize-none font-medium" placeholder="The industry-leading AI casting platform..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <ChatBubbleBottomCenterTextIcon className="w-3 h-3" />
                      CTA Button Text
                    </label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium" placeholder="e.g. Explore Casting.io" value={formData.buttonText} onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" />
                      CTA Button URL
                    </label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium" placeholder="e.g. /casting-io" value={formData.buttonUrl} onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Banner Visual Background</label>
                    <div className="relative group">
                      <input type="file" onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="w-full bg-white/[0.03] border border-white/5 border-dashed rounded-2xl py-8 flex flex-col items-center justify-center transition-all group-hover:border-cyan-500/40">
                        <CloudArrowUpIcon className="w-8 h-8 text-gray-600 mb-2" />
                        <span className="text-[10px] font-bold text-gray-500">{formData.logo ? formData.logo.name : 'Upload HD Banner Image'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Theme Accent Color</label>
                    <div className="flex items-center gap-4 h-[100px] bg-white/[0.03] border border-white/5 rounded-2xl px-6">
                      <input
                        type="color"
                        value={formData.bgColor}
                        onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                        className="w-12 h-12 rounded-lg bg-transparent cursor-pointer border-none"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={formData.bgColor}
                          onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                          className="w-full bg-transparent border-none text-white font-mono text-sm focus:outline-none"
                        />
                        <p className="text-[8px] text-gray-500 uppercase font-black">Applied to showcase background</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={saving} className="w-full py-5 mt-4 rounded-2xl nova-gradient-bg text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform">
                  {saving ? 'Synching Matrix...' : (editingItem ? 'Update Showcase Item' : 'Publish to Showcase')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPartners;