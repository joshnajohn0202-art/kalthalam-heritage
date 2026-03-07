import { useEffect, useState } from "react";
import API from "../../service/api";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    amenities: "",
    available: true,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data || []);
    } catch (err) {
      console.error("Error fetching rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/rooms", {
        ...formData,
        amenities: formData.amenities
          .split(",")
          .map((a) => a.trim()),
      });

      setFormData({
        name: "",
        price: "",
        amenities: "",
        available: true,
      });

      fetchRooms();
    } catch (err) {
      console.error("Error adding room");
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      await API.put(`/rooms/${id}`, {
        available: !currentStatus,
      });
      fetchRooms();
    } catch (err) {
      console.error("Error updating availability");
    }
  };

  return (
    <div className="admin-page">
      <h2>Manage Rooms / Cottages</h2>
      <p className="admin-text">
        Add, update and manage room availability
      </p>

      {/* ADD ROOM */}
      <div className="form-box">
        <h3>Add New Room</h3>

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="name"
            placeholder="Room Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price per night"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={formData.amenities}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>

          <button type="submit" className="btn primary">
            Add Room
          </button>
        </form>
      </div>

      {/* ROOM LIST */}
      <h3>Room List</h3>

      {loading ? (
        <p className="admin-text">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="admin-text">No rooms available</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Amenities</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.name}</td>
                  <td>₹ {room.price}</td>
                  <td>{room.amenities?.join(", ")}</td>
                  <td>
                    <span
                      className={`status ${
                        room.available ? "approved" : "rejected"
                      }`}
                    >
                      {room.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() =>
                        toggleAvailability(room._id, room.available)
                      }
                    >
                      Toggle Availability
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
