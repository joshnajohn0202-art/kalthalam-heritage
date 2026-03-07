import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./UserLayout.css";

import resortHero from "../../assets/cottages/unnamed.png";
import c11 from "../../assets/cottages/c1-1.webp";
import c21 from "../../assets/cottages/c1-1.webp";

const homeCottages = [
  { id: 1, name: "Deluxe Cottage", price: 5000, image: c11 },
  { id: 2, name: "Premium Villa", price: 10000, image: c21 },
];
const featuredTravelPackages = [
  {
    id: "pkg-onam-celebration",
    name: "Onam Celebration Offer",
    subtitle: "Festive traditional stay with special Kerala touches.",
    price: 3800,
  },
  {
    id: "pkg-christmas-festive",
    name: "Christmas Festive Offer",
    subtitle: "Holiday lights, festive meals and cozy family moments.",
    price: 4200,
  },
  {
    id: "pkg-vacation-family",
    name: "Vacation Family Offer",
    subtitle: "Flexible family vacation plan for weekends and school breaks.",
    price: 3600,
  },
  {
    id: "pkg-summer-saver",
    name: "Summer Saver Offer",
    subtitle: "Value summer package with travel and activity savings.",
    price: 2500,
  },
  {
    id: "pkg-weekend-comfort",
    name: "Weekend Comfort",
    subtitle: "Short weekend break with curated comfort inclusions.",
    price: 4500,
  },
  {
    id: "pkg-family-joy",
    name: "Family Joy",
    subtitle: "Family-friendly stay plan with optional adventure add-ons.",
    price: 7000,
  },
  {
    id: "pkg-romantic-retreat",
    name: "Romantic Retreat",
    subtitle: "Perfect couple stay with premium ambience options.",
    price: 8500,
  },
  {
    id: "pkg-premium-signature",
    name: "Premium Signature",
    subtitle: "Luxury-level package for premium resort experience.",
    price: 12000,
  },
];

