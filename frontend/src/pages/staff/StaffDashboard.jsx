import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [staffName, setStaffName] = useState(localStorage.getItem("staffName") || "");
  const [staffId, setStaffId] = useState(localStorage.getItem("staffId") || "");
  const [duties, setDuties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const resolveStaffName = async () => {
      const storedName = localStorage.getItem("staffName");
      if (storedName) {
        setStaffName(storedName);
        return storedName;
      }

      const userEmail = localStorage.getItem("userEmail");
      try {
        if (userEmail) {
          const resByEmail = await fetch(`${API_BASE_URL}/api/staff/by-email/${encodeURIComponent(userEmail)}`);
          if (resByEmail.ok) {
            const staffData = await resByEmail.json();
            if (staffData?.name) {
              localStorage.setItem("staffName", staffData.name);
              setStaffName(staffData.name);
              if (staffData?._id) {
                localStorage.setItem("staffId", staffData._id);
                setStaffId(staffData._id);
              }
              return staffData.name;
            }
          }
        }

        const resAll = await fetch(`${API_BASE_URL}/api/staff`);
        if (resAll.ok) {
          const staffList = await resAll.json();
          const firstName = Array.isArray(staffList) && staffList[0]?.name ? staffList[0].name : "";
          if (firstName) {
            localStorage.setItem("staffName", firstName);
            setStaffName(firstName);
            if (staffList[0]?._id) {
              localStorage.setItem("staffId", staffList[0]._id);
              setStaffId(staffList[0]._id);
            }
            return firstName;
          }
        }
      } catch (err) {
        // keep empty and show a generic label below
      }

      setStaffName("");
      return "";
    };

    const fetchDuties = async () => {
      try {
        setLoading(true);
        setError("");
        await resolveStaffName();
        const res = await fetch(`${API_BASE_URL}/api/duties`);
        if (!res.ok) throw new Error("Failed to load duties");
        const data = await res.json();
        setDuties(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load dashboard");
        setDuties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDuties();
  }, []);

  const displayName = staffName || "Staff";

  const myDuties = useMemo(
    () =>
      duties.filter((d) => {
        const byId = staffId && d.staffId && String(d.staffId) === String(staffId);
        const byName = (d.staff || "").toLowerCase() === displayName.toLowerCase();
        return byId || byName;
      }),
    [duties, displayName, staffId]
  );

  const pendingCount = myDuties.filter(
    (d) => d.status === "Pending" || d.status === "Assigned" || d.status === "In Progress"
  ).length;
  const completedCount = myDuties.filter((d) => d.status === "Completed").length;

  const recentDuties = [...myDuties]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5);

  return (
    <div style={pageWrapper}>
      <div style={contentContainer}>
        <h1>Welcome, {displayName}</h1>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
          <img
            src="/demo/alice-avatar.svg"
            alt="Profile"
            style={{ width: "80px", height: "80px", borderRadius: "50%", marginRight: "20px" }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{displayName}</h2>
            <p style={{ margin: 0, color: "#64748b" }}>Staff Member</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "30px", width: "100%", flexWrap: "wrap" }}>
          <SummaryCard title="My Duties" value={myDuties.length} color="#2563eb" />
          <SummaryCard title="Pending Tasks" value={pendingCount} color="#f59e0b" />
          <SummaryCard title="Completed Tasks" value={completedCount} color="#10b981" />
        </div>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
          <ActionButton label="Duty Schedule" onClick={() => navigate("/staff/duty-schedule")} />
          <ActionButton label="Report Maintenance" onClick={() => navigate("/staff/maintenance")} />
          <ActionButton label="Raise Complaint" onClick={() => navigate("/staff/complaints")} />
        </div>

        {loading && <p>Loading dashboard...</p>}
        {error && <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>}

        {!loading && !error && (
          <div style={{ width: "100%" }}>
            <h3>Recent Duties</h3>
            {recentDuties.length === 0 ? (
              <p>No duties assigned yet.</p>
            ) : (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Shift</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDuties.map((duty) => (
                    <tr key={duty._id}>
                      <td style={tdStyle}>{duty.role}</td>
                      <td style={tdStyle}>{duty.shift}</td>
                      <td style={tdStyle}>{duty.date}</td>
                      <td style={{ ...tdStyle, fontWeight: "bold" }}>{duty.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const SummaryCard = ({ title, value, color }) => (
  <div
    style={{
      backgroundColor: color,
      color: "#fff",
      padding: "20px",
      borderRadius: "12px",
      flex: 1,
      minWidth: "180px",
      textAlign: "center",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }}
  >
    <p style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "500" }}>{title}</p>
    <h2 style={{ margin: 0, fontSize: "28px" }}>{value}</h2>
  </div>
);

const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "12px 20px",
      backgroundColor: "#1e293b",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    }}
  >
    {label}
  </button>
);

const pageWrapper = {
  padding: "40px",
  backgroundColor: "#f4f7fe",
  minHeight: "100vh",
};

const contentContainer = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  marginTop: "15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const thStyle = {
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  textAlign: "left",
  color: "#64748b",
  fontWeight: "600",
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
  color: "#334155",
};
