export default function VirtualTour() {
  return (
    <div className="virtual-tour-container">
      <h2>360° Virtual Tour</h2>

      <p className="virtual-tour-text">
        Explore Kalthalam Heritage virtually and experience the cottages,
        surroundings, and peaceful hill views before you arrive.
      </p>

      <div className="virtual-tour-frame">
        <iframe
          title="Kalthalam Heritage Virtual Tour"
          src="https://www.google.com/maps/embed?pb=!4v1700000000000"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
