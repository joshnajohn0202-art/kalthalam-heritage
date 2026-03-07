import { useNavigate } from "react-router-dom";
import AvailabilityCalendar from "./AvailabilityCalendar";

export default function RoomCard({ room }) {
  const navigate = useNavigate();

  return (
    <div className="room-card">
      <h3>{room.title}</h3>

      <p>{room.description}</p>

      <ul>
        {room.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <p>
        <strong>Price:</strong> ₹{room.price} / night
      </p>

      {/* Availability calendar */}
      <AvailabilityCalendar roomType={room.type} />

      <button
        onClick={() =>
          navigate("/booking", {
            state: { roomType: room.type },
          })
        }
      >
        Book Now
      </button>
    </div>
  );
}
