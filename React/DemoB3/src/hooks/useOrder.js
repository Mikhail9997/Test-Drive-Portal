import React, { useCallback, useState } from "react";
import orderService from "../services/api/order";

const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    totalPages: 0,
    totalCount: 0,
  });

  // Получение всех заказов
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const requestParams = {
        page: pagination.page,
        pageSize: pagination.pageSize,
      };
      const response = await orderService.getAll(requestParams);

      if (response.success) {
        const responseData = response.data;
        setOrders(responseData.orders);
        setPagination({
          page: responseData.page || 1,
          pageSize: responseData.pageSize || 5,
          totalPages: responseData.totalPages || 0,
          totalCount: responseData.totalCount || 0,
        });
        return { success: true, data: response.data };
      }
    } catch (err) {
      setError(err.message || "Ошибка при загрузке ваших заказов");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  // Получение заказов пользователя
  const fetchMyOrders = useCallback(
    async (params = null) => {
      try {
        setLoading(true);
        setError(null);
        const requestParams = params || {
          page: pagination.page,
          pageSize: pagination.pageSize,
        };
        const response = await orderService.getMy(requestParams);

        if (response.success) {
          const responseData = response.data;

          setOrders(responseData.orders);

          setPagination({
            page: responseData.page || 1,
            pageSize: responseData.pageSize || 5,
            totalPages: responseData.totalPages || 0,
            totalCount: responseData.totalCount || 0,
          });

          return { success: true, data: response.data };
        }
      } catch (err) {
        setError(err.message || "Ошибка при загрузке ваших заказов");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.pageSize],
  );

  // Получение заказа по ID
  const fetchOrderById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.getById(id);

      if (response.success) {
        setCurrentOrder(response.data);
        return { success: true, data: response.data };
      }
    } catch (err) {
      setError(err.message || "Ошибка при загрузке заказа");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Создание завяки
  const createOrder = useCallback(
    async (orderData) => {
      try {
        setLoading(true);
        setError(null);

        const response = await orderService.create(orderData);

        if (response.success) {
          // Обновляем список заказов
          //await fetchMyOrders();
          return { success: true, data: response.data };
        }
      } catch (err) {
        setError(err.message || "Ошибка при создании заказа");
      } finally {
        setLoading(false);
      }
    },
    [fetchMyOrders],
  );

  // Обновление заказа
  const updateOrder = useCallback(
    async (orderData, orderId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderService.update(orderId, orderData);

        if (response.success) {
          // Обновляем список заказов
          await fetchMyOrders({ page: 1, pageSize: pagination.pageSize });
          return { success: true, data: response.data };
        }
      } catch (err) {
        setError(err.message || "Ошибка при обновлении заявки");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [fetchMyOrders],
  );

  // Обновление статуса заказа
  const updateOrderStatus = useCallback(
    async (newStatues, orderId) => {
      try {
        setLoading(true);
        setError(null);

        const response = await orderService.updateStatus(orderId, newStatues);

        if (response.success) {
          // Обновляем список заказов
          await fetchMyOrders();
          return { success: true, data: response.data };
        }
      } catch (err) {
        setError(err.message || "Ошибка при обновлении статуса");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [fetchMyOrders],
  );

  // Удаление заказа
  const deleteOrder = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response = await orderService.delete(id);

        if (response.success) {
          // Обновляем список заказов
          await fetchMyOrders({ page: 1, pageSize: pagination.pageSize });
          return { success: true, data: response.data };
        }
      } catch (err) {
        setError(err.message || "Ошибка при удалении заказа");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [fetchMyOrders],
  );

  // Очистка ошибки
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Сброс состояния
  const resetState = useCallback(() => {
    setOrders([]);
    setCurrentOrder(null);
    setError(null);
    setLoading(false);
  }, []);

  const setPage = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  }, []);

  const setPageSize = useCallback((newSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newSize, page: 1 }));
  }, []);

  const resetPagination = () => {
    setPagination({
      page: 1,
      pageSize: 5,
      totalPages: 0,
      totalCount: 0,
    });
  };

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.totalPages),
    }));
  }, []);

  const prevPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, []);

  return {
    // State
    orders,
    currentOrder,
    loading,
    error,
    pagination,

    // Methods
    fetchOrders,
    fetchMyOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    clearError,
    resetState,
    setPage,
    setPageSize,
    nextPage,
    prevPage,

    // Utilities
    hasOrders: orders.length > 0,
    isEmpty: orders.length === 0 && !loading,
  };
};

export default useOrder;
