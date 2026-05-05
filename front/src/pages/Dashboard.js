import { useEffect, useState } from "react";
import CarCard from "../components/CarCards";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap');

  * { box-sizing: border-box; }

  .dashboard {
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    background: #080809;
    color: #e8e8e8;
  }

  .dash-header {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 32px 48px 24px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: rgba(8,8,9,0.95);
    backdrop-filter: blur(12px);
    z-index: 10;
  }

  .dash-title-block {}
  .dash-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #c4a460;
    margin-bottom: 6px;
  }
  .dash-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1;
    text-transform: uppercase;
  }

  .dash-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .search-wrap {
    position: relative;
  }
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.3;
    pointer-events: none;
  }
  .dash-search {
    font-family: 'Barlow', sans-serif;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: #e8e8e8;
    font-size: 13px;
    font-weight: 400;
    padding: 10px 16px 10px 38px;
    border-radius: 2px;
    width: 260px;
    outline: none;
    transition: border-color 0.2s ease;
    letter-spacing: 0.3px;
  }
  .dash-search::placeholder { color: rgba(255,255,255,0.25); }
  .dash-search:focus {
    border-color: rgba(196,164,96,0.4);
    background: rgba(255,255,255,0.06);
  }

  .dash-select {
    font-family: 'Barlow Condensed', sans-serif;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 16px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s ease;
    appearance: none;
    padding-right: 32px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }
  .dash-select:focus { border-color: rgba(196,164,96,0.4); }
  .dash-select option { background: #1a1a20; color: #e8e8e8; }

  .dash-body {
    padding: 40px 48px;
  }

  .dash-stats {
    display: flex;
    gap: 1px;
    margin-bottom: 40px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    overflow: hidden;
  }
  .stat-block {
    flex: 1;
    background: #0d0d0f;
    padding: 20px 24px;
  }
  .stat-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 6px;
  }
  .stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #c4a460;
  }

  .dash-section-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .dash-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.05);
  }

  .cars-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .empty-state {
    text-align: center;
    padding: 80px 0;
    width: 100%;
  }
  .empty-icon {
    font-size: 48px;
    opacity: 0.15;
    margin-bottom: 16px;
  }
  .empty-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }
`;

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const fetchCars = async (query = "") => {
    const res = await fetch(`/api/cars${query}`);
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => { fetchCars(); }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCars(`?search=${value}`);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    if (value === "price") fetchCars(`?sortBy=price&order=asc`);
    else if (value === "year") fetchCars(`?sortBy=year&order=desc`);
    else fetchCars();
  };

  const avgPrice = cars.length
    ? Math.round(cars.reduce((s, c) => s + Number(c.price), 0) / cars.length).toLocaleString("en-EG")
    : "—";

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        <header className="dash-header">
          <div className="dash-title-block">
            <h1 className="dash-title">Dash Board</h1>
          </div>
          <div className="dash-controls">
            <div className="search-wrap">
              <svg className="search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.2"/>
                <path d="M10 10L13 13" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input
                className="dash-search"
                type="text"
                placeholder="Search brand or model..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <select className="dash-select" onChange={handleSort} value={sort}>
              <option value="">Sort By</option>
              <option value="price">Price — Low to High</option>
              <option value="year">Year — New to Old</option>
            </select>
          </div>
        </header>

        <div className="dash-body">
          <div className="dash-stats">
            <div className="stat-block">
              <div className="stat-label">Total Listings</div>
              <div className="stat-value">{cars.length}</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Avg. Price</div>
              <div className="stat-value">{avgPrice}</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Brands</div>
              <div className="stat-value">{new Set(cars.map(c => c.brand)).size}</div>
            </div>
          </div>

          <div className="dash-section-label">All Vehicles</div>

          <div className="cars-grid">
            {cars.length > 0 ? (
              cars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <div className="empty-state">
                <div className="empty-text">No vehicles found</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;