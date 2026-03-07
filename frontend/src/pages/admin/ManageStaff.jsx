import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import "../../App.css";

export default function ManageStaff() {
  const navigate = useNavigate();
  const [updatingId, setUpdatingId] = useState(null);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await API.get("/staff");
      setStaff(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const res = await API.patch(`/staff/${id}/status`, { status });
      setStaff((prev) => prev.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Manage Staff Members</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/admin/add-staff")} style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
            + Add Staff
          </button>
          <button onClick={() => navigate(-1)} style={{ backgroundColor: "#6b7280", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
            Back
          </button>
        </div>
      </div>

      <div className="table-wrapper" style={{ overflowX: "auto" }}>
        <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f8fafc" }}>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Staff Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: 16 }}>Loading...</td></tr>
            ) : staff.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: 16 }}>No staff found</td></tr>
            ) : (
              staff.map((s) => (
                <tr key={s._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "10px", fontWeight: "600" }}>{s.name || "Staff"}</td>
                  <td>{s.role || "General"}</td>
                  <td style={{ color: "#64748b" }}>{s.email}</td>
                  <td>{s.phone || "-"}</td>
                  <td>
                    <span style={{
                      padding: "5px 10px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      fontSize: "12px",
                      color: s.status === "Approved" ? "#166534" : s.status === "Rejected" ? "#991b1b" : "#78350f",
                      backgroundColor: s.status === "Approved" ? "#dcfce7" : s.status === "Rejected" ? "#fee2e2" : "#fef3c7",
                    }}>
                      {s.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button onClick={() => updateStatus(s._id, "Pending")} disabled={updatingId === s._id} style={{ padding: "6px 12px", backgroundColor: s.status === "Pending" ? "#d97706" : "transparent", color: s.status === "Pending" ? "#fff" : "#d97706", border: "1px solid #d97706", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
                        Pending
                      </button>
                      <button onClick={() => updateStatus(s._id, "Approved")} disabled={updatingId === s._id} style={{ padding: "6px 12px", backgroundColor: s.status === "Approved" ? "#16a34a" : "transparent", color: s.status === "Approved" ? "#fff" : "#16a34a", border: "1px solid #16a34a", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
                        Approve
                      </button>
                      <button onClick={() => updateStatus(s._id, "Rejected")} disabled={updatingId === s._id} style={{ padding: "6px 12px", backgroundColor: s.status === "Rejected" ? "#dc2626" : "transparent", color: s.status === "Rejected" ? "#fff" : "#dc2626", border: "1px solid #dc2626", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
