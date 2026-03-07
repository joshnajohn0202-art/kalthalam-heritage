import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        borderRight: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h3>Admin</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/staff">Staff</Link>
        <Link to="/admin/add-staff">Add Staff</Link>
        <Link to="/admin/assign-duty">Assign Duty</Link>
        <Link to="/admin/staff-list">Staff List</Link>
        <Link to="/admin/rooms">Rooms</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/visitors">Visitors</Link>
        <Link to="/admin/complaints">Complaints</Link>
        <Link to="/admin/reports">Reports</Link>
      </nav>
    </div>
  );
}
