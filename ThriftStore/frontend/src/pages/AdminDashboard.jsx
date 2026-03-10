import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || "thriftstore";
  const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/dfapvjvza/image/upload";

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/products/`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "inventory") fetchProducts();
  }, [activeTab]);

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
      const rawUrl = cloudinaryRes.data.secure_url;

        const imageUrl = rawUrl.replace(
          "/upload/",
          "/upload/f_auto,q_auto,w_600/"
        );
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

  const deleteProduct = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/api/products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syncopate:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          min-height: 100vh;
          background: #050507;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          font-family: 'Share Tech Mono', monospace;
          color: #e0e0e0;
          position: relative;
          overflow-x: hidden;
          padding: 40px 20px 60px;
        }

        .dash-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,255,170,0.012) 2px, rgba(0,255,170,0.012) 4px
          );
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb {
          position: fixed; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,170,0.04) 0%, transparent 70%);
          top: -200px; right: -200px; pointer-events: none;
        }
        .glow-orb-2 {
          position: fixed; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,120,255,0.05) 0%, transparent 70%);
          bottom: -100px; left: -100px; pointer-events: none;
        }

        .panel {
          position: relative; z-index: 1;
          width: 100%; max-width: 860px;
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Header ── */
        .panel-header { margin-bottom: 32px; }
        .status-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00ffaa; box-shadow: 0 0 6px #00ffaa;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .status-text { font-size: 9px; letter-spacing: 0.2em; color: #333; text-transform: uppercase; }
        .panel-eyebrow { font-size: 10px; letter-spacing: 0.3em; color: #00ffaa; text-transform: uppercase; margin-bottom: 8px; opacity: 0.7; }
        .panel-title { font-family: 'Syncopate', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 0.1em; color: #fff; text-transform: uppercase; }
        .divider { width: 40px; height: 1px; background: #00ffaa; margin-top: 12px; box-shadow: 0 0 8px rgba(0,255,170,0.6); }

        /* ── Tabs ── */
        .tab-bar {
          display: flex; gap: 0; margin-bottom: 28px;
          border-bottom: 1px solid #1a1a1f;
        }
        .tab-btn {
          background: transparent; border: none; border-bottom: 2px solid transparent;
          padding: 10px 20px; font-family: 'Syncopate', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #333; cursor: pointer;
          transition: all 0.2s; margin-bottom: -1px;
        }
        .tab-btn:hover { color: #888; }
        .tab-btn.active { color: #00ffaa; border-bottom-color: #00ffaa; }

        /* ── Upload Form ── */
        .form-wrap { max-width: 420px; }

        .field-group { margin-bottom: 16px; position: relative; }
        .field-label {
          display: block; font-size: 9px; letter-spacing: 0.25em;
          text-transform: uppercase; color: #555; margin-bottom: 6px; transition: color 0.2s;
        }
        .field-group.active .field-label { color: #00ffaa; }
        .field-input {
          width: 100%; background: rgba(255,255,255,0.02);
          border: 1px solid #1a1a1f; border-bottom-color: #2a2a35;
          color: #e0e0e0; font-family: 'Share Tech Mono', monospace;
          font-size: 13px; padding: 10px 12px; outline: none;
          transition: all 0.2s; -webkit-appearance: none;
        }
        .field-input:focus {
          border-color: transparent; border-bottom-color: #00ffaa;
          background: rgba(0,255,170,0.03); box-shadow: 0 1px 0 0 rgba(0,255,170,0.3);
        }
        .field-input::placeholder { color: #2a2a35; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .upload-zone {
          border: 1px dashed #1e1e28; padding: 20px; text-align: center;
          cursor: pointer; transition: all 0.2s; position: relative;
          overflow: hidden; margin-bottom: 16px;
        }
        .upload-zone:hover { border-color: #00ffaa; background: rgba(0,255,170,0.03); }
        .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .upload-icon { font-size: 20px; margin-bottom: 6px; color: #333; }
        .upload-text { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #333; }
        .upload-zone.has-file .upload-text { color: #00ffaa; }

        .preview-container { margin-bottom: 16px; position: relative; }
        .preview-img { width: 100%; height: 160px; object-fit: cover; display: block; filter: grayscale(20%); border: 1px solid #1a1a1f; }
        .preview-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%); pointer-events: none; }
        .preview-tag { position: absolute; bottom: 8px; left: 8px; font-size: 9px; letter-spacing: 0.2em; color: #00ffaa; text-transform: uppercase; }

        .submit-btn {
          width: 100%; padding: 14px; background: transparent;
          border: 1px solid #00ffaa; color: #00ffaa;
          font-family: 'Syncopate', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer;
          transition: all 0.2s; position: relative; overflow: hidden;
        }
        .submit-btn::before {
          content: ''; position: absolute; inset: 0; background: #00ffaa;
          transform: translateX(-100%); transition: transform 0.3s ease; z-index: 0;
        }
        .submit-btn:hover::before { transform: translateX(0); }
        .submit-btn:hover { color: #050507; }
        .submit-btn span { position: relative; z-index: 1; }
        .submit-btn:disabled { border-color: #1a1a1f; color: #333; cursor: not-allowed; }
        .submit-btn:disabled::before { display: none; }

        .loading-dots::after {
          content: ''; animation: dots 1.2s steps(4,end) infinite;
        }
        @keyframes dots { 0%,20%{content:''} 40%{content:'.'} 60%{content:'..'} 80%,100%{content:'...'} }

        .corner-tl, .corner-br { position: absolute; width: 12px; height: 12px; pointer-events: none; }
        .corner-tl { top: -1px; left: -1px; border-top: 1px solid #00ffaa; border-left: 1px solid #00ffaa; box-shadow: -1px -1px 0 rgba(0,255,170,0.3); }
        .corner-br { bottom: -1px; right: -1px; border-bottom: 1px solid #00ffaa; border-right: 1px solid #00ffaa; box-shadow: 1px 1px 0 rgba(0,255,170,0.3); }

        /* ── Inventory Grid ── */
        .inv-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .inv-count { font-size: 9px; letter-spacing: 0.2em; color: #333; text-transform: uppercase; }
        .inv-refresh {
          background: transparent; border: 1px solid #1a1a1f; color: #555;
          font-family: 'Share Tech Mono', monospace; font-size: 9px;
          letter-spacing: 0.15em; padding: 6px 12px; cursor: pointer;
          text-transform: uppercase; transition: all 0.2s;
        }
        .inv-refresh:hover { border-color: #00ffaa; color: #00ffaa; }

        .inv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .inv-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid #1a1a1f;
          position: relative;
          transition: border-color 0.2s;
          animation: fadeUp 0.4s ease both;
        }
        .inv-card:hover { border-color: #2a2a35; }

        .inv-card-img {
          width: 100%; aspect-ratio: 1/1; object-fit: cover;
          display: block; filter: grayscale(15%);
          transition: filter 0.3s;
        }
        .inv-card:hover .inv-card-img { filter: grayscale(0%); }

        .inv-card-body { padding: 10px 12px 12px; }
        .inv-card-title {
          font-size: 11px; color: #ccc; line-height: 1.4;
          margin-bottom: 4px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .inv-card-price { font-size: 10px; color: #00ffaa; letter-spacing: 0.1em; }

        .inv-card-id { font-size: 8px; color: #2a2a35; letter-spacing: 0.1em; margin-bottom: 10px; }

        .delete-btn {
          width: 100%; padding: 8px; background: transparent;
          border: 1px solid #1e1e28; color: #444;
          font-family: 'Share Tech Mono', monospace; font-size: 8px;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
        }
        .delete-btn::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,50,50,0.08);
          transform: translateX(-100%); transition: transform 0.25s ease; z-index: 0;
        }
        .delete-btn:hover::before { transform: translateX(0); }
        .delete-btn:hover { border-color: rgba(255,80,80,0.4); color: #ff5050; }
        .delete-btn span { position: relative; z-index: 1; }
        .delete-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* ── Confirm Modal ── */
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(5,5,7,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; animation: fadeIn 0.2s ease;
          backdrop-filter: blur(4px);
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal {
          background: #0a0a0e; border: 1px solid #1e1e28;
          padding: 28px; max-width: 320px; width: 90%;
          position: relative; animation: fadeUp 0.25s ease;
        }
        .modal-corner-tl { position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 1px solid #ff5050; border-left: 1px solid #ff5050; }
        .modal-corner-br { position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; border-bottom: 1px solid #ff5050; border-right: 1px solid #ff5050; }
        .modal-label { font-size: 8px; letter-spacing: 0.3em; color: #ff5050; text-transform: uppercase; margin-bottom: 10px; }
        .modal-title { font-family: 'Syncopate', sans-serif; font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 8px; text-transform: uppercase; }
        .modal-sub { font-size: 10px; color: #444; letter-spacing: 0.1em; margin-bottom: 20px; line-height: 1.5; }
        .modal-actions { display: flex; gap: 10px; }
        .modal-cancel {
          flex: 1; padding: 10px; background: transparent;
          border: 1px solid #1e1e28; color: #555;
          font-family: 'Share Tech Mono', monospace; font-size: 9px;
          letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer;
          transition: all 0.2s;
        }
        .modal-cancel:hover { border-color: #333; color: #888; }
        .modal-confirm {
          flex: 1; padding: 10px; background: transparent;
          border: 1px solid rgba(255,80,80,0.4); color: #ff5050;
          font-family: 'Syncopate', sans-serif; font-size: 9px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer;
          transition: all 0.2s; position: relative; overflow: hidden;
        }
        .modal-confirm::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,80,80,0.12);
          transform: translateX(-100%); transition: transform 0.25s ease; z-index: 0;
        }
        .modal-confirm:hover::before { transform: translateX(0); }
        .modal-confirm span { position: relative; z-index: 1; }

        /* ── Empty / Loading states ── */
        .inv-empty {
          grid-column: 1/-1; text-align: center;
          padding: 60px 20px; color: #222;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        }
        .inv-spinner {
          width: 20px; height: 20px; border: 1px solid #1a1a1f;
          border-top-color: #00ffaa; border-radius: 50%;
          animation: spin 0.8s linear infinite; margin: 0 auto 12px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {confirmDelete && (
        <div className="modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-corner-tl" />
            <div className="modal-corner-br" />
            <p className="modal-label">⚠ Destructive Action</p>
            <h2 className="modal-title">Delete Entry</h2>
            <p className="modal-sub">
              "{confirmDelete.title}" will be permanently removed from inventory.
              This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setConfirmDelete(null)}>
                Abort
              </button>
              <button
                className="modal-confirm"
                onClick={() => deleteProduct(confirmDelete.id)}
                disabled={deletingId === confirmDelete.id}
              >
                <span>{deletingId === confirmDelete.id ? "Deleting..." : "Confirm"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dash-root">
        <div className="glow-orb" />
        <div className="glow-orb-2" />

        <div className="panel">
          <div className="panel-header">
            <div className="status-bar">
              <div className="status-dot" />
              <span className="status-text">System Online</span>
            </div>
            <p className="panel-eyebrow">Admin / Control</p>
            <h1 className="panel-title">Dashboard</h1>
            <div className="divider" />
          </div>

          {/* Tabs */}
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
              onClick={() => setActiveTab("upload")}
            >
              ⊕ New Entry
            </button>
            <button
              className={`tab-btn ${activeTab === "inventory" ? "active" : ""}`}
              onClick={() => setActiveTab("inventory")}
            >
              ▦ Inventory
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="form-wrap">
              <div style={{ position: 'relative' }}>
                <div className="corner-tl" />
                <div className="corner-br" />
                <div style={{ padding: '20px 0' }}>
                  <div className={`field-group ${focused === 'name' ? 'active' : ''}`}>
                    <label className="field-label">Product Name</label>
                    <input
                      className="field-input" placeholder="—" value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div className="field-row">
                    <div className={`field-group ${focused === 'price' ? 'active' : ''}`}>
                      <label className="field-label">Price (USD)</label>
                      <input
                        type="number" className="field-input" placeholder="0.00" value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onFocus={() => setFocused('price')} onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Condition</label>
                      <input className="field-input" placeholder="New" disabled style={{ color: '#333' }} />
                    </div>
                  </div>
                  <div className={`field-group ${focused === 'desc' ? 'active' : ''}`}>
                    <label className="field-label">Description</label>
                    <textarea
                      className="field-input" placeholder="—" rows={3} value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onFocus={() => setFocused('desc')} onBlur={() => setFocused(null)}
                      style={{ resize: 'none', display: 'block' }}
                    />
                  </div>

                  {preview ? (
                    <div className="preview-container">
                      <label className="field-label">Image Preview</label>
                      <div style={{ position: 'relative' }}>
                        <img src={preview} alt="preview" className="preview-img" />
                        <div className="preview-overlay" />
                        <span className="preview-tag">▸ Loaded</span>
                        <input
                          type="file" accept="image/*" onChange={handleFileChange}
                          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`upload-zone ${file ? 'has-file' : ''}`}>
                      <input type="file" accept="image/*" onChange={handleFileChange} />
                      <div className="upload-icon">⊕</div>
                      <div className="upload-text">{file ? file.name : 'Select Image File'}</div>
                    </div>
                  )}

                  <button onClick={uploadProduct} disabled={loading} className="submit-btn">
                    <span>
                      {loading ? <span className="loading-dots">Transmitting</span> : 'Deploy Product'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div>
              <div className="inv-header">
                <span className="inv-count">
                  {productsLoading ? "Loading..." : `${products.length} Record${products.length !== 1 ? 's' : ''}`}
                </span>
                <button className="inv-refresh" onClick={fetchProducts}>↻ Refresh</button>
              </div>

              <div className="inv-grid">
                {productsLoading ? (
                  <div className="inv-empty">
                    <div className="inv-spinner" />
                    Fetching inventory...
                  </div>
                ) : products.length === 0 ? (
                  <div className="inv-empty">No records found</div>
                ) : (
                  products.map((product, i) => (
                    <div className="inv-card" key={product.id} style={{ animationDelay: `${i * 0.05}s` }}>
                      <img
                        src={product.image} alt={product.title}
                        className="inv-card-img" loading="lazy"
                      />
                      <div className="inv-card-body">
                        <p className="inv-card-id">ID — {product.id}</p>
                        <p className="inv-card-title">{product.title}</p>
                        <p className="inv-card-price">${product.price}</p>
                      </div>
                      <div style={{ padding: '0 12px 12px' }}>
                        <button
                          className="delete-btn"
                          onClick={() => setConfirmDelete(product)}
                          disabled={deletingId === product.id}
                        >
                          <span>{deletingId === product.id ? "Removing..." : "⊘ Delete Entry"}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;