import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  CameraIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    eventDate: '',
    type: 'image', // 'image' or 'stat'
    metric: '',
    subtext: '',
    files: []
  });

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/hackathon`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setImages(response.data || []);
    } catch (err) {
      setError('Failed to fetch hackathon media assets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
        type: item.type || 'image',
        metric: item.metric || '',
        subtext: item.subtext || '',
        files: []
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        eventDate: '',
        type: 'image',
        metric: '',
        subtext: '',
        files: []
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('eventDate', formData.eventDate);
    data.append('type', formData.type);

    if (formData.type === 'stat') {
      data.append('metric', formData.metric);
      data.append('subtext', formData.subtext);
    }

    if (formData.type === 'image' && formData.files.length > 0) {
      formData.files.forEach(file => {
        data.append('images', file);
      });
    }

    try {
      const token = localStorage.getItem('token');
      if (editingItem) {
        await axios.put(`${API_BASE_URL}/api/hackathon/${editingItem._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        if (formData.type === 'image' && formData.files.length === 0) {
          throw new Error('Visual assets are required for image type');
        }
        await axios.post(`${API_BASE_URL}/api/hackathon`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      setModalOpen(false);
      fetchImages();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Erase this record from history?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/hackathon/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchImages();
      } catch (err) {
        setError('De-indexing failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              HACKATHON <span className="nova-gradient-text uppercase">Archive</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Dual-Type Record Management</p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            <PlusIcon className="w-4 h-4" />
            Index New Entry
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest flex items-center gap-3">
            <InformationCircleIcon className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((entry) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-[2.5rem] overflow-hidden group border-white/5 hover:border-[#00F0FF]/30 transition-all duration-500 shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                {entry.type === 'image' ? (
                  <img
                    src={`${API_BASE_URL}${entry.images[0]}`}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm mb-4">
                      <ChartBarIcon className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Data Insight</span>
                    </div>
                    <div className="text-3xl font-black text-white tracking-tighter italic mb-1">{entry.metric}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{entry.subtext}</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleOpenModal(entry)}
                    className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-[#00F0FF]/20 hover:border-[#00F0FF]/30 transition-all"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="p-2.5 rounded-xl bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                  <CalendarDaysIcon className="w-3.5 h-3.5" />
                  {new Date(entry.eventDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </div>
                <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-cyan-400 transition-colors">
                  {entry.title}
                </h3>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${entry.type === 'image' ? 'border-cyan-500/30 text-cyan-400' : 'border-purple-500/30 text-purple-400'} uppercase tracking-widest`}>
                  {entry.type === 'image' ? 'Visual' : 'Insight'}
                </span>
              </div>
            </motion.div>
          ))}

          {images.length === 0 && !loading && (
            <div className="col-span-full py-32 text-center">
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <CameraIcon className="w-12 h-12 text-gray-700" />
              </div>
              <h3 className="text-2xl font-black text-gray-400 tracking-tighter italic">GALLERY <span className="text-gray-600 font-light not-italic">Empty</span></h3>
              <p className="text-gray-600 text-xs mt-3 uppercase tracking-widest font-black">Begin indexing your event record</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-xl glass-card rounded-[3.5rem] p-12 shadow-2xl overflow-hidden border-white/10"
            >
              <div className="absolute top-0 right-0 p-10">
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-4xl font-black text-white mb-10 tracking-tighter italic">
                {editingItem ? 'REFINE' : 'INDEX'} <span className="text-gray-500 font-light uppercase px-2">ENTRY</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Type Selection */}
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'image' })}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${formData.type === 'image' ? 'bg-white text-black font-black' : 'text-gray-500 hover:text-white font-bold'}`}
                  >
                    <PhotoIcon className="w-4 h-4" />
                    Visual Asset
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'stat' })}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${formData.type === 'stat' ? 'bg-white text-black font-black' : 'text-gray-500 hover:text-white font-bold'}`}
                  >
                    <ChartBarIcon className="w-4 h-4" />
                    Data Insight
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Event Designation</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-bold placeholder:text-gray-700"
                    placeholder="e.g. Genesis Buildathon 2026"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {formData.type === 'image' ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Visual Source Files</label>
                    <div className="relative group">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setFormData({ ...formData, files: Array.from(e.target.files) })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full bg-white/[0.03] border border-white/5 border-dashed group-hover:border-cyan-500/30 rounded-[2rem] py-10 flex flex-col items-center justify-center transition-all bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_100%)]">
                        <CloudArrowUpIcon className="w-10 h-10 text-gray-700 group-hover:text-cyan-400 transition-colors mb-4" />
                        <span className="text-xs font-black text-gray-600 group-hover:text-gray-400 uppercase tracking-widest text-center">
                          {formData.files.length > 0 ? `${formData.files.length} ASSETS READY` : 'Drop multi-frame record or scan'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Metric Bold</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-bold placeholder:text-gray-700"
                        placeholder="e.g. 1k+"
                        value={formData.metric}
                        onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Sub-text</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-bold placeholder:text-gray-700"
                        placeholder="e.g. Participants"
                        value={formData.subtext}
                        onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Event Date</label>
                  <div className="relative">
                    <CalendarDaysIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all font-bold appearance-none"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="group relative w-full py-6 mt-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.02] disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                  {uploading ? 'Synching...' : (editingItem ? 'Publish Refinement' : 'Finalize Indexing')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;