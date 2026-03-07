import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const API_URL = `${API_BASE_URL}/api/staff-complaints`;

const getComplaintStaffId = (complaint) => {
  const staff = complaint?.staff;
  if (!staff) return "";
  if (typeof staff === "string") return staff;
  if (typeof staff === "object" && staff._id) return String(staff._id);
  return "";
};

function Complaints() {
  const navigate = useNavigate();
  const staffName = localStorage.getItem("staffName");
  const userEmail = localStorage.getItem("userEmail");

  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", priority: "Medium" });
  const [successMsg, setSuccessMsg] = useState("");
  const [staffId, setStaffId] = useState(localStorage.getItem("staffId") || "");
  const [resolvedStaffName, setResolvedStaffName] = useState(staffName || "");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );

  const staffComplaints = useMemo(() => complaints, [complaints]);

  const fetchComplaints = async () => {
    try {
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) {
        const failText = await res.text();
        throw new Error(failText || "Failed to fetch complaints");
      }
      const data = await res.json();
      if (data.success && staffId) {
        data.complaints = (data.complaints || []).filter(
          (c) => getComplaintStaffId(c) === String(staffId)
        );
      }

      if (data?.success) {
        setComplaints(
          (data.complaints || []).map((c) => ({
            id: c._id,
            title: c.title,
            description: c.description,
            date: c.date ? c.date.split("T")[0] : "",
            status: c.status,
            priority: c.priority,
            staffName: c.staff?.name || "Unknown",
            staffRefId: getComplaintStaffId(c),
            adminReply: c.adminReply || "",
          }))
        );
      }
    } catch (err) {
      setError(err.message || "Failed to fetch complaints");
    }
  };

  const fetchStaffId = async () => {
    try {
      let res;
      if (userEmail) {
        res = await fetch(`${API_BASE_URL}/api/staff/by-email/${encodeURIComponent(userEmail)}`);
      } else if (staffName) {
        res = await fetch(`${API_BASE_URL}/api/staff/profile/${encodeURIComponent(staffName)}`);
      } else {
        const allRes = await fetch(`${API_BASE_URL}/api/staff`);
        if (!allRes.ok) throw new Error("Missing staff identity. Please login again.");
        const allData = await allRes.json();
        const firstStaff = Array.isArray(allData) ? allData[0] : null;
        if (!firstStaff?._id) throw new Error("No staff found");
        setStaffId(firstStaff._id);
        localStorage.setItem("staffId", firstStaff._id);
        setResolvedStaffName(firstStaff.name || "");
        localStorage.setItem("staffName", firstStaff.name || "");
        return;
      }
      if (!res.ok) throw new Error("Staff profile not found");
      const data = await res.json();
      if (data?.name) {
        localStorage.setItem("staffName", data.name);
        setResolvedStaffName(data.name);
      }
      setStaffId(data._id || "");
      if (data?._id) localStorage.setItem("staffId", data._id);
    } catch (err) {
      setError(err.message || "Staff profile missing. Create staff record first.");
    }
  };

  useEffect(() => {
    fetchStaffId();
  }, [staffName, userEmail]);

  useEffect(() => {
    fetchComplaints();
  }, [staffId]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staffId) {
      setError("Cannot submit complaint without staff profile ID");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staff: staffId,
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.complaint?._id) {
          fetchComplaints();
        } else {
          fetchComplaints();
        }
        setFormData({ title: "", description: "", priority: "Medium" });
        setSuccessMsg("Complaint added successfully!");
        setTimeout(() => setSuccessMsg(""), 2500);
      } else {
        setError(data.message || "Complaint submit failed");
      }
    } catch (err) {
      setError("Failed to submit complaint");
    }
  };

  const handleResolve = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      });
      fetchComplaints();
    } catch (err) {
      setError("Failed to resolve complaint");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchComplaints();
    } catch (err) {
      setError("Failed to delete complaint");
    }
  };

  return (
    <div style={{ ...pageWrapper, padding: isMobile ? "10px" : "20px" }}>
      <div style={{ ...contentBox, padding: isMobile ? "14px" : "20px" }}>
        <button onClick={() => navigate(-1)} style={backBtn}>
          ← Back
        </button>

        <h2>Complaints</h2>

        {successMsg && <div style={successStyle}>{successMsg}</div>}
        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            placeholder="Complaint title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={inputStyle}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            style={inputStyle}
          />
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            style={inputStyle}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" style={btnStyle}>
            Submit Complaint
          </button>
        </form>

        <h3 style={{ marginTop: 30 }}>My Complaints</h3>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}>Title</th>
                <th style={th}>Description</th>
                <th style={th}>Priority</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>
                <th style={th}>Response</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffComplaints.length === 0 ? (
                <tr>
                  <td style={td} colSpan={7}>No complaints found.</td>
                </tr>
              ) : (
                staffComplaints.map((c) => (
                  <tr key={c.id}>
                    <td style={td}>{c.title}</td>
                    <td style={td}>{c.description}</td>
                    <td style={td}>{c.priority}</td>
                    <td style={td}>{c.date}</td>
                    <td style={{ ...td, color: c.status === "Resolved" ? "green" : "#b45309" }}>
                      {c.status}
                    </td>
                    <td style={td}>
                      {c.adminReply ? (
                        <span style={{ color: "#0f172a", fontWeight: 600 }}>{c.adminReply}</span>
                      ) : (
                        <span style={{ color: "#64748b" }}>No response yet</span>
                      )}
                    </td>
                    <td style={td}>
                      {c.status !== "Resolved" && (
                        <button
                          onClick={() => handleResolve(c.id)}
                          style={{ ...actionBtn, background: "#16a34a" }}
                        >
                          Resolve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(c.id)}
                        style={{ ...actionBtn, background: "#dc2626", marginLeft: "5px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Complaints;

const pageWrapper = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "20px",
  boxSizing: "border-box",
  overflowX: "hidden",
  background: "#f1f5f9",
};

const contentBox = {
  width: "100%",
  maxWidth: "980px",
  boxSizing: "border-box",
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const backBtn = {
  marginBottom: "15px",
  padding: "6px 12px",
  background: "#1e293b",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "9px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btnStyle = {
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  background: "#1e293b",
  color: "#fff",
  cursor: "pointer",
};

const successStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontWeight: "bold",
};

const errorStyle = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontWeight: "bold",
};

const tableStyle = {
  width: "100%",
  minWidth: "760px",
  borderCollapse: "collapse",
};

const tableWrapStyle = {
  width: "100%",
  overflowX: "auto",
};

const th = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "8px",
  verticalAlign: "middle",
  lineHeight: "1.4",
};

const actionBtn = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
};
