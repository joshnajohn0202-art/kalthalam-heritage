import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";
import { touristPlaces } from "./NearbySpots";
import "./PackagesAddons.css";

const ALLOWED_COTTAGE_NAMES = ["Deluxe Cottage", "Premium Villa"];
const SPOT_TRAVEL_EXPENSES = {
  "Padagiri View Point": 1200,
  "Thittumpuram View Point": 1000,
  "Avitis View Point": 900,
  "Kombankallu View Point": 1100,
  "Meenampara - Nelliyampathy Hill View Point 1": 1500,
  "Seetharkundu Viewpoint": 1600,
  "Nelliyampathy Falls": 1300,
  "Karapara Water Falls": 1700,
  "Charpa Waterfalls": 2200,
  "Thoomanam Waterfalls": 1800,
  "Mannathipara Waterfalls": 1400,
  "Vattayi Waterfalls": 1500,
  "Nellikulangara Bhagavathi Temple": 800,
  "Perungottukavu Bhagavathy Temple": 900,
  "Sree Dharmasastha Temple Trust": 850,
};
const SPECIAL_PACKAGES = [
  {
    id: "special-weekend-getaway",
    name: "Weekend Getaway",
    discount: 20,
    cottage: "Deluxe Cottage",
    originalPrice: 10000,
    price: 8000,
    nights: 2,
    highlights: ["Perfect for couples", "Flexible checkout", "Welcome drinks"],
    includes: ["Accommodation", "Breakfast", "WiFi", "Basic Amenities"],
  },
  {
    id: "special-romantic-escape",
    name: "Romantic Escape",
    discount: 18,
    cottage: "Premium Villa",
    originalPrice: 22000,
    price: 18000,
    nights: 3,
    highlights: ["Romantic dinner", "Rose petals & candles", "Exclusive experience"],
    includes: ["Accommodation", "All Meals", "Activities", "WiFi", "Special Decoration"],
  },
];
const DEFAULT_TRAVEL_PACKAGES = [
  {
    id: "pkg-onam-celebration",
    name: "Onam Celebration Offer",
    subtitle: "Festive traditional stay with special Kerala touches.",
    offerTag: "Onam Special",
    price: 3800,
    description: "Seasonal Onam plan with festive ambience and add-on support.",
    associatedAddons: [5, 7],
  },
  {
    id: "pkg-christmas-festive",
    name: "Christmas Festive Offer",
    subtitle: "Holiday lights, festive meals and cozy family moments.",
    offerTag: "Christmas Special",
    price: 4200,
    description: "Christmas-themed package with festive setup and activities.",
    associatedAddons: [3, 5],
  },
  {
    id: "pkg-vacation-family",
    name: "Vacation Family Offer",
    subtitle: "Flexible family vacation plan for weekends and school breaks.",
    offerTag: "Vacation Deal",
    price: 3600,
    description: "Budget-friendly family vacation package with flexible options.",
    associatedAddons: [1, 4],
  },
  {
    id: "pkg-summer-saver",
    name: "Summer Saver Offer",
    subtitle: "Value summer package with travel and activity savings.",
    offerTag: "Summer Offer",
    price: 2500,
    description: "Low-cost summer package for short comfortable getaways.",
    associatedAddons: [5],
  },
  {
    id: "pkg-weekend-comfort",
    name: "Weekend Comfort",
    subtitle: "Short weekend break with curated comfort inclusions.",
    price: 4500,
    description: "Relaxing weekend plan with curated comfort inclusions.",
    associatedAddons: [1],
  },
  {
    id: "pkg-family-joy",
    name: "Family Joy",
    subtitle: "Family-friendly stay plan with optional adventure add-ons.",
    price: 7000,
    description: "Family-focused package with flexible activity options.",
    associatedAddons: [4, 7],
  },
  {
    id: "pkg-romantic-retreat",
    name: "Romantic Retreat",
    subtitle: "Perfect couple stay with premium ambience options.",
    price: 8500,
    description: "Couple-centered stay setup with premium ambience.",
    associatedAddons: [3, 6],
  },
  {
    id: "pkg-premium-signature",
    name: "Premium Signature",
    subtitle: "Luxury-level package for premium resort experience.",
    price: 12000,
    description: "High-end package with premium resort experiences.",
    associatedAddons: [1, 3, 6],
  },
];
const DEFAULT_ADDONS = [
  { id: 1, name: "Airport Pickup", price: 500 },
  { id: 3, name: "Romantic Dinner", price: 2000 },
  { id: 4, name: "Adventure Tour", price: 1200 },
  { id: 5, name: "Breakfast Upgrade", price: 300 },
  { id: 6, name: "Photography Session", price: 2500 },
  { id: 7, name: "Tourist Places Visit", price: 1800 },
];
const DEFAULT_COTTAGES = [
  { id: 1, name: "Deluxe Cottage", price: 5000 },
  { id: 2, name: "Premium Villa", price: 10000 },
];
const TRAVEL_EXPERIENCES = [
  {
    id: 1,
    name: "Adventure Ridge Trek",
    spot: "Padagiri View Point",
    price: 2600,
    description: "Guided adventure trip across scenic hill trails.",
  },
  {
    id: 2,
    name: "Cliffline Adventure Walk",
    spot: "Seetharkundu Viewpoint",
    price: 2900,
    description: "Safety-supported trek with panoramic valley viewpoints.",
  },
  {
    id: 3,
    name: "Golden Hour Photo Shoot",
    spot: "Kombankallu View Point",
    price: 3400,
    description: "Professional outdoor photoshoot at sunset light.",
  },
  {
    id: 4,
    name: "Couple Memory Frames Session",
    spot: "Meenampara - Nelliyampathy Hill View Point 1",
    price: 3900,
    description: "Curated couple photoshoot with styled setup and props.",
  },
  {
    id: 5,
    name: "Waterfall Adventure Circuit",
    spot: "Nelliyampathy Falls + Karapara Water Falls",
    price: 4200,
    description: "Day trip covering waterfall trails with local guide.",
  },
  {
    id: 6,
    name: "Party Makeover Day",
    spot: "Avitis View Point",
    price: 4800,
    description: "Styling, makeup, and themed mini-shoot for group events.",
  },
];

