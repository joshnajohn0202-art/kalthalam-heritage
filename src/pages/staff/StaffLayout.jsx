import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

export default function StaffLayout() {
  const navigate = useNavigate();
  const [staffProfile, setStaffProfile] = useState({
    name: "Staff",
    role: "Staff Member",
    avatar: "/demo/alice-avatar.svg",
  });

  useEffect(() => {
    const staffName = localStorage.getItem("staffName");
    const userEmail = localStorage.getItem("userEmail");

    const fetchProfile = async () => {
      try {
        let res;
        if (staffName) {
          res = await fetch(`${API_BASE_URL}/api/staff/profile/${encodeURIComponent(staffName)}`);
        } else if (userEmail) {
          res = await fetch(`${API_BASE_URL}/api/staff/by-email/${encodeURIComponent(userEmail)}`);
        } else {
          const resAll = await fetch(`${API_BASE_URL}/api/staff`);
          if (resAll.ok) {
            const staffList = await resAll.json();
            const firstStaff = Array.isArray(staffList) ? staffList[0] : null;
            if (firstStaff?.name) {
              localStorage.setItem("staffName", firstStaff.name);
              setStaffProfile({
                name: firstStaff.name,
                role: firstStaff.role || "Staff Member",
                avatar: "/demo/alice-avatar.svg",
              });
            }
          }
          return;
        }

        if (!res.ok) return;
        const data = await res.json();
        setStaffProfile({
          name: data?.name || "Staff",
          role: data?.role || "Staff Member",
          avatar: "/demo/alice-avatar.svg",
        });
        if (data?.name) {
          localStorage.setItem("staffName", data.name);
        }
      } catch (err) {
        // Keep layout usable even if profile request fails.
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "230px",
          backgroundColor: "#1e293b",
          color: "#ffffff",
          padding: "25px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <img
            src={staffProfile.avatar}
            alt="Profile"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              marginBottom: "12px",
            }}
          />
          <h3 style={{ margin: 0, fontSize: "18px" }}>{staffProfile.name}</h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#a1a1aa" }}>{staffProfile.role}</p>
        </div>

        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Staff Panel</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <NavLink to="/staff/dashboard" style={navLinkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/staff/duty-schedule" style={navLinkStyle}>
            Duty Schedule
          </NavLink>

          <NavLink to="/staff/maintenance" style={navLinkStyle}>
            Maintenance
          </NavLink>

          <NavLink to="/staff/complaints" style={navLinkStyle}>
            Complaints
          </NavLink>

          <NavLink to="/staff/profile" style={navLinkStyle}>
            My Profile
          </NavLink>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "30px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "#fff",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          backgroundColor: "#f4f6f8",
          padding: "30px",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

const navLinkStyle = ({ isActive }) => ({
  color: "#e5e7eb",
  textDecoration: "none",
  fontSize: "16px",
  padding: "10px 12px",
  borderRadius: "6px",
  backgroundColor: isActive ? "#2563eb" : "#334155",
  fontWeight: isActive ? "600" : "400",
  transition: "0.2s",
});
