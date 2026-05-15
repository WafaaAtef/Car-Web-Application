import { useEffect, useState, useCallback } from "react";
import CarCard from "../components/CarCards";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap');

  * { box-sizing: border-box; }

  .admin-dash {
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    background: #080809;
    color: #e8e8e8;
  }

  .admin-header {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 32px 48px 24px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: rgba(8,8,9,0.97);
    backdrop-filter: blur(12px);
    z-index: 10;
  }

  .admin-title-block {}
  .admin-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(220,60,60,0.7);
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .admin-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(220,60,60,0.7);
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .admin-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1;
    text-transform: uppercase;
  }

  .btn-add {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    background: #c4a460;
    color: #080809;
    border: none;
    padding: 12px 28px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .btn-add:hover {
    background: #d4b470;
    transform: translateY(-1px);
  }
  .btn-add:active { transform: translateY(0); }

  .admin-body {
    padding: 40px 48px;
  }

  .admin-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    margin-bottom: 40px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    overflow: hidden;
  }
  .admin-stat {
    background: #0d0d0f;
    padding: 20px 24px;
    position: relative;
  }
  .admin-stat-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 6px;
  }
  .admin-stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #c4a460;
  }

  .section-label {
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
  .section-label::after {
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
  .empty-icon { opacity: 0.15; margin-bottom: 16px; font-size: 48px; }
  .empty-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }
  .empty-sub {
    margin-top: 12px;
    font-size: 13px;
    color: rgba(255,255,255,0.15);
  }
  .btn-empty-add {
    margin-top: 24px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: transparent;
    color: #c4a460;
    border: 1px solid rgba(196,164,96,0.3);
    padding: 10px 24px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-block;
  }
  .btn-empty-add:hover { background: rgba(196,164,96,0.07); }
`;

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchCars = useCallback(async () => {
    const res = await fetch("/api/cars");
    const data = await res.json();
    setCars(data);
  }, []);

  const fetchUser = useCallback(async () => {
    const res = await fetch("/api/user", {
      credentials: "include",
    });
    if (res.status === 401) {
      navigate("/");
      return;
    }
    const data = await res.json();
    if (data.role !== 'admin') {
      navigate("/");
      return;
    }
  }, [navigate]);

  const fetchRequests = useCallback(async () => {
    const res = await fetch("/api/requests", { credentials: 'include' });
    if (!res.ok) return;
    const data = await res.json();
    setRequests(data.requests || []);
  }, []);

  useEffect(() => {
    fetchUser();
    fetchCars();
    fetchRequests();
  }, [fetchUser, fetchCars, fetchRequests]);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this vehicle from the showroom?")) return;
    await fetch(`/api/cars/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchCars();
  };

  const handleEdit = (car) => {
    navigate(`/edit/${car._id}`, { state: car });
  };

  const handleApprove = async (requestId) => {
    const res = await fetch(`/api/requests/${requestId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' })
    });
    if (res.ok) {
      fetchRequests();
      fetchCars();
    }
  };

  const handleCancel = async (requestId) => {
    const res = await fetch(`/api/requests/${requestId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' })
    });
    if (res.ok) {
      fetchRequests();
      fetchCars();
    }
  };

  const avgPrice = cars.length
    ? Math.round(cars.reduce((s, c) => s + Number(c.price), 0) / cars.length).toLocaleString("en-EG")
    : "—";
  const newestYear = cars.length ? Math.max(...cars.map(c => Number(c.year))) : "—";

  return (
    <>
      <style>{styles}</style>
      <div className="admin-dash">
        <header className="admin-header">
          <div className="admin-title-block">
            <h1 className="admin-title">Admin Control Panel
            </h1>
          </div>
          <button className="btn-add" onClick={() => navigate("/add")}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Add Vehicle
          </button>
        </header>

        <div className="admin-body">
          <div className="admin-stats">
            <div className="admin-stat">
              <div className="admin-stat-label">Total Vehicles</div>
              <div className="admin-stat-value">{cars.length}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Avg. Price (EGP)</div>
              <div className="admin-stat-value">{avgPrice}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Brands</div>
              <div className="admin-stat-value">{new Set(cars.map(c => c.brand)).size}</div>
            </div>
            <div className="admin-stat">
              <div className="admin-stat-label">Newest Year</div>
              <div className="admin-stat-value">{newestYear}</div>
            </div>
          </div>

          <div className="section-label">All Vehicles</div>

          <div className="cars-grid">
            {cars.length > 0 ? (
              cars.map(car => (
                <CarCard
                  key={car._id}
                  car={car}
                  isAdmin={true}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-text">No vehicles yet</div>
                <button className="btn-empty-add" onClick={() => navigate("/add")}>
                  + Add First Vehicle
                </button>
              </div>
            )}
          </div>

          <div className="section-label" style={{ marginTop: '40px' }}>Requests for Approval</div>
          <div className="cars-grid" style={{ gap: '18px' }}>
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request._id} style={{ background: '#0d0d0f', padding: '20px', borderRadius: '4px', minWidth: '280px', flex: '1 1 320px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '14px', color: '#c4a460', fontWeight: 700 }}>#{request._id.slice(-6)}</div>
                    <div style={{ fontSize: '12px', color: request.status === 'confirmed' ? '#6fcf97' : request.status === 'cancelled' ? '#eb5757' : '#ffd166', fontWeight: 700 }}>
                      {request.status.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px', color: '#fff', fontWeight: 700 }}>{request.car?.brand} {request.car?.model}</div>
                  <div style={{ fontSize: '12px', color: '#ddd', marginBottom: '4px' }}>Buyer: {request.buyer?.firstname || 'Unknown'} {request.buyer?.lastname || ''}</div>
                  <div style={{ fontSize: '12px', color: '#ddd', marginBottom: '4px' }}>Price: {Number(request.price).toLocaleString('en-EG')} EGP</div>
                  <div style={{ fontSize: '11px', color: '#999', marginBottom: '12px' }}>Requested on: {new Date(request.createdAt).toLocaleDateString()}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {request.status === 'pending' ? (
                      <>
                        <button onClick={() => handleApprove(request._id)} style={{ flex: '1', padding: '10px 12px', background: '#6fcf97', border: 'none', color: '#080809', borderRadius: '2px', cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => handleCancel(request._id)} style={{ flex: '1', padding: '10px 12px', background: '#eb5757', border: 'none', color: '#fff', borderRadius: '2px', cursor: 'pointer' }}>Cancel</button>
                      </>
                    ) : (
                      <div style={{ width: '100%', padding: '10px 12px', background: '#141414', borderRadius: '2px', color: '#aaa' }}>No actions available</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state" style={{ width: '100%', padding: '40px' }}>
                <div className="empty-text">No requests yet</div>
                <div className="empty-sub">Users will see their pending requests here once submitted.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
