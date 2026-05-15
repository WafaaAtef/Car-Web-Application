import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap');

  * { box-sizing: border-box; }

  .car-details {
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    background: #080809;
    color: #e8e8e8;
    padding: 48px;
  }

  .car-details-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
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
  }

  .btn-back:hover {
    border-color: rgba(255,255,255,0.25);
    color: rgba(255,255,255,0.8);
  }

  .car-details-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1;
    text-transform: uppercase;
  }

  .car-details-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  .car-images {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .car-main-image {
    width: 100%;
    height: 400px;
    background: #0d0d0f;
    border-radius: 2px;
    overflow: hidden;
  }

  .car-main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .car-thumbnails {
    display: flex;
    gap: 8px;
  }

  .car-thumbnail {
    width: 80px;
    height: 60px;
    background: #0d0d0f;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .car-thumbnail.active {
    border-color: #c4a460;
  }

  .car-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .car-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .car-brand {
    font-size: 24px;
    font-weight: 600;
    color: #c4a460;
  }

  .car-model {
    font-size: 32px;
    font-weight: 800;
    color: #ffffff;
  }

  .car-specs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .car-spec {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .car-spec-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  .car-spec-value {
    font-size: 18px;
    font-weight: 500;
    color: #e8e8e8;
  }

  .car-price {
    font-size: 28px;
    font-weight: 700;
    color: #c4a460;
  }

  .btn-request {
    background: #c4a460;
    border: none;
    color: #080809;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 12px 24px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-start;
  }

  .btn-request:hover {
    background: #e8d4a0;
  }
`;

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleRequest = async (carId) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/requests',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            carId: carId,
            price: car.price
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Request sent successfully');
        navigate('/');
      } else {
        alert(data.message || data.msg || 'Failed to send request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending request');
    }
  };
  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`http://localhost:5000/api/cars/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCar(data);
      } else {
        navigate("/");
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id, navigate]);


  if (!car) return <div>Loading...</div>;

  const images = car.images || [];

  return (
    <>
      <style>{styles}</style>
      <div className="car-details">
        <header className="car-details-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            ←
          </button>
          <h1 className="car-details-title">Car Details</h1>
        </header>

        <div className="car-details-content">
          <div className="car-images">
            <div className="car-main-image">
              {images.length > 0 && (
                <img
                  src={`http://localhost:5000${images[currentImage]}`}
                  alt={`${car.brand} ${car.model}`}
                />
              )}
            </div>
            <div className="car-thumbnails">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`car-thumbnail ${i === currentImage ? "active" : ""}`}
                  onClick={() => setCurrentImage(i)}
                >
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={`${car.brand} ${car.model} ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="car-info">
            <div>
              <div className="car-brand">{car.brand}</div>
              <div className="car-model">{car.model}</div>
            </div>

            <div className="car-specs">
              <div className="car-spec">
                <span className="car-spec-label">Year</span>
                <span className="car-spec-value">{car.year}</span>
              </div>
              <div className="car-spec">
                <span className="car-spec-label">Price</span>
                <span className="car-spec-value car-price">
                  {Number(car.price).toLocaleString("en-EG")} EGP
                </span>
              </div>
              <div className="car-spec">
                <span className="car-spec-label">Stock</span>
                <span className="car-spec-value">{car.stock ?? 0}</span>
              </div>
            </div>

            <button
              className="btn-request"
              onClick={() => handleRequest(car._id)}
              disabled={car.status === 'sold' || (typeof car.stock === 'number' ? car.stock <= 0 : false)}
            >
              {car.status === 'sold' || (typeof car.stock === 'number' ? car.stock <= 0 : false) ? 'Sold Out' : 'REQUEST'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarDetails;