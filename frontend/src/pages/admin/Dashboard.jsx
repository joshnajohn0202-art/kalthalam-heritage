import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCottages: 5,
    totalBookings: 4,
    completedBookings: 3,
    cancelledBookings: 1,
    pendingBookings: 1,
    todayBookings: 1,
    activeWorkers: 15,
    inactiveWorkers: 4,
    pendingApprovals: 5, // ✅ Added for Live Project
    todayRevenue: 55000,
    totalComplaints: 5,
    resolvedComplaints: 3,
  });

  // ✅ Added manual activity data for the table
  const [activities] = useState([
    { id: 1, name: "Alice Joy", action: "Updated Profile", time: "2 mins ago", status: "Verified" },
    { id: 2, name: "John Doe", action: "Marked Maintenance", time: "15 mins ago", status: "Pending" },
    { id: 3, name: "Suresh K.", action: "Logged In", time: "1 hour ago", status: "Online" },
  ]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      if (res.data) {
        setStats((prev) => ({ ...prev, ...res.data }));
      }
    } catch (error) {
      console.error("API Error - Using manual state values", error);
    }
  };

  return (
    <div className="admin-page" style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
        Admin Dashboard
      </h2>

      <div className="card-grid" style={gridStyle}>
        {/* Existing Booking Cards */}
        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/bookings")}>
          <span style={titleStyle}>Completed Bookings</span>
          <strong style={valueStyle}>{stats.completedBookings}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/bookings")}>
          <span style={titleStyle}>Cancelled Bookings</span>
          <strong style={valueStyle}>{stats.cancelledBookings}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/bookings")}>
          <span style={titleStyle}>Pending Bookings</span>
          <strong style={valueStyle}>{stats.pendingBookings}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/staff")}>
          <span style={titleStyle}>Active Workers</span>
          <strong style={valueStyle}>{stats.activeWorkers}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/staff")}>
          <span style={titleStyle}>Inactive Workers</span>
          <strong style={valueStyle}>{stats.inactiveWorkers}</strong>
        </div>

        {/* ✅ New: Pending Approvals Card */}
        <div className="admin-card" style={{...cardStyle, borderLeft: "5px solid #f59e0b"}} onClick={() => navigate("/admin/manage-staff")}>
          <span style={titleStyle}>Pending Approvals</span>
          <strong style={{...valueStyle, color: "#f59e0b"}}>{stats.pendingApprovals}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/bookings")}>
          <span style={titleStyle}>Today’s Bookings</span>
          <strong style={valueStyle}>{stats.todayBookings}</strong>
        </div>

        <div className="admin-card" style={cardStyle}>
          <span style={titleStyle}>Today’s Revenue</span>
          <strong style={valueStyle}>₹{stats.todayRevenue}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/complaints", { state: { filter: "all" } })}>
          <span style={titleStyle}>Total Complaints</span>
          <strong style={valueStyle}>{stats.totalComplaints}</strong>
        </div>

        <div className="admin-card" style={cardStyle} onClick={() => navigate("/admin/complaints", { state: { filter: "resolved" } })}>
          <span style={titleStyle}>Resolved Complaints</span>
          <strong style={valueStyle}>{stats.resolvedComplaints}</strong>
        </div>
      </div>

      {/* ✅ Added Activity Table below the grid */}
      <div style={tableContainerStyle}>
        <h3 style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>Recent Staff Activity</h3>
        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b" }}>
              <th style={{ padding: "12px" }}>Staff Name</th>
              <th>Action</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px", fontWeight: "500" }}>{item.name}</td>
                <td>{item.action}</td>
                <td style={{ color: "#94a3b8", fontSize: "13px" }}>{item.time}</td>
                <td>
                    <span style={{
                        padding: "4px 8px", 
                        borderRadius: "5px", 
                        fontSize: "12px", 
                        background: item.status === "Verified" ? "#dcfce7" : "#fef9c3",
                        color: item.status === "Verified" ? "#166534" : "#854d0e"
                    }}>
                        {item.status}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Styles ---

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "30px 20px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
};

const tableContainerStyle = {
  marginTop: "30px",
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};

const titleStyle = { color: "#64748b", fontSize: "14px", marginBottom: "10px" };
const valueStyle = { fontSize: "32px", color: "#000", fontWeight: "bold" };
