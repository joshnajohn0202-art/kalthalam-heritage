import { useEffect, useMemo, useState } from "react";
import API from "../../service/api";
import "./MyBookings.css";

const MyBookings = () => {
  const fixedCottageOptions = ["Deluxe Cottage", "Premium Villa"];
  const fixedAddonOptions = [
    "Airport Pickup",
    "Romantic Dinner",
    "Adventure Tour",
    "Breakfast Upgrade",
    "Photography Session",
    "Tourist Places Visit",
  ];
  const [bookings, setBookings] = useState([]);
  const [packageSummary, setPackageSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState("");
  const [editCottage, setEditCottage] = useState("");
  const [editCheckIn, setEditCheckIn] = useState("");
  const [editCheckOut, setEditCheckOut] = useState("");
  const [editPackageList, setEditPackageList] = useState([]);
  const [editAddonList, setEditAddonList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [catalogCottages, setCatalogCottages] = useState([]);
  const [catalogPackages, setCatalogPackages] = useState([]);
  const [catalogAddons, setCatalogAddons] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || "";
        const res = await API.get("/bookings", { params: { email: userEmail } });
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCatalog = async () => {
      try {
        const [packagesRes, addonsRes, cottagesRes] = await Promise.all([
          API.get("/catalog/packages"),
          API.get("/catalog/addons"),
          API.get("/catalog/cottages"),
        ]);
        setCatalogPackages(
          (Array.isArray(packagesRes.data) ? packagesRes.data : []).map((item) => item?.name).filter(Boolean)
        );
        setCatalogAddons(
          Array.from(
            new Set([
              ...fixedAddonOptions,
              ...(Array.isArray(addonsRes.data) ? addonsRes.data : [])
                .map((item) => item?.name)
                .filter(Boolean),
            ])
          )
        );
        setCatalogCottages(
          (Array.isArray(cottagesRes.data) ? cottagesRes.data : [])
            .map((item) => item?.name)
            .filter((name) => fixedCottageOptions.includes(name))
        );
      } catch (err) {
        setCatalogPackages([]);
        setCatalogAddons(fixedAddonOptions);
        setCatalogCottages([]);
      }
    };

    const storedSummary = JSON.parse(localStorage.getItem("selectedPackageSummary") || "{}");
    setPackageSummary(storedSummary && typeof storedSummary === "object" ? storedSummary : {});
    fetchBookings();
    fetchCatalog();
  }, []);

  const selectedCottages = Array.isArray(packageSummary.cottages) ? packageSummary.cottages : [];
  const selectedPackages = Array.isArray(packageSummary.travelPackages)
    ? packageSummary.travelPackages
    : [];
  const selectedAddons = Array.isArray(packageSummary.addons) ? packageSummary.addons : [];

  const packageNames = selectedPackages.map((item) => item?.name).filter(Boolean).join(", ");
  const addonNames = selectedAddons.map((item) => item?.name).filter(Boolean).join(", ");
  const defaultCottage = selectedCottages[0]?.name || "-";

  const toListText = (value, fallback = "-") => {
    if (Array.isArray(value)) {
      const list = value
        .map((item) => (typeof item === "string" ? item : item?.name))
        .filter(Boolean);
      return list.length > 0 ? list.join(", ") : fallback;
    }
    if (typeof value === "string" && value.trim()) return value.trim();
    return fallback;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
  };

  const toInputDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const rows = useMemo(() => {
    if (bookings.length > 0) {
      return bookings.map((booking, idx) => {
        const dateText =
          booking?.date ||
          (booking?.checkIn && booking?.checkOut
            ? `${formatDate(booking.checkIn)} to ${formatDate(booking.checkOut)}`
            : formatDate(booking?.checkIn));

        return {
          key: booking?._id || `${booking?.cottage || "booking"}-${idx}`,
          id: booking?._id || "",
          cottage: booking?.cottage || defaultCottage,
          date: dateText,
          packages: toListText(booking?.packages, packageNames || "-"),
          addons: toListText(booking?.addons, addonNames || "-"),
          status: booking?.status || "Pending",
        };
      });
    }

    if (defaultCottage !== "-" || packageNames || addonNames) {
      return [
        {
          key: "selected-summary",
          id: "",
          cottage: defaultCottage,
          date: "-",
          packages: packageNames || "-",
          addons: addonNames || "-",
          status: "Selected",
        },
      ];
    }

    return [];
  }, [addonNames, bookings, defaultCottage, packageNames, formatDate, toListText]);

  const handleView = (row) => {
    alert(
      `Cottage: ${row.cottage}\nDate: ${row.date}\nPackages: ${row.packages}\nAdd-ons: ${row.addons}\nStatus: ${row.status}`
    );
  };

  const startEdit = (bookingId) => {
    if (!bookingId) return;
    const booking = bookings.find((item) => item._id === bookingId);
    if (!booking) return;

    setEditingId(bookingId);
    setEditCottage(booking.cottage || "");
    setEditCheckIn(toInputDate(booking.checkIn));
    setEditCheckOut(toInputDate(booking.checkOut));
    setEditPackageList(Array.isArray(booking.packages) ? booking.packages.filter(Boolean) : []);
    setEditAddonList(Array.isArray(booking.addons) ? booking.addons.filter(Boolean) : []);
    setIsEditModalOpen(true);
  };

  const cancelEdit = () => {
    setEditingId("");
    setEditCottage("");
    setEditCheckIn("");
    setEditCheckOut("");
    setEditPackageList([]);
    setEditAddonList([]);
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async (id) => {
    if (!id) return;
    if (!editCottage || !editCheckIn || !editCheckOut) {
      alert("Please select cottage and dates.");
      return;
    }

    try {
      const res = await API.patch(`/bookings/${id}`, {
        cottage: editCottage,
        checkIn: editCheckIn,
        checkOut: editCheckOut,
        packages: editPackageList,
        addons: editAddonList,
      });
      const updated = res?.data?.booking;
      if (updated) {
        setBookings((prev) => prev.map((item) => (item._id === id ? updated : item)));
      }
      cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking.");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Delete this booking?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((item) => item._id !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete booking.");
    }
  };

  return (
    <div className="mybookings-page">
      <div className="mybookings-header">
        <div className="mybookings-title">
          <h2>My Bookings</h2>
        </div>
        <p>
          View only your selected or booked cottage, packages, and add-ons here.
        </p>
      </div>

      {isLoading ? (
        <div className="mybookings-empty-wrap">
          <p className="mybookings-empty">Loading bookings...</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="mybookings-empty-wrap">
          <p className="mybookings-empty">No booked cottage, package, or add-on found yet.</p>
        </div>
      ) : (
        <div className="mybookings-table">
          <div className="mybookings-row mybookings-head">
            <span>Cottage</span>
            <span>Date</span>
            <span>Packages</span>
            <span>Add-ons</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {rows.map((row) => (
            <div className="mybookings-row" key={row.key}>
              <span>{row.cottage}</span>
              <span>{row.date}</span>
              <span>{row.packages}</span>
              <span>{row.addons}</span>
              <span className="status-pill">{row.status}</span>
              <span className="actions">
                <button className="btn-view" type="button" onClick={() => handleView(row)}>
                  View
                </button>
                <button
                  className="btn-edit"
                  type="button"
                  disabled={!row.id}
                  onClick={() => startEdit(row.id)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  type="button"
                  disabled={!row.id}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Booking</h3>

            <label className="modal-field">
              <span>Cottage</span>
              <select value={editCottage} onChange={(e) => setEditCottage(e.target.value)}>
                <option value="">Choose cottage</option>
                {Array.from(
                  new Set([...fixedCottageOptions, ...catalogCottages, editCottage].filter(Boolean))
                ).map((name) => (
                  <option key={`cottage-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="modal-field">
              <span>Check-in Date</span>
              <input type="date" value={editCheckIn} onChange={(e) => setEditCheckIn(e.target.value)} />
            </label>

            <label className="modal-field">
              <span>Check-out Date</span>
              <input type="date" value={editCheckOut} onChange={(e) => setEditCheckOut(e.target.value)} />
            </label>

            <label className="modal-field">
              <span>Packages (dropdown)</span>
              <select
                value={editPackageList[0] || ""}
                onChange={(e) =>
                  setEditPackageList(e.target.value ? [e.target.value] : [])
                }
              >
                <option value="">Choose package</option>
                {Array.from(new Set([...catalogPackages, ...editPackageList].filter(Boolean))).map((name) => (
                  <option key={`pkg-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="modal-field">
              <span>Add-ons (dropdown)</span>
              <select
                value={editAddonList[0] || ""}
                onChange={(e) =>
                  setEditAddonList(e.target.value ? [e.target.value] : [])
                }
              >
                <option value="">Choose add-on</option>
                {Array.from(new Set([...catalogAddons, ...editAddonList].filter(Boolean))).map((name) => (
                  <option key={`addon-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <div className="modal-actions">
              <button className="modal-close" type="button" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="modal-close" type="button" onClick={() => handleSaveEdit(editingId)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