const homeReviews = [
  {
    id: "REV001",
    guest: "Akhil R",
    rating: 5,
    title: "Amazing Stay",
    comment: "Wonderful hospitality, clean cottage, and peaceful atmosphere.",
  },
  {
    id: "REV002",
    guest: "Nimisha P",
    rating: 5,
    title: "Perfect Family Trip",
    comment: "Loved the service and location. Kids enjoyed the full stay.",
  },
  {
    id: "REV003",
    guest: "Rahul K",
    rating: 4,
    title: "Great Experience",
    comment: "Good rooms and nearby views. Will visit again.",
  },
];
const formatInr = (value) => `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{ ...page, ...(isMobile ? pageMobile : {}) }}>
      <header className="user-topbar">
        <Link to="/" className="topbar-brand brand-link" onClick={closeMenu}>
          <div className="brand-text">
            <h3>Kalthalam Heritage</h3>
            <p>Resort Management</p>
          </div>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className={`topbar-nav ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/user/cottage" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">Cottage</span>
          </NavLink>
          <NavLink to="/user/packages" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">Packages</span>
          </NavLink>
          <NavLink to="/user/about" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">About</span>
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/user/payment" className="nav-item" onClick={closeMenu}>
              <span className="nav-label">Payment</span>
            </NavLink>
          )}
          <NavLink to="/user/profile" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">Profile</span>
          </NavLink>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="logout-btn"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="nav-item" onClick={closeMenu}>
                <span className="nav-label">Login</span>
              </NavLink>
              <NavLink to="/signup" className="nav-item" onClick={closeMenu}>
                <span className="nav-label">Signup</span>
              </NavLink>
            </>
          )}
        </nav>

        {isMenuOpen && <div className="topbar-backdrop" onClick={closeMenu} />}
      </header>

      <h1 style={{ ...title, ...(isMobile ? titleMobile : {}) }}>Welcome to Kalthalam Heritage</h1>
      <p style={{ ...subtitle, ...(isMobile ? subtitleMobile : {}) }}>Experience nature with comfort</p>

      <div style={heroWrap}>
        <img src={resortHero} alt="Kalthalam Heritage Resort" style={{ ...heroImg, ...(isMobile ? heroImgMobile : {}) }} />
        <div style={{ ...heroOverlay, ...(isMobile ? heroOverlayMobile : {}) }}>
          <h2 style={{ ...heroTitle, ...(isMobile ? heroTitleMobile : {}) }}>Explore the Resort</h2>
          <p style={{ ...heroText, ...(isMobile ? heroTextMobile : {}) }}>Find the best nearby spots to visit during your stay.</p>
          <button style={{ ...heroBtn, ...(isMobile ? heroBtnMobile : {}) }} onClick={() => navigate("/nearby")}>
            Explore Nearby Places
          </button>
        </div>
      </div>

      <section id="cottages" style={sectionCard}>
        <h3 style={sectionTitle}>Cottages</h3>
        <p style={sectionText}>Browse our available cottages.</p>
        <div style={{ ...homeCottagesGrid, ...(isMobile ? homeCottagesGridMobile : {}) }}>
          {homeCottages.map((cottage) => (
            <article key={cottage.id} style={homeCottageCard} onClick={() => navigate("/user/cottage")}>
              <img src={cottage.image} alt={cottage.name} style={homeCottageImage} />
              <div style={homeCottageBody}>
                <h4 style={homeCottageTitle}>{cottage.name}</h4>
                <p style={homeCottagePrice}>Rs {cottage.price} / Night</p>
                <span style={homeCottageAction}>Touch to View</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="packages" style={sectionCard}>
        <h3 style={sectionTitle}>Packages</h3>
        <p style={sectionText}>Explore add-ons and package options for your stay.</p>
        <div style={{ ...packagesGrid, ...(isMobile ? packagesGridMobile : {}) }}>
          {featuredTravelPackages.map((pkg) => {
            const discountedPrice = Number(pkg.price || 0);
            const originalPrice = discountedPrice * 2;
            return (
              <article key={pkg.id} style={packageCard}>
                <h4 style={packageTitle}>{pkg.name}</h4>
                <p style={packageDesc}>{pkg.subtitle}</p>
                <div style={packagePriceWrap}>
                  <span style={packageOriginalPrice}>{formatInr(originalPrice)}</span>
                  <span style={packageDiscountTag}>50% OFF</span>
                </div>
                <p style={packageFinalPrice}>{formatInr(discountedPrice)}</p>
              </article>
            );
          })}
        </div>
        <button type="button" style={sectionBtn} onClick={() => navigate("/user/packages")}>
          View More
        </button>
      </section>

      <section style={reviewsSection}>
        <h3 style={sectionTitle}>Guest Reviews</h3>
        <p style={sectionText}>What guests say about Kalthalam Heritage.</p>
        <div style={{ ...reviewsGrid, ...(isMobile ? reviewsGridMobile : {}) }}>
          {homeReviews.map((review) => (
            <article key={review.id} style={reviewCard}>
              <p style={reviewStars}>{"★".repeat(review.rating)}</p>
              <h4 style={reviewTitle}>{review.title}</h4>
              <p style={reviewText}>{review.comment}</p>
              <p style={reviewAuthor}>- {review.guest}</p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}

const page = {
  padding: "20px 24px",
  paddingTop: "92px",
  minHeight: "100vh",
  background: "#f8fafc",
};
const pageMobile = {
  padding: "14px",
  paddingTop: "92px",
};

const title = { fontSize: "32px", marginBottom: "5px" };
const subtitle = { marginBottom: "25px", color: "#475569" };
const titleMobile = { fontSize: "24px" };
const subtitleMobile = { marginBottom: "18px", fontSize: "14px" };

const heroWrap = {
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  width: "fit-content",
  maxWidth: "100%",
  margin: "0 auto 26px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
};

const heroImg = {
  width: "auto",
  maxWidth: "100%",
  height: "320px",
  objectFit: "contain",
  display: "block",
  backgroundColor: "transparent",
};
const heroImgMobile = {
  height: "210px",
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,0,0,0.15))",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "24px",
  gap: "8px",
};
const heroOverlayMobile = {
  padding: "12px",
};

const heroTitle = { margin: 0, fontSize: "28px" };
const heroText = { margin: 0, maxWidth: "520px", opacity: 0.95 };
const heroTitleMobile = { fontSize: "20px" };
const heroTextMobile = { fontSize: "13px" };

const heroBtn = {
  marginTop: "10px",
  padding: "10px 16px",
  background: "#facc15",
  color: "#1f2937",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};
const heroBtnMobile = {
  width: "100%",
  maxWidth: "250px",
};

const sectionCard = {
  marginTop: "20px",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "18px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};

const sectionTitle = {
  margin: "0 0 6px 0",
  color: "#0f172a",
};

const sectionText = {
  margin: "0 0 12px 0",
  color: "#475569",
};

const sectionBtn = {
  background: "#0f766e",
  border: "none",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
};

const reviewsSection = {
  marginTop: "20px",
  marginBottom: "20px",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "18px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};

const reviewsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "14px",
};

const reviewsGridMobile = {
  gridTemplateColumns: "1fr",
};

const reviewCard = {
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "12px",
  background: "#f8fafc",
};

const reviewStars = {
  margin: "0 0 6px 0",
  color: "#f59e0b",
  fontWeight: "700",
};

const reviewTitle = {
  margin: "0 0 6px 0",
  color: "#0f172a",
};

const reviewText = {
  margin: "0 0 10px 0",
  color: "#475569",
  fontSize: "14px",
};

const reviewAuthor = {
  margin: 0,
  color: "#0f766e",
  fontWeight: "700",
  fontSize: "13px",
};

const homeCottagesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
};

const homeCottagesGridMobile = {
  gridTemplateColumns: "1fr",
};

const homeCottageCard = {
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#ffffff",
  cursor: "pointer",
};

const homeCottageImage = {
  width: "100%",
  height: "auto",
  display: "block",
};

const homeCottageBody = {
  padding: "12px",
};

const homeCottageTitle = {
  margin: "0 0 4px 0",
  color: "#0f172a",
};

const homeCottagePrice = {
  margin: "0 0 6px 0",
  color: "#475569",
};

const homeCottageAction = {
  color: "#166534",
  fontWeight: "700",
};

const packagesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "14px",
  marginBottom: "12px",
};

const packagesGridMobile = {
  gridTemplateColumns: "1fr",
};

const packageCard = {
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "12px",
  background: "#f8fafc",
};

const packageTitle = {
  margin: "0 0 6px 0",
  color: "#0f172a",
};

const packageDesc = {
  margin: "0 0 10px 0",
  color: "#475569",
  fontSize: "14px",
};

const packagePriceWrap = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "4px",
};

const packageOriginalPrice = {
  color: "#94a3b8",
  textDecoration: "line-through",
  fontWeight: "600",
  fontSize: "13px",
};

const packageDiscountTag = {
  background: "#dcfce7",
  color: "#166534",
  borderRadius: "999px",
  padding: "2px 8px",
  fontSize: "11px",
  fontWeight: "700",
};

const packageFinalPrice = {
  margin: 0,
  color: "#0f766e",
  fontWeight: "700",
};













