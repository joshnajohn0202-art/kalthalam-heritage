import React, { useState } from 'react';

const CheckAvailability = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = () => {
    console.log("Checking availability for:", checkIn, "to", checkOut);
    // Add your logic to filter cottages or navigate to the booking page here
  };

  return (
    <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
      <div style={{ 
        backgroundColor: "#fff", 
        padding: "30px", 
        borderRadius: "15px", 
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "450px"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#2c3e50", textAlign: "center" }}>
          Plan Your Stay
        </h2>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#555" }}>
            Check-in Date
          </label>
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "12px", 
              borderRadius: "8px", 
              border: "1px solid #ddd",
              outline: "none"
            }} 
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#555" }}>
            Check-out Date
          </label>
          <input 
            type="date" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "12px", 
              borderRadius: "8px", 
              border: "1px solid #ddd",
              outline: "none"
            }} 
          />
        </div>

        {/* UPDATED BUTTON STYLE ONLY */}
        <button 
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #2c3e50, #1a252f)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            letterSpacing: "0.5px",
            cursor: "pointer",
            boxShadow: "0 6px 15px rgba(44, 62, 80, 0.35)",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 10px 20px rgba(44, 62, 80, 0.45)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 15px rgba(44, 62, 80, 0.35)";
          }}
        >
          Check Available Cottages
        </button>
      </div>
    </div>
  );
};

export default CheckAvailability;
