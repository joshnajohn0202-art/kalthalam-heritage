import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../service/api";
import "./auth.css";

export default function Forgotpswd() {
  const [email, setEmail] = useState(
    String(localStorage.getItem("userEmail") || "").trim().toLowerCase()
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanEmail || !oldPassword || !newPassword || !confirmPassword) {
      setErrorMsg("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match");
      return;
    }

    try {
      const response = await API.post("/auth/change-password-email", {
        email: cleanEmail,
        oldPassword,
        newPassword,
      });

      setInfoMsg(response?.data?.message || "Password changed successfully");
      setEmail(cleanEmail);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleChangePassword}>
        <h2>Change Password</h2>

        {errorMsg ? (
          <p style={{ color: "#b91c1c", margin: "0 0 10px 0", textAlign: "center" }}>{errorMsg}</p>
        ) : null}
        {infoMsg ? (
          <p style={{ color: "#166534", margin: "0 0 10px 0", textAlign: "center" }}>{infoMsg}</p>
        ) : null}

        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Update Password</button>

        <div className="auth-links single-link">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
