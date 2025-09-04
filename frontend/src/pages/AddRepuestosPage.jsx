import "./Forms.css";

import { useForm } from "react-hook-form";
import { addRepuestosApi } from "../api/repuestos.js";
import { useParts } from "../context/PartsContext.jsx";
import { useRef } from "react";

import { Input } from "../componentes/Input.jsx";

export const AddRepuestosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formRef = useRef();

  const { getRepuestos } = useParts();

  const onSubmit = async (data) => {
    try {
      await addRepuestosApi({
        ...data,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
      });

      getRepuestos();
      formRef.current.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Añadir un nuevo Repuesto</h1>
      <section className="app-container center">
        <form
          ref={formRef}
          className="app-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            errors={errors}
            label="Nombre"
            name="name"
            placeholder="Amortiguador"
          />
          <Input
            register={register}
            errors={errors}
            label="Modelo"
            name="model"
            placeholder="ZXY-123"
          />
          <Input
            register={register}
            errors={errors}
            label="Fabricante"
            name="manufacturer"
            placeholder="MACK"
          />
          <Input
            register={register}
            errors={errors}
            label="Modelo de Camión"
            name="truck_model"
            placeholder="Granite"
          />
          <Input
            register={register}
            errors={errors}
            label="Precio"
            type="number"
            name="price"
            placeholder="20"
          />
          <Input
            register={register}
            errors={errors}
            label="Cantidad"
            type="number"
            name="quantity"
            placeholder="5"
          />
          <Input
            register={register}
            errors={errors}
            label="Descripción"
            name="description"
            placeholder="Descripción del producto"
          />

          <button type="submit">Añadir Repuesto</button>
        </form>
      </section>
    </>
  );
};
