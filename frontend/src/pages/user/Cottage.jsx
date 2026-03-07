import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Cottage.css';
import resortImg1 from '../../assets/cottages/resort.webp';
import resortImg2 from '../../assets/cottages/resort2.webp';
import cottageImg1 from '../../assets/cottages/c1-1.webp';
import cottageImg2 from '../../assets/cottages/resort2.webp';
import dormImg1 from '../../assets/dormitory/dormertery.webp';
import dormImg2 from '../../assets/dormitory/dormertry2.webp';

const Cottage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cottages');
  const [selectedCottage, setSelectedCottage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [, setSelectedCottageIds] = useState([]);

  // Resort Images
  const [resortImages] = useState([
    resortImg1,
    resortImg2,
  ]);

  // Dormitory Images
  const [dormitoryImages] = useState([
    dormImg1,
    dormImg2,
  ]);

  // Cottages Data
  const [cottages] = useState([
    {
      id: 1,
      name: "Deluxe Cottage",
      image: cottageImg1,
      price: 5000,
      rating: 4.5,
      reviews: 24,
      description: "Beautiful cottage with modern amenities and stunning views",
      capacity: 4,
      bedrooms: 2,
      bathrooms: 1,
      sections: ["Master Bedroom", "Guest Bedroom", "Living Area", "Kitchen", "Bathroom"],
      amenities: ["WiFi", "AC", "Heater", "TV", "Kitchen"],
      cooking: "Shared Kitchen",
      amenityDetails: {
        wifi: "High-speed unlimited WiFi",
        ac: "Central air conditioning",
        kitchen: "Fully equipped kitchen with utensils",
        tv: "Smart TV with cable",
        heater: "Room heater for winter"
      },
      nearbyPlaces: [
        {
          name: "Padagiri View Point",
          distance: "2.5 km",
          description: "Hilltop lookout with wide valley and dam views.",
        },
        {
          name: "Seetharkundu Viewpoint",
          distance: "6 km",
          description: "Cliffside viewpoint popular for sunrise photos.",
        },
        {
          name: "Kombankallu View Point",
          distance: "8 km",
          description: "Quiet ridge with panoramic Western Ghats scenery.",
        },
        {
          name: "Meenampara View Point",
          distance: "10 km",
          description: "Tea-estate drive and misty mountain vistas.",
        },
      ]
    },
    {
      id: 2,
      name: "Premium Villa",
      image: cottageImg2,
      price: 10000,
      rating: 4.8,
      reviews: 42,
      description: "Luxury villa with exclusive facilities and private garden",
      capacity: 6,
      bedrooms: 3,
      bathrooms: 2,
      sections: ["Master Bedroom", "2 Guest Bedrooms", "Living Area", "Dining Area", "Kitchen", "2 Bathrooms"],
      amenities: ["WiFi", "Pool", "Garden", "BBQ", "Parking"],
      cooking: "Full Kitchen",
      amenityDetails: {
        wifi: "Ultra-fast WiFi throughout property",
        pool: "Private swimming pool",
        garden: "Spacious private garden",
        bbq: "BBQ area for outdoor cooking",
        parking: "Free parking for 2 vehicles"
      },
      nearbyPlaces: [
        {
          name: "Padagiri View Point",
          distance: "2.5 km",
          description: "Hilltop lookout with wide valley and dam views.",
        },
        {
          name: "Seetharkundu Viewpoint",
          distance: "6 km",
          description: "Cliffside viewpoint popular for sunrise photos.",
        },
        {
          name: "Kombankallu View Point",
          distance: "8 km",
          description: "Quiet ridge with panoramic Western Ghats scenery.",
        },
        {
          name: "Meenampara View Point",
          distance: "10 km",
          description: "Tea-estate drive and misty mountain vistas.",
        },
      ]
    }
  ]);

  // Packages Data
  const [packages] = useState([
    {
      id: 1,
      name: "Weekend Getaway",
      nights: 2,
      price: 8000,
      originalPrice: 10000,
      discount: 20,
      included: ["Accommodation", "Breakfast", "WiFi", "Basic Amenities"],
      highlights: ["Perfect for couples", "Flexible checkout", "Welcome drinks"],
      cottage: "Deluxe Cottage"
    },
    {
      id: 2,
      name: "Romantic Escape",
      nights: 3,
      price: 18000,
      originalPrice: 22000,
      discount: 18,
      included: ["Accommodation", "All Meals", "Activities", "WiFi", "Special Decoration"],
      highlights: ["Romantic dinner", "Rose petals & candles", "Exclusive experience"],
      cottage: "Premium Villa"
    }
  ]);

  // Add-ons Data
  const [addons] = useState([
    {
      id: 1,
      name: "Airport Pickup",
      description: "Complimentary pickup from nearest airport",
      price: 500,
      icon: "🚗"
    },
    {
      id: 3,
      name: "Romantic Dinner",
      description: "5-course romantic dinner for 2",
      price: 2000,
      icon: "🍽️"
    },
    {
      id: 4,
      name: "Adventure Tour",
      description: "Full day guided adventure tour",
      price: 1200,
      icon: "🧗"
    },
    {
      id: 5,
      name: "Breakfast Upgrade",
      description: "Premium breakfast with special menu",
      price: 300,
      icon: "🍳"
    },
    {
      id: 6,
      name: "Photography Session",
      description: "Professional photoshoot (2 hours) with digital copies",
      price: 2500,
      icon: "📸"
    },
    {
      id: 7,
      name: "Tourist Places Visit",
      description: "Guided tour to nearby tourist spots and attractions",
      price: 1800,
      icon: "🗺️"
    }
  ]);

  // Bookings Data
  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      cottage: "Deluxe Cottage",
      checkIn: "2026-02-05",
      checkOut: "2026-02-08",
      guests: 2,
      price: 15000,
      status: "Confirmed",
      addons: ["Airport Pickup"],
      image: "🏡"
    },
    {
      id: "BK002",
      cottage: "Premium Villa",
      checkIn: "2026-01-20",
      checkOut: "2026-01-25",
      guests: 4,
      price: 50000,
      status: "Completed",
      addons: ["Romantic Dinner", "Tourist Places Visit"],
      image: "🏰"
    }
  ]);

  const [selectedAddons, setSelectedAddons] = useState([]);
  const selectedBookingDetails = null;
  const setSelectedBookingDetails = () => {};
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    cottageId: null
  });

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("selectedCottages") || "[]"
    );
    setSelectedCottageIds(stored.map((c) => c.id));
  }, []);

  useEffect(() => {
    const storedAddons = JSON.parse(
      localStorage.getItem("selectedAddons") || "[]"
    );
    setSelectedAddons(storedAddons);
  }, []);

  const handleAddonToggle = (addonId) => {
    setSelectedAddons((prev) => {
      const next = prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId];
      localStorage.setItem("selectedAddons", JSON.stringify(next));
      return next;
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (!selectedCottage || !bookingForm.checkIn || !bookingForm.checkOut) return 0;
    const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);
    const cottagePrice = selectedCottage.price * nights;
    const addonsPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return cottagePrice + addonsPrice;
  };

  const ensureLoggedInForBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue booking.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleConfirmBooking = () => {
    if (!ensureLoggedInForBooking()) return;

    const cottage = selectedCottage || cottages.find(c => c.id === bookingForm.cottageId);
    if (!cottage || !bookingForm.checkIn || !bookingForm.checkOut) {
      alert('Please select a cottage and valid check-in/out dates');
      return;
    }
    const nights = Math.max(1, calculateNights(bookingForm.checkIn, bookingForm.checkOut));
    const addonsPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    const total = cottage.price * nights + addonsPrice;
    const addonNames = selectedAddons.map(id => addons.find(a => a.id === id)?.name).filter(Boolean);
    const newId = 'BK' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: newId,
      cottage: cottage.name,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      guests: bookingForm.guests || 1,
      price: total,
      status: 'Confirmed',
      addons: addonNames,
      image: cottage.image
    };
    setBookings(prev => [newBooking, ...prev]);
    setShowBookingForm(false);
    setSelectedAddons([]);
    setBookingForm({ checkIn: '', checkOut: '', guests: 1, cottageId: null });
    setSelectedCottage(null);
  };

  const toggleCottagePackage = (cottage) => {
    const existing = JSON.parse(
      localStorage.getItem("selectedCottages") || "[]"
    );
    const alreadyAdded = existing.some((item) => item.id === cottage.id);
    let updated;

    if (alreadyAdded) {
      updated = existing.filter((item) => item.id !== cottage.id);
    } else {
      updated = [
        ...existing,
        {
          id: cottage.id,
          name: cottage.name,
          price: cottage.price,
          type: "cottage",
        },
      ];
    }

    localStorage.setItem("selectedCottages", JSON.stringify(updated));
    setSelectedCottageIds(updated.map((c) => c.id));
  };

  const handleAddToPackages = (cottage) => {
    toggleCottagePackage(cottage);
    navigate("/user/packages");
  };

  const handleAddToCart = (cottage) => {
    const existing = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const itemId = `cottage-${cottage.id}`;
    if (existing.some((item) => item.id === itemId)) {
      alert("This cottage is already in cart");
      return;
    }

    const next = [
      ...existing,
      {
        id: itemId,
        type: "cottage",
        name: cottage.name,
        price: cottage.price,
        image: cottage.image,
      },
    ];
    localStorage.setItem("cartItems", JSON.stringify(next));
    alert("Cottage added to cart");
  };

  return (
    <div className="cottage-container">
      <div className="cottage-header">
        <h1>🏘️ Cottages & Bookings</h1>
        <p>Explore our beautiful cottages, book your stay, and add exciting services</p>
      </div>

      {/* Tab Navigation */}
      <div className="cottage-tabs">
        <button
          className={`tab-btn ${activeTab === 'cottages' ? 'active' : ''}`}
          onClick={() => setActiveTab('cottages')}
        >
          🏡 View Cottages
        </button>
        <button
          className={`tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
          onClick={() => setActiveTab('availability')}
        >
          📅 Availability
        </button>
        <button
          className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          📦 Packages
        </button>
        <button
          className={`tab-btn ${activeTab === 'addons' ? 'active' : ''}`}
          onClick={() => setActiveTab('addons')}
        >
          ➕ Add-ons
        </button>
        <button
          className={`tab-btn ${activeTab === 'mybookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('mybookings')}
        >
          🗓️ My Bookings
        </button>
      </div>

      <div className="tab-content">
        
        {/* View Cottages Tab */}
        {activeTab === 'cottages' && (
          <div className="cottages-grid">
            {!selectedCottage ? (
              <>
                <h2>Available Cottages</h2>
                <div className="cottages-list">
                  {cottages.map(cottage => (
                    <div key={cottage.id} className="cottage-card">
                      <div className="cottage-image">
                        <img src={cottage.image} alt={cottage.name} />
                      </div>
                      <div className="cottage-content">
                        <h3>{cottage.name}</h3>
                        <p className="description">{cottage.description}</p>
                        <div className="cottage-info">
                          <span className="info-item">Beds: {cottage.bedrooms}</span>
                          <span className="info-item">Guests: {cottage.capacity}</span>
                          <span className="info-item">Baths: {cottage.bathrooms}</span>
                        </div>

                        <div className="cottage-details-preview">
                          <p><strong>Sections:</strong> {cottage.sections.join(", ")}</p>
                          <p><strong>Amenities:</strong> {cottage.amenities.join(", ")}</p>
                          <p><strong>Cooking:</strong> {cottage.cooking}</p>
                        </div>

                        <div className="cottage-media-cards">
                          <div className="cottage-media-card" onClick={() => setSelectedImageModal(dormitoryImages[cottage.id % dormitoryImages.length])}>
                            <img src={dormitoryImages[cottage.id % dormitoryImages.length]} alt={`${cottage.name} dormitory`} />
                            <span>Dormitory Image</span>
                          </div>
                          <div className="cottage-media-card" onClick={() => setSelectedImageModal(resortImages[cottage.id % resortImages.length])}>
                            <img src={resortImages[cottage.id % resortImages.length]} alt={`${cottage.name} resort`} />
                            <span>Resort Image</span>
                          </div>
                        </div>

                        <div className="rating">
                          <span className="stars">⭐ {cottage.rating}</span>
                          <span className="reviews">({cottage.reviews} reviews)</span>
                        </div>

                        <div className="price-section cottage-actions">
                          <span className="price">Rs {cottage.price.toLocaleString()}/night</span>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => handleAddToPackages(cottage)}
                          >
                            Add to Packages
                          </button>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => handleAddToCart(cottage)}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="btn-view"
                            onClick={() => setSelectedCottage(cottage)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="cottage-detail">
                <button className="btn-back" onClick={() => setSelectedCottage(null)}>
                  ← Back to Cottages
                </button>
                
                <div className="detail-header">
                  <div className="detail-image">
                    <img src={selectedCottage.image} alt={selectedCottage.name} />
                  </div>
                  <div className="detail-info">
                    <h2>{selectedCottage.name}</h2>
                    <p className="description">{selectedCottage.description}</p>
                    <div className="rating">
                      <span className="stars">⭐ {selectedCottage.rating}</span>
                      <span className="reviews">({selectedCottage.reviews} reviews)</span>
                    </div>
                    <div className="dormitory-info">
                      <h4>🛏️ Dormitory Details</h4>
                      <div className="dormitory-details">
                        <div className="dormitory-item">
                          <span className="dormitory-label">Total Bedrooms:</span>
                          <span className="dormitory-value">{selectedCottage.bedrooms}</span>
                        </div>
                        <div className="dormitory-item">
                          <span className="dormitory-label">Total Bathrooms:</span>
                          <span className="dormitory-value">{selectedCottage.bathrooms}</span>
                        </div>
                        <div className="dormitory-item">
                          <span className="dormitory-label">Guest Capacity:</span>
                          <span className="dormitory-value">{selectedCottage.capacity} Guests</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dormitory Images Gallery */}
                <div className="images-gallery-section">
                  <h3>🛏️ Dormitory Images</h3>
                  <div className="images-gallery">
                    {dormitoryImages.map((image, idx) => (
                      <div key={idx} className="gallery-image-item" onClick={() => setSelectedImageModal(image)}>
                        <img src={image} alt={`Dormitory ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resort Images Gallery */}
                <div className="images-gallery-section">
                  <h3>🏨 Resort Images</h3>
                  <div className="images-gallery">
                    {resortImages.map((image, idx) => (
                      <div key={idx} className="gallery-image-item" onClick={() => setSelectedImageModal(image)}>
                        <img src={image} alt={`Resort ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-sections">
                  <div className="section">
                    <h3>🏠 Sections</h3>
                    <ul className="sections-list">
                      {selectedCottage.sections.map((section, idx) => (
                        <li key={idx}>{section}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="section">
                    <h3>✨ Amenities</h3>
                    <div className="amenities-grid">
                      {selectedCottage.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-item">
                          <p className="amenity-name">{amenity}</p>
                          <p className="amenity-desc">{selectedCottage.amenityDetails[amenity.toLowerCase().replace('-', '')]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="section">
                    <h3>🍳 Cooking</h3>
                    <p className="cooking">{selectedCottage.cooking}</p>
                  </div>

                  {selectedCottage.nearbyPlaces && selectedCottage.nearbyPlaces.length > 0 && (
                    <div className="section">
                      <h3>🗺️ Nearby Tourist Places & Best Spots</h3>
                      <div className="places-grid">
                        {selectedCottage.nearbyPlaces.map((place, idx) => (
                          <div key={idx} className="place-card">
                            <h4 className="place-name">{place.name}</h4>
                            <p className="place-distance">📍 {place.distance}</p>
                            <p className="place-description">{place.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="section">
                    <h3>💰 Pricing</h3>
                    <p className="price-large">Rs {selectedCottage.price.toLocaleString()}/night</p>
                    <div className="pricing-actions">
                      <button
                        className="btn-primary"
                        onClick={() => {
                          setShowBookingForm(true);
                          setBookingForm({ ...bookingForm, cottageId: selectedCottage.id });
                        }}
                      >
                        Book Now
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => handleAddToPackages(selectedCottage)}
                      >
                        Add to Packages
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="availability-section">
            <h2>📅 Check Availability</h2>
            <div className="availability-container">
              <div className="availability-form">
                <div className="form-group">
                  <label>Select Cottage</label>
                  <select className="availability-select">
                    <option value="">Choose a cottage...</option>
                    {cottages.map(cottage => (
                      <option key={cottage.id} value={cottage.id}>
                        {cottage.name} - Rs {cottage.price.toLocaleString()}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Check-in Date</label>
                  <input type="date" className="availability-date" />
                </div>

                <div className="form-group">
                  <label>Check-out Date</label>
                  <input type="date" className="availability-date" />
                </div>

                <div className="form-group">
                  <label>Number of Guests</label>
                  <select className="availability-select">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5 Guests</option>
                    <option>6 Guests</option>
                  </select>
                </div>

                <button className="btn-check-availability">Check Availability</button>
              </div>

              <div className="availability-info">
                <h3>📍 Availability Status</h3>
                <div className="cottage-availability">
                  {cottages.map(cottage => (
                    <div key={cottage.id} className="cottage-availability-card">
                      <div className="cottage-availability-header">
                        <h4>{cottage.name}</h4>
                        <span className="availability-badge available">Available</span>
                      </div>
                      <p className="availability-details">
                        <span>Rs {cottage.price.toLocaleString()}/night</span>
                        <span>👥 {cottage.capacity} guests max</span>
                      </p>
                      <div className="availability-calendar-preview">
                        <p>Next available dates: Feb 5 - Feb 28</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="packages-section">
            <h2>📦 Special Packages</h2>
            <div className="packages-grid">
              {packages.map(pkg => (
                <div key={pkg.id} className="package-card">
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                    <span className="discount-badge">{pkg.discount}% OFF</span>
                  </div>

                  <div className="package-cottage">
                    <p className="cottage-name">📍 {pkg.cottage}</p>
                  </div>

                  <div className="package-price">
                    <span className="original-price">Rs {pkg.originalPrice.toLocaleString()}</span>
                    <span className="final-price">Rs {pkg.price.toLocaleString()}</span>
                    <span className="nights">{pkg.nights} nights</span>
                  </div>

                  <div className="package-highlights">
                    {pkg.highlights.map((highlight, idx) => (
                      <p key={idx} className="highlight">✓ {highlight}</p>
                    ))}
                  </div>

                  <div className="package-includes">
                    <h4>Includes:</h4>
                    <ul>
                      {pkg.included.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setSelectedCottage(cottages.find(c => c.name === pkg.cottage));
                      setShowBookingForm(true);
                      setBookingForm({ 
                        ...bookingForm, 
                        cottageId: cottages.find(c => c.name === pkg.cottage)?.id
                      });
                    }}
                  >
                    Book Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Add-ons Tab */}
        {activeTab === 'addons' && (
          <div className="addons-section">
            <h2>Premium Add-ons</h2>

            <div className="addons-dropdown">
              <label className="addons-label">Select Add-on</label>
              <select
                className="addons-select"
                value={String(selectedAddons[0] ?? "")}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  const values = value ? [value] : [];
                  setSelectedAddons(values);
                  localStorage.setItem("selectedAddons", JSON.stringify(values));
                }}
              >
                <option value="">Choose an add-on</option>
                {addons.map((addon) => (
                  <option key={addon.id} value={addon.id}>
                    {addon.name} - Rs {addon.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="addons-grid">
              {addons.map((addon) => (
                <div key={addon.id} className="addon-card">
                  <div className="addon-icon">{addon.icon}</div>
                  <h3>{addon.name}</h3>
                  <p className="addon-description">{addon.description}</p>
                  <div className="addon-price">Rs {addon.price.toLocaleString()}</div>
                  <button
                    className={`btn-addon ${
                      selectedAddons.includes(addon.id) ? 'selected' : ''
                    }`}
                    onClick={() => handleAddonToggle(addon.id)}
                  >
                    {selectedAddons.includes(addon.id) ? 'Selected' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>

            <div className="addons-footer">
              <button
                className="btn-primary"
                onClick={() => navigate("/user/booking")}
              >
                Book
              </button>
            </div>
          </div>
        )}
        {/* My Bookings Tab */}
        {activeTab === 'mybookings' && (
          <div className="bookings-section">
            <h2>🗓️ My Bookings</h2>
            {bookings.length > 0 ? (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-card-main">
                    <div className="booking-left">
                      <div className="booking-image">{booking.image}</div>
                    </div>
                    <div className="booking-middle">
                      <h3>{booking.cottage}</h3>
                      <p className="booking-id">ID: {booking.id}</p>
                      <div className="booking-dates">
                        <span>📅 {new Date(booking.checkIn).toLocaleDateString()}</span>
                        <span>→</span>
                        <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                      </div>
                      <p className="booking-guests">👥 {booking.guests} Guests • {calculateNights(booking.checkIn, booking.checkOut)} Nights</p>
                      {booking.addons.length > 0 && (
                        <div className="booking-addons">
                          <strong>Add-ons:</strong> {booking.addons.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="booking-right">
                      <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                      <p className="booking-price">Rs {booking.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-bookings">No bookings yet. Start exploring our cottages!</p>
            )}
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedCottage && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <button className="modal-close" onClick={() => setShowBookingForm(false)}>✕</button>
            
            <h2>Book {selectedCottage.name}</h2>

            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                value={bookingForm.checkIn}
                onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                value={bookingForm.checkOut}
                onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Number of Guests</label>
              <select
                value={bookingForm.guests}
                onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) })}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-row">
                <span>Cottage Price:</span>
                <span>Rs {selectedCottage.price.toLocaleString()} � {bookingForm.checkIn && bookingForm.checkOut ? calculateNights(bookingForm.checkIn, bookingForm.checkOut) : 0} nights</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="summary-row">
                  <span>Add-ons:</span>
                  <span>Rs {selectedAddons.reduce((sum, id) => sum + (addons.find(a => a.id === id)?.price || 0), 0).toLocaleString()}</span>
                </div>
              )}
              <div className="summary-total">
                <span>Total:</span>
                <span>Rs {calculateTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <button className="btn-confirm" onClick={handleConfirmBooking}>Confirm Booking</button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImageModal && (
        <div className="image-modal-overlay" onClick={() => setSelectedImageModal(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedImageModal(null)}>✕</button>
            <img src={selectedImageModal} alt="Full view" className="modal-image" />
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <div className="booking-details-modal-overlay" onClick={() => setSelectedBookingDetails(null)}>
          <div className="booking-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedBookingDetails(null)}>✕</button>
            <h2>Booking Details</h2>
            <div className="details-content">
              <div className="detail-row">
                <span className="detail-label">Booking ID:</span>
                <span className="detail-value">{selectedBookingDetails.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cottage:</span>
                <span className="detail-value">{selectedBookingDetails.cottage}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Check-in:</span>
                <span className="detail-value">{new Date(selectedBookingDetails.checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Check-out:</span>
                <span className="detail-value">{new Date(selectedBookingDetails.checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{calculateNights(selectedBookingDetails.checkIn, selectedBookingDetails.checkOut)} Nights</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Guests:</span>
                <span className="detail-value">{selectedBookingDetails.guests} Guest{selectedBookingDetails.guests > 1 ? 's' : ''}</span>
              </div>
              {selectedBookingDetails.addons.length > 0 && (
                <div className="detail-row">
                  <span className="detail-label">Add-ons:</span>
                  <span className="detail-value">{selectedBookingDetails.addons.join(', ')}</span>
                </div>
              )}
              <div className="detail-row total">
                <span className="detail-label">Total Price:</span>
                <span className="detail-value">Rs {selectedBookingDetails.price.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-badge status-${selectedBookingDetails.status.toLowerCase()}`}>{selectedBookingDetails.status}</span>
              </div>
            </div>
            <button className="btn-close" onClick={() => setSelectedBookingDetails(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cottage;




