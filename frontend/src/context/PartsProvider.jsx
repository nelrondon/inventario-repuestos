import { useState } from "react";
import { PartsContext } from "./PartsContext";
import { getRepuestosApi } from "../api/repuestos";
import { useEffect } from "react";

export const PartsProvider = ({ children }) => {
  const [parts, setParts] = useState([]);
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  const getRepuestos = async () => {
    try {
      const { data } = await getRepuestosApi();
      const listModels = data.parts.map((part) => part.model);
      const listManufacturers = [
        ...new Set(data.parts.map((part) => part.manufacturer)),
      ];
      setParts(data);
      setModels(listModels);
      setManufacturers(listManufacturers);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRepuestos();
  }, []);

  return (
    <PartsContext.Provider
      value={{ parts, manufacturers, getRepuestos, models }}
    >
      {children}
    </PartsContext.Provider>
  );
};
