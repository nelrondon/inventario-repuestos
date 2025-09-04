import { RepuestosPage } from "./RepuestosPage";
import { useParts } from "../context/PartsContext";
import { Widget } from "../componentes/Widget";
import { OptionsIcon } from "../componentes/Icons";

export const Dashboard = () => {
  const { parts } = useParts();

  return (
    <>
      <h1>Dashboard - Inicio</h1>

      <section className="app-container">
        <Widget
          description="Repuestos en Inventario"
          value={parts.totalStockParts}
        />
        <Widget
          description="Modelos de Repuestos"
          value={parts.parts?.length}
        />
        <Widget
          description="Repuestos Agotados"
          value={parts.partsOutOfStock}
        />
        <Widget
          description="Valor total de repuestos"
          value={`$${parts.priceTotalParts}`}
        />
      </section>

      <RepuestosPage parts={parts.parts} />
    </>
  );
};
