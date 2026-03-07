import "./RoomGallery.css";

export default function RoomGallery({ images = [] }) {
  if (!images.length) {
    return <p style={{ textAlign: "center" }}>No images available</p>;
  }

  return (
    <div className="room-gallery">
      {images.map((img, index) => (
        <div key={index} className="room-gallery-item">
          <img src={img} alt={`Room ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
