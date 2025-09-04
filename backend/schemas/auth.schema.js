import z from "zod";

const authSchema = z.object(
  {
    username: z
      .string("El nombre de usuario debe ser un string")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    password: z
      .string("La contraseña debe ser un string")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  },
  "Se espera un objeto con un nombre de usuario y una contraseña"
);

export function validateAuth(input) {
  return authSchema.safeParse(input);
}
