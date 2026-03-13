import React from "react";
import { Sidebar } from "../index";
import "./Content.css";
function Content({ children, isMobile, sidebarOpen, closeSidebar }) {
  return (
    <>
      <div className="content-wrapper">
        {isMobile && sidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onClose={closeSidebar}
        />
        <main className="main-content">
          <div className="content-container">{children}</div>
        </main>
      </div>
    </>
  );
}

export default Content;
