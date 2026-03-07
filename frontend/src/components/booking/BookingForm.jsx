import { useState } from "react";
import API from "../../service/api";
import BookingSummary from "./BookingSummary";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    message: "",
  });

  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/bookings", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBooking(res.data.booking);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  if (booking) {
    return <BookingSummary booking={booking} />;
  }

  return (
    <div className="booking-container">
      <h2>Room Booking</h2>

      {error && <p className="error-text">{error}</p>}

      <form className="booking-form" onSubmit={handleBooking}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />

        <select name="roomType" onChange={handleChange}>
          <option value="">Select Room</option>
          <option value="heritage cottage">Heritage Cottage</option>
          <option value="deluxe cottage">Deluxe Cottage</option>
        </select>

        <input type="date" name="checkIn" onChange={handleChange} />
        <input type="date" name="checkOut" onChange={handleChange} />

        <input
          type="number"
          name="guests"
          min="1"
          placeholder="Guests"
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Message (optional)"
          onChange={handleChange}
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