const PackagesAddons = () => {
  const navigate = useNavigate();
  const [packageOptions, setPackageOptions] = useState([]);
  const [addonOptions, setAddonOptions] = useState([]);
  const [cottageOptions, setCottageOptions] = useState([]);
  const [spotOptions, setSpotOptions] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [plannedSpots, setPlannedSpots] = useState([]);
  const [selectedSpotIds, setSelectedSpotIds] = useState([]);
  const [selectedCottageIds, setSelectedCottageIds] = useState([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [selectedExperienceIds, setSelectedExperienceIds] = useState([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [packagesRes, addonsRes, cottagesRes, spotsRes] = await Promise.all([
          API.get("/catalog/packages"),
          API.get("/catalog/addons"),
          API.get("/catalog/cottages"),
          API.get("/catalog/spots"),
        ]);

        setPackageOptions(
          (() => {
            const apiPackages = (Array.isArray(packagesRes.data) ? packagesRes.data : []).map((item) => ({
            ...item,
            id: String(item.id ?? item._id),
            associatedAddons: (item.associatedAddons || [])
              .map((id) => Number(id))
              .filter((id) => Number.isFinite(id)),
            }));

            if (apiPackages.length === 0) return DEFAULT_TRAVEL_PACKAGES;

            const existingNames = new Set(
              apiPackages.map((pkg) => String(pkg.name || "").trim().toLowerCase())
            );
            const extraPackages = DEFAULT_TRAVEL_PACKAGES.filter(
              (pkg) => !existingNames.has(String(pkg.name || "").trim().toLowerCase())
            );
            return [...apiPackages, ...extraPackages];
          })()
        );
        const normalizedAddons = (Array.isArray(addonsRes.data) ? addonsRes.data : []).map((item) => ({
            ...item,
            id: Number(item.id ?? 0),
            price: Number(item.price || 0),
          }));
        setAddonOptions(normalizedAddons.length > 0 ? normalizedAddons : DEFAULT_ADDONS);
        const normalizedCottages = (Array.isArray(cottagesRes.data) ? cottagesRes.data : []).map((item) => ({
            ...item,
            id: Number(item.id ?? 0),
            price: Number(item.price || 0),
          }))
            .filter((item) => ALLOWED_COTTAGE_NAMES.includes(item.name));
        const cottageMap = new Map(
          DEFAULT_COTTAGES.map((item) => [String(item.name).trim().toLowerCase(), item])
        );
        normalizedCottages.forEach((item) => {
          cottageMap.set(String(item.name).trim().toLowerCase(), item);
        });
        setCottageOptions(Array.from(cottageMap.values()));
        setSpotOptions(
          (Array.isArray(spotsRes.data) ? spotsRes.data : []).map((item) => ({
            ...item,
            id: Number(item.id ?? 0),
            price: Number(item.price || 0),
          }))
        );
      } catch (err) {
        setPackageOptions(DEFAULT_TRAVEL_PACKAGES);
        setAddonOptions(DEFAULT_ADDONS);
        setCottageOptions(DEFAULT_COTTAGES);
        setSpotOptions([]);
      }
    };

    fetchCatalog();
  }, []);

  useEffect(() => {
    const packages = JSON.parse(
      localStorage.getItem("selectedTravelPackages") || "[]"
    );
    const addons = JSON.parse(
      localStorage.getItem("selectedAddons") || "[]"
    );
    const spots = JSON.parse(
      localStorage.getItem("selectedPackages") || "[]"
    );
    const cottages = JSON.parse(
      localStorage.getItem("selectedCottages") || "[]"
    );
    const experiences = JSON.parse(
      localStorage.getItem("selectedTravelExperiences") || "[]"
    );
    const normalizedPackageIds = packages.map((id) => String(id));
    const normalizedAddonIds = addons.map((id) => Number(id)).filter((id) => Number.isFinite(id));
    const normalizedSpots = spots
      .map((s) => ({ ...s, id: Number(s.id), price: Number(s.price || 0) }))
      .filter((s) => Number.isFinite(s.id));
    const normalizedSpotIds = normalizedSpots.map((s) => s.id);
    const normalizedCottageIds = cottages.map((c) => Number(c.id)).filter((id) => Number.isFinite(id));
    const normalizedExperienceIds = experiences
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id));

    setSelectedPackages(normalizedPackageIds);
    setPlannedSpots(normalizedSpots);
    setSelectedSpotIds(normalizedSpotIds);
    setSelectedCottageIds(normalizedCottageIds);
    setSelectedAddonIds(normalizedAddonIds);
    setSelectedExperienceIds(normalizedExperienceIds);
  }, []);

  const displayedSpots = useMemo(() => {
    return touristPlaces.map((place, index) => {
      const apiMatch = spotOptions.find(
        (spot) => String(spot.name || "").trim().toLowerCase() === place.name.trim().toLowerCase()
      );
      const mappedExpense = Number(SPOT_TRAVEL_EXPENSES[place.name] || 0);
      const apiExpense = Number(apiMatch?.price || 0);
      return {
        id: Number(apiMatch?.id ?? place.id ?? index + 1),
        name: place.name,
        price: apiExpense > 0 ? apiExpense : mappedExpense,
      };
    });
  }, [spotOptions]);

  const handleSpotToggle = (spot) => {
    setSelectedSpotIds((prev) => {
      const next = prev.includes(spot.id)
        ? prev.filter((id) => id !== spot.id)
        : [...prev, spot.id];

      const selectedSpots = displayedSpots
        .filter((s) => next.includes(s.id))
        .map((s) => ({
          id: s.id,
          name: s.name,
          price: s.price || 0,
        }));

      localStorage.setItem("selectedPackages", JSON.stringify(selectedSpots));
      setPlannedSpots(selectedSpots);
      return next;
    });
  };

  const togglePackage = (id) => {
    const packageId = String(id);
    const isSelecting = !selectedPackages.includes(packageId);
    const updatedPackages = selectedPackages.includes(packageId)
      ? selectedPackages.filter((item) => item !== packageId)
      : [...selectedPackages, packageId];
    setSelectedPackages(updatedPackages);
    localStorage.setItem("selectedTravelPackages", JSON.stringify(updatedPackages));

    const linkedAddonIds = packageOptions.find((p) => p.id === packageId)?.associatedAddons || [];
    if (isSelecting && linkedAddonIds.length > 0) {
      setSelectedAddonIds((prev) => {
        const merged = Array.from(new Set([...prev, ...linkedAddonIds.map((v) => Number(v))]));
        localStorage.setItem("selectedAddons", JSON.stringify(merged));
        return merged;
      });
    }
  };

  const handleAddonToggle = (addonId) => {
    setSelectedAddonIds((prev) => {
      const next = prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId];

      localStorage.setItem("selectedAddons", JSON.stringify(next));

      const linkedPackageIds = packageOptions
        .filter((pkg) =>
          (pkg.associatedAddons || []).some((id) => next.includes(Number(id)))
        )
        .map((pkg) => pkg.id);
      const nextPackages = Array.from(new Set([...selectedPackages, ...linkedPackageIds]));

      if (nextPackages.length !== selectedPackages.length) {
        setSelectedPackages(nextPackages);
        localStorage.setItem("selectedTravelPackages", JSON.stringify(nextPackages));
      }

      return next;
    });
  };

  const handleExperienceToggle = (experienceId) => {
    setSelectedExperienceIds((prev) => {
      const next = prev.includes(experienceId)
        ? prev.filter((id) => id !== experienceId)
        : [...prev, experienceId];
      localStorage.setItem("selectedTravelExperiences", JSON.stringify(next));
      return next;
    });
  };

  const handleCottageToggle = (cottageId) => {
    setSelectedCottageIds((prev) => {
      const next = prev.includes(cottageId)
        ? prev.filter((id) => id !== cottageId)
        : [...prev, cottageId];

      const updated = next
        .map((id) => cottageOptions.find((c) => c.id === id))
        .filter(Boolean);
      localStorage.setItem("selectedCottages", JSON.stringify(updated));

      return next;
    });
  };

  const packagesTotal = useMemo(() => {
    return packageOptions
      .filter((p) => selectedPackages.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  }, [selectedPackages, packageOptions]);

  const addonsTotal = useMemo(() => {
    return addonOptions
      .filter((a) => selectedAddonIds.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
  }, [selectedAddonIds, addonOptions]);

  const spotsTotal = useMemo(() => {
    return plannedSpots
      .filter((p) => selectedSpotIds.includes(p.id))
      .reduce((sum, p) => {
        const fallback = displayedSpots.find((t) => t.id === p.id);
        return sum + (p.price || fallback?.price || 0);
      }, 0);
  }, [plannedSpots, selectedSpotIds, displayedSpots]);

  const cottagesTotal = useMemo(() => {
    return cottageOptions
      .filter((c) => selectedCottageIds.includes(c.id))
      .reduce((sum, c) => sum + (c.price || 0), 0);
  }, [selectedCottageIds, cottageOptions]);

  const experiencesTotal = useMemo(() => {
    return TRAVEL_EXPERIENCES
      .filter((item) => selectedExperienceIds.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  }, [selectedExperienceIds]);

  const grandTotal = packagesTotal + addonsTotal + spotsTotal + cottagesTotal + experiencesTotal;
  const hasSelectedCottage = selectedCottageIds.length > 0;

  useEffect(() => {
    const selectedTravelPackages = packageOptions.filter((p) =>
      selectedPackages.includes(p.id)
    );
    const selectedAddonItems = addonOptions.filter((a) =>
      selectedAddonIds.includes(a.id)
    );
    const selectedSpotItems = displayedSpots.filter((s) =>
      selectedSpotIds.includes(s.id)
    );
    const selectedCottageItems = cottageOptions.filter((c) =>
      selectedCottageIds.includes(c.id)
    );
    const selectedExperienceItems = TRAVEL_EXPERIENCES.filter((item) =>
      selectedExperienceIds.includes(item.id)
    );

    localStorage.setItem(
      "selectedPackageSummary",
      JSON.stringify({
        travelPackages: selectedTravelPackages,
        addons: selectedAddonItems,
        nearbySpots: selectedSpotItems,
        cottages: selectedCottageItems,
        travelExperiences: selectedExperienceItems,
        totals: {
          packagesTotal,
          addonsTotal,
          spotsTotal,
          cottagesTotal,
          experiencesTotal,
          grandTotal,
        },
      })
    );
  }, [
    selectedPackages,
    selectedAddonIds,
    selectedSpotIds,
    selectedCottageIds,
    selectedExperienceIds,
    packagesTotal,
    addonsTotal,
    spotsTotal,
    cottagesTotal,
    experiencesTotal,
    grandTotal,
    packageOptions,
    addonOptions,
    spotOptions,
    displayedSpots,
    cottageOptions,
  ]);

  const handleBookNow = () => {
    if (!hasSelectedCottage) {
      alert("Please select at least one cottage before booking.");
      navigate("/user/cottage");
      return;
    }
    navigate("/user/booking");
  };

  const handleViewPackage = (pkg) => {
    const linkedAddonNames = addonOptions
      .filter((a) => (pkg.associatedAddons || []).includes(a.id))
      .map((a) => a.name);
    alert(
      `Package: ${pkg.name}\nPrice: Rs. ${pkg.price}\nDescription: ${pkg.description || "-"}\nLinked Add-ons: ${
        linkedAddonNames.length ? linkedAddonNames.join(", ") : "-"
      }`
    );
  };

  const handleSpecialPackageBook = (pkg) => {
    const matching = packageOptions.find(
      (item) => item.name?.toLowerCase() === pkg.name.toLowerCase()
    );

    if (matching) {
      const packageId = String(matching.id);
      if (!selectedPackages.includes(packageId)) {
        const next = [...selectedPackages, packageId];
        setSelectedPackages(next);
        localStorage.setItem("selectedTravelPackages", JSON.stringify(next));
      }
    }

    navigate("/user/booking");
  };

  return (
    <div className="packages-page">
      <div className="packages-header">
        <h2>Packages & Add-ons</h2>
        <p>Choose extras and review your trip costs below.</p>
      </div>

      <section className="special-packages-card">
        <h3>Special Packages</h3>
        <div className="special-packages-grid">
          {SPECIAL_PACKAGES.map((pkg) => (
            <article key={pkg.id} className="special-package-item">
              <div className="special-package-top">
                <h4>{pkg.name}</h4>
                <span className="special-package-discount">{pkg.discount}% OFF</span>
              </div>

              <p className="special-package-cottage">Cottage: {pkg.cottage}</p>

              <div className="special-package-price-wrap">
                <span className="special-package-original">Rs {pkg.originalPrice.toLocaleString()}</span>
                <span className="special-package-price">Rs {pkg.price.toLocaleString()}</span>
                <span className="special-package-nights">{pkg.nights} nights</span>
              </div>

              <div className="special-package-points">
                {pkg.highlights.map((point) => (
                  <p key={`${pkg.id}-${point}`}>+ {point}</p>
                ))}
              </div>

              <div className="special-package-includes">
                <strong>Includes:</strong>
                <ul>
                  {pkg.includes.map((item) => (
                    <li key={`${pkg.id}-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="special-package-btn"
                onClick={() => handleSpecialPackageBook(pkg)}
              >
                Book Package
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="packages-grid">
        <section className="packages-card">
          <h3>Travel Packages</h3>
          <div className="packages-list">
            {packageOptions.map((p) => (
              <label key={p.id} className="packages-item">
                <input
                  type="checkbox"
                  checked={selectedPackages.includes(p.id)}
                  onChange={() => togglePackage(p.id)}
                />
                <span className="packages-name">
                  {p.name}
                  {p.subtitle ? (
                    <span style={{ display: "block", fontSize: "12px", color: "#64748b", fontWeight: 500 }}>
                      {p.subtitle}
                    </span>
                  ) : null}
                </span>
                <span className="packages-price">Rs. {p.price}</span>
              </label>
            ))}
          </div>
          <div className="packages-subtotal">
            Travel Total: Rs. {packagesTotal}
          </div>
        </section>

        <section className="packages-card">
          <h3>Add-ons</h3>
          <div className="packages-list">
            {addonOptions.length === 0 ? (
              <p className="packages-empty">No add-ons available.</p>
            ) : (
              addonOptions.map((addon) => (
                <label key={`addon-${addon.id}`} className="packages-item">
                  <input
                    type="checkbox"
                    checked={selectedAddonIds.includes(addon.id)}
                    onChange={() => handleAddonToggle(addon.id)}
                  />
                  <span className="packages-name">{addon.name}</span>
                  <span className="packages-price">Rs. {addon.price}</span>
                </label>
              ))
            )}
          </div>
          <div className="packages-subtotal">
            Add-ons Total: Rs. {addonsTotal}
          </div>
        </section>

        <section className="packages-card">
          <h3>Nearby Spots (Travel Expense)</h3>
          {displayedSpots.length === 0 ? (
            <p className="packages-empty">
              No spots selected yet. Add from Nearby Spots.
            </p>
          ) : (
            <div className="packages-list">
              {displayedSpots.map((spot) => (
                <label key={`spot-${spot.id}`} className="packages-item">
                  <input
                    type="checkbox"
                    checked={selectedSpotIds.includes(spot.id)}
                    onChange={() => handleSpotToggle(spot)}
                  />
                  <span className="packages-name">{spot.name}</span>
                <span className="packages-price">
                    Rs. {spot.price || displayedSpots.find((t) => t.id === spot.id)?.price || 0}
                  </span>
                </label>
              ))}
            </div>
          )}
          <div className="packages-subtotal">
            Nearby Spots Total: Rs. {spotsTotal}
          </div>
        </section>

        <section className="packages-card">
          <h3>Adventure & Event Services</h3>
          <div className="packages-list">
            {TRAVEL_EXPERIENCES.map((item) => (
              <label key={`exp-${item.id}`} className="packages-item">
                <input
                  type="checkbox"
                  checked={selectedExperienceIds.includes(item.id)}
                  onChange={() => handleExperienceToggle(item.id)}
                />
                <span className="packages-name">
                  {item.name}
                  <span style={{ display: "block", fontSize: "12px", color: "#334155", fontWeight: 600 }}>
                    Spot: {item.spot}
                  </span>
                  <span style={{ display: "block", fontSize: "12px", color: "#64748b", fontWeight: 500 }}>
                    {item.description}
                  </span>
                </span>
                <span className="packages-price">Rs. {item.price}</span>
              </label>
            ))}
          </div>
          <div className="packages-subtotal">
            Services Total: Rs. {experiencesTotal}
          </div>
        </section>

        <section className="packages-card">
          <h3>Cottages</h3>
          <div className="packages-list">
            {cottageOptions.length === 0 ? (
              <p className="packages-empty">No cottages available.</p>
            ) : (
              cottageOptions.map((cottage) => (
                <label key={`cottage-${cottage.id}`} className="packages-item">
                  <input
                    type="checkbox"
                    checked={selectedCottageIds.includes(cottage.id)}
                    onChange={() => handleCottageToggle(cottage.id)}
                  />
                  <span className="packages-name">{cottage.name}</span>
                  <span className="packages-price">Rs. {cottage.price || 0}</span>
                </label>
              ))
            )}
          </div>
          <div className="packages-subtotal">
            Cottage Total: Rs. {cottagesTotal}
          </div>
        </section>
      </div>

      <div className="packages-total">
        <span>Grand Total</span>
        <strong>Rs. {grandTotal}</strong>
      </div>

      <div className="packages-actions">
        <button
          className="packages-book-btn"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackagesAddons;
