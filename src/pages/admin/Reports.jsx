import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API from "../../service/api";

const APPROVED_STATUSES = ["Approved", "Completed"];
const REJECTED_STATUSES = ["Rejected", "Cancelled"];

const normalizeStatus = (status) => {
  const value = String(status || "").trim();
  if (APPROVED_STATUSES.includes(value)) return "Approved";
  if (REJECTED_STATUSES.includes(value)) return "Rejected";
  return "Pending";
};

const toDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getBookingDate = (booking) => {
  return (
    toDate(booking?.createdAt) ||
    toDate(booking?.serviceDate) ||
    toDate(booking?.checkIn) ||
    null
  );
};

const getGuestName = (booking) =>
  booking?.user?.name ||
  booking?.guestName ||
  booking?.user?.email ||
  booking?.email ||
  "N/A";

const getMoney = (booking) =>
  Number(booking?.totalAmount || booking?.totalPrice || booking?.amount || 0);

const formatDate = (value) => {
  const date = toDate(value);
  return date ? date.toLocaleDateString() : "N/A";
};

const formatInr = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportMode, setReportMode] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [fromDate, setFromDate] = useState("");
  const [toDateValue, setToDateValue] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/bookings");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch reports", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const yearOptions = useMemo(() => {
    const now = new Date().getFullYear();
    const dynamicYears = Array.from({ length: 7 }, (_, idx) => String(now - idx));
    const requiredYears = ["2025", "2024"];
    return Array.from(new Set([...requiredYears, ...dynamicYears])).sort((a, b) => Number(b) - Number(a));
  }, []);

  const filteredData = useMemo(() => {
    return [...data]
      .filter((item) => {
        const bookingDate = getBookingDate(item);
        if (!bookingDate) return false;
        const year = String(bookingDate.getFullYear());
        const month = String(bookingDate.getMonth() + 1).padStart(2, "0");

        if (reportMode === "monthly") {
          return year === selectedYear && month === selectedMonth;
        }
        if (reportMode === "yearly") {
          return year === selectedYear;
        }
        if (reportMode === "custom") {
          const from = fromDate ? new Date(fromDate) : null;
          const to = toDateValue ? new Date(toDateValue) : null;
          if (from && bookingDate < from) return false;
          if (to) {
            const end = new Date(to);
            end.setHours(23, 59, 59, 999);
            if (bookingDate > end) return false;
          }
          return true;
        }
        return true;
      })
      .sort((a, b) => (getBookingDate(b)?.getTime() || 0) - (getBookingDate(a)?.getTime() || 0));
  }, [data, reportMode, selectedYear, selectedMonth, fromDate, toDateValue]);

  const summary = useMemo(() => {
    const totalBookings = filteredData.length;
    const approvedCount = filteredData.filter(
      (item) => normalizeStatus(item.status) === "Approved"
    ).length;
    const rejectedCount = filteredData.filter(
      (item) => normalizeStatus(item.status) === "Rejected"
    ).length;
    const pendingCount = totalBookings - approvedCount - rejectedCount;
    const totalRevenue = filteredData.reduce((sum, item) => sum + getMoney(item), 0);
    const averageBookingValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;
    const occupancyRate = totalBookings > 0 ? ((approvedCount / totalBookings) * 100).toFixed(1) : "0.0";

    const guestCounter = filteredData.reduce((acc, item) => {
      const guest = getGuestName(item).toLowerCase();
      if (!guest || guest === "n/a") return acc;
      acc[guest] = (acc[guest] || 0) + 1;
      return acc;
    }, {});
    const repeatGuests = Object.values(guestCounter).filter((count) => count > 1).length;
    const newGuests = Object.values(guestCounter).filter((count) => count === 1).length;

    const topCottages = Object.entries(
      filteredData.reduce((acc, item) => {
        const name = String(item?.cottage || "N/A");
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const topPackages = Object.entries(
      filteredData.reduce((acc, item) => {
        const list = Array.isArray(item?.packages) ? item.packages : [];
        list.forEach((name) => {
          const key = String(name || "").trim();
          if (!key) return;
          acc[key] = (acc[key] || 0) + 1;
        });
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      totalBookings,
      approvedCount,
      pendingCount,
      rejectedCount,
      totalRevenue,
      averageBookingValue,
      occupancyRate,
      repeatGuests,
      newGuests,
      topCottages,
      topPackages,
    };
  }, [filteredData]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await API.patch(`/admin/bookings/${bookingId}/status`, { status: newStatus });
      setData((prev) => prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b)));
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await API.delete(`/admin/bookings/${bookingId}`);
      setData((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Kalthalam Heritage - Resort Report", 14, 14);
      doc.setFontSize(11);
      doc.text(
        `Mode: ${reportMode.toUpperCase()} | Period: ${
          reportMode === "monthly"
            ? `${selectedYear}-${selectedMonth}`
            : reportMode === "yearly"
              ? selectedYear
              : `${fromDate || "Start"} to ${toDateValue || "End"}`
        }`,
        14,
        22
      );
      doc.text(
        `Bookings: ${summary.totalBookings} | Revenue: ${formatInr(summary.totalRevenue)} | Occupancy: ${summary.occupancyRate}%`,
        14,
        28
      );

      const tableColumn = ["#", "Guest", "Cottage", "Check-in", "Check-out", "Amount", "Status", "Booked On"];
      const tableRows = filteredData.map((item, index) => [
        index + 1,
        getGuestName(item),
        item?.cottage || "N/A",
        formatDate(item?.checkIn),
        formatDate(item?.checkOut),
        formatInr(getMoney(item)),
        normalizeStatus(item?.status),
        formatDate(getBookingDate(item)),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 34,
        styles: { fontSize: 9 },
      });

      doc.save(`Resort_Report_${Date.now()}.pdf`);
      alert("Reports downloaded successfully");
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to download PDF report");
    }
  };

  return (
    <div className="admin-page" style={styles.page}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>Kalthalam Heritage - Resort Booking Reports</h2>
        <button
          type="button"
          onClick={downloadPDF}
          style={styles.downloadBtn}
        >
          Download PDF Report
        </button>
      </div>

      <div style={styles.filterCard}>
        <div style={styles.filterGrid}>
          <label style={styles.filterItem}>
            Report Type
            <select value={reportMode} onChange={(e) => setReportMode(e.target.value)} style={styles.input}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
          </label>

          <label style={styles.filterItem}>
            Year
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={styles.input}>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          {reportMode === "monthly" && (
            <label style={styles.filterItem}>
              Month
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={styles.input}>
                {Array.from({ length: 12 }, (_, idx) => {
                  const value = String(idx + 1).padStart(2, "0");
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </label>
          )}

          {reportMode === "custom" && (
            <>
              <label style={styles.filterItem}>
                From
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={styles.input} />
              </label>
              <label style={styles.filterItem}>
                To
                <input type="date" value={toDateValue} onChange={(e) => setToDateValue(e.target.value)} style={styles.input} />
              </label>
            </>
          )}
        </div>
      </div>

      <div style={styles.kpiGrid}>
        <KpiCard title="Total Bookings" value={summary.totalBookings} tone="#0f172a" />
        <KpiCard title="Total Revenue" value={formatInr(summary.totalRevenue)} tone="#0b7a43" />
        <KpiCard title="Occupancy" value={`${summary.occupancyRate}%`} tone="#1d4ed8" />
        <KpiCard title="Avg Booking Value" value={formatInr(summary.averageBookingValue)} tone="#7c3aed" />
        <KpiCard title="Pending" value={summary.pendingCount} tone="#b45309" />
        <KpiCard title="Approved" value={summary.approvedCount} tone="#16a34a" />
        <KpiCard title="Rejected" value={summary.rejectedCount} tone="#dc2626" />
        <KpiCard title="Repeat Guests" value={summary.repeatGuests} tone="#0f766e" />
      </div>

      <div style={styles.splitGrid}>
        <div style={styles.analysisCard}>
          <h4 style={styles.analysisTitle}>Top Cottages</h4>
          {summary.topCottages.length === 0 ? (
            <p style={styles.empty}>No data in selected period.</p>
          ) : (
            summary.topCottages.map(([name, count]) => (
              <p key={name} style={styles.analysisItem}>
                {name}: <strong>{count}</strong>
              </p>
            ))
          )}
        </div>
        <div style={styles.analysisCard}>
          <h4 style={styles.analysisTitle}>Top Packages</h4>
          {summary.topPackages.length === 0 ? (
            <p style={styles.empty}>No package data in selected period.</p>
          ) : (
            summary.topPackages.map(([name, count]) => (
              <p key={name} style={styles.analysisItem}>
                {name}: <strong>{count}</strong>
              </p>
            ))
          )}
          <p style={{ ...styles.analysisItem, marginTop: "10px" }}>
            New Guests: <strong>{summary.newGuests}</strong>
          </p>
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table width="100%" style={styles.table}>
          <thead>
            <tr style={styles.headRow}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Guest</th>
              <th style={styles.th}>Cottage</th>
              <th style={styles.th}>Check-in</th>
              <th style={styles.th}>Check-out</th>
              <th style={styles.th}>Booked On</th>
              <th style={styles.th}>Amount</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Status Actions</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Delete</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={styles.emptyCell}>Loading...</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" style={styles.emptyCell}>No reports available for selected period</td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                const normalized = normalizeStatus(item.status);
                return (
                  <tr key={item._id} style={styles.bodyRow}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{getGuestName(item)}</td>
                    <td style={styles.td}>{item?.cottage || "N/A"}</td>
                    <td style={styles.td}>{formatDate(item?.checkIn)}</td>
                    <td style={styles.td}>{formatDate(item?.checkOut)}</td>
                    <td style={styles.td}>{formatDate(getBookingDate(item))}</td>
                    <td style={styles.td}>{formatInr(getMoney(item))}</td>

                    <td style={styles.td}>
                      <div style={styles.statusWrap}>
                        {["Pending", "Approved", "Rejected"].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusUpdate(item._id, status)}
                            style={{
                              ...styles.statusBtn,
                              backgroundColor:
                                normalized === status
                                  ? status === "Approved"
                                    ? "#22c55e"
                                    : status === "Rejected"
                                      ? "#ef4444"
                                      : "#eab308"
                                  : "#f1f5f9",
                              color: normalized === status ? "white" : "#64748b",
                            }}
                          >
                            {status.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </td>

                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <button onClick={() => handleDelete(item._id)} style={styles.deleteBtn}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KpiCard({ title, value, tone }) {
  return (
    <div style={styles.kpiCard}>
      <p style={styles.kpiTitle}>{title}</p>
      <h3 style={{ ...styles.kpiValue, color: tone }}>{value}</h3>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    display: "grid",
    gap: "16px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  heading: { color: "#1e293b", margin: 0 },
  downloadBtn: {
    padding: "10px 18px",
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  filterCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "14px",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  filterItem: {
    display: "grid",
    gap: "6px",
    fontSize: "13px",
    color: "#334155",
    fontWeight: 600,
  },
  input: {
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "8px 10px",
    background: "#f8fafc",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  kpiCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "14px",
  },
  kpiTitle: { margin: 0, color: "#64748b", fontSize: "13px", fontWeight: 600 },
  kpiValue: { margin: "8px 0 0 0", fontSize: "22px" },
  splitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "12px",
  },
  analysisCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "14px",
  },
  analysisTitle: { margin: "0 0 10px 0", color: "#1e293b" },
  analysisItem: { margin: "4px 0", color: "#334155" },
  empty: { margin: 0, color: "#64748b" },
  tableWrap: {
    overflowX: "auto",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
  },
  table: {
    borderCollapse: "collapse",
    minWidth: "1080px",
  },
  headRow: { borderBottom: "2px solid #e2e8f0" },
  th: { padding: "12px", textAlign: "left", color: "#1e293b" },
  bodyRow: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "12px", color: "#334155", verticalAlign: "top" },
  emptyCell: { textAlign: "center", padding: "20px", color: "#64748b" },
  statusWrap: { display: "flex", gap: "5px", justifyContent: "center", flexWrap: "wrap" },
  statusBtn: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "bold",
  },
  deleteBtn: {
    padding: "7px 14px",
    backgroundColor: "#334155",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "11px",
  },
};
