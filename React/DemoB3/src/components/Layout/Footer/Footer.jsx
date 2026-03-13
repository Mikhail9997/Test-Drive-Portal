import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().currentYear;
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <i className="bi bi-car-front-fill footer-icon"></i>
          <span className="footer-copyright">
            © {currentYear} Едем, но это не точно
          </span>
        </div>

        <div className="footer-right">
          <a href="/terms" className="footer-link">
            Условия использования
          </a>
          <span className="footer-separator">•</span>
          <a href="/privacy" className="footer-link">
            Политика конфиденциальности
          </a>
          <span className="footer-separator">•</span>
          <a href="/contacts" className="footer-link">
            Контакты
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
