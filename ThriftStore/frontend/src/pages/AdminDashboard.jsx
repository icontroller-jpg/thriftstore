import { useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "thriftstore");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfapvjvza/image/upload",
        data
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // Send product data to Django API
      await axios.post("http://127.0.0.1:8000/api/products/", {
      title: name,
      price: parseFloat(price),
      description: description,
      image: imageUrl,
      condition: "new"
    });

      alert("Product uploaded successfully!");

      // reset form
      setName("");
      setPrice("");
      setDescription("");
      setFile(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div style={{padding:"40px"}}>

      <h1>Admin Product Upload</h1>

      <div style={{display:"flex",flexDirection:"column",gap:"10px",width:"300px"}}>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={handleFileChange}
        />

        {preview && (
          <div>
            <p>Preview:</p>
            <img
              src={preview}
              alt="preview"
              style={{width:"200px",borderRadius:"10px"}}
            />
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