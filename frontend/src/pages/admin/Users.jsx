import { useEffect, useState } from "react";
import API from "../../service/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      const res = await API.patch(`/admin/users/${userId}/toggle-status`);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: res.data?.isBlocked } : u
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAddUser = async () => {
    if (!name || !email || !password) return alert("Please fill all fields");
    try {
      const res = await API.post("/admin/users", { name, email, password });
      setUsers((prev) => [...prev, res.data]);
      setName("");
      setEmail("");
      setPassword("");
      setShowAddUser(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add user");
    }
  };

  const cellStyle = {
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "1px solid #eee",
    color: "#333",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "24px", color: "#1e293b" }}>Manage Users</h2>
        <button
          onClick={() => setShowAddUser(!showAddUser)}
          style={{
            padding: "10px 18px",
            background: showAddUser ? "#64748b" : "#2563eb",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {showAddUser ? "Close Form" : "+ Add New User"}
        </button>
      </div>

      {showAddUser && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <div style={{ width: "100%", maxWidth: "400px", padding: "25px", background: "#fff", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#334155" }}>Enter User Details</h3>
            <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <input placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={handleAddUser} style={{ ...btnStyle, background: "#16a34a", flex: 2 }}>Save User</button>
              <button onClick={() => setShowAddUser(false)} style={{ ...btnStyle, background: "#f1f5f9", color: "#475569", flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ ...cellStyle, fontWeight: "600", color: "#64748b" }}>NAME</th>
              <th style={{ ...cellStyle, fontWeight: "600", color: "#64748b" }}>EMAIL</th>
              <th style={{ ...cellStyle, fontWeight: "600", color: "#64748b", textAlign: "center" }}>STATUS</th>
              <th style={{ ...cellStyle, fontWeight: "600", color: "#64748b", textAlign: "center" }}>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "30px" }}>Loading...</td></tr>
            ) : users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td style={cellStyle}>{u.name}</td>
                  <td style={cellStyle}>{u.email}</td>
                  <td style={{ ...cellStyle, textAlign: "center" }}>
                    <button
                      onClick={() => handleToggleStatus(u._id)}
                      style={{
                        padding: "6px 15px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: u.isBlocked ? "#fee2e2" : "#dcfce7",
                        color: u.isBlocked ? "#991b1b" : "#166534",
                        minWidth: "100px",
                      }}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </button>
                  </td>
                  <td style={{ ...cellStyle, textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(u._id)}
                      style={{ ...btnStyle, background: "#ef4444", padding: "6px 12px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" };
const btnStyle = { padding: "12px", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "14px" };
