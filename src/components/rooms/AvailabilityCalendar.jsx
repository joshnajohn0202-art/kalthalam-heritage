import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import API from "../../service/api";

export default function AvailabilityCalendar({ roomType }) {
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH BOOKINGS
  ================================ */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings");

        const dates = res.data
          .filter((b) => b.roomType === roomType)
          .flatMap((booking) => {
            const start = new Date(booking.checkIn);
            const end = new Date(booking.checkOut);
            const days = [];

            for (
              let d = new Date(start);
              d <= end;
              d.setDate(d.getDate() + 1)
            ) {
              days.push(new Date(d));
            }

            return days;
          });

        setBookedDates(dates);
      } catch (err) {
        console.error("Failed to load availability");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [roomType]);

  /* ===============================
     CHECK IF DATE IS BOOKED
  ================================ */
  const isBooked = (date) =>
    bookedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

  if (loading) return <p>Loading availability...</p>;

  return (
    <div className="availability-calendar">
      <h3>Availability Calendar</h3>

      <Calendar
        tileDisabled={({ date }) => isBooked(date)}
        tileClassName={({ date }) =>
          isBooked(date) ? "booked-date" : null
        }
      />

      <p className="calendar-note">
        <span className="booked-box" /> Booked
      </p>
    </div>
  );
}
