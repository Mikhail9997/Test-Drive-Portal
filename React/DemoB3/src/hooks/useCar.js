import { useCallback, useState } from "react";
import carService from "../services/api/car";

export const useCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await carService.getAll();

      if (response?.success) {
        setCars(response.data);
      } else {
        throw new Error(response?.message || "Ошибка при загрузке автомобилей");
      }
    } catch (err) {
      setError(err.message || "Ошибка при загрузке автомобилей");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchCars,
    cars,
    loading,
    error,
    hasCars: cars.length > 0,
    isEmpty: cars.length === 0 && !loading,
  };
};
