import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_BASE_URL = process.env.REACT_APP_API_URL; // Use environment variable

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    imageUrl: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchNewsArticle = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/news/${id}`);
        const data = response.data;
        setFormData({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl || '',
          date: new Date(data.date).toISOString().split('T')[0],
        });
        setCategory(data.category);
      } catch (error) {
        setError('News article not found: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) {
        setError('Image size should not exceed 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG).');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', new Date(formData.date).toISOString());
      formDataToSend.append('category', category);
      if (image) {
        formDataToSend.append('image', image);
      }

      const apiUrl = `${API_BASE_URL}/api/news/${id}`;
      await axios.put(apiUrl, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/news');
    } catch (error) {
      setError('Error updating news article: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex justify-center w-3/4">
                <span className="block sm:inline text-center">{error}</span>
              </div>
            )}
            <div className="flex flex-col w-3/4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                disabled={loading}
                className="mt-1 block border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-3/4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
              >
                <option value="Technology">Technology</option>
                <option value="Company News">Company News</option>
                <option value="Events">Events</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>

            <div className="flex flex-col w-3/4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="mt-1 block w-full"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">Maximum file size: 5MB. Supported formats: JPEG, PNG</p>
            </div>

            <div className="flex flex-col w-3/4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                disabled={loading}
                className="mt-1 block border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-3/4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <ReactQuill value={formData.content} onChange={handleContentChange} className="h-64" readOnly={loading} />
              </div>
            </div>

            <div className="flex justify-end w-3/4">
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mt-8">
                Update News Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsEdit;