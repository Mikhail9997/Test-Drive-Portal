import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

function Header({ toggleSidebar, isMobile, sidebarOpen }) {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          {isMobile && (
            <button className="mobile-menu-toggle" onClick={toggleSidebar}>
              <i className={`bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </button>
          )}
          <Link to="/" className="logo">
            <i className="bi bi-car-front-fill logo-icon"></i>
            <span className="logo-text">
              Едем, но это <span className="logo-highlight">не точно</span>
            </span>
          </Link>
        </div>
        <div className="header__right">
          <div className="header__user-menu">
            <span className="header__user-greeting">
              <i className="bi bi-person-circle"></i>
              {user?.fullName || user?.login}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
