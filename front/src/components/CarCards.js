import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap');

  .car-card {
    font-family: 'Barlow', sans-serif;
    background: #0d0d0f;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 2px;
    width: 300px;
    overflow: hidden;
    transition: transform 0.3s ease, border-color 0.3s ease;
    position: relative;
  }
  .car-card:hover { transform: translateY(-4px); border-color: rgba(196,164,96,0.4); }

  /* Image area */
  .car-image-area {
    height: 180px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a20 0%, #111115 100%);
  }
  .car-image-area img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.4s ease;
  }
  .car-card:hover .car-image-area img { transform: scale(1.04); }

  /* No image placeholder */
  .car-no-image {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
  }
  .car-no-image svg { opacity: 0.12; }

  /* Image nav dots */
  .img-dots {
    position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 5px;
  }
  .img-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.4); cursor: pointer; transition: background 0.2s;
    border: none; padding: 0;
  }
  .img-dot.active { background: #c4a460; }

  /* Image nav arrows */
  .img-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(0,0,0,0.5); border: none; color: white;
    width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
  }
  .car-image-area:hover .img-arrow { opacity: 1; }
  .img-arrow.left { left: 8px; }
  .img-arrow.right { right: 8px; }

  .car-badge {
    position: absolute; top: 12px; right: 12px;
    background: rgba(196,164,96,0.15); border: 1px solid rgba(196,164,96,0.3);
    color: #c4a460; font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 2px;
  }
  .car-badge.sold { background: rgba(220,60,60,0.15); border-color: rgba(220,60,60,0.3); color: rgba(220,60,60,0.9); }

  .car-card-body { padding: 20px; }
  .car-brand { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; color: #fff; letter-spacing: 1px; text-transform: uppercase; line-height: 1; }
  .car-model { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.45); letter-spacing: 3px; text-transform: uppercase; margin-top: 2px; }
  .car-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 16px 0; }

  .car-specs { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .car-spec { display: flex; flex-direction: column; gap: 3px; }
  .car-spec-label { font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.3); }
  .car-spec-value { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 600; color: #e8e8e8; }
  .car-price-value { color: #c4a460; }

  .car-meta { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  .car-tag {
    font-size: 10px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
    color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07); padding: 3px 8px; border-radius: 2px;
  }

  .car-admin-actions { display: flex; gap: 8px; margin-top: 16px; }
  .btn-edit {
    flex: 1; background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7); font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    padding: 9px 0; border-radius: 2px; cursor: pointer; transition: all 0.2s;
  }
  .btn-edit:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.3); color: #fff; }
  .btn-delete {
    flex: 1; background: transparent; border: 1px solid rgba(220,60,60,0.25);
    color: rgba(220,60,60,0.7); font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    padding: 9px 0; border-radius: 2px; cursor: pointer; transition: all 0.2s;
  }
  .btn-delete:hover { background: rgba(220,60,60,0.1); border-color: rgba(220,60,60,0.5); color: rgb(220,60,60); }
`;

function CarCard({ car, isAdmin, onDelete, onEdit }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = car.images || [];

  const formatPrice = (p) => Number(p).toLocaleString("en-EG");

  const prev = (e) => {
    e.stopPropagation();
    setImgIndex(i => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setImgIndex(i => (i + 1) % images.length);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="car-card">
        {/* Image */}
        <div className="car-image-area">
          {images.length > 0 ? (
            <>
              <img
                src={`http://localhost:5000${images[imgIndex]}`}
                alt={`${car.brand} ${car.model}`}
              />
              {images.length > 1 && (
                <>
                  <button className="img-arrow left" onClick={prev}>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M6 2L2 6L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className="img-arrow right" onClick={next}>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M2 2L6 6L2 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <div className="img-dots">
                    {images.map((_, i) => (
                      <button key={i} className={`img-dot ${i === imgIndex ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setImgIndex(i); }} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="car-no-image">
              <svg width="100" height="50" viewBox="0 0 120 55" fill="none">
                <path d="M10 35 L25 20 L45 15 L75 15 L95 20 L110 35 L115 40 L5 40 Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="28" cy="41" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="92" cy="41" r="7" stroke="white" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          )}
          <div className={`car-badge ${car.status === "sold" ? "sold" : ""}`}>
            {car.status === "sold" ? "Sold" : "Available"}
          </div>
        </div>

        {/* Body */}
        <div className="car-card-body">
          <div className="car-brand">{car.brand}</div>
          <div className="car-model">{car.model}</div>
          <div className="car-divider" />
          <div className="car-specs">
            <div className="car-spec">
              <span className="car-spec-label">Year</span>
              <span className="car-spec-value">{car.year}</span>
            </div>
            <div className="car-spec" style={{ textAlign: "right" }}>
              <span className="car-spec-label">Price</span>
              <span className="car-spec-value car-price-value">
                {formatPrice(car.price)} <span style={{ fontSize: 11, fontWeight: 400 }}>EGP</span>
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="car-meta">
            {car.fuelType && <span className="car-tag">{car.fuelType}</span>}
            {car.transmission && <span className="car-tag">{car.transmission}</span>}
            {car.condition && <span className="car-tag">{car.condition}</span>}
            {car.color && <span className="car-tag">{car.color}</span>}
          </div>

          {isAdmin && (
            <div className="car-admin-actions">
              <button className="btn-edit" onClick={() => onEdit(car)}>Edit</button>
              <button className="btn-delete" onClick={() => onDelete(car._id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CarCard;