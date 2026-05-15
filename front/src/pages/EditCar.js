import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap');

  * { box-sizing: border-box; }

  .editcar-page {
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    background: #080809;
    color: #e8e8e8;
    display: flex;
    flex-direction: column;
  }

  .editcar-header {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 28px 48px;
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(8,8,9,0.97);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .btn-back {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    width: 36px;
    height: 36px;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .btn-back:hover {
    border-color: rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.8);
  }

  .editcar-title-block {}
  .editcar-eyebrow {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #c4a460;
    margin-bottom: 2px;
  }
  .editcar-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    line-height: 1;
  }
  .editcar-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.3);
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  .editcar-body {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 60px 24px;
  }

  .editcar-card {
    width: 100%;
    max-width: 520px;
    background: #0d0d0f;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 2px;
  }

  .editcar-card-header {
    padding: 20px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .editcar-card-eyebrow {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .editcar-id-badge {
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    font-family: 'Barlow Condensed', sans-serif;
    letter-spacing: 1px;
  }

  .editcar-form {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .field-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .field-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }
  .field-input {
    font-family: 'Barlow', sans-serif;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: #e8e8e8;
    font-size: 14px;
    font-weight: 400;
    padding: 11px 14px;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
    width: 100%;
  }
  .field-input::placeholder { color: rgba(255,255,255,0.2); }
  .field-input:focus {
    border-color: rgba(196,164,96,0.5);
    background: rgba(255,255,255,0.05);
  }

  .changed-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #c4a460;
    margin-left: 6px;
    vertical-align: middle;
  }

  .form-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 16px 0 20px;
  }

  .changes-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: rgba(196,164,96,0.6);
    letter-spacing: 0.5px;
    margin-bottom: 16px;
  }

  .form-actions {
    display: flex;
    gap: 10px;
  }

  .btn-cancel {
    flex: 1;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.4);
    padding: 13px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-cancel:hover {
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.7);
  }

  .btn-submit {
    flex: 2;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: #c4a460;
    border: none;
    color: #080809;
    padding: 13px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-submit:hover {
    background: #d4b470;
    transform: translateY(-1px);
  }
  .btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .success-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(20,180,100,0.07);
    border: 1px solid rgba(20,180,100,0.2);
    color: rgba(20,180,100,0.9);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 12px 16px;
    border-radius: 2px;
    margin-bottom: 16px;
  }
  .error-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(220,60,60,0.07);
    border: 1px solid rgba(220,60,60,0.2);
    color: rgba(220,60,60,0.9);
    font-size: 12px;
    font-weight: 500;
    padding: 12px 16px;
    border-radius: 2px;
    margin-bottom: 16px;
  }
`;

function EditCar() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState(state);
  const [original] = useState(state);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const hasChanges = JSON.stringify(car) !== JSON.stringify(original);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;
    setLoading(true);
    setError("");
    try {
      await fetch(`/api/cars/${car._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(car),
      });
      setSuccess(true);
      setTimeout(() => navigate("/admin"), 1200);
    } catch (err) {
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isChanged = (field) => car[field] !== original[field];

  return (
    <>
      <style>{styles}</style>
      <div className="editcar-page">
        <header className="editcar-header">
          <button className="btn-back" onClick={() => navigate("/admin")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="editcar-title-block">
            <div className="editcar-eyebrow">Admin Panel</div>
            <h1 className="editcar-title">Edit Vehicle</h1>
            <div className="editcar-subtitle">{original.brand} {original.model} — {original.year}</div>
          </div>
        </header>

        <div className="editcar-body">
          <div className="editcar-card">
            <div className="editcar-card-header">
              <div className="editcar-card-eyebrow">Update Details</div>
              {car._id && (
                <span className="editcar-id-badge">ID: ...{String(car._id).slice(-6)}</span>
              )}
            </div>

            <form className="editcar-form" onSubmit={handleSubmit}>
              {success && (
                <div className="success-banner">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4.5 7L6.5 9L9.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Vehicle updated successfully — redirecting...
                </div>
              )}
              {error && <div className="error-banner">{error}</div>}

              <div className="field-group">
                <div className="field">
                  <label className="field-label">
                    Brand {isChanged("brand") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="brand"
                    value={car.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label className="field-label">
                    Model {isChanged("model") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="model"
                    value={car.model}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label className="field-label">
                    Year {isChanged("year") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="year"
                    type="number"
                    min="1990"
                    max="2030"
                    value={car.year}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label className="field-label">
                    Price (EGP) {isChanged("price") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="price"
                    type="number"
                    min="0"
                    value={car.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label className="field-label">
                    Stock {isChanged("stock") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="stock"
                    type="number"
                    min="0"
                    value={car.stock || 0}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label className="field-label">
                    Mileage (km) {isChanged("mileage") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="mileage"
                    type="number"
                    min="0"
                    placeholder="e.g. 45000"
                    value={car.mileage || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label className="field-label">
                    Color {isChanged("color") && <span className="changed-dot" />}
                  </label>
                  <input
                    className="field-input"
                    name="color"
                    placeholder="e.g. Midnight Black"
                    value={car.color || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-divider" />

              {hasChanges && (
                <div className="changes-notice">
                  <span className="changed-dot" />
                  You have unsaved changes
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => navigate("/admin")}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || success || !hasChanges}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCar;