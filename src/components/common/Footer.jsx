import React from "react";

/**
 * Application footer
 */
export default function Footer() {
  return (
    <footer className="footer">
      <h3>Kalthalam Heritage</h3>

      <p>
        Experience heritage cottages with modern comfort, 360° virtual tours,
        and easy online booking.
      </p>

      <p className="footer-copy">
        © {new Date().getFullYear()} Kalthalam Heritage. All rights reserved.
      </p>
    </footer>
  );
}
