import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRepuestoXIdApi, updateRepuestoApi } from "../api/repuestos.js";

import { InputBasic as Input } from "../componentes/Input.jsx";
import { Loading } from "../componentes/Loading.jsx";
import { useErrors } from "../hooks/useErrors.jsx";
import { useParts } from "../context/PartsContext.jsx";

export const ModifyPartPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const { getRepuestos } = useParts();

  const formRef = useRef();
  const navigate = useNavigate();

  const { setErrors } = useErrors();

  const getRepuesto = async () => {
    if (id) {
      const { data } = await getRepuestoXIdApi(id);
      setData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getRepuesto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const repuesto = Object.fromEntries(formData.entries());
    if (
      Object.values(repuesto).some((value) => {
        return (
          value === "" || value === null || value === undefined || value === 0
        );
      })
    ) {
      console.log(Object.values(repuesto));
      return setErrors(["Ingresa la información correctamente."]);
    }
    try {
      const response = await updateRepuestoApi(id, {
        ...repuesto,
        price: parseInt(repuesto.price),
        quantity: parseInt(repuesto.quantity),
      });
      console.log(response);
      getRepuestos();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  if (!data) return <Loading />;

  return (
    <>
      <h1>Modificando un repuesto</h1>
      <section className="app-container center">
        <form ref={formRef} className="app-form" onSubmit={onSubmit}>
          <Input
            label="Nombre"
            name="name"
            placeholder="Amortiguador"
            value={data?.name}
            onChange={handleChange}
          />
          <Input
            label="Modelo"
            name="model"
            placeholder="ZXY-123"
            value={data?.model}
            onChange={handleChange}
          />
          <Input
            label="Fabricante"
            name="manufacturer"
            placeholder="MACK"
            value={data?.manufacturer}
            onChange={handleChange}
          />
          <Input
            label="Modelo de Camión"
            name="truck_model"
            placeholder="Granite"
            value={data?.truck_model}
            onChange={handleChange}
          />
          <Input
            label="Precio"
            type="number"
            name="price"
            placeholder="20"
            value={data?.price}
            onChange={handleChange}
          />
          <Input
            label="Cantidad"
            type="number"
            name="quantity"
            placeholder="5"
            value={data?.quantity}
            onChange={handleChange}
          />
          <Input
            label="Descripción"
            name="description"
            placeholder="Descripción del producto"
            value={data?.description}
            onChange={handleChange}
          />

          <button type="submit">Modificar Repuesto</button>
        </form>
      </section>
    </>
  );
};
