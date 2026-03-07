import { useEffect, useState } from "react";
import "./Complaints.css";
import API_BASE_URL from "../../config/api";

const API_URL = `${API_BASE_URL}/api/feedback`;

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString();
};

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "status-pending";
    case "Resolved":
      return "status-resolved";
    case "In Progress":
      return "status-in-progress";
    case "Closed":
      return "status-closed";
    default:
      return "status-pending";
  }
};

const Complaints = () => {
  const [complaintText, setComplaintText] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to load complaints");
      const data = await res.json();
      const userEmail = localStorage.getItem("userEmail") || "";
      const mapped = Array.isArray(data)
        ? data
            .filter((item) => !userEmail || item.email === userEmail)
            .map((item) => ({
              id: item._id,
              name: item.name || "",
              text: item.message,
              status: item.status || "Pending",
              date: formatDate(item.createdAt),
              reply: item.reply || "",
            }))
        : [];
      setComplaints(mapped);
    } catch (err) {
      setError(err.message || "Unable to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complaintText.trim()) return alert("Please enter your issue");

    try {
      const email = localStorage.getItem("userEmail") || "";
      const localName = localStorage.getItem("userName") || localStorage.getItem("name") || "";
      const fallbackName = email ? email.split("@")[0] : "Guest";
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: localName || fallbackName, email, message: complaintText.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit complaint");

      const created = data?.feedback;
      if (created?._id) {
        setComplaints((prev) => [
          {
            id: created._id,
            text: created.message,
            status: created.status || "Pending",
            date: formatDate(created.createdAt),
            reply: created.reply || "",
          },
          ...prev,
        ]);
      } else {
        fetchComplaints();
      }
      setComplaintText("");
      alert("Complaint submitted successfully");
    } catch (err) {
      alert(err.message || "Unable to submit complaint");
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete complaint");
      setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));
    } catch (err) {
      alert(err.message || "Unable to delete complaint");
    }
  };

  return (
    <div className="complaints-wrapper">
      <div className="complaints-container">
        <div className="complaints-header">
          <h2>Complaints</h2>
          <p>Submit and track your concerns with our support team</p>
        </div>

        {error && (
          <div style={{ color: "#991b1b", background: "#fee2e2", padding: "10px", borderRadius: "8px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <div className="complaints-form-section">
          <div className="form-title">Submit a New Complaint</div>

          <form onSubmit={handleSubmit} className="complaint-form">
            <div className="form-group">
              <label htmlFor="complaint">Describe Your Issue</label>
              <textarea
                id="complaint"
                className="complaint-textarea"
                placeholder="Please describe the issue"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Submit Complaint
              </button>
            </div>
          </form>
        </div>

        <div className="complaints-list-section">
          <div className="list-title">Your Recent Complaints</div>

          {complaints.length > 0 ? (
            <div className="complaints-list">
              {complaints.map((item) => (
                <div key={item.id} className="complaint-card">
                  <div className="complaint-card-content">
                    {item.name && <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.name}</div>}
                    <p className="complaint-text">{item.text}</p>
                    <div className="complaint-date">{item.date}</div>
                    {item.reply ? (
                      <div style={{ marginTop: 10, background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: 8, padding: 10 }}>
                        <strong>Admin Response:</strong> {item.reply}
                      </div>
                    ) : null}
                  </div>

                  <div className="complaint-card-actions">
                    <button className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteComplaint(item.id)}
                      title="Delete this complaint"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-complaints">
              <div className="empty-complaints-icon">-</div>
              <p>No complaints yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
