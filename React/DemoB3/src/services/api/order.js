import apiClient from "./config";

export class OrderService {
  async getAll(params = { page: 1, pageSize: 5 }) {
    try {
      const response = await apiClient.get("/order", {
        params: params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMy(params = { page: 1, pageSize: 5 }) {
    try {
      const response = await apiClient.get("/order/my", {
        params: params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id) {
    try {
      const response = await apiClient.get(`/order/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(orderData) {
    try {
      const response = await apiClient.post("/order", orderData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(orderId, orderData) {
    try {
      const response = await apiClient.put(
        `/order/update/${orderId}`,
        orderData,
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateStatus(orderId, newStatus) {
    try {
      const response = await apiClient.put(`/order/${orderId}`, newStatus);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id) {
    try {
      const response = await apiClient.delete(`/order/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
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

export default new OrderService();
