import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import API from "../../service/api";
import "./BookingRequest.css";
import resortImage1 from "../../assets/cottages/resort.webp";
import resortImage2 from "../../assets/cottages/resort2.webp";
import resortImage3 from "../../assets/cottages/c1-1.webp";

const ALLOWED_COTTAGE_NAMES = ["Deluxe Cottage", "Premium Villa"];
const DEFAULT_ADDONS = [
  { id: 1, name: "Airport Pickup" },
  { id: 3, name: "Romantic Dinner" },
  { id: 4, name: "Adventure Tour" },
  { id: 5, name: "Breakfast Upgrade" },
  { id: 6, name: "Photography Session" },
  { id: 7, name: "Tourist Places Visit" },
];

export default function BookingRequest() {
  const navigate = useNavigate();

  const [addonOptions, setAddonOptions] = useState([]);
  const [catalogCottages, setCatalogCottages] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedCottage, setSelectedCottage] = useState("");
  const [availableCottages, setAvailableCottages] = useState([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [isAddonDropdownOpen, setIsAddonDropdownOpen] = useState(false);
  const addonDropdownRef = useRef(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [addonsRes, cottagesRes] = await Promise.all([
          API.get("/catalog/addons"),
          API.get("/catalog/cottages"),
        ]);

        const addons = (Array.isArray(addonsRes.data) ? addonsRes.data : [])
          .map((item) => ({ id: Number(item.id), name: item.name }))
          .filter((item) => Number.isFinite(item.id) && item.name);

        const cottages = (Array.isArray(cottagesRes.data) ? cottagesRes.data : [])
          .map((item) => ({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price || 0),
            type: "cottage",
          }))
          .filter(
            (item) =>
              Number.isFinite(item.id) &&
              item.name &&
              ALLOWED_COTTAGE_NAMES.includes(item.name)
          );

        setAddonOptions(addons.length ? addons : DEFAULT_ADDONS);
        setCatalogCottages(cottages);
      } catch (err) {
        setAddonOptions(DEFAULT_ADDONS);
        setCatalogCottages([]);
      }
    };

    fetchCatalog();
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("selectedCottages") || "[]");
    const normalizedStored = Array.isArray(stored)
      ? stored
          .map((item) => ({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price || 0),
            type: "cottage",
          }))
          .filter((item) => Number.isFinite(item.id) && item.name)
      : [];

    const normalized = normalizedStored.length > 0 ? normalizedStored : catalogCottages;

    setAvailableCottages(normalized);
    setSelectedCottage((prev) => (prev && normalized.some((c) => c.name === prev) ? prev : (normalized[0]?.name || "")));

    if (normalized.length > 0 && normalizedStored.length === 0) {
      localStorage.setItem("selectedCottages", JSON.stringify(normalized));
    }
  }, [catalogCottages]);

  useEffect(() => {
    const storedAddonIds = JSON.parse(localStorage.getItem("selectedAddons") || "[]")
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id));
    setSelectedAddonIds(storedAddonIds);
  }, []);

  useEffect(() => {
    if (selectedAddonIds.length === 0) return;
    const valid = selectedAddonIds.filter((id) =>
      addonOptions.some((a) => a.id === Number(id))
    );
    if (valid.length !== selectedAddonIds.length) {
      setSelectedAddonIds(valid);
      localStorage.setItem("selectedAddons", JSON.stringify(valid));
    }
  }, [addonOptions, selectedAddonIds]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!addonDropdownRef.current) return;
      if (!addonDropdownRef.current.contains(event.target)) {
        setIsAddonDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (availableCottages.length === 0) {
      alert("Please select a cottage from Cottage page before booking.");
      navigate("/user/cottage");
      return;
    }

    const selectedPackageSummary = JSON.parse(
      localStorage.getItem("selectedPackageSummary") || "{}"
    );
    const selectedAddonNamesFromSummary = Array.isArray(selectedPackageSummary?.addons)
      ? selectedPackageSummary.addons.map((addon) => addon?.name).filter(Boolean)
      : [];
    const selectedAddonNamesFromBooking = selectedAddonIds
      .map((id) => addonOptions.find((a) => a.id === Number(id))?.name)
      .filter(Boolean);
    const selectedAddonNames = Array.from(
      new Set([...selectedAddonNamesFromSummary, ...selectedAddonNamesFromBooking])
    );
    const selectedPackageNames = Array.isArray(selectedPackageSummary?.travelPackages)
      ? selectedPackageSummary.travelPackages.map((pkg) => pkg?.name).filter(Boolean)
      : [];
    const computedGrandTotal = Number(selectedPackageSummary?.totals?.grandTotal || 0);

    try {
      const email = localStorage.getItem("userEmail") || "";
      const guestName =
        localStorage.getItem("userName") ||
        localStorage.getItem("name") ||
        (email ? email.split("@")[0] : "Guest");

      await API.post("/bookings", {
        guestName,
        email,
        cottage: selectedCottage,
        checkIn,
        checkOut,
        guests: Math.max(1, Number(guests) || 1),
        addons: selectedAddonNames,
        packages: selectedPackageNames,
        totalAmount: computedGrandTotal > 0 ? computedGrandTotal : undefined,
        serviceDate: checkIn,
        status: "Pending",
      });

      alert("Booking successful");
      navigate("/user/my-bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed. Try again.");
    }
  };

  const selectedAddonNames = addonOptions
    .filter((addon) => selectedAddonIds.includes(Number(addon.id)))
    .map((addon) => addon.name);

  return (
    <div className="booking-page">
      <section className="booking-gallery">
        <div className="booking-gallery-header">
          <h2>Resort Highlights</h2>
          <p>Take a quick look at the cottages and surroundings before booking.</p>
        </div>
        <div className="booking-gallery-grid">
          {[resortImage1, resortImage2, resortImage3].map((src, idx) => (
            <div className="booking-gallery-card" key={`resort-${idx}`}>
              <img src={src} alt={`Kalthalam Heritage resort ${idx + 1}`} />
            </div>
          ))}
        </div>
      </section>
      <div className="booking-card">
        <div className="booking-header">
          <h2>Booking Request</h2>
          <p>Select cottage and dates to confirm your booking.</p>
        </div>

        {availableCottages.length === 0 && (
          <div className="booking-empty-state">
            <p>Please select a cottage first to continue booking.</p>
            <button type="button" className="booking-submit" onClick={() => navigate("/user/cottage")}>
              Go to Cottage
            </button>
          </div>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <label className="booking-field">
            <span>Choose Cottage</span>
            <select value={selectedCottage} onChange={(e) => setSelectedCottage(e.target.value)} required>
              {availableCottages.map((cottage) => (
                <option key={cottage.id || cottage.name} value={cottage.name}>
                  {cottage.name}
                </option>
              ))}
            </select>
          </label>

          <label className="booking-field">
            <span>Check-in Date</span>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
          </label>

          <label className="booking-field">
            <span>Check-out Date</span>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
          </label>

          <label className="booking-field">
            <span>Number of Guests</span>
            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </label>

          <label className="booking-field">
            <span>Selected Add-ons</span>
            <div className="booking-multi-dropdown" ref={addonDropdownRef}>
              <button
                type="button"
                className="booking-multi-trigger"
                onClick={() => setIsAddonDropdownOpen((prev) => !prev)}
                aria-expanded={isAddonDropdownOpen}
              >
                {selectedAddonNames.length > 0
                  ? selectedAddonNames.join(", ")
                  : "Choose add-ons"}
              </button>

              {isAddonDropdownOpen && (
                <div className="booking-multi-menu">
                  {addonOptions.length === 0 ? (
                    <p className="booking-addon-empty">No add-ons available.</p>
                  ) : (
                    addonOptions.map((addon) => {
                      const checked = selectedAddonIds.includes(Number(addon.id));
                      return (
                        <label key={addon.id} className="booking-addon-item">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...selectedAddonIds, Number(addon.id)]
                                : selectedAddonIds.filter((id) => id !== Number(addon.id));
                              setSelectedAddonIds(next);
                              localStorage.setItem("selectedAddons", JSON.stringify(next));
                            }}
                          />
                          <span>{addon.name}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </label>

          <button className="booking-submit" type="submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
