import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ===== IMAGES ===== */
import c11 from "../../assets/cottages/c1-1.webp";
import c12 from "../../assets/cottages/c1-1.webp";
import c21 from "../../assets/cottages/c1-1.webp";
import c22 from "../../assets/cottages/c1-1.webp";
import resortHero from "../../assets/cottages/chatgpt-hero.png";

/* ===== COTTAGE DATA ===== */
const cottages = [
  {
    id: 1,
    name: "Deluxe Cottage",
    price: 5000,
    rooms: "2 Bedrooms, Dormetry", 
    images: [c11],
    facilities: ["WiFi", "Hot Water", "Parking", "Balcony"],
  },
  {
    id: 2,
    name: "Premium Villa",
    price: 10000,
    rooms: "3 Bedrooms, Dormetry",
    images: [c21],
    facilities: ["AC", "Swimming Pool", "Room Service", "TV"],
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [selectedCottage, setSelectedCottage] = useState(null);

  return (
    <div style={page}>
      {/* HEADER */}
      <h1 style={title}>Welcome to Kalthalam Heritage</h1>
      <p style={subtitle}>Experience nature with comfort</p>

      {/* RESORT HERO */}
      <div style={heroWrap}>
        <img src={resortHero} alt="Kalthalam Heritage Resort" style={heroImg} />
        <div style={heroOverlay}>
          <h2 style={heroTitle}>Explore the Resort</h2>
          <p style={heroText}>
            Find the best nearby spots to visit during your stay.
          </p>
          <button
            style={heroBtn}
            onClick={() => navigate("/user/nearby")}
          >
            Explore Nearby Places
          </button>
        </div>
      </div>

      {/* COTTAGE CARDS */}
      <div style={grid}>
        {cottages.map((cottage) => (
          <div
            key={cottage.id}
            style={card}
            onClick={() => navigate("/user/cottage")}
          >
            <img
              src={cottage.images[0]}
              alt={cottage.name}
              style={cardImg}
            />
            <div style={cardBody}>
              <h3>{cottage.name}</h3>
              <p>₹{cottage.price} / Night</p>
              <button type="button" style={touchText} onClick={(event) => { event.stopPropagation(); navigate("/user/cottage"); }}>Touch to View</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedCottage && (
        <div style={overlay}>
          <div style={modal}>
            <button
              style={closeBtn}
              onClick={() => setSelectedCottage(null)}
            >
              ✖
            </button>

            <h2>{selectedCottage.name}</h2>
            <p>
              <b>Price:</b> ₹{selectedCottage.price} / Night
            </p>
            <p>
              <b>Rooms:</b> {selectedCottage.rooms}
            </p>

            {/* MODAL IMAGES */}
            <div style={imgGrid}>
              {selectedCottage.images.map((img, i) => (
                <img key={i} src={img} alt="" style={modalImg} />
              ))}
            </div>

            {/* FACILITIES */}
            <h4>Facilities</h4>
            <ul>
              {selectedCottage.facilities.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            <button style={bookBtn}>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "20px",
};

const title = {
  fontSize: "32px",
  marginBottom: "5px",
};

const subtitle = {
  marginBottom: "25px",
  color: "#475569",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};

const card = {
  background: "#ffffff",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
  overflow: "hidden",
};

const cardImg = {
  width: "100%",
  height: "260px",
  objectFit: "contain",      // ✅ FULL IMAGE
  backgroundColor: "#000",   // optional (black background)
};


const cardBody = {
  padding: "14px",
};

const touchText = {
  background: "none",
  border: "none",
  padding: 0,
  color: "#166534",
  fontWeight: "bold",
  cursor: "pointer",
  textDecoration: "underline",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: "22px",
  width: "92%",
  maxWidth: "620px",
  borderRadius: "12px",
  position: "relative",
  maxHeight: "90vh",
  overflowY: "auto",
};

const closeBtn = {
  position: "absolute",
  top: "12px",
  right: "16px",
  border: "none",
  background: "transparent",
  fontSize: "18px",
  cursor: "pointer",
};

const imgGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  marginBottom: "12px",
};

const modalImg = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
};

const bookBtn = {
  width: "100%",
  padding: "12px",
  background: "#166534",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  marginTop: "12px",
  cursor: "pointer",
};

const heroWrap = {
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  width: "88%",
  margin: "0 auto 26px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
};

const heroImg = {
  width: "100%",
  height: "320px",
  objectFit: "contain",
  display: "block",
  backgroundColor: "#000",
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.15))",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "24px",
  gap: "8px",
};

const heroTitle = {
  margin: 0,
  fontSize: "28px",
};

const heroText = {
  margin: 0,
  maxWidth: "520px",
  opacity: 0.95,
};

const heroBtn = {
  alignSelf: "center",
  marginTop: "10px",
  padding: "10px 16px",
  background: "#facc15",
  color: "#1f2937",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

