import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const getLocalDate = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function DutySchedule() {
  const navigate = useNavigate();
  const [staffName, setStaffName] = useState(localStorage.getItem("staffName") || "");
  const [staffId, setStaffId] = useState(localStorage.getItem("staffId") || "");
  const today = getLocalDate();

  const [allDuties, setAllDuties] = useState([]);
  const [staffList, setStaffList] = useState([]);
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
          const byEmailRes = await fetch(`${API_BASE_URL}/api/staff/by-email/${encodeURIComponent(userEmail)}`);
          if (byEmailRes.ok) {
            const staffData = await byEmailRes.json();
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
      } catch (err) {
        // no-op
      }
      setStaffName("");
      return "";
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        await resolveStaffName();
        const [dutiesRes, staffRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/duties`),
          fetch(`${API_BASE_URL}/api/staff`),
        ]);
        if (!dutiesRes.ok) throw new Error("Failed to fetch duties");
        if (!staffRes.ok) throw new Error("Failed to fetch staff");

        const duties = await dutiesRes.json();
        const staff = await staffRes.json();
        setAllDuties(Array.isArray(duties) ? duties : []);
        setStaffList(Array.isArray(staff) ? staff : []);
      } catch (err) {
        setError(err.message || "Unable to load schedule");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const todayDuties = useMemo(
    () => allDuties.filter((d) => d.date === today),
    [allDuties, today]
  );

  const myAllDuties = useMemo(
    () =>
      allDuties.filter((d) => {
        const byId = staffId && d.staffId && String(d.staffId) === String(staffId);
        const byName = (d.staff || "").toLowerCase() === (staffName || "Staff").toLowerCase();
        return byId || byName;
      }),
    [allDuties, staffName, staffId]
  );

  const myDuty = useMemo(
    () =>
      todayDuties.filter((d) => {
        const byId = staffId && d.staffId && String(d.staffId) === String(staffId);
        const byName = (d.staff || "").toLowerCase() === (staffName || "Staff").toLowerCase();
        return byId || byName;
      }),
    [todayDuties, staffName, staffId]
  );
  const uniqueMyDuty = useMemo(() => {
    const seen = new Set();
    return myDuty.filter((d) => {
      const key = `${d.date || ""}|${d.role || ""}|${d.shift || ""}|${d.status || ""}|${d.staffId || d.staff || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [myDuty]);

  const uniqueMyAllDuties = useMemo(() => {
    const seen = new Set();
    return myAllDuties.filter((d) => {
      const key = `${d.date || ""}|${d.role || ""}|${d.shift || ""}|${d.status || ""}|${d.staffId || d.staff || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [myAllDuties]);

  const uniqueStaffList = useMemo(() => {
    const seen = new Set();
    return staffList.filter((staff) => {
      const key = String(staff?.name || "").trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [staffList]);

  const assignedTodayCount = uniqueMyDuty.length;
  const assignedAllCount = uniqueMyAllDuties.length;

  const recentAssigned = useMemo(
    () =>
      [...uniqueMyAllDuties]
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 5),
    [uniqueMyAllDuties]
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{ flex: 1, padding: "40px 60px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
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

        <h2 style={{ color: "#333" }}>Duty Schedule</h2>

        {loading && <p>Loading duties...</p>}
        {error && <p style={{ color: "#dc2626", fontWeight: 600 }}>{error}</p>}

        {!loading && !error && (
          <>
            <div
              style={{
                marginTop: "16px",
                marginBottom: "24px",
                backgroundColor: "#e2e8f0",
                color: "#0f172a",
                borderRadius: "10px",
                padding: "12px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 700,
              }}
            >
              <span>Duty Assigned (Today):</span>
              <span style={{ background: "#1e293b", color: "#fff", borderRadius: "999px", padding: "2px 10px" }}>
                {assignedTodayCount}
              </span>
              <span style={{ color: "#475569", fontWeight: 600 }}>
                All Dates: {assignedAllCount}
              </span>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h3 style={{ color: "#333" }}>My Duty (Today)</h3>
              {uniqueMyDuty.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {uniqueMyDuty.map((d) => (
                    <li key={d._id} style={{ marginBottom: "8px", fontSize: "16px", color: "#444" }}>
                      <span style={{ marginRight: "8px" }}>•</span>
                      <strong>{d.role}</strong> ({d.shift}) - {d.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#d9534f", fontWeight: "bold" }}>No duty assigned for you today.</p>
              )}
            </div>

            <div style={{ marginTop: "24px" }}>
              <h3 style={{ color: "#333" }}>My Assigned Duties (All Dates)</h3>
              {recentAssigned.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {recentAssigned.map((d) => (
                    <li key={d._id} style={{ marginBottom: "8px", fontSize: "16px", color: "#444" }}>
                      <span style={{ marginRight: "8px" }}>•</span>
                      <strong>{d.date}</strong> - {d.role} ({d.shift}) - {d.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#d9534f", fontWeight: "bold" }}>No duties found for your profile.</p>
              )}
            </div>

            <div style={{ marginTop: "40px" }}>
              <h3 style={{ color: "#333", marginBottom: "15px" }}>All Staff Duties (Today)</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>Staff Name</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Duties</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueStaffList.map((staff) => {
                    const duties = todayDuties.filter((d) => d.staff === staff.name);
                    return (
                      <tr key={staff._id || staff.name} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={tdStyle}>{staff.name}</td>
                        <td style={tdStyle}>{staff.role}</td>
                        <td style={tdStyle}>
                          {duties.length > 0
                            ? duties.map((d) => `${d.shift} - ${d.status}`).join(", ")
                            : <span style={{ color: "#999", fontStyle: "italic" }}>No duty assigned</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "15px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
  color: "#555",
  fontWeight: "600",
  fontSize: "14px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "15px",
  verticalAlign: "top",
  fontSize: "14px",
  color: "#444",
};
