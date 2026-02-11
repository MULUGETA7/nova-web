import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  NewspaperIcon,
  CalendarDaysIcon,
  TagIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  CheckBadgeIcon,
  PencilSquareIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    category: 'Technology',
    imageUrl: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/news/${id}`);
        const data = response.data;
        setFormData({
          title: data.title,
          content: data.content,
          date: new Date(data.date).toISOString().split('T')[0],
          category: data.category,
          imageUrl: data.imageUrl
        });
        setImagePreview(`${API_BASE_URL}${data.imageUrl}`);
      } catch (err) {
        setError('Intelligence report indexing failure: Not found');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) {
        setError('Asset overflow (Max 5MB)');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('date', new Date(formData.date).toISOString());
      data.append('category', formData.category);
      if (image) data.append('image', image);

      await axios.put(`${API_BASE_URL}/api/news/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Article refinement published successfully');
      setTimeout(() => navigate('/news'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const categories = ["Technology", "Company News", "Events", "Partnership"];

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              ADJUST <span className="nova-gradient-text uppercase">Parameters</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium uppercase tracking-[0.2em] text-[10px]">Refine Intelligence Feed: {id.slice(-6).toUpperCase()}</p>
          </div>

          <button
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-all shadow-lg"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Abort Refinement
          </button>
        </div>

        <div className="glass-card rounded-[3rem] p-10 md:p-16 relative overflow-hidden border-white/5">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <ShieldCheckIcon className="w-64 h-64 text-white" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Metadata */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Article Designation</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-bold"
                    placeholder="Enter article designation..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Classification Tier</label>
                  <div className="relative">
                    <TagIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all font-bold appearance-none cursor-pointer"
                    >
                      {categories.map(cat => <option key={cat} value={cat} className="bg-[#111]">{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Temporal Marker</label>
                  <div className="relative">
                    <CalendarDaysIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 transition-all font-bold appearance-none invert-calendar"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Image Asset */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Visual Feed Asset</label>
                <div className="relative h-[calc(100%-24px)] min-h-[300px] group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="h-full w-full bg-white/[0.03] border border-white/5 border-dashed group-hover:border-purple-500/30 rounded-[2.5rem] flex flex-col items-center justify-center transition-all overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover group-hover:opacity-60 transition-opacity" />
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-12 h-12 text-gray-700 group-hover:text-purple-400 transition-colors mb-4" />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] group-hover:text-gray-400">Replace Visual Asset</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4 pt-10 border-t border-white/5">
              <label className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">
                <PencilSquareIcon className="w-4 h-4" />
                Report Content Adjustments
              </label>
              <div className="nova-quill rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/5">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  className="h-80"
                  readOnly={saving}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-3">
                  <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-3">
                  <CheckBadgeIcon className="w-5 h-5 flex-shrink-0" />
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={saving}
              className="group relative w-full py-7 mt-8 rounded-[2rem] bg-indigo-600 text-white font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] disabled:opacity-50 overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              {saving ? 'Synchronizing Refinements...' : 'Commit Adjustments and Publish'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsEdit;