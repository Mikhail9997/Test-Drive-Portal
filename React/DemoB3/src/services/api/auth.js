import apiClient from "./config";

export class AuthService {
  async login(credentials) {
    try {
      const response = await apiClient.post("auth/login", credentials);
      if (response.data.success && response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post("/auth/register", userData);

      if (response.data.success && response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMe() {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  handleError(error) {
    if (error.response) {
      // Сервер вернул ошибку (4xx, 5xx)
      const errorData = error.response.data;
      const isAuthError = error.response.status === 401;
      return {
        success: false,
        message: isAuthError
          ? "Ошибка авторизации"
          : errorData?.message || "Ошибка сервера",
        status: error.response.status,
        isAuthError: isAuthError,
        isServerError: error.response.status >= 500,
      };
    } else if (error.request) {
      // Запрос был отправлен, но нет ответа (сетевая ошибка)
      return {
        success: false,
        message: "Сервер не отвечает. Проверьте подключение к интернету.",
        isNetworkError: true,
        isAuthError: false, //
      };
    } else {
      // Ошибка при настройке запроса
      return {
        success: false,
        message: "Произошла ошибка при отправке запроса",
        isClientError: true,
        isAuthError: false,
      };
    }
  }
}

export default new AuthService();
