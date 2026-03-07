import React from 'react';
import { useNavigate } from 'react-router-dom';

/* SAMPLE IMAGE - Replace with your actual image path or props */
import cottagePlaceholder from "../../assets/cottages/c1-1.webp";

const ViewCottages = () => {
  const navigate = useNavigate();

  const cottages = [
    { 
      id: 1, 
      name: "Deluxe Cottage", 
      price: 4000, 
      capacity: "2 Adults",
      image: cottagePlaceholder,
      description: "A cozy stay with modern amenities and a garden view."
    },
    { 
      id: 2, 
      name: "Premium Villa", 
      price: 10000, 
      capacity: "4 Adults",
      image: cottagePlaceholder,
      description: "Spacious family cottage with a private balcony and breakfast."
    }
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "40px", textAlign: "left" }}>
        <h2 style={{ fontSize: "2rem", color: "#1a252f", marginBottom: "10px" }}>Available Cottages</h2>
        <div style={{ width: "60px", height: "4px", backgroundColor: "#2c3e50", borderRadius: "2px" }}></div>
      </div>
      
      {/* Grid Container */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "30px" 
      }}>
        {cottages.map((cottage) => (
          <div 
            key={cottage.id} 
            className="cottage-card" // You can add hover effects in your CSS file
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease"
            }}
          >
            {/* Cottage Image Area */}
            <div style={{ height: "200px", overflow: "hidden" }}>
              <img 
                src={cottage.image} 
                alt={cottage.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Content Area */}
            <div style={{ padding: "24px", flexGrow: 1 }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50", fontSize: "1.4rem" }}>
                {cottage.name}
              </h3>
              
              <p style={{ color: "#7f8c8d", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.5" }}>
                {cottage.description}
              </p>

              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                paddingTop: "15px",
                borderTop: "1px solid #f0f0f0"
              }}>
                <div>
                  <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>₹{cottage.price}</span>
                  <span style={{ fontSize: "0.85rem", color: "#95a5a6" }}> / night</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "#34495e" }}>
                  👤 {cottage.capacity}
                </div>
              </div>

              <button 
                onClick={() => navigate('/user/cottage-details', { state: { cottage } })}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "background 0.3s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#1a252f"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#2c3e50"}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCottages;
