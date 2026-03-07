import { useEffect, useState } from "react";
import API from "../../service/api"; // ✅ FIXED PATH

export default function BookingSummary() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading bookings...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="booking-summary-container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-summary-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-summary-card">
              <h3>{booking.roomType}</h3>
              <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Status:</strong> {booking.status || "pending"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
