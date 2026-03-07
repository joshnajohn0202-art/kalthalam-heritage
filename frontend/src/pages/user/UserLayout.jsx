import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserLayout.css";

const UserLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="user-layout-wrapper">
      <header className="user-topbar">
        <Link to="/" className="topbar-brand brand-link" onClick={closeMenu}>
          <div className="brand-text">
            <h3>Kalthalam Heritage</h3>
            <p>Resort Management</p>
          </div>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className={`topbar-nav ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/user/cottage" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">Cottage</span>
          </NavLink>
          <NavLink to="/user/packages" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">Packages</span>
          </NavLink>
          <NavLink to="/user/about" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">About</span>
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/user/payment" className="nav-item" onClick={closeMenu}>
              <span className="nav-label">Payment</span>
            </NavLink>
          )}
          <NavLink to="/user/profile" className="nav-item" onClick={closeMenu}>
            <span className="nav-label">Profile</span>
          </NavLink>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </nav>

        {isMenuOpen && <div className="topbar-backdrop" onClick={closeMenu} />}
      </header>

      <div className="user-main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
