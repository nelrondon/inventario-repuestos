import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getRepuestosXModelApi } from "../api/repuestos";
import { Table } from "../componentes/Table";
import { Widget } from "../componentes/Widget";

import { useParts } from "../context/PartsContext";
import { useErrors } from "../hooks/useErrors";

import "./Forms.css";

export const RepuestosPorModelo = () => {
  const { model } = useParams();
  const { parts, models } = useParts();
  const { setErrors } = useErrors();
  const [dataPart, setDataPart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!model || !parts.parts?.some((part) => part.model === model)) {
        return;
      }
      try {
        const response = await getRepuestosXModelApi(model);
        setDataPart(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [parts, model]);

  const handleSearch = (e) => {
    e.preventDefault();
    const model = e.target[0].value.toUpperCase();
    if (!model || !parts.parts.some((part) => part.model === model)) {
      return setErrors(["Modelo no encontrado"]);
    }
    navigate(`/info/model/${model}`);
  };

  if (!model) {
    return (
      <>
        <h1>Busqueda por Modelo: </h1>
        <div className="app-container center">
          <form className="app-form-entry" onSubmit={handleSearch}>
            <input type="text" placeholder="Modelo a buscar:" list="models" />
            <button>Buscar</button>

            <datalist id="models">
              {models?.map((model) => (
                <option key={model} value={model} />
              ))}
            </datalist>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Repuestos del Modelo: {model}</h1>
      <h2>Estadistica del Modelo</h2>
      <div className="app-container">
        <Widget
          description="Cantidad de Repuesto en Inventario"
          value={dataPart?.stock_quantity}
        />
        <Widget
          description="Precio Promedio del Repuesto (Adquirido)"
          value={`$${dataPart?.avrg_price}`}
        />
        <Widget
          description="Precio Total en Repuesto"
          value={`$${dataPart?.totalPrice}`}
        />
      </div>
      <h2>Registro de Repuestos</h2>
      <Table
        body={dataPart.data}
        headers={{
          name: "Nombre",
          model: "Modelo",
          manufacturer: "Fabricante",
          truck_model: "Modelo de Camión",
          price: "Precio",
          quantity: "Cantidad",
          availability: "Disponibilidad",
          description: "Descripción",
          create_at: "Fecha de Registro",
        }}
        options={{
          strong: ["name", "price", "quantity"],
          dates: ["create_at"],
        }}
      />
    </>
  );
};
