import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap');
  * { box-sizing: border-box; }
  .addcar-page {
    font-family: 'Barlow', sans-serif;
    min-height: 100vh; background: #080809; color: #e8e8e8;
    display: flex; flex-direction: column;
  }
  .addcar-header {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 28px 48px; display: flex; align-items: center; gap: 20px;
    background: rgba(8,8,9,0.97);
  }
  .btn-back {
    background: transparent; border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5); width: 36px; height: 36px; border-radius: 2px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0;
  }
  .btn-back:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); }
  .addcar-eyebrow { font-size: 9px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: #c4a460; margin-bottom: 2px; }
  .addcar-title { font-family: 'Barlow Condensed', sans-serif; font-size: 30px; font-weight: 800; color: #fff; text-transform: uppercase; line-height: 1; }
  .addcar-body { flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 60px 24px; }
  .addcar-card { width: 100%; max-width: 500px; background: #0d0d0f; border: 1px solid rgba(255,255,255,0.07); border-radius: 2px; }
  .addcar-card-header { padding: 20px 28px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .addcar-card-eyebrow { font-size: 9px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.25); }
  .addcar-form { padding: 28px; display: flex; flex-direction: column; gap: 12px; }
  .field-group { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field-label { font-size: 9px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.3); }
  .field-input {
    font-family: 'Barlow', sans-serif; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08); color: #e8e8e8; font-size: 14px;
    padding: 11px 14px; border-radius: 2px; outline: none;
    transition: border-color 0.2s, background 0.2s; width: 100%;
  }
  .field-input::placeholder { color: rgba(255,255,255,0.2); }
  .field-input:focus { border-color: rgba(196,164,96,0.5); background: rgba(255,255,255,0.05); }

  /* Single image upload */
  .upload-zone {
    border: 1px dashed rgba(255,255,255,0.15); border-radius: 2px;
    cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
    height: 140px; display: flex; align-items: center; justify-content: center;
  }
  .upload-zone:hover { border-color: rgba(196,164,96,0.4); background: rgba(196,164,96,0.03); }
  .upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .upload-placeholder { text-align: center; pointer-events: none; }
  .upload-icon { opacity: 0.25; margin-bottom: 8px; }
  .upload-text { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.35); }
  .upload-sub { font-size: 11px; color: rgba(255,255,255,0.18); margin-top: 3px; }
  .upload-preview { width: 100%; height: 100%; object-fit: cover; display: block; }
  .upload-remove {
    position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.65);
    border: none; color: white; width: 22px; height: 22px; border-radius: 50%;
    cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s; z-index: 2;
  }
  .upload-remove:hover { background: rgba(220,60,60,0.8); }

  .form-divider { height: 1px; background: rgba(255,255,255,0.05); }
  .form-actions { display: flex; gap: 10px; }
  .btn-cancel {
    flex: 1; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; background: transparent;
    border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.4);
    padding: 13px; border-radius: 2px; cursor: pointer; transition: all 0.2s;
  }
  .btn-cancel:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }
  .btn-submit {
    flex: 2; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase; background: #c4a460; border: none;
    color: #080809; padding: 13px; border-radius: 2px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-submit:hover { background: #d4b470; transform: translateY(-1px); }
  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .success-banner {
    display: flex; align-items: center; gap: 10px; background: rgba(20,180,100,0.07);
    border: 1px solid rgba(20,180,100,0.2); color: rgba(20,180,100,0.9); font-size: 12px;
    padding: 12px 16px; border-radius: 2px;
  }
  .error-banner {
    display: flex; align-items: center; gap: 10px; background: rgba(220,60,60,0.07);
    border: 1px solid rgba(220,60,60,0.2); color: rgba(220,60,60,0.9); font-size: 12px;
    padding: 12px 16px; border-radius: 2px;
  }
`;

function AddCar() {
  const [car, setCar] = useState({ brand: "", model: "", year: "", price: "" });
  const [image, setImage] = useState(null); // { file, preview }
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setCar({ ...car, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage({ file, preview: URL.createObjectURL(file) });
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.entries(car).forEach(([k, v]) => { if (v) formData.append(k, v); });
      if (image) formData.append("images", image.file);

      const res = await fetch("/api/cars", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed");
      }
      setSuccess(true);
      setTimeout(() => navigate("/admin"), 1200);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="addcar-page">
        <header className="addcar-header">
          <button className="btn-back" onClick={() => navigate("/admin")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <div className="addcar-eyebrow">Admin Panel</div>
            <h1 className="addcar-title">Add Vehicle</h1>
          </div>
        </header>

        <div className="addcar-body">
          <div className="addcar-card">
            <div className="addcar-card-header">
              <div className="addcar-card-eyebrow">Vehicle Details</div>
            </div>
            <form className="addcar-form" onSubmit={handleSubmit}>

              {success && (
                <div className="success-banner">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4.5 7L6.5 9L9.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Vehicle added — redirecting...
                </div>
              )}
              {error && <div className="error-banner">{error}</div>}

              {/* Single Image Upload */}
              <div className="field">
                <label className="field-label">Photo</label>
                <div className="upload-zone">
                  {image ? (
                    <>
                      <img className="upload-preview" src={image.preview} alt="preview" />
                      <button type="button" className="upload-remove" onClick={handleRemoveImage}>✕</button>
                    </>
                  ) : (
                    <>
                      <input type="file" accept="image/*" onChange={handleFile} />
                      <div className="upload-placeholder">
                        <div className="upload-icon">
                          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect x="2" y="6" width="24" height="18" rx="2" stroke="white" strokeWidth="1.2"/>
                            <circle cx="9" cy="12" r="2.5" stroke="white" strokeWidth="1.2"/>
                            <path d="M2 20L8 14L13 19L18 15L26 22" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="upload-text">Click to upload</div>
                        <div className="upload-sub">JPEG, PNG, WEBP</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Brand & Model */}
              <div className="field-group">
                <div className="field">
                  <label className="field-label">Brand</label>
                  <input className="field-input" name="brand" placeholder="e.g. Toyota" value={car.brand} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label className="field-label">Model</label>
                  <input className="field-input" name="model" placeholder="e.g. Camry" value={car.model} onChange={handleChange} required />
                </div>
              </div>

              {/* Year & Price */}
              <div className="field-group">
                <div className="field">
                  <label className="field-label">Year</label>
                  <input className="field-input" name="year" type="number" placeholder="2023" value={car.year} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label className="field-label">Price (EGP)</label>
                  <input className="field-input" name="price" type="number" placeholder="850000" value={car.price} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-divider" />

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => navigate("/admin")}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={loading || success}>
                  {loading ? "Saving..." : "Add to Dashboard"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCar;