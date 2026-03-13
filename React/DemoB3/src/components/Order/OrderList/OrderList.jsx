import React, { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination/Pagination";
import useOrder from "../../../hooks/useOrder";
import Spinner from "../../UI/Spinner/Spinner";
import OrderCard from "../OrderCard/OrderCard";
import "./OrderList.css";
import EditOrderModal from "../Modals/EditOrderModal/EditOrderModal";
import Modal from "../Modals/Modal/Modal";

function OrderList() {
  const {
    orders,
    loading,
    error,
    pagination,
    fetchMyOrders,
    setPage,
    setPageSize,
    deleteOrder,
    updateOrder,
  } = useOrder();

  const [orderToEditSelected, setOrderToEditSelected] = useState(null);

  const handleOrderEdit = (order) => {
    setOrderToEditSelected(order);
  };
  const handleOrderEditClose = () => {
    setOrderToEditSelected(null);
  };

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders, pagination.page, pagination.pageSize]);

  if (loading) {
    return (
      <div className="orders-loading">
        <Spinner size="large" center={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-error">
        <i className="bi bi-exclamation-triangle"></i>
        <p>{error}</p>
        <button onClick={() => fetchMyOrders()} className="retry-btn">
          <i className="bi bi-arrow-repeat"></i>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="order-list-container">
        <div className="order-list-header">
          <h1 className="order-list-title">
            <i className="bi bi-truck"></i>
            Список заявок
          </h1>
        </div>
        {orders.length === 0 ? (
          <div className="orders-empty">
            <i className="bi bi-inbox"></i>
            <h3>Заявок пока нет</h3>
            <p>Создайте новую заявку, чтобы она появилась в списке</p>
          </div>
        ) : (
          <>
            <div className="orders-grid">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onOrderDelete={deleteOrder}
                  handleOrderEdit={handleOrderEdit}
                />
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              pageSize={pagination.pageSize}
              totalCount={pagination.totalCount}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </div>
      {orderToEditSelected && (
        <Modal onClose={handleOrderEditClose}>
          <EditOrderModal
            order={orderToEditSelected}
            onClose={handleOrderEditClose}
            onUpdate={updateOrder}
          />
        </Modal>
      )}
    </>
  );
}

export default OrderList;
