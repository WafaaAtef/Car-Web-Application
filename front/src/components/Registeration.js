import { useEffect, useState } from "react";

const Registration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [myRequests, setMyRequests] = useState([]);

  const fetchMyHagz = async () => {
    try {
      const response = await fetch("/api/requests/my", {
        credentials: "include",
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
    <>
      <div style={styles.wrapper}>
        <button
          onClick={() => setIsOpen(true)}
          style={styles.cartButton}
        >
          🛒
          <span style={styles.cartCount}>
            {myRequests.length}
          </span>
        </button>
      </div>

      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.popup}>

            {/* HEADER */}
            <div style={styles.header}>
              <h2 style={styles.title}>
                Registered Cars
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                style={styles.closeIcon}
              >
                ✕
              </button>
            </div>

            {myRequests.length === 0 ? (
              <div style={styles.empty}>
                No registered cars yet
              </div>
            ) : (
              <div style={styles.carsContainer}>

                {myRequests.map((item, index) => (
                  <div
                    key={item._id || index}
                    style={styles.card}
                  >
                    {/* --- ADDED CAR IMAGE ELEMENT HERE --- */}
                    {item.car?.images && item.car.images.length > 0 ? (
                      <img
                        src={item.car.images[0]}
                        alt={`${item.car?.brand} ${item.car?.model}`}
                        style={styles.image}
                      />
                    ) : (
                      /* Fallback placeholder if the car has no image arrays */
                      <div style={{ ...styles.image, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                        No Image
                      </div>
                    )}

                    <div style={styles.info}>

                      <div style={styles.carName}>
                        {item.car?.brand} {item.car?.model}
                      </div>

                      <div style={styles.price}>
                        {Number(item.price).toLocaleString("en-EG")} EGP
                      </div>

                      <div style={styles.status}>
                        Status:
                        <span
                          style={{
                            marginLeft: "6px",
                            color:
                              item.status === "confirmed"
                                ? "#6fcf97"
                                : item.status === "cancelled"
                                  ? "#eb5757"
                                  : "#ffd166",
                          }}
                        >
                          {item.status?.toUpperCase()}
                        </span>
                      </div>

                      <div style={styles.date}>
                        Requested on{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}

            <div style={styles.footer}>
              <button
                onClick={() => setIsOpen(false)}
                style={styles.closeBtn}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

const styles = {
wrapper: {
  position: "fixed",
  top: "30px",
  right: "590px",
  zIndex: 1000,
},

  cartButton: {
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    border: "1px solid rgba(201,168,76,0.4)",
    background: "transparent",
    color: "#C9A84C",
    fontSize: "24px",
    cursor: "pointer",
    position: "relative",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cartCount: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#C9A84C",
    color: "black",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "bold",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  popup: {
    width: "850px",
    maxHeight: "85vh",
    background: "#0B0B0B",
    borderRadius: "20px",
    border: "1px solid rgba(201,168,76,0.2)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
  },

  header: {
    padding: "24px 30px",
    borderBottom: "1px solid rgba(201,168,76,0.1)",
    background: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    margin: 0,
    color: "#C9A84C",
    fontSize: "28px",
    letterSpacing: "2px",
  },

  closeIcon: {
    background: "transparent",
    border: "none",
    color: "#C9A84C",
    fontSize: "24px",
    cursor: "pointer",
  },

  carsContainer: {
    padding: "25px",
    overflowY: "auto",
  },

  card: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    marginBottom: "20px",
    background: "#111",
    borderRadius: "16px",
    border: "1px solid rgba(201,168,76,0.12)",
  },

  image: {
    width: "180px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid rgba(201,168,76,0.15)",
  },

  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  carName: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "10px",
  },

  price: {
    fontSize: "18px",
    color: "#C9A84C",
    marginBottom: "10px",
  },

  status: {
    color: "#ddd",
    marginBottom: "8px",
    fontSize: "14px",
  },

  date: {
    color: "#888",
    fontSize: "13px",
  },

  footer: {
    padding: "20px 30px",
    borderTop: "1px solid rgba(201,168,76,0.1)",
    background: "#111",
    display: "flex",
    justifyContent: "flex-end",
  },

  closeBtn: {
    padding: "12px 26px",
    border: "none",
    borderRadius: "10px",
    background: "#C9A84C",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },

  empty: {
    padding: "60px",
    textAlign: "center",
    color: "#999",
    fontSize: "18px",
  },
};

export default Registration;