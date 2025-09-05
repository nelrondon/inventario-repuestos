import { useEffect, useRef, useState } from "react";
import { OptionsIcon } from "../componentes/Icons.jsx";
import { useParts } from "../context/PartsContext";

import { deleteRepuestosApi } from "../api/repuestos.js";

import { formatDateTime } from "../libs.js";
import { useNavigate } from "react-router-dom";

export const FullRegisterPage = () => {
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState();
  const { parts } = useParts();

  const { getRepuestos } = useParts();

  const navigate = useNavigate();

  useEffect(() => {
    if (openModal && data) {
      console.log(data);
      return modalRef.current.showModal();
    }
    return modalRef.current.close();
  }, [openModal, data]);

  const handleDelete = async () => {
    const id = data._id;
    const confirmation = confirm(
      "¿Estas seguro que deseas continuar con la eliminación?"
    );
    if (confirmation) {
      await deleteRepuestosApi(id);
    }
    await getRepuestos();
    navigate("/");
  };
  const handleModify = () => {
    navigate(`/modify/${data._id}`);
  };

  return (
    <>
      <dialog
        ref={modalRef}
        className="app-modal"
        onClick={() => setOpenModal(false)}
      >
        <h1>Opciones</h1>

        <button onClick={handleModify}>Editar</button>
        <button className="danger" onClick={handleDelete}>
          Eliminar
        </button>
      </dialog>

      <h1>Registro completo de repuestos</h1>
      <p>
        En esta página, podrás visualizar el registro completo de todos los
        repuestos. Además, tienes la opción de editar o eliminar cualquier
        repuesto existente.
      </p>
      <section className="app-container">
        <table className="app-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Modelo</th>
              <th scope="col">Fabricante</th>
              <th scope="col">Modelo de Camión</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Fecha de Registro</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {parts.fullParts?.map((part) => (
              <tr key={part._id}>
                <td>{part.name}</td>
                <td>{part.model}</td>
                <td>{part.manufacturer}</td>
                <td>{part.truck_model}</td>
                <td>{part.quantity}</td>
                <td>{part.price}</td>
                <td>{formatDateTime(part.create_at)}</td>
                <td>
                  <button
                    onClick={() => {
                      setData(part);
                      setOpenModal(true);
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
