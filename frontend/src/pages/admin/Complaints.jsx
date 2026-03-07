import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../../service/api";
import "../../App.css";

export default function Complaints() {
  const location = useLocation();
  const [userComplaints, setUserComplaints] = useState([]);
  const [staffComplaints, setStaffComplaints] = useState([]);
  const [replies, setReplies] = useState({});

  const fetchComplaints = async () => {
    try {
      const [userRes, staffRes] = await Promise.all([
        API.get("/feedback"),
        API.get("/staff-complaints"),
      ]);

      setUserComplaints(Array.isArray(userRes.data) ? userRes.data : []);
      setStaffComplaints(staffRes.data?.success ? (staffRes.data.complaints || []) : []);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
      setUserComplaints([]);
      setStaffComplaints([]);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filterType = location.state?.filter || "all";

  const displayedUserComplaints = useMemo(() => {
    return userComplaints.filter((c) => {
      if (filterType === "resolved") return c.status === "Resolved";
      return true;
    });
  }, [userComplaints, filterType]);

  const displayedStaffComplaints = useMemo(() => {
    return staffComplaints.filter((c) => {
      if (filterType === "resolved") return c.status === "Resolved";
      return true;
    });
  }, [staffComplaints, filterType]);

  const handleResolveUser = async (id) => {
    try {
      await API.put(`/feedback/${id}/resolve`);
      fetchComplaints();
    } catch (err) {
      console.error("Failed to resolve user complaint", err);
    }
  };

  const handleReplyUser = async (id) => {
    if (!replies[id]) return;
    try {
      await API.put(`/feedback/${id}/reply`, { reply: replies[id] });
      setReplies({ ...replies, [id]: "" });
      fetchComplaints();
    } catch (err) {
      console.error("Failed to reply user complaint", err);
    }
  };

  const handleResolveStaff = async (id) => {
    try {
      await API.patch(`/staff-complaints/${id}`, { status: "Resolved" });
      fetchComplaints();
    } catch (err) {
      console.error("Failed to resolve staff complaint", err);
    }
  };

  const handleReplyStaff = async (id) => {
    if (!replies[id]) return;
    try {
      await API.patch(`/staff-complaints/${id}`, { adminReply: replies[id] });
      setReplies({ ...replies, [id]: "" });
      fetchComplaints();
    } catch (err) {
      console.error("Failed to reply staff complaint", err);
    }
  };

  return (
    <div className="admin-page">
      <h2>Complaints & Feedback</h2>
      <p className="admin-text">
        Showing: <strong>{filterType.toUpperCase()}</strong>
      </p>

      <h3 style={{ marginTop: 20 }}>User Complaints</h3>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedUserComplaints.length === 0 ? (
              <tr><td colSpan="6">No user complaints</td></tr>
            ) : displayedUserComplaints.map((c) => (
              <tr key={c._id}>
                <td>{c.name || (c.email ? c.email.split("@")[0] : "User")}</td>
                <td>{c.email || "-"}</td>
                <td>{c.message}</td>
                <td>
                  <span className={`status ${c.status === "Resolved" ? "approved" : "pending"}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <textarea
                    className="table-input"
                    placeholder={c.reply ? `Sent: ${c.reply}` : "Type your response..."}
                    value={replies[c._id] || ""}
                    onChange={(e) => setReplies({ ...replies, [c._id]: e.target.value })}
                  />
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn primary" onClick={() => handleReplyUser(c._id)}>Send</button>
                    {c.status !== "Resolved" && (
                      <button className="btn success" onClick={() => handleResolveUser(c._id)}>Resolve</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: 28 }}>Staff Complaints</h3>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedStaffComplaints.length === 0 ? (
              <tr><td colSpan="6">No staff complaints</td></tr>
            ) : displayedStaffComplaints.map((c) => (
              <tr key={c._id}>
                <td>{c.staff?.name || "Staff"}</td>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>
                  <span className={`status ${c.status === "Resolved" ? "approved" : "pending"}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <textarea
                    className="table-input"
                    placeholder={c.adminReply ? `Sent: ${c.adminReply}` : "Type your response..."}
                    value={replies[c._id] || ""}
                    onChange={(e) => setReplies({ ...replies, [c._id]: e.target.value })}
                  />
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn primary" onClick={() => handleReplyStaff(c._id)}>Send</button>
                    {c.status !== "Resolved" && (
                      <button className="btn success" onClick={() => handleResolveStaff(c._id)}>Resolve</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
