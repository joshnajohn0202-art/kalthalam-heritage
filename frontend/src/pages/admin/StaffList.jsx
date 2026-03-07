import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffList() {
  const navigate = useNavigate();

  // ✅ Hardcoded staff data
  const [staff, setStaff] = useState([
    {
      _id: "1",
      name: "Alice Johnson",
      role: "Reception",
      email: "alice@example.com",
      phone: "9876543210",
    },
    {
      _id: "2",
      name: "Bob Smith",
      role: "Housekeeping",
      email: "bob@example.com",
      phone: "9123456780",
    },
    {
      _id: "3",
      name: "Charlie Brown",
      role: "Cleaning",
      email: "charlie@example.com",
      phone: "9988776655",
    },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#2c3e50" }}>Kalthalam Staff List</h2>
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#6b7280",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ← Back
          </button>

          <button 
            onClick={() => navigate("/admin/add-staff")}
            style={{ 
              backgroundColor: "#2563eb", 
              color: "white", 
              padding: "10px 20px", 
              border: "none", 
              borderRadius: "6px", 
              cursor: "pointer", 
              fontWeight: "bold" 
            }}
          >
            + Add Staff
          </button>
        </div>
      </div>

      <table width="100%" border="1" style={{ borderCollapse: "collapse", borderColor: "#e5e7eb" }}>
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr style={{ textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {staff.length > 0 ? (
            staff.map((s) => (
              <tr key={s._id}>
                <td style={{ padding: "10px" }}>{s.name}</td>
                <td>{s.role}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No Staff Found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
