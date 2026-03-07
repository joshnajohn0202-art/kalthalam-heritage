import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      const backendRole = (data.role || "").toLowerCase();
      if (backendRole !== role) {
        alert(`Role mismatch. This account is '${backendRole}', but you selected '${role}'.`);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", backendRole);
      localStorage.setItem("userEmail", normalizedEmail);
      if (backendRole !== "staff") {
        localStorage.removeItem("staffName");
      }

      if (backendRole === "staff") {
        try {
          const staffRes = await fetch(
            `${API_BASE_URL}/api/staff/by-email/${encodeURIComponent(normalizedEmail)}`
          );
          if (staffRes.ok) {
            const staffData = await staffRes.json();
            if (staffData?.name) {
              localStorage.setItem("staffName", staffData.name);
            }
          }
        } catch (staffErr) {
          // Keep login successful even if profile fetch fails.
        }
      }

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "staff") {
        navigate("/staff/dashboard");
      } else if (role === "visitor") {
        navigate("/user/cottage");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="visitor">Visitor</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>

        <div className="auth-links">
          <Link to="/forgot">Forgot password?</Link>
          <Link to="/signup">Create account</Link>
        </div>
      </form>
    </div>
  );
}
