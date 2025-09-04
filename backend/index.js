// IMPORTACION DE LAS VARIABLES DE ENTORNO
import { PORT } from "./config.js";

// IMPORTAMOS EXPRESS (dependencia externa) PARA EL SERVIDOR
import express from "express";

// IMPORTACION DE ROUTERS
import stockRouter from "./routes/stock.routes.js";
import authRouter from "./routes/auth.routes.js";

// IMPORTACION DE MIDDELWARES
import cookieParser from "cookie-parser";
import cors from "cors";
//
// DECLARACION DE APLICACION & PUERTO PARA LA ESCUCHA
const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// UTILIZANDO EL ROUTER
app.use("/api/stock", stockRouter);
app.use("/api/auth", authRouter);

// DEFINIENDO UN ENDPOINT
app.get("/", (req, res) => {
  res.send("MI PRIMERA APP CON EXPRESS");
});

// DEFINIENDO LA ESCUCHA DE LA APLICACION
app.listen(PORT, () => {
  console.log(`Server funcionando en el puerto ${PORT}`);
});
