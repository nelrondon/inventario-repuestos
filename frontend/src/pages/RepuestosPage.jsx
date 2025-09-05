import "./Forms.css";

import { useNavigate } from "react-router-dom";
import { OptionsIcon } from "../componentes/Icons.jsx";
import { useEffect, useRef, useState } from "react";
import { useParts } from "../context/PartsContext.jsx";

export const RepuestosPage = () => {
  const modalRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});

  const { parts } = useParts();

  useEffect(() => {
    if (openModal) {
      return modalRef.current.showModal();
    }
    return modalRef.current.close();
  }, [openModal]);

  const navigate = useNavigate();

  const handleViewModel = () => {
    navigate(`/info/model/${data.model}`);
  };
  const handleViewManufacturer = () => {
    navigate(`/info/fab/${data.manufacturer}`);
  };

  useEffect(() => {
    console.log("cambio");
  }, [parts]);

  return (
    <>
      <dialog
        className="app-modal"
        ref={modalRef}
        onClick={() => setOpenModal(false)}
      >
        <h2>Más Información</h2>
        <button className="modal-button" onClick={handleViewModel}>
          Ver detalles del modelo
        </button>
        <button className="modal-button" onClick={handleViewManufacturer}>
          Ver detalles del fabricante
        </button>
      </dialog>

      <h1>Repuestos</h1>
      <section className="app-container">
        <table className="app-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Modelo</th>
              <th scope="col">Fabricante</th>
              <th scope="col">Modelo de Camión</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {parts?.parts &&
              parts?.parts.map((part) => (
                <tr key={part.model}>
                  <th scope="row">{part.name}</th>
                  <td>{part.model}</td>
                  <td>{part.manufacturer}</td>
                  <td>{part.truck_model}</td>
                  <td>{part.description}</td>
                  <td>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setData(part);
                      }}
                    >
                      <OptionsIcon />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
