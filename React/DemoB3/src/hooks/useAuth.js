import React, { useCallback, useContext, useEffect, useState } from "react";
import authService from "../services/api/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        if (loading) setLoading(!loading);
        return;
      }

      try {
        setLoading(true);
        const response = await authService.getMe();
        if (response?.success) {
          setUser(response.data);
          setIsAuthenticated(true);
          setError(null);
        } else {
          throw new Error("Не удалось получить данные пользователя");
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(err.message || "Ошибка авторизации");

        if (
          err.isAuthError ||
          err.status === 401 ||
          err.message?.includes("401")
        ) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setError(
            "Не удалось проверить авторизацию. Проверьте подключение к интернету.",
          );
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(credentials);
      if (response.success) {
        // Сохраняем токен
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }

        setIsAuthenticated(true);
        if (response.data) {
          setUser(response.data);
        }
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || "Ошибка при входе");
      }
    } catch (err) {
      setError(err.message || "Ошибка при входе");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.register(userData);

      if (response.success) {
        setIsAuthenticated(true);
        if (response.data) {
          setUser(response.data);
        }
        return { success: true, data: response.data };
      } else {
        throw new Error(response?.message || "Ошибка при регистрации");
      }
    } catch (err) {
      setError(err.message || "Ошибка при регистрации");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
    setIsAuthenticated(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
  };
};
