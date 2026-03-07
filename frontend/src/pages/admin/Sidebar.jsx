import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside style={sidebarStyle}>
      <h2 style={titleStyle}>Admin Panel</h2>

      <nav style={navContainer}>
        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          📊 Dashboard
        </NavLink>

        {/* ✅ ADDED: Bookings Link */}
        <NavLink
          to="/admin/manage-bookings"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          📅 Bookings
        </NavLink>

        <NavLink
          to="/admin/complaints"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          📢 Complaints
        </NavLink>

        <NavLink
          to="/admin/users"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          👥 Users
        </NavLink>

        {/* ✅ ADDED: Manage Staff Link (for your ManageStaff.jsx) */}
        <NavLink
          to="/admin/manage-staff"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          🧑‍🔧 Manage Staff
        </NavLink>

        {/* ✅ ADDED: Assign Duty Link (for your AssignDuty.jsx) */}
        <NavLink
          to="/admin/assign-duty"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          📝 Assign Duty
        </NavLink>

        <NavLink
          to="/admin/reports"
          style={({ isActive }) =>
            isActive ? activeNavStyle : navStyle
          }
        >
          📑 Reports
        </NavLink>

        <button onClick={handleLogout} style={logoutBtn}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}

/* ================= STYLES ================= */

const sidebarStyle = {
  width: "240px",
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  padding: "25px 20px",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const navContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const navStyle = {
  color: "#e5e7eb",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: "6px",
  backgroundColor: "#1e293b",
};

const activeNavStyle = {
  ...navStyle,
  backgroundColor: "#2563eb",
  fontWeight: "bold",
};

const logoutBtn = {
  marginTop: "30px",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#ef4444",
  color: "#fff",
  cursor: "pointer",
};