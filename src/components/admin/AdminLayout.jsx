import { Outlet, NavLink, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin</h2>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/add-staff">Add Staff</NavLink>
          <NavLink to="/admin/staff-list">Staff List</NavLink>
          <NavLink to="/admin/rooms">Rooms</NavLink>
          <NavLink to="/admin/bookings">Bookings</NavLink>
       
          <NavLink to="/admin/complaints">Complaints</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink>
        </nav>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
