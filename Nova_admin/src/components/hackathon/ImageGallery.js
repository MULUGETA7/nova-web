import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment variable with fallback

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);
  const navigate = useNavigate();

  // Fetch images when component is mounted
  useEffect(() => {
    fetchImages(); // Call fetchImages to fetch the images initially
  }, []);

  // Define the fetchImages function
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/hackathon`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setImages(response.data || []);
    } catch (error) {
      setError('Error fetching images: ' + error.message);
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle image deletion
  const handleDelete = async (id) => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/hackathon/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setImages(images.filter(img => img._id !== id)); // Update state after delete
      } catch (error) {
        setError('Error deleting image: ' + error.message);
      }
    }
  };

  // Handle image update (editing functionality)
  const handleEdit = async (imageId) => {
    if (!selectedFile) return alert('Please select a new image before updating.');

    const formData = new FormData();
    formData.append('images', selectedFile);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/hackathon/${imageId}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setSelectedFile(null); // Clear selected file after upload
      setEditingImageId(null); // Clear editing mode
      await fetchImages(); // Fetch updated images after edit
    } catch (error) {
      setError('Error updating image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Cancel the edit mode
  const handleCancelEdit = () => {
    setEditingImageId(null); // Exit editing mode
    setSelectedFile(null); // Reset selected file
  };

  // Show loading state while images are being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 ml-[20%] max-md:ml-0">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Hackathon Images</h1>
            <button
              onClick={() => navigate('/hackathon-images/upload')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Upload Images
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            {images.length === 0 ? (
              <p className="text-center text-gray-500">
                No images uploaded yet. Click "Upload Images" to add some.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div key={image._id} className="relative group">
                    <div className="flex flex-col justify-between h-full">
                      <img
                        src={`${API_BASE_URL}${image.images[0]}`}
                        alt={image.caption || 'Hackathon image'}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="mt-4">
                        {editingImageId !== image._id ? (
                          <>
                            <button
                              onClick={() => setEditingImageId(image._id)} // Set the image to edit
                              className="bg-yellow-600 text-white px-2 py-1 rounded-md hover:bg-yellow-700 w-full mb-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(image._id)} // Delete image
                              className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 w-full"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <div className="mt-2">
                            <input
                              type="file"
                              onChange={handleFileChange}
                              className="block w-full p-2 mb-2 border border-gray-300 rounded"
                              accept="image/*"
                            />
                            <button
                              onClick={() => handleEdit(image._id)} // Save changes
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition w-full mb-2"
                              disabled={uploading}
                            >
                              {uploading ? 'Updating...' : 'Save Changes'}
                            </button>
                            <button
                              onClick={handleCancelEdit} // Cancel edit
                              className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition w-full"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;