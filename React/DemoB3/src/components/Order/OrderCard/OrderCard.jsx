import React, { useState } from "react";
import { formatDate, getStatusColor } from "../../../utils/helpers";
import StatusBadge from "../../UI/StatusBadge/StatusBadge";
import "./OrderCard.css";

function OrderCard({ order, onOrderDelete, handleOrderEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  const getPaymentIcon = (paymentType) => {
    const icons = {
      cash: "bi-cash",
      card: "bi-credit-card",
      online: "bi-wifi",
    };

    return icons[paymentType?.toLowerCase() ?? "bi-credit-card"];
  };

  return (
    <div className={`order-card ${showDetails ? "expanded" : ""}`}>
      <div
        className="order-card-header"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="order-card-main">
          <div className="order-id">
            <i className="bi bi-hash"></i>
            <span>#{order.id}</span>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="order-card-preview">
          <div className="order-card-preview-left">
            <div className="order-car">
              <i className="bi bi-car-front"></i>
              <span>
                {order.car?.mark} {order.car?.model}
              </span>
            </div>
            <div className="order-date">
              <i className="bi bi-calendar"></i>
              <span>{formatDate(order.date)}</span>
            </div>
          </div>
          <button className="expand-btn">
            <i className={`bi bi-chevron-${showDetails ? "up" : "down"}`}></i>
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="order-card-details">
          <div className="details-grid">
            <div className="detail-item">
              <i className="bi bi-geo-alt"></i>
              <div>
                <span className="detail-label">Адрес</span>
                <span className="detail-value">{order.address}</span>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-telephone"></i>
              <div>
                <span className="detail-label">Контакты</span>
                <span className="detail-value">{order.contactInfo}</span>
              </div>
            </div>

            <div className="detail-item">
              <i className={getPaymentIcon(order.paymentType)}></i>
              <div>
                <span className="detail-label">Оплата</span>
                <span className="detail-value">{order.paymentType}</span>
              </div>
            </div>

            <div className="detail-item">
              <i className="bi bi-clock"></i>
              <div>
                <span className="detail-label">Время</span>
                <span className="detail-value">
                  {formatDate(order.date, "full")}
                </span>
              </div>
            </div>
          </div>

          <div className="order-card-actions">
            <button
              className="action-btn edit-btn"
              onClick={() => handleOrderEdit(order)}
            >
              <i className="bi bi-pencil"></i>
              Изменить
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => onOrderDelete(order.id)}
            >
              <i className="bi bi-trash"></i>
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
