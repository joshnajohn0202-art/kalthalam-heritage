export default function RoleModal({ onSelect }) {
  return (
    <div className="role-modal-overlay">
      <div className="role-modal">
        <h3>Select Your Role</h3>

        <div className="role-cards">
          <div className="role-card" onClick={() => onSelect("admin")}>
            <h4>Admin</h4>
            <p>Manage system & users</p>
          </div>

          <div className="role-card" onClick={() => onSelect("staff")}>
            <h4>Staff</h4>
            <p>Manage bookings & guests</p>
          </div>

          <div className="role-card" onClick={() => onSelect("visitor")}>
            <h4>Visitor</h4>
            <p>Browse & book cottages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
