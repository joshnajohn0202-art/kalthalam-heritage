import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Forgotpswd from "./pages/auth/Forgotpswd";
import ResetPassword from "./pages/auth/ResetPassword";

/* USER */
import UserLayout from "./pages/user/UserLayout";
import NearbySpots from "./pages/user/NearbySpots";
import Cottage from "./pages/user/Cottage";
import MyBookings from "./pages/user/MyBookings";
import Payment from "./pages/user/Payment";
import PackagesAddons from "./pages/user/PackagesAddons";
import Complaints from "./pages/user/Complaints";
import UserProfile from "./pages/user/UserProfile";
import BookingRequest from "./pages/user/BookingRequest";

/* STAFF */
import StaffLayout from "./pages/staff/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import DutySchedule from "./pages/staff/DutySchedule";
import Maintenance from "./pages/staff/Maintenance";
import StaffComplaints from "./pages/staff/Complaints";
import StaffProfile from "./pages/staff/StaffProfile";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AssignDuty from "./pages/admin/AssignDuty";
import ManageBookings from "./pages/admin/ManageBookings";
import AdminComplaints from "./pages/admin/Complaints";
import Users from "./pages/admin/Users";
import ManageStaff from "./pages/admin/ManageStaff";
import AddStaff from "./pages/admin/AddStaff";
import Reports from "./pages/admin/Reports";

/* HOME */
import Home from "./pages/user/Home";
import AboutUs from "./pages/user/AboutUs";

/* PROTECTED ROUTE */
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token → allow public access but block protected layout
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allow visitor inside user
  if (role !== allowedRole && !(allowedRole === "user" && role === "visitor")) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/nearby" element={<NearbySpots />} />
      <Route path="/about" element={<Navigate to="/user/about" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgotpswd />} />
      <Route path="/reset" element={<ResetPassword />} />

      {/* ================= USER ROUTES ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="cottage" replace />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="nearby" element={<NearbySpots />} />
        <Route path="cottage" element={<Cottage />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="payment" element={<Payment />} />
        <Route path="packages" element={<PackagesAddons />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="booking" element={<BookingRequest />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* ================= STAFF ROUTES ================= */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="duty-schedule" element={<DutySchedule />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="complaints" element={<StaffComplaints />} />
        <Route path="profile" element={<StaffProfile />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="assign-duty" element={<AssignDuty />} />
        <Route path="manage-bookings" element={<ManageBookings />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="users" element={<Users />} />
        <Route path="manage-staff" element={<ManageStaff />} />
        <Route path="add-staff" element={<AddStaff />} />
        <Route path="staff" element={<ManageStaff />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
