import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getRepuestosXFabricanteApi } from "../api/repuestos";
import { Table } from "../componentes/Table";
import { Widget } from "../componentes/Widget";

import { useParts } from "../context/PartsContext";
import { useErrors } from "../hooks/useErrors";
import "./Forms.css";

export const RepuestosPorFabricante = () => {
  const { fabricante } = useParams();

  const { parts, manufacturers } = useParts();
  const { setErrors } = useErrors();
  const [dataPart, setDataPart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!fabricante) {
      return;
    }
    const fetchData = async () => {
      try {
        const { data } = await getRepuestosXFabricanteApi(fabricante);
        setDataPart(data);
      } catch (e) {
        console.error(e);
        navigate("/info/fab");
      }
    };
    fetchData();
  }, [fabricante, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    const manufacturer = e.target[0].value.toUpperCase();

    if (
      !manufacturer ||
      !parts.parts.some((part) => part.manufacturer === manufacturer)
    ) {
      return setErrors(["Fabricante no encontrado"]);
    }
    navigate(`/info/fab/${manufacturer}`);
  };

  if (!fabricante) {
    return (
      <>
        <h1>Busqueda por Fabricante: </h1>
        <div className="app-container center">
          <form className="app-form-entry" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Fabricante a buscar:"
              list="datalist"
            />
            <button>Buscar</button>

            <datalist id="datalist">
              {manufacturers?.map((fab) => (
                <option key={fab} value={fab} />
              ))}
            </datalist>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Repuestos del fabricante: {fabricante}</h1>
      <h2>Estadisticas del fabricante</h2>
      <div className="app-container">
        <Widget
          description="Repuestos del fabricante en Inventario"
          value={dataPart.stock_quantity}
        />
        <Widget
          description="Modelos del fabricante"
          value={dataPart.numsModels}
        />
        <Widget
          description="Precio Total de Repuestos del fabricante"
          value={`$${dataPart.totalPrice}`}
        />
      </div>
      <h2>Registro de repuestos</h2>
      <div className="app-container">
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
      </div>
    </>
  );
};
