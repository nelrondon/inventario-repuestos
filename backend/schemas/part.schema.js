import { z } from "zod";

const availabilityEnums = ["DISPONIBLE", "NO DISPONIBLE", "EN USO"];

const partSchema = z.object(
  {
    name: z.string({
      error: (iss) => {
        if (iss.code === "invalid_type")
          return "El nombre del repuesto debe ser un string";
        if (iss.code === "required")
          return "El nombre del repuesto es requerido";
      },
    }),

    model: z
      .string({
        error: (iss) => {
          if (iss.code === "invalid_type")
            return "El modelo del repuesto debe ser un string";
          if (iss.code === "required")
            return "El modelo del repuesto es requerido";
        },
      })
      .min(3, "El modelo del repuesto debe tener al menos 3 caracteres"),
    manufacturer: z.string({
      error: (iss) => {
        if (iss.code === "invalid_type")
          return "El fabricante del repuesto debe ser un string";
        if (iss.code === "required")
          return "El fabricante del repuesto es requerido";
      },
    }),
    price: z
      .number({
        error: (iss) => {
          if (iss.code === "invalid_type")
            return "El precio del repuesto debe ser un número";
          if (iss.code === "required")
            return "El precio del repuesto es requerido";
        },
      })
      .positive("El precio del repuesto debe ser un número mayor a 0"),
    quantity: z
      .number({
        error: (iss) => {
          if (iss.code === "invalid_type")
            return "La cantidad de repuestos debe ser un número";
          if (iss.code === "required")
            return "La cantidad de repuestos es requerido";
        },
      })
      .int("La cantidad de repuestos debe ser un número entero")
      .positive("La cantidad de repuestos debe ser un número mayor a 0"),
    truck_model: z.string({
      error: (iss) => {
        if (iss.code === "invalid_type")
          return "El modelo del camión debe ser un string";
        if (iss.code === "required") return "El modelo del camión es requerido";
      },
    }),
    description: z
      .string("La descripción del repuesto debe ser un string")
      .optional(),
    availability: z
      .enum(availabilityEnums, {
        error: (iss) => {
          if (iss.code === "invalid_type")
            return "La disponibilidad del repuesto debe ser un string";
          if (iss.code === "required")
            return "La disponibilidad del repuesto es requerido";
          if (iss.code === "invalid_value")
            return `La disponibilidad del repuesto debe ser uno de los siguientes valores: ${availabilityEnums.join(
              ", "
            )}`;
        },
      })
      .default("DISPONIBLE"),
  },
  "Se espera un objeto con un nombre, modelo, fabricante, precio, cantidad, modelo de camión, descripción y disponibilidad"
);

export function validatePart(input) {
  return partSchema.safeParse(input);
}

export function validatePartialPart(input) {
  return partSchema.partial().safeParse(input);
}
