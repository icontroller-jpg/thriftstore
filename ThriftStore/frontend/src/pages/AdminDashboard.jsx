import { useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || "thriftstore";
  const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/dfapvjvza/image/upload";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadProduct = async () => {
    if (!name || !price || !file) return alert("Please fill all required fields");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const cloudinaryRes = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = cloudinaryRes.data.secure_url;

      await axios.post(`${API_URL}/api/products/`, {
        title: name,
        price: parseFloat(price),
        description,
        image: imageUrl,
        condition: "new",
      });

      alert("Product uploaded successfully!");
      setName(""); setPrice(""); setDescription(""); setFile(null); setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Upload Product</h1>

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3"
        />

        {preview && (
          <div className="mb-3 text-center">
            <img src={preview} alt="preview" className="w-48 mx-auto rounded-lg" />
          </div>
        )}

        <button
          onClick={uploadProduct}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Uploading..." : "Post Product"}
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;