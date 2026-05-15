import { useEffect, useState } from "react";

const Registration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [myRequests, setMyRequests] = useState([]);

  const fetchMyHagz = async () => {
    try {
      const response = await fetch("/api/requests/my", {
        credentials: 'include'
      });
      if (!response.ok) return;
      const data = await response.json();
      setMyRequests(data.requests || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    }
  };

  useEffect(() => {
    fetchMyHagz();
  }, []);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '500px', zIndex: 1000 }}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ cursor: 'pointer', fontSize: '30px', background: 'rgb(255, 177, 9)', padding: '10px', borderRadius: '10%' }}
      >
        🛒 <span style={{ fontSize: '15px', color: 'black' }}>{myRequests.length}</span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute', top: '220px', right: '200px', width: '580px', height:'580px', textAlign:'center',
          background: '#0d0d0f', border: '1px solid rgb(255, 177, 9)', padding: '15px', color: 'white'
        }}>
          <h3 style={{ color: '#c4a460', paddingTop:'35%' }}>Registered Cars</h3>
          
          {myRequests.length === 0 ? (
            <p>No registered cars yet</p>
          ) : (
            myRequests.map((item, index) => (
              <div key={item._id || index} style={{ borderBottom: '1px solid #222', padding: '14px 0', textAlign: 'left' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  {item.car?.brand} {item.car?.model}
                </div>
                <div style={{ color: '#c4a460', fontSize: '12px', marginBottom: 4 }}>
                  {Number(item.price).toLocaleString('en-EG')} EGP
                </div>
                <div style={{ fontSize: '12px', color: '#ddd' }}>
                  Status: <span style={{ color: item.status === 'confirmed' ? '#6fcf97' : item.status === 'cancelled' ? '#eb5757' : '#ffd166' }}>{item.status?.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: 4 }}>
                  Requested on: {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
          
          <button onClick={() => setIsOpen(false)} style={{ marginTop: '10px', background: 'rgb(255, 177, 9)', borderRadius: '15%', cursor: 'pointer' }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Registration;