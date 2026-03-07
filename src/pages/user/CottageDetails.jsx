import { useLocation } from "react-router-dom";

// Standardizing image imports
import cottageImg1 from "../../assets/cottages/c1-1.webp";
import roomImg from "../../assets/cottages/c1-1.webp"; 
import wifiImg from "../../assets/cottages/c1-1.webp"; // Replace with real icons/images later

const CottageDetails = () => {
  const location = useLocation();
  const cottage = location.state?.cottage;

  if (!cottage) {
    return <div style={{ padding: "40px", textAlign: "center" }}>No cottage selected.</div>;
  }

  const sectionStyle = { marginTop: "30px" };
  const flexContainer = { display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "10px" };
  const cardStyle = { 
    textAlign: "center", 
    border: "1px solid #eee", 
    padding: "10px", 
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
        <h1 style={{ margin: 0 }}>{cottage.name}</h1>
        <p style={{ fontSize: "1.2rem", color: "#2c3e50" }}>
          <b>₹{cottage.price}</b> <span style={{fontSize: "0.9rem"}}>per night</span> | <b>{cottage.capacity}</b>
        </p>
      </header>

      {/* Gallery */}
      <div style={sectionStyle}>
        <h3>Gallery</h3>
        <div style={flexContainer}>
          {(cottage.images.length ? cottage.images : [cottageImg1]).map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Cottage"
              style={{ width: "250px", height: "180px", objectFit: "cover", borderRadius: "10px" }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Rooms Section */}
        <div style={sectionStyle}>
          <h3>Rooms & Areas</h3>
          <div style={flexContainer}>
            {cottage.rooms.map((r, i) => (
              <div key={i} style={cardStyle}>
                <img src={roomImg} alt={r} style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                <p style={{ margin: "5px 0 0 0", fontWeight: "500" }}>{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities Section */}
        <div style={sectionStyle}>
          <h3>Facilities</h3>
          <div style={flexContainer}>
            {cottage.facilities.map((f, i) => (
              <div key={i} style={cardStyle}>
                <img src={wifiImg} alt={f} style={{ width: "40px", marginBottom: "5px" }} />
                <p style={{ margin: 0 }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CottageDetails;