import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
function Sidebar({ isOpen, isMobile, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  // Закрытие мобильного меню при клике на ссылку
  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const menuItems = [
    { path: "/", icon: "bi-house-door", label: "Главная" },
    { path: "/create-order", icon: "bi-plus-circle", label: "Создать заказ" },
  ];

  return (
    <>
      <aside
        className={`sidebar ${collapsed && !isMobile ? "collapsed" : ""} ${isOpen ? "open" : ""}`}
      >
        {!isMobile && (
          <button
            className="sidebar-toggle"
            onClick={(e) => setCollapsed(!collapsed)}
          >
            <i className={`bi bi-chevron-${collapsed ? "right" : "left"}`}></i>
          </button>
        )}

        <nav className="sidebar__nav">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={handleLinkClick}
            >
              <i className={`bi ${item.icon}`}></i>
              {(!collapsed || isMobile) && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <NavLink
            to="/support"
            className="sidebar-link"
            onClick={handleLinkClick}
          >
            <i className="bi bi-question-circle"></i>
            {(!collapsed || isMobile) && <span>Поддержка</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
