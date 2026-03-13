import React, { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

function AuthProvider({ children }) {
  const auth = useAuth();

  const value = useMemo(
    () => ({
      user: auth.user,
      loading: auth.loading,
      error: auth.error,
      isAuthenticated: auth.isAuthenticated,
      login: auth.login,
      register: auth.register,
      logout: auth.logout,
      clearError: auth.clearError,
    }),
    [
      auth.user,
      auth.loading,
      auth.error,
      auth.isAuthenticated,
      auth.login,
      auth.register,
      auth.logout,
      auth.clearError,
    ],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
