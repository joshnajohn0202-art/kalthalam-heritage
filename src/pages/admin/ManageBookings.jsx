import { useEffect, useState } from "react";
import API from "../../service/api";
import "../../App.css";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/bookings");
      const list = Array.isArray(res.data) ? res.data : [];
      setBookings(list.filter((b) => b.user || b.guestName || b.email));
    } catch (err) {
      console.error("Error fetching bookings", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await API.patch(`/admin/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error("Error updating status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-page" style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Manage Bookings</h2>
        <p className="admin-text" style={{ color: "#666" }}>Review and manage guest reservations</p>
      </div>

      <div className="table-wrapper" style={{ overflowX: "auto", background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
        <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Guest</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Service Date</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Booking Date</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Status</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: 12 }}>Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: 12 }}>No bookings found</td></tr>
            ) : (
              bookings.map((b) => {
                const guestLabel = b.user?.name || b.user?.email || b.guestName || "";
                if (!guestLabel) return null;

                return (
                  <tr key={b._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{guestLabel}</td>
                    <td style={{ padding: "12px", fontSize: "13px" }}>
                      {b.serviceDate
                        ? new Date(b.serviceDate).toLocaleDateString()
                        : b.checkIn
                          ? new Date(b.checkIn).toLocaleDateString()
                          : "-"}
                    </td>
                    <td style={{ padding: "12px", fontSize: "13px" }}>
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        backgroundColor: b.status === "Approved" ? "#eafff1" : b.status === "Rejected" ? "#fff1f1" : "#fff9e6",
                        color: b.status === "Approved" ? "#2ecc71" : b.status === "Rejected" ? "#e74c3c" : "#f1c40f",
                        border: `1px solid ${b.status === "Approved" ? "#2ecc71" : b.status === "Rejected" ? "#e74c3c" : "#f1c40f"}`,
                      }}>
                        {b.status || "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                        <button
                          onClick={() => updateStatus(b._id, "Approved")}
                          disabled={updatingId === b._id}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: b.status === "Approved" ? "#27ae60" : "#ffffff",
                            color: b.status === "Approved" ? "white" : "#27ae60",
                            border: "1px solid #27ae60",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(b._id, "Rejected")}
                          disabled={updatingId === b._id}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: b.status === "Rejected" ? "#c0392b" : "#ffffff",
                            color: b.status === "Rejected" ? "white" : "#c0392b",
                            border: "1px solid #c0392b",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
