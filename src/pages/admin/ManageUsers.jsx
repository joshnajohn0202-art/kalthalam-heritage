import { useState } from "react";
import "../../App.css";

export default function ManageUsers() {
  const [showForm, setShowForm] = useState(false);
  
  //  ടേബിളിൽ കാണാൻ സാധിക്കുന്ന വാല്യൂസ്
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul", email: "rahul@gmail.com", status: "Active" },
    { id: 2, name: "Anu", email: "anu@gmail.com", status: "Blocked" },
  ]);

  const [visitors] = useState([
    { id: 1, name: "Arjun", room: "Cottage 3" },
    { id: 2, name: "Meera", room: "Room 102" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user
      )
    );
  };

  const handleSave = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now(), status: "Active" }]);
      setShowForm(false);
      setNewUser({ name: "", email: "", password: "" });
    }
  };

  // ✅ ഫോണ്ടും കറുപ്പ് നിറവും ഉറപ്പാക്കാനുള്ള സ്റ്റൈൽ
  const cellStyle = {
    padding: "15px",
    textAlign: "left",
    color: "#000000", // കറുപ്പ് നിറം
    fontSize: "15px",
    fontWeight: "500",
    fontFamily: "'Inter', sans-serif", // വ്യക്തതയുള്ള ഫോണ്ട്
    borderBottom: "1px solid #ddd"
  };

  return (
    <div className="admin-page" style={{ background: "#ffffff", minHeight: "100vh", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ color: "#000", fontSize: "24px", fontWeight: "700" }}>Manage Users</h2>
        <button className="btn primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add User"}
        </button>
      </div>

      {/* ✅ Add User Form Alignment */}
      {showForm && (
        <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "10px", marginBottom: "30px", border: "1px solid #cbd5e1" }}>
          <h3 style={{ marginBottom: "15px", color: "#000" }}>New User Details</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <input 
              type="text" 
              placeholder="Full Name" 
              style={{ padding: "12px", flex: 1, border: "1px solid #94a3b8", borderRadius: "6px", color: "#000" }}
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              style={{ padding: "12px", flex: 1, border: "1px solid #94a3b8", borderRadius: "6px", color: "#000" }}
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <button className="btn success" onClick={handleSave} style={{ padding: "0 25px" }}>Save User</button>
          </div>
        </div>
      )}

      {/* ✅ Users Table with Black Text */}
      <div className="table-wrapper" style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
              <th style={{ ...cellStyle, fontWeight: "700", color: "#334155" }}>Name</th>
              <th style={{ ...cellStyle, fontWeight: "700", color: "#334155" }}>Email</th>
              <th style={{ ...cellStyle, fontWeight: "700", color: "#334155" }}>Status</th>
              <th style={{ ...cellStyle, fontWeight: "700", color: "#334155" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ transition: "0.3s" }}>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>
                  <span className={`status ${user.status === "Active" ? "approved" : "pending"}`} style={{ fontWeight: "bold" }}>
                    {user.status}
                  </span>
                </td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn warning" onClick={() => toggleStatus(user.id)} style={{ fontSize: "12px" }}>
                      {user.status === "Active" ? "Block" : "Unblock"}
                    </button>
                    <button className="btn danger" onClick={() => deleteUser(user.id)} style={{ fontSize: "12px" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: "50px", marginBottom: "20px", color: "#000", fontSize: "22px" }}>Current Visitors</h2>
      <div className="table-wrapper" style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={{ ...cellStyle, fontWeight: "700" }}>Visitor Name</th>
              <th style={{ ...cellStyle, fontWeight: "700" }}>Room / Cottage</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v) => (
              <tr key={v.id}>
                <td style={cellStyle}>{v.name}</td>
                <td style={cellStyle}>{v.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}