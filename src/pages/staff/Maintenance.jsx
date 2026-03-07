import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const COTTAGE_OPTIONS = ["Deluxe Cottage", "Luxury Villa"];

const normalizeCottageName = (value) => {
  const text = String(value || "").toLowerCase();
  if (text.includes("premium") || text.includes("luxury")) {
    return "Luxury Villa";
  }
  const numberMatch = text.match(/\d+/);
  if (numberMatch) {
    const num = Number(numberMatch[0]);
    return num % 2 === 0 ? "Luxury Villa" : "Deluxe Cottage";
  }
  return "Deluxe Cottage";
};

function Maintenance() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    room: COTTAGE_OPTIONS[0],
    issue: "",
    workerType: "Cleaning",
    status: "Pending",
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/maintenance`);
      if (!res.ok) throw new Error("Failed to fetch maintenance records");
      const data = await res.json();
      const normalized = Array.isArray(data)
        ? data.map((item) => ({
            ...item,
            room: normalizeCottageName(item.room),
          }))
        : [];
      setRequests(normalized);
    } catch (err) {
      setError(err.message || "Unable to load maintenance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/maintenance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create maintenance request");
      setForm({ room: COTTAGE_OPTIONS[0], issue: "", workerType: "Cleaning", status: "Pending" });
      fetchRequests();
    } catch (err) {
      alert(err.message || "Unable to create request");
    }
  };

  const markCompleted = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/maintenance/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchRequests();
    } catch (err) {
      alert(err.message || "Unable to update request");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          backgroundColor: "#1e293b",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h2>Maintenance Requests</h2>

      <form onSubmit={handleCreate} style={formStyle}>
        <select
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
        >
          {COTTAGE_OPTIONS.map((cottage) => (
            <option key={cottage} value={cottage}>
              {cottage}
            </option>
          ))}
        </select>
        <input
          placeholder="Issue"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          required
        />
        <select
          value={form.workerType}
          onChange={(e) => setForm({ ...form, workerType: e.target.value })}
        >
          <option>Cleaning</option>
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>General</option>
        </select>
        <button style={btnStyle} type="submit">Add Request</button>
      </form>

      {loading && <p>Loading maintenance records...</p>}
      {error && <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>}

      {!loading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Cottage Name</th>
              <th style={thStyle}>Issue</th>
              <th style={thStyle}>Worker Type</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td style={tdStyle}>{req.room}</td>
                <td style={tdStyle}>{req.issue}</td>
                <td style={tdStyle}>{req.workerType}</td>
                <td style={tdStyle}>{req.status}</td>
                <td style={tdStyle}>
                  {req.status !== "Completed" && (
                    <button style={btnStyle} onClick={() => markCompleted(req._id)}>
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "10px",
  marginBottom: "16px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "12px",
  backgroundColor: "#f4f4f4",
  fontWeight: "600",
};

const tdStyle = {
  border: "1px solid #e5e7eb",
  padding: "12px",
};

const btnStyle = {
  padding: "8px 14px",
  background: "#1e293b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Maintenance;
