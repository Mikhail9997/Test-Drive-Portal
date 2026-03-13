import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";
import "../../styles/auth/AuthLayout.css";
import "../../styles/auth/AuthForms.css";

function AuthLayout({ children }) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="auth-layout">
      <div className="auth-background">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        <div className="auth-shape auth-shape-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Добро пожаловать</h1>
            <p className="auth-subtitle">
              Войдите или зарегистрируйтесь для продолжения
            </p>
          </div>

          <div className="auth-content">{children}</div>

          <div className="auth-footer">
            <p>© 2026 Демоэкзамен B3. Все права защищены.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
