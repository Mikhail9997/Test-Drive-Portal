import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrder from "../../../hooks/useOrder";
import { useCar } from "../../../hooks/useCar";
import CarSelect from "../../Car/CarSelect";
import "./AddOrderForm.css";

function AddOrderForm() {
  const navigate = useNavigate();
  const { createOrder, loading } = useOrder();
  const { cars, fetchCars, loading: carsLoading } = useCar();

  const [formData, setFormData] = useState({
    address: "",
    contactInfo: "",
    date: "",
    paymentType: "cash",
    carId: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Адрес обязателен";
    } else if (formData.address.length < 5) {
      newErrors.address = "Адрес должен содержать минимум 5 символов";
    }

    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = "Контактная информация обязательна";
    } else if (
      !/^[0-9+\-\s()]+$/.test(formData.contactInfo) &&
      !formData.contactInfo.includes("@")
    ) {
      newErrors.contactInfo = "Введите телефон или email";
    }

    if (!formData.date) {
      newErrors.date = "Дата обязательна";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Дата не может быть в прошлом";
      }
    }

    if (!formData.paymentType) {
      newErrors.paymentType = "Выберите способ оплаты";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.carId) {
      newErrors.carId = "Выберите автомобиль";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCarSelect = (carId) => {
    setFormData((prev) => ({
      ...prev,
      carId,
    }));
    setErrors((prev) => ({ ...prev, carId: "" }));
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      handleNextStep();
    } else {
      if (!validateStep2()) return;

      const requestData = {
        address: formData.address,
        contactInfo: formData.contactInfo,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        paymentType: formData.paymentType === "cash" ? 0 : 1,
        carId: parseInt(formData.carId),
      };

      const result = await createOrder(requestData);

      if (result?.success) {
        navigate("/");
      }
    }
  };

  const paymentTypes = [
    { value: "cash", label: "Наличные", icon: "bi-cash" },
    { value: "creditCard", label: "Карта", icon: "bi-credit-card" },
  ];

  return (
    <form onSubmit={handleSubmit} className="add-order-form">
      <div className="form-progress">
        <div
          className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
        >
          <div className="step-indicator">
            {step > 1 ? <i className="bi bi-check-lg"></i> : 1}
          </div>
          <span className="step-label">Основные данные</span>
        </div>
        <div className={`progress-line ${step > 1 ? "active" : ""}`}></div>
        <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
          <div className="step-indicator">2</div>
          <span className="step-label">Выбор автомобиля</span>
        </div>
      </div>

      {step === 1 && (
        <div className="form-step">
          <h2 className="step-title">
            <i className="bi bi-pencil-square"></i>
            Основная информация
          </h2>

          <div className="form-group">
            <label htmlFor="address">
              <i className="bi bi-geo-alt"></i>
              Адрес подачи
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Введите адрес"
              className={errors.address ? "error" : ""}
              disabled={loading}
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">
              <i className="bi bi-telephone"></i>
              Контактная информация
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Телефон или email"
              className={errors.contactInfo ? "error" : ""}
              disabled={loading}
            />
            {errors.contactInfo && (
              <span className="error-message">{errors.contactInfo}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                <i className="bi bi-calendar"></i>
                Дата подачи
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? "error" : ""}
                disabled={loading}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="paymentType">
                <i className="bi bi-credit-card"></i>
                Способ оплаты
              </label>
              <select
                id="paymentType"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className={errors.paymentType ? "error" : ""}
                disabled={loading}
              >
                {paymentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.paymentType && (
                <span className="error-message">{errors.paymentType}</span>
              )}
            </div>
          </div>
        </div>
      )}
      {step == 2 && (
        <div className="form-step">
          <h2 className="step-title">
            <i className="bi bi-car-front"></i>
            Выберите автомобиль
          </h2>

          <CarSelect
            cars={cars}
            selectedCarId={formData.carId}
            onSelect={handleCarSelect}
            loading={carsLoading}
            error={errors.carId}
          />
        </div>
      )}
      <div className="form-actions">
        {step === 2 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="btn-secondary"
            disabled={loading}
          >
            <i className="bi bi-arrow-left"></i>
            Назад
          </button>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading || (step === 2 && carsLoading)}
        >
          {loading ? (
            <span className="button-loader">
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
            </span>
          ) : step === 1 ? (
            <>
              Продолжить
              <i className="bi bi-arrow-right"></i>
            </>
          ) : (
            <>
              <i className="bi bi-check-lg"></i>
              Создать заявку
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default AddOrderForm;
