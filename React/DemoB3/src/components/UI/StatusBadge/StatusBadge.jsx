import React from "react";
import "./StatusBadge.css";

function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    const statuses = {
      pending: { label: "Новая", icon: "bi-star", class: "status-new" },
      approved: {
        label: "Одобрена",
        icon: "bi-gear",
        class: "status-progress",
      },
      done: {
        label: "Завершена",
        icon: "bi-check-circle",
        class: "status-completed",
      },
      rejected: {
        label: "Отменена",
        icon: "bi-x-circle",
        class: "status-cancelled",
      },
    };

    return statuses[status?.toLowerCase()] || statuses.new;
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.class}`}>
      <i className={`bi ${config.icon}`}></i>
      {config.label}
    </span>
  );
}

export default StatusBadge;
