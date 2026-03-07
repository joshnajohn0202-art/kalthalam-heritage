import { Link, useParams } from "react-router-dom";
import { touristPlaces } from "./NearbySpots";

export default function NearbySpotDetails() {
  const { id } = useParams();
  const place = touristPlaces.find((item) => String(item.id) === String(id));

  if (!place) {
    return (
      <div style={page}>
        <div style={topRow}>
          <div>
            <h1 style={title}>Place Not Found</h1>
            <p style={subtitle}>Please go back and select a valid place.</p>
          </div>
          <Link to="/user/nearby" style={backBtn}>
            Back to Nearby Places
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <div style={topRow}>
        <div>
          <h1 style={title}>{place.name}</h1>
          <p style={subtitle}>{place.distance}</p>
        </div>
        <Link to="/user/nearby" style={backBtn}>
          Back to Nearby Places
        </Link>
      </div>

      <div style={hero}>
        <img src={place.image} alt={place.name} style={heroImg} />
      </div>

      <div style={infoCard}>
        <p style={desc}>{place.description}</p>
        <div style={metaRow}>
          <span style={priceBadge}>Rs. {place.price}</span>
        </div>
      </div>
    </div>
  );
}

const page = {
  padding: "24px",
};

const topRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
  marginBottom: "18px",
};

const title = {
  margin: 0,
  fontSize: "30px",
};

const subtitle = {
  marginTop: "6px",
  color: "#475569",
};

const backBtn = {
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5f5",
  background: "#eef2ff",
  color: "#1e3a8a",
  fontWeight: "bold",
};

const hero = {
  width: "100%",
  background: "#0f172a",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 16px 36px rgba(15, 23, 42, 0.25)",
};

const heroImg = {
  width: "100%",
  height: "420px",
  objectFit: "cover",
  display: "block",
};

const infoCard = {
  marginTop: "18px",
  background: "#ffffff",
  borderRadius: "14px",
  padding: "16px 18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const desc = {
  margin: 0,
  color: "#334155",
  lineHeight: 1.6,
  fontSize: "15px",
};

const metaRow = {
  marginTop: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const priceBadge = {
  padding: "6px 10px",
  borderRadius: "999px",
  background: "#dcfce7",
  color: "#14532d",
  fontWeight: "bold",
  fontSize: "13px",
};
