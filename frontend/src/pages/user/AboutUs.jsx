import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
import resortHero from "../../assets/cottages/unnamed.png";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <section className="about-hero">
        <img src={resortHero} alt="Kalthalam Heritage" className="about-hero-image" />
        <div className="about-hero-overlay" />
        <button type="button" className="about-back-link" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="about-hero-content">
          <p className="about-eyebrow">Kalthalam Heritage</p>
          <h1>About Us</h1>
          <p>
            A calm hillside retreat where warm Kerala hospitality meets modern comfort. We
            craft unhurried stays with curated experiences, thoughtful service, and nature all
            around.
          </p>
          <div className="about-hero-actions">
            <button type="button" className="about-btn primary" onClick={() => navigate("/nearby")}
            >
              Explore Nearby
            </button>
          </div>
        </div>
      </section>

      <section className="about-section about-story">
        <div className="about-section-header">
          <h2>Our Story</h2>
          <p>
            Kalthalam Heritage began as a family-run retreat built around the idea of slow travel.
            Today we welcome guests who want mountain air, local flavors, and a stay that feels
            personal from arrival to checkout.
          </p>
        </div>
        <div className="about-story-grid">
          <div className="about-story-card">
            <h3>Authentic Experiences</h3>
            <p>
              From sunrise walks to village-style meals, every touchpoint celebrates the culture and
              landscape of the Western Ghats.
            </p>
          </div>
          <div className="about-story-card">
            <h3>Thoughtful Comfort</h3>
            <p>
              Clean, cozy cottages, modern amenities, and attentive staff ensure a relaxed, easy stay
              for families, couples, and groups.
            </p>
          </div>
          <div className="about-story-card">
            <h3>Quiet Luxury</h3>
            <p>
              We focus on space, calm, and privacy so guests can truly switch off and reconnect with
              nature.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-highlights">
        <div className="about-section-header">
          <h2>Signature Highlights</h2>
          <p>
            Handpicked moments that make every stay feel special.
          </p>
        </div>
        <div className="about-highlight-grid">
          <div className="about-highlight">
            <h4>Panoramic Valley Views</h4>
            <p>Enjoy misty mornings and golden sunsets from every corner of the property.</p>
          </div>
          <div className="about-highlight">
            <h4>Local Cuisine</h4>
            <p>Fresh, seasonal meals inspired by Kerala traditions and home-style cooking.</p>
          </div>
          <div className="about-highlight">
            <h4>Family Friendly</h4>
            <p>Spacious cottages and safe open areas for kids to explore and play.</p>
          </div>
          <div className="about-highlight">
            <h4>Curated Excursions</h4>
            <p>Guided trips to tea gardens, waterfalls, viewpoints, and local markets.</p>
          </div>
        </div>
      </section>

      <section className="about-section about-amenities">
        <div className="about-section-header">
          <h2>Amenities</h2>
          <p>Everything you need for a peaceful and comfortable stay.</p>
        </div>
        <div className="about-amenities-grid">
          <div className="amenity-chip">24x7 Reception</div>
          <div className="amenity-chip">Restaurant & Cafe</div>
          <div className="amenity-chip">Indoor Games</div>
          <div className="amenity-chip">Free Parking</div>
          <div className="amenity-chip">High Speed Wi-Fi</div>
          <div className="amenity-chip">Family Suites</div>
          <div className="amenity-chip">Garden Seating</div>
          <div className="amenity-chip">Travel Desk</div>
        </div>
      </section>

      <section className="about-section about-cta">
        <div className="about-cta-card">
          <h2>Plan Your Stay at Kalthalam Heritage</h2>
          <p>Choose your cottage, add experiences, and create a stay that feels just right.</p>
          <button type="button" className="about-btn primary" onClick={() => navigate("/user/packages")}
          >
            Explore Packages
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
