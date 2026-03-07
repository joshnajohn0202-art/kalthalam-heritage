import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import "../../App.css";

export default function AddStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Reception",
    permanentAddress: "",
    temporaryAddress: "",
    joinDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!staff.name || !staff.email || !staff.phone || !staff.permanentAddress) {
      return alert("Please fill all compulsory fields");
    }

    try {
      await API.post("/staff", staff);
      alert("Staff added successfully");
      navigate("/admin/manage-staff");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add staff");
    }
  };

  return (
    <div className="admin-page" style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Add New Staff Member</h2>
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      </div>

      <form onSubmit={handleAddStaff} className="staff-form" style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={staff.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={staff.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input type="text" name="phone" value={staff.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Role *</label>
            <select name="role" value={staff.role} onChange={handleChange}>
              <option value="Reception">Reception</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Cleaning Staff">Cleaning Staff</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: "20px" }}>
          <label>Permanent Address *</label>
          <textarea
            name="permanentAddress"
            rows="3"
            value={staff.permanentAddress}
            onChange={handleChange}
            required
            style={{ width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <div className="form-group" style={{ marginTop: "20px" }}>
          <label>Temporary Address</label>
          <textarea
            name="temporaryAddress"
            rows="2"
            value={staff.temporaryAddress}
            onChange={handleChange}
            style={{ width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" style={{ marginTop: "30px", width: "100%", padding: "12px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Confirm & Add Staff
        </button>
      </form>
    </div>
  );
}
