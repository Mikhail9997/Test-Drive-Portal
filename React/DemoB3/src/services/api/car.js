import apiClient from "./config";

class CarService {
  async getAll() {
    try {
      const response = await apiClient.get("car");
      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw {
        success: false,
        message: "Сервер не отвечает. Проверьте подключение к интернету.",
      };
    } else {
      throw {
        success: false,
        message: "Произошла ошибка при отправке запроса",
      };
    }
  }
}

export default new CarService();
