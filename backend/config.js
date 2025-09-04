import dotenv from "dotenv";
dotenv.config();

export const { PORT = 4000, SECRET_KEY } = process.env;
