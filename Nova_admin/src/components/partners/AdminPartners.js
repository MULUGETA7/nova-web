import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL; // Use environment variable
const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);



  // ✅ Fetch partners from the backend
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/partner`);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  // ✅ Handle Form Submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (logoFile) formData.append("logo", logoFile);

      if (editingId) {
        // 🔄 Update Partner
        await axios.put(
          `${API_BASE_URL}/api/partner/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // ➕ Create New Partner
        await axios.post(`${API_BASE_URL}/api/partner`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // ✅ Refresh Data
      const updatedPartners = await axios.get(`${API_BASE_URL}/api/partner`);
      setPartners(updatedPartners.data);

      // Reset Form
      setName("");
      setLogoFile(null);
      setDescription("");
      setEditingId(null);
    } catch (error) {
      console.error("Error saving partner:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Edit
  const handleEdit = (partner) => {
    setName(partner.name);
    setDescription(partner.description);
    setEditingId(partner._id);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/partner/${id}`);

        // Refresh Data
        setPartners(partners.filter((partner) => partner._id !== id));
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 px-20 md:px-40 lg:px-60">
      <h2 className="text-2xl font-bold mb-4">Manage Partners</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Partner Name"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : editingId ? "Update Partner" : "Add Partner"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div key={partner._id} className="bg-white p-4 rounded shadow-md">
            {partner.logo && (
              <img
                src={`${API_BASE_URL}${partner.logo}`}
                alt={partner.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{partner.name}</h3>
            <p className="text-gray-600">{partner.description}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(partner)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(partner._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPartners;