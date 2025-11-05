import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL; // Use environment variable

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/news`);
      setNews(response.data);
    } catch (error) {
      setError('Error fetching news: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;
    
    setDeleting(id);
    try {
      await axios.delete(`${API_BASE_URL}/api/news/${id}`);
      setNews(news.filter((item) => item._id !== id));
    } catch (error) {
      setError('Error deleting news: ' + (error.response?.data?.message || error.message));
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 ml-[20%] max-md:ml-0">
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">News Articles</h1>
            <button
              onClick={() => navigate('/news/add')}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Add New Article
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {news.map((article) => (
                <li key={article._id}>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {article.imageUrl && (
                        <img
                          src={`${process.env.REACT_APP_API_URL}${article.imageUrl}`} // Use environment variable
                          alt={article.title}
                          className="h-16 w-16 object-cover rounded-md mr-4"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(article.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/news/edit/${article._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        disabled={deleting === article._id}
                        className={`text-red-600 hover:text-red-900 ${deleting === article._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {deleting === article._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {news.length === 0 && (
                <li className="px-6 py-4 text-center text-gray-500">
                  No news articles found. Click "Add New Article" to create one.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;