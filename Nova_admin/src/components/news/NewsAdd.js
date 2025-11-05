import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment variable with fallback

const NewsAdd = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('Technology'); // Set default category
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) { // 5MB limit
        setError('Image size should not exceed 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG).');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(''); // Clear error when image is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message before submitting

    // Check if the image is uploaded
    if (!image) {
      setError('Image is required');
      setLoading(false);
      return; // Prevent form submission
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('category', category);
      formDataToSend.append('image', image); // Add the image file directly

      // Debugging: Log FormData content
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const apiUrl = `${API_BASE_URL}/api/news`;
      console.log("Making POST request to:", apiUrl); // Debugging line

      const response = await axios.post(apiUrl, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Response Data:', response.data); // Debugging: Log the response data

      if (response.status === 201) {
        navigate('/news');
      } else {
        setError('Failed to create news article: ' + response.statusText);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setError('Error creating news article: ' + errorMessage);
      console.error('Error creating news article:', error);
      console.error('Error response:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6 px-64">
            <h1 className="text-3xl font-bold text-gray-900">Add News Article</h1>
            <button
              onClick={() => navigate('/news')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Back to News
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex justify-center" style={{ marginLeft: '40px' }}>
              <span className="block sm:inline text-center">{error}</span>
            </div>
          )}

          <div className="bg-white shadow rounded-lg px-64 py-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
                >
                  <option value="Technology">Technology</option>
                  <option value="Company News">Company News</option>
                  <option value="Events">Events</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div>
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

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <div className="mt-1">
                  <ReactQuill value={formData.content} onChange={handleContentChange} className="h-64" readOnly={loading} />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mt-8"
                >
                  {loading ? 'Creating...' : 'Create Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAdd;