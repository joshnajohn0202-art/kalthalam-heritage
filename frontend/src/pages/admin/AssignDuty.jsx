import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const getLocalDate = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const today = getLocalDate();

export default function AssignDuty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    staffId: "",
    role: "Cleaning Staff",
    shift: "Morning",
    date: today,
    status: "Assigned",
  });

  const [staffOptions, setStaffOptions] = useState([]);
  const [assignedDuties, setAssignedDuties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [staffRes, dutiesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/staff`),
        fetch(`${API_BASE_URL}/api/duties`),
      ]);

      if (!staffRes.ok) throw new Error("Failed to load staff");
      if (!dutiesRes.ok) throw new Error("Failed to load duties");

      const staffData = await staffRes.json();
      const dutiesData = await dutiesRes.json();
      const staffList = Array.isArray(staffData) ? staffData : [];
      const dutyList = Array.isArray(dutiesData) ? dutiesData : [];

      setStaffOptions(staffList);
      setAssignedDuties(dutyList.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)));

      if (!formData.staffId && staffList.length > 0) {
        setFormData((prev) => ({ ...prev, staffId: staffList[0]._id }));
      }
    } catch (err) {
      setError(err.message || "Unable to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.staffId || !formData.role || !formData.shift) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const selectedStaff = staffOptions.find((s) => s._id === formData.staffId);
      const res = await fetch(`${API_BASE_URL}/api/duties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          staff: selectedStaff?.name || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to assign duty");

      setAssignedDuties((prev) => [data, ...prev]);
      alert("Duty assigned successfully");
    } catch (err) {
      alert(err.message || "Unable to assign duty");
    }
  };

  const toggleStatus = async (duty) => {
    const nextStatus = duty.status === "Assigned" ? "Paused" : "Assigned";
    try {
      const res = await fetch(`${API_BASE_URL}/api/duties/${duty._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Failed to update status");

      setAssignedDuties((prev) =>
        prev.map((item) => (item._id === duty._id ? { ...item, status: updated.status } : item))
      );
    } catch (err) {
      alert(err.message || "Unable to update status");
    }
  };

  return (
    <div className="admin-page" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Assign Duty</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#6b7280",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
      </div>

      <p className="admin-text" style={{ marginBottom: "20px" }}>
        Allocate tasks to available staff members
      </p>

      <form className="admin-form" onSubmit={handleSubmit} style={formStyle}>
        <select
          style={inputStyle}
          value={formData.staffId}
          onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
          required
        >
          <option value="">Select Staff</option>
          {staffOptions.map((staff) => (
            <option key={staff._id || staff.email} value={staff._id}>
              {staff.name}
            </option>
          ))}
        </select>

        <select
          style={inputStyle}
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="Cleaning Staff">Cleaning Staff</option>
          <option value="Reception">Reception</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Support">Support</option>
        </select>

        <select
          style={inputStyle}
          value={formData.shift}
          onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
        >
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>

        <input
          style={inputStyle}
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <button type="submit" className="btn success" style={btnStyle}>
          Assign Task
        </button>
      </form>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ marginBottom: "15px" }}>Current Assignments</h3>
        {loading && <p>Loading assignments...</p>}
        {error && <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>}

        {!loading && !error && (
          <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f8fafc" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>Staff Name</th>
                  <th>Role</th>
                  <th>Shift</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Toggle</th>
                </tr>
              </thead>
              <tbody>
                {assignedDuties.map((duty) => (
                  <tr key={duty._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px", fontWeight: "600" }}>{duty.staff}</td>
                    <td>{duty.role}</td>
                    <td>{duty.shift}</td>
                    <td>{duty.date}</td>
                    <td>
                      <span
                        style={{
                          color: duty.status === "Assigned" ? "#16a34a" : "#94a3b8",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {duty.status}
                      </span>
                    </td>
                    <td>
                      <div
                        onClick={() => toggleStatus(duty)}
                        style={{
                          width: "40px",
                          height: "20px",
                          backgroundColor: duty.status === "Assigned" ? "#16a34a" : "#ccc",
                          borderRadius: "20px",
                          position: "relative",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "2px",
                            left: duty.status === "Assigned" ? "22px" : "2px",
                            transition: "0.3s",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "420px",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
};

const btnStyle = {
  padding: "12px",
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};
