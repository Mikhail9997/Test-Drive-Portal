import React, { useState } from "react";
import "./CarSelect.css";
import Spinner from "../UI/Spinner/Spinner";

function CarSelect({ cars, selectedCarId, onSelect, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.mark.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="car-select-loading">
        <Spinner size="medium" />
        <p>Загрузка автомобилей...</p>
      </div>
    );
  }

  if (!cars.length) {
    return (
      <div className="car-select-empty">
        <i className="bi bi-car-front"></i>
        <h3>Нет доступных автомобилей</h3>
        <p>Обратитесь к администратору для добавления автомобилей</p>
      </div>
    );
  }
  return (
    <div className="car-select">
      <div className="car-select-header">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Поиск по марке или модели..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="car-select-error">
          <i className="bi bi-exclamation-triangle"></i>
          {error}
        </div>
      )}

      <div className="cars-grid">
        {filteredCars.length === 0 ? (
          <div className="no-results">
            <i className="bi bi-emoji-frown"></i>
            <p>Автомобили не найдены</p>
          </div>
        ) : (
          filteredCars.map((car) => (
            <div
              key={car.id}
              className={`car-card ${selectedCarId === car.id ? "selected" : ""}`}
              onClick={() => onSelect(car.id)}
            >
              <div className="car-card-header">
                <i className="bi bi-car-front"></i>
                <h3>
                  {car.mark} {car.model}
                </h3>
              </div>

              {selectedCarId === car.id && (
                <div className="selected-indicator">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="cars-count">
        Найдено: {filteredCars.length} из {cars.length}
      </div>
    </div>
  );
}

export default CarSelect;
