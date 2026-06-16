import { useEffect, useState } from "react";
import CarCard from "../components/CarCards";
import { useNavigate } from "react-router-dom";

const styles = `

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
  .dash-select option { 
    font-family: 'Barlow Condensed', sans-serif;
    background: #0a0a0b; 
    color: #e8e8e8;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 8px 12px;
  }
  .dash-select option:hover {
    background: #1a1a20;
  }

  .custom-dropdown {
    position: relative;
    width: 160px;
  }
  .custom-dropdown-toggle {
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
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color 0.2s ease;
  }
  .custom-dropdown-toggle:hover,
  .custom-dropdown-toggle.active { 
    border-color: rgba(196,164,96,0.4); 
  }
  .custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #0a0a0b;
    border: 1px solid rgba(196,164,96,0.3);
    border-top: none;
    border-radius: 0 0 2px 2px;
    margin-top: -1px;
    z-index: 1000;
    box-shadow: 0 8px 16px rgba(0,0,0,0.5);
  }
  .custom-dropdown-item {
    font-family: 'Barlow Condensed', sans-serif;
    background: #0a0a0b;
    color: rgba(255,255,255,0.7);
    border: none;
    padding: 10px 16px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .custom-dropdown-item:last-child {
    border-bottom: none;
  }
  .custom-dropdown-item:hover {
    background: rgba(196,164,96,0.1);
    color: #e8e8e8;
    border-color: rgba(196,164,96,0.3);
  }
  .custom-dropdown-item.active {
    background: rgba(196,164,96,0.2);
    color: #c4a460;
    border-left: 3px solid #c4a460;
    padding-left: 13px;
  }

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
    gap: 5px;
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
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch("/api/user", {
      credentials: "include",
    });
    if (res.status === 401) {
      setUser(null);
    }
    else {
      const data = await res.json();
      setUser(data);
    }

  };

  const fetchCars = async (query = "") => {
    try {
      const res = await fetch(`/api/cars${query}`);
      if (!res.ok) {
        console.error("Failed to fetch cars:", res.status);
        setCars([]);
        return;
      }
      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && e.target.closest(".custom-dropdown") === null) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCars(`?search=${value}`);
  };

  const handleSort = (value) => {
    setSort(value);
    setDropdownOpen(false);
    if (value === "price") fetchCars(`?sortBy=price&order=asc`);
    else if (value === "year") fetchCars(`?sortBy=year&order=desc`);
    else fetchCars();
  };

  const handleView = (car) => {
    navigate(`/cars/${car._id}`);
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
                <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.2" />
                <path d="M10 10L13 13" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                className="dash-search"
                type="text"
                placeholder="Search brand or model..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="custom-dropdown">
              <button 
                className={`custom-dropdown-toggle ${dropdownOpen ? "active" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{sort === "price" ? "Price — Low to High" : sort === "year" ? "Year — New to Old" : "Sort By"}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="custom-dropdown-menu">
                  <button className={`custom-dropdown-item ${sort === "" ? "active" : ""}`} onClick={() => handleSort("")}>Sort By</button>
                  <button className={`custom-dropdown-item ${sort === "price" ? "active" : ""}`} onClick={() => handleSort("price")}>Price — Low to High</button>
                  <button className={`custom-dropdown-item ${sort === "year" ? "active" : ""}`} onClick={() => handleSort("year")}>Year — New to Old</button>
                </div>
              )}
              
            </div>

{!user && (
  <button
    onClick={() => navigate("/login")}
    style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "#ffffff",
      padding: "8px 14px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "11px",
      borderRadius: "2px",
    }}
  >
    Sign In
  </button>
)}


{user && (
  <button
    onClick={() => navigate("/profile")}
    style={{
      background: "rgba(196,164,96,0.2)",
      border: "1px solid rgba(196,164,96,0.5)",
      color: "#c4a460",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "600",
      letterSpacing: "1px",
      textTransform: "uppercase",
      fontSize: "11px",
      borderRadius: "2px",
    }}
  >
    Profile
  </button>
)}
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
              cars.map((car) => <CarCard key={car._id} car={car} onView={handleView} />)
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
