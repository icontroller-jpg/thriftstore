import { useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Frontend environment variable for backend URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || "thriftstore";
  const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/dfapvjvza/image/upload";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const uploadProduct = async () => {
    if (!name || !price || !file) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const cloudinaryRes = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = cloudinaryRes.data.secure_url;

      // 2️⃣ Send product data to deployed Django API
      await axios.post(`${API_URL}/api/products/`, {
        title: name,
        price: parseFloat(price),
        description,
        image: imageUrl,
        condition: "new",
      });

      alert("Product uploaded successfully!");

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Product Upload</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <div>
            <p>Preview:</p>
            <img src={preview} alt="preview" style={{ width: "200px", borderRadius: "10px" }} />
          </div>
        )}

        <button onClick={uploadProduct} disabled={loading}>
          {loading ? "Uploading..." : "Post Product"}
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;