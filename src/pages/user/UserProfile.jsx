import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './UserProfile.css';
import UserProfileModal from './UserProfileModal';
import API from "../../service/api";

const DEFAULT_USER = {
  id: 1,
  name: "John Doe",
  email: "johndoe@gmail.com",
  phone: "9876543210",
  address: "123 Main Street, Prestige Enclave",
  city: "Mumbai",
  state: "Maharashtra",
  zipCode: "400001",
  country: "India",
  gender: "Male",
  dateOfBirth: "1990-05-15",
  fatherName: "Mr. Doe",
  motherName: "Mrs. Doe",
  profileImage: null,
  bio: "Travel enthusiast and nature lover",
  emergencyContact: "9876543211",
  emergencyContactName: "Jane Doe",
  memberSince: "2025-01-15",
  totalBookings: 5,
  loyaltyPoints: 1250,
  totalSpent: 85000,
};

const mapBackendUserToProfile = (backendUser = {}) => ({
  ...DEFAULT_USER,
  id: backendUser._id || backendUser.id || DEFAULT_USER.id,
  name: backendUser.name || DEFAULT_USER.name,
  email: backendUser.email || DEFAULT_USER.email,
  phone: backendUser.phone || "",
  address: backendUser.address || "",
  city: backendUser.city || "",
  state: backendUser.state || "",
  zipCode: backendUser.zipCode || "",
  country: backendUser.country || DEFAULT_USER.country,
  gender: backendUser.gender || "",
  dateOfBirth: backendUser.dateOfBirth ? String(backendUser.dateOfBirth).slice(0, 10) : "",
  fatherName: backendUser.fatherName || "",
  motherName: backendUser.motherName || "",
  profileImage: backendUser.profileImage || null,
  bio: backendUser.bio || "",
  emergencyContact: backendUser.emergencyContact || "",
  emergencyContactName: backendUser.emergencyContactName || "",
  memberSince: backendUser.createdAt
    ? String(backendUser.createdAt).slice(0, 10)
    : DEFAULT_USER.memberSince,
  totalBookings: Number(backendUser.totalBookings || 0),
  loyaltyPoints: Number(backendUser.loyaltyPoints || 0),
  totalSpent: Number(backendUser.totalSpent || 0),
});

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [user, setUser] = useState(DEFAULT_USER);

  const [editOpen, setEditOpen] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      cottageId: "CT001",
      cottageName: "Deluxe Cottage",
      checkIn: "2026-02-05",
      checkOut: "2026-02-08",
      guests: 2,
      totalPrice: 12000,
      status: "Confirmed",
      cottageImage: "🏡",
      roomsBooked: 1,
      amenities: ["WiFi", "AC", "Heater", "TV", "Parking"],
      cooking: "Shared Kitchen",
      sections: ["Master Bedroom", "Living Area", "Kitchen", "Bathroom"],
      reviewed: false
    },
    {
      id: "BK002",
      cottageId: "CT002",
      cottageName: "Premium Villa",
      checkIn: "2026-01-20",
      checkOut: "2026-01-25",
      guests: 4,
      totalPrice: 30000,
      status: "Completed",
      cottageImage: "🏰",
      roomsBooked: 2,
      amenities: ["WiFi", "Pool", "Garden", "BBQ", "Parking"],
      cooking: "Full Kitchen",
      sections: ["Master Bedroom", "2 Guest Bedrooms", "Living Area", "Dining Area", "Kitchen", "2 Bathrooms"],
      reviewed: true
    }
  ]);

  const [payments] = useState([
    {
      id: "PAY001",
      bookingId: "BK001",
      amount: 12000,
      date: "2026-01-20",
      method: "Credit Card",
      status: "Completed",
      transactionId: "TXN123456"
    },
    {
      id: "PAY002",
      bookingId: "BK002",
      amount: 30000,
      date: "2026-01-15",
      method: "Debit Card",
      status: "Completed",
      transactionId: "TXN123457"
    }
  ]);

  const [bookedPackages, setBookedPackages] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    travelPackages: [],
    addons: [],
    nearbySpots: [],
    cottages: [],
    totals: {
      packagesTotal: 0,
      addonsTotal: 0,
      spotsTotal: 0,
      cottagesTotal: 0,
      grandTotal: 0,
    },
  });

  const [reviews, setReviews] = useState([
    {
      id: "REV001",
      bookingId: "BK002",
      cottageName: "Premium Villa",
      rating: 5,
      title: "Amazing Stay!",
      comment: "Wonderful experience with excellent hospitality. The property is well-maintained and staff was very helpful.",
      date: "2026-01-26",
      images: ["🏡", "🌳"]
    }
  ]);

  const [resortContact] = useState({
    name: "Kalthalam Heritage Resort",
    phone: "+91-9876543210",
    email: "info@kalthalamresort.com",
    address:
      "Kalthalam Heritage, near Sree Dharmasastha Temple, off Nenmara - Nelliyampathy Road, Chathamangalam, Pezhumpara, Nenmara, Kerala 678508",
    hours: "24/7 Available",
    website: "www.kalthalamresort.com"
  });

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  const openReviewModal = (booking) => {
    setReviewBooking(booking || null);
    setReviewForm({
      rating: 5,
      title: "",
      comment: "",
    });
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setReviewBooking(null);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      alert("Please fill in title and comment");
      return;
    }

    const now = new Date().toISOString();
    const bookingId = reviewBooking?.id || `BK-${Date.now()}`;
    const cottageName =
      reviewBooking?.cottageName || "Kalthalam Heritage Resort";

    const newReview = {
      id: `REV-${Date.now()}`,
      bookingId,
      cottageName,
      rating: Number(reviewForm.rating),
      title: reviewForm.title.trim(),
      comment: reviewForm.comment.trim(),
      date: now,
      images: [],
    };

    setReviews((prev) => [newReview, ...prev]);

    if (reviewBooking) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === reviewBooking.id ? { ...b, reviewed: true } : b
        )
      );
    }

    closeReviewModal();
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/auth/me");
        const profile = mapBackendUserToProfile(res.data || {});
        setUser(profile);
        localStorage.setItem("userEmail", profile.email || "");
        localStorage.setItem("userName", profile.name || "");
      } catch (err) {
        const storedEmail = localStorage.getItem("userEmail") || "";
        const storedName = localStorage.getItem("userName") || "";
        if (storedEmail || storedName) {
          setUser((prev) => ({
            ...prev,
            email: storedEmail || prev.email,
            name: storedName || prev.name,
          }));
        }
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadBookedPackages = async () => {
      const summary = JSON.parse(localStorage.getItem("selectedPackageSummary") || "{}");
      setCartSummary({
        travelPackages: Array.isArray(summary.travelPackages) ? summary.travelPackages : [],
        addons: Array.isArray(summary.addons) ? summary.addons : [],
        nearbySpots: Array.isArray(summary.nearbySpots) ? summary.nearbySpots : [],
        cottages: Array.isArray(summary.cottages) ? summary.cottages : [],
        totals: {
          packagesTotal: Number(summary?.totals?.packagesTotal || 0),
          addonsTotal: Number(summary?.totals?.addonsTotal || 0),
          spotsTotal: Number(summary?.totals?.spotsTotal || 0),
          cottagesTotal: Number(summary?.totals?.cottagesTotal || 0),
          grandTotal: Number(summary?.totals?.grandTotal || 0),
        },
      });
      const summaryPackages = Array.isArray(summary.travelPackages)
        ? summary.travelPackages
        : [];

      if (summaryPackages.length > 0) {
        setBookedPackages(
          summaryPackages.map((pkg) => ({
            id: String(pkg.id),
            name: pkg.name || "Package",
            price: Number(pkg.price || 0),
            description: pkg.description || "",
          }))
        );
        return;
      }

      const selectedIds = JSON.parse(localStorage.getItem("selectedTravelPackages") || "[]")
        .map((id) => String(id));
      if (selectedIds.length === 0) {
        setBookedPackages([]);
        return;
      }

      try {
        const res = await API.get("/catalog/packages");
        const allPackages = Array.isArray(res.data) ? res.data : [];
        const selected = allPackages
          .map((pkg) => ({
            id: String(pkg.id ?? pkg._id),
            name: pkg.name || "Package",
            price: Number(pkg.price || 0),
            description: pkg.description || "",
          }))
          .filter((pkg) => selectedIds.includes(pkg.id));

        setBookedPackages(selected);
      } catch (err) {
        setBookedPackages([]);
      }
    };

    loadBookedPackages();
  }, []);

  const userForModal = {
    name: user.name,
    username: user.name,
    email: user.email,
    phone: user.phone,
    father: user.fatherName,
    mother: user.motherName,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zipCode,
    dob: user.dateOfBirth,
    bio: user.bio,
    profileImage: user.profileImage,
  };

  return (
    <div className="user-profile-container">
      <div className="profile-wrapper">
        
        {/* Sidebar Navigation */}
        <div className="profile-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-avatar">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" />
              ) : (
                <div className="avatar-badge">{getInitials(user.name)}</div>
              )}
            </div>
            <div className="sidebar-user-info">
              <h3>{user.name}</h3>
              <p>Member since {new Date(user.memberSince).toLocaleDateString()}</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              👤 Personal Details
            </button>
            <button 
              className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              🗓️ My Bookings
            </button>
            <button 
              className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              💳 Payments
            </button>
            <button 
              className={`nav-item ${activeTab === 'packages' ? 'active' : ''}`}
              onClick={() => setActiveTab('packages')}
            >
              📦 Packages
            </button>
            <button
              className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              Cart
            </button>
            <button 
              className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              📞 Resort Contact
            </button>
          </nav>

          <div className="sidebar-stats">
            <div className="stat">
              <span className="stat-num">{user.totalBookings}</span>
              <span className="stat-label">Bookings</span>
            </div>
            <div className="stat">
              <span className="stat-num">{user.loyaltyPoints}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
        </div>

        {/* Main Content Modal */}
        <div className="profile-content-modal">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Dashboard</h2>
              
              <div className="overview-header">
                <div className="welcome-card">
                  <h3>Welcome back, {user.name}! 👋</h3>
                  <p>Here's your travel summary at a glance</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🎫</div>
                  <div className="stat-detail">
                    <h4>{user.totalBookings}</h4>
                    <p>Total Bookings</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-detail">
                    <h4>{user.loyaltyPoints}</h4>
                    <p>Loyalty Points</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-detail">
                    <h4>₹{user.totalSpent.toLocaleString()}</h4>
                    <p>Total Spent</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-detail">
                    <h4>Active</h4>
                    <p>Account Status</p>
                  </div>
                </div>
              </div>

              <div className="recent-bookings">
                <h3>Recent Bookings</h3>
                {bookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="booking-preview">
                    <span className="cottage-emoji">{booking.cottageImage}</span>
                    <div>
                      <h4>{booking.cottageName}</h4>
                      <p>{new Date(booking.checkIn).toLocaleDateString()} → {new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Personal Information</h2>
                <button className="profile-edit-btn" onClick={() => setEditOpen(true)}>
                  Edit
                </button>
              </div>
              
              <div className="info-section">
                <h3>Basic Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{user.phone}</p>
                  </div>
                  <div className="info-item">
                    <label>Date of Birth</label>
                    <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="info-item">
                    <label>Gender</label>
                    <p>{user.gender}</p>
                  </div>
                  <div className="info-item">
                    <label>Bio</label>
                    <p>{user.bio}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Address Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Address</label>
                    <p>{user.address}</p>
                  </div>
                  <div className="info-item">
                    <label>City</label>
                    <p>{user.city}</p>
                  </div>
                  <div className="info-item">
                    <label>State</label>
                    <p>{user.state}</p>
                  </div>
                  <div className="info-item">
                    <label>Zip Code</label>
                    <p>{user.zipCode}</p>
                  </div>
                  <div className="info-item">
                    <label>Country</label>
                    <p>{user.country}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Family Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Father's Name</label>
                    <p>{user.fatherName}</p>
                  </div>
                  <div className="info-item">
                    <label>Mother's Name</label>
                    <p>{user.motherName}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Emergency Contact</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Contact Name</label>
                    <p>{user.emergencyContactName}</p>
                  </div>
                  <div className="info-item">
                    <label>Contact Phone</label>
                    <p>{user.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="tab-content">
              <h2>My Bookings</h2>
              
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-detailed-card">
                  <div className="booking-header">
                    <div className="booking-title">
                      <span className="cottage-emoji-large">{booking.cottageImage}</span>
                      <div>
                        <h3>{booking.cottageName}</h3>
                        <p className="booking-id">Booking ID: {booking.id}</p>
                      </div>
                    </div>
                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                  </div>

                  <div className="booking-info-grid">
                    <div className="info-item">
                      <label>Check-in</label>
                      <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div className="info-item">
                      <label>Check-out</label>
                      <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div className="info-item">
                      <label>Duration</label>
                      <p>{calculateNights(booking.checkIn, booking.checkOut)} nights</p>
                    </div>
                    <div className="info-item">
                      <label>Guests</label>
                      <p>{booking.guests} {booking.guests > 1 ? 'people' : 'person'}</p>
                    </div>
                    <div className="info-item">
                      <label>Total Price</label>
                      <p className="price">₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  {false && (
                  <>
                  <div className="cottage-sections">
                    <h4>🏠 Cottage Sections:</h4>
                    <ul className="sections-list">
                      {booking.sections.map((section, idx) => (
                        <li key={idx}>{section}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="cottage-amenities">
                    <h4>🛏️ Amenities:</h4>
                    <div className="amenities-list">
                      {booking.amenities.map((amenity, idx) => (
                        <span key={idx} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  </div>

                  <div className="cottage-cooking">
                    <h4>🍳 Cooking Facilities:</h4>
                    <p>{booking.cooking}</p>
                  </div>

                  <div className="booking-actions">
                    {booking.status === "Confirmed" && (
                      <button className="btn-action secondary">📱 Contact Resort</button>
                    )}
                  </div>
                  </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="tab-content">
              <h2>Payment History</h2>
              
              <div className="payments-table">
                <table>
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Booking ID</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="transaction-id">{payment.transactionId}</td>
                        <td>{payment.bookingId}</td>
                        <td className="amount">₹{payment.amount.toLocaleString()}</td>
                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                        <td>{payment.method}</td>
                        <td><span className="status-badge status-completed">{payment.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="payment-summary">
                <h3>Payment Summary</h3>
                <p><strong>Total Paid:</strong> ₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                <p><strong>Transactions:</strong> {payments.length}</p>
              </div>
            </div>
          )}
          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="tab-content">
              <h2>Booked Packages</h2>
              
              <div className="packages-grid">
                {bookedPackages.length === 0 ? (
                  <p>No booked packages found.</p>
                ) : bookedPackages.map((pkg) => (
                  <div key={pkg.id} className="package-card">
                    <h3>{pkg.name}</h3>
                    <div className="package-details">
                      <p className="package-price">{"\u20B9"}{Number(pkg.price || 0).toLocaleString()}</p>
                    </div>
                    <p>{pkg.description || "Package selected in your booking."}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'cart' && (
            <div className="tab-content">
              <h2>My Cart</h2>

              {cartSummary.travelPackages.length === 0 &&
              cartSummary.addons.length === 0 &&
              cartSummary.nearbySpots.length === 0 &&
              cartSummary.cottages.length === 0 ? (
                <p>No items in cart.</p>
              ) : (
                <>
                  <div className="info-section">
                    <h3>Travel Packages</h3>
                    {cartSummary.travelPackages.length === 0 ? (
                      <p>No travel packages selected.</p>
                    ) : (
                      <div className="info-grid">
                        {cartSummary.travelPackages.map((item, idx) => (
                          <div className="info-item" key={`cart-pkg-${item.id ?? idx}`}>
                            <label>{item.name || "Package"}</label>
                            <p>Rs. {Number(item.price || 0).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="info-section">
                    <h3>Add-ons</h3>
                    {cartSummary.addons.length === 0 ? (
                      <p>No add-ons selected.</p>
                    ) : (
                      <div className="info-grid">
                        {cartSummary.addons.map((item, idx) => (
                          <div className="info-item" key={`cart-addon-${item.id ?? idx}`}>
                            <label>{item.name || "Add-on"}</label>
                            <p>Rs. {Number(item.price || 0).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="info-section">
                    <h3>Nearby Spots</h3>
                    {cartSummary.nearbySpots.length === 0 ? (
                      <p>No nearby spots selected.</p>
                    ) : (
                      <div className="info-grid">
                        {cartSummary.nearbySpots.map((item, idx) => (
                          <div className="info-item" key={`cart-spot-${item.id ?? idx}`}>
                            <label>{item.name || "Spot"}</label>
                            <p>Rs. {Number(item.price || 0).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="info-section">
                    <h3>Cottages</h3>
                    {cartSummary.cottages.length === 0 ? (
                      <p>No cottages selected.</p>
                    ) : (
                      <div className="info-grid">
                        {cartSummary.cottages.map((item, idx) => (
                          <div className="info-item" key={`cart-cottage-${item.id ?? idx}`}>
                            <label>{item.name || "Cottage"}</label>
                            <p>Rs. {Number(item.price || 0).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="payment-summary">
                    <h3>Cart Summary</h3>
                    <p><strong>Travel Total:</strong> Rs. {Number(cartSummary.totals.packagesTotal || 0).toLocaleString()}</p>
                    <p><strong>Add-ons Total:</strong> Rs. {Number(cartSummary.totals.addonsTotal || 0).toLocaleString()}</p>
                    <p><strong>Nearby Spots Total:</strong> Rs. {Number(cartSummary.totals.spotsTotal || 0).toLocaleString()}</p>
                    <p><strong>Cottages Total:</strong> Rs. {Number(cartSummary.totals.cottagesTotal || 0).toLocaleString()}</p>
                    <p><strong>Grand Total:</strong> Rs. {Number(cartSummary.totals.grandTotal || 0).toLocaleString()}</p>
                  </div>
                  <div className="booking-actions">
                    <button type="button" className="btn-action primary" onClick={() => navigate("/user/booking")}>
                      Book Now
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="tab-content">
              <h2>Resort Contact Information</h2>
              
              <div className="contact-card">
                <h3>{resortContact.name}</h3>
                
                <div className="contact-info">
                  <div className="contact-item">
                    <label>📞 Phone</label>
                    <a href={`tel:${resortContact.phone}`}>{resortContact.phone}</a>
                  </div>
                  <div className="contact-item">
                    <label>📧 Email</label>
                    <a href={`mailto:${resortContact.email}`}>{resortContact.email}</a>
                  </div>
                  <div className="contact-item">
                    <label>📍 Address</label>
                    <p>{resortContact.address}</p>
                  </div>
                  <div className="contact-item">
                    <label>⏰ Operating Hours</label>
                    <p>{resortContact.hours}</p>
                  </div>
                  <div className="contact-item">
                    <label>🌐 Website</label>
                    <a href={`https://${resortContact.website}`} target="_blank" rel="noopener noreferrer">{resortContact.website}</a>
                  </div>
                </div>

                <div className="contact-actions">
                  <button
                    className="btn-action primary"
                    onClick={() => window.open(`tel:${resortContact.phone}`, "_self")}
                  >
                    📞 Call Resort
                  </button>
                  <button
                    className="btn-action secondary"
                    onClick={() => window.open(`mailto:${resortContact.email}`, "_self")}
                  >
                    ✉️ Send Email
                  </button>
                  <button
                    className="btn-action secondary"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          resortContact.address
                        )}`,
                        "_blank",
                        "noopener"
                      )
                    }
                  >
                    📍 Get Directions
                  </button>
                </div>
              </div>

              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                  <h4>What is the check-in time?</h4>
                  <p>Check-in is from 2:00 PM onwards. Early check-in may be available on request.</p>
                </div>
                <div className="faq-item">
                  <h4>What is the cancellation policy?</h4>
                  <p>Free cancellation up to 7 days before booking. Cancellation within 7 days will incur a charge.</p>
                </div>
                <div className="faq-item">
                  <h4>Are pets allowed?</h4>
                  <p>Pets are allowed in selected cottages. Please contact the resort for more information.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <UserProfileModal
        open={editOpen}
        user={userForModal}
        onClose={() => setEditOpen(false)}
        saving={profileSaving}
        onSave={async (data) => {
          const payload = {
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            fatherName: data.father || "",
            motherName: data.mother || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            zipCode: data.zip || "",
            dateOfBirth: data.dob || "",
            bio: data.bio || "",
            profileImage: data.profileImage || "",
          };

          try {
            setProfileSaving(true);
            const res = await API.put("/auth/me", payload);
            const updated = mapBackendUserToProfile(res?.data?.user || {});
            setUser(updated);
            localStorage.setItem("userEmail", updated.email || "");
            localStorage.setItem("userName", updated.name || "");
            return true;
          } catch (err) {
            const message =
              err?.response?.data?.message || "Failed to update profile. Please try again.";
            alert(message);
            return false;
          } finally {
            setProfileSaving(false);
          }
        }}
      />
    </div>
  );
};

export default UserProfile;



