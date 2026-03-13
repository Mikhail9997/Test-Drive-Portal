import React from "react";
import AddOrderForm from "../../../components/Order/AddOrderForm/AddOrderForm";
import "./AddOrderPage.css";

function AddOrderPage() {
  return (
    <div className="add-order-page">
      <div className="page-header">
        <h1>
          <i className="bi bi-plus-circle"></i>
          Новая заявка
        </h1>
        <p className="page-description">
          Заполните форму для создания новой заявки на перевозку
        </p>
      </div>

      <div className="page-content">
        <AddOrderForm />
      </div>
    </div>
  );
}

export default AddOrderPage;
