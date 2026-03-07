import React from "react";
import { useNavigate } from "react-router-dom";

const CottageBooking = () => {
  const navigate = useNavigate();

  return (
    <div style={card}>
      <h3>Traditional Cottage</h3>
      <p>₹3000 / Night</p>

      <button
        style={btn}
        onClick={() => navigate("/user/booking-request")}
      >
        Touch to View
      </button>
    </div>
  );
};

const card = {
  padding: "20px",
  background: "#f3f4f6",
  borderRadius: "12px",
  width: "250px",
  textAlign: "center"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  backgroundColor: "#1e293b",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default CottageBooking;
