// IMPORTAMOS EL OBJETO ROUTER DE EXPRESS
import { Router } from "express";

// IMPORTAMOS EL REPOSITORIO DE FUNCIONES PARA NUESTRAS ENDPOINTS
import { StockRepository } from "../repositories/stock.js";

// DECLARAMOS EL ROUTER
const router = Router();

// DEFIMIMOS LOS ENDPOINTS
router.get("/", StockRepository.getParts);
router.get("/:id", StockRepository.getById);

router.get("/search/model/:value", StockRepository.getByModel);
router.get("/search/manufacturer/:value", StockRepository.getByManufacturer);
router.get("/search/:key/:value", StockRepository.getByKeyAndValue);

router.post("/", StockRepository.addPart);
router.put("/:id", StockRepository.modifyPart);
router.put("/:id", StockRepository.modifyPart);
router.delete("/:id", StockRepository.deletePart);

// EXPORTAMOS EL ROUTER PARA SER USADO EN EL index.js
export default router;
