import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import "./auth.css";

export default function Signup() {
  const navigate = useNavigate();

  // Optional fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Mandatory fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ⭐ Mandatory field validation
    if (!fullName || !email || !password || !confirmPassword || !role) {
      alert("Please fill all mandatory (*) fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    // Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters and include:\n" +
          "- Uppercase letter\n" +
          "- Lowercase letter\n" +
          "- Number\n" +
          "- Special character"
      );
      return;
    }

    // Confirm password check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        {/* ⭐ Full Name */}
        <label>
          Full Name <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Optional */}
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* ⭐ Email */}
        <label>
          Email <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ⭐ Password */}
        <label>
          Password <span style={{ color: "red" }}>*</span>
        </label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* ⭐ Confirm Password */}
        <label>
          Confirm Password <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Optional */}
        <label>Address</label>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* ⭐ Role */}
        <label>
          Role <span style={{ color: "red" }}>*</span>
        </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="visitor">Visitor</option>
        </select>

        <button type="submit">Register</button>

        <div className="auth-links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}
