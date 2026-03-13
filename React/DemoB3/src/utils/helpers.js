export const formatDate = (date, format = "short") => {
  if (!date) return "";

  const d = new Date(date);
  if (format === "short") {
    return d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

export const getStatusColor = (status) => {
  const colors = {
    pending: "#3498db",
    approved: "#f39c12",
    done: "#2ecc71",
    rejected: "#e74c3c",
  };
  return colors[status?.toLowerCase()] || "#95a5a6";
};
