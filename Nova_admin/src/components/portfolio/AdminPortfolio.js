import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL; // Use environment variable

const AdminPortfolio = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);

  // ✅ Fetch Portfolio Images
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/portfolio`);
      setGalleryImages(response.data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ✅ Upload New Image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('images', selectedFile);

    try {
      setUploading(true);
      await axios.post(`${API_BASE_URL}/api/portfolio`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSelectedFile(null);
      await fetchGalleryImages(); // Fetch updated gallery images
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Update (Edit) Image
  const handleEdit = async (imageId) => {
    if (!selectedFile) return alert('Please select a new image before updating.');

    const formData = new FormData();
    formData.append('images', selectedFile);

    try {
      setUploading(true);
      await axios.put(`${API_BASE_URL}/api/portfolio/${imageId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSelectedFile(null);
      setEditingImageId(null);
      await fetchGalleryImages(); // Refresh images
    } catch (error) {
      console.error('Error updating image:', error);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete Image
  const handleDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/portfolio/${imageId}`);
        setGalleryImages(galleryImages.filter((image) => image._id !== imageId));
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  return (
    <div className="px-64 py-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Manage Portfolio Images</h2>

      {/* ✅ File Upload Form */}
      <form onSubmit={handleUpload} className="mb-6">
        <input type="file" onChange={handleFileChange} className="block w-full p-2 mb-4 border border-gray-300 rounded" />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {/* ✅ Gallery Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <div key={image._id || `image-${index}`} className="bg-white p-4 rounded shadow-md">
              {image.images && image.images.length > 0 ? (
                <img
                  src={`${API_BASE_URL}${image.images[0]}`} // Fixed URL formatting
                  alt="Gallery"
                  className="w-full h-32 object-cover mb-2 rounded"
                />
              ) : (
                <p className="text-red-500">No image available</p>
              )}

              {/* ✅ Edit Image - Shows input only if editing */}
              {editingImageId === image._id ? (
                <div className="mt-2">
                  <input type="file" onChange={handleFileChange} className="block w-full p-2 mb-2 border border-gray-300 rounded" />
                  <button
                    onClick={() => handleEdit(image._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    disabled={uploading}
                  >
                    {uploading ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setEditingImageId(null)}
                    className="ml-2 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setEditingImageId(image._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio;