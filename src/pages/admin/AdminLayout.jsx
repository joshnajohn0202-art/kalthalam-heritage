import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* ✅ SIDEBAR - Ensure "Manage Bookings" is linked here */}
      <Sidebar />

      {/* ✅ PAGE CONTENT */}
      <main className="admin-main">
        {/* All admin pages, including Manage Bookings, render here */}
        <Outlet />
      </main>
    </div>
  );
}