import dbLocal from "db-local";

import { validatePart, validatePartialPart } from "../schemas/part.schema.js";
import { getErrorsZod } from "../libs/utils.js";

const { Schema } = new dbLocal({ path: "./db" });

const Part = Schema("Parts", {
  _id: { type: String, require: true },
  name: { type: String, require: true },
  model: { type: String, require: true },
  manufacturer: { type: String, require: true },
  truck_model: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
  availability: { type: String, require: true },
  description: { type: String },
  create_at: { type: String, require: true },
  update_at: { type: String },
});

// CLASE CONTENEDORA DE LOS METODOS A USAR EN LOS ENDPOINTS DEL INVENTARIO
export class StockRepository {
  static getParts(req, res) {
    const parts = Part.find();
    const setModelsParts = [...new Set(parts.map((part) => part.model))];
    const setParts = setModelsParts.map((model) => {
      const { name, truck_model, manufacturer, description } = parts.find(
        (part) => part.model === model
      );
      return {
        name,
        model,
        truck_model,
        manufacturer,
        description,
      };
    });

    const totalStockParts = parts.reduce((acc, { quantity }) => {
      return acc + quantity;
    }, 0);

    const partsOutOfStock = parts.filter((part) => part.quantity === 0).length;

    const priceTotalParts = parts.reduce((acc, { quantity, price }) => {
      return acc + quantity * price;
    }, 0);

    return res.json({
      parts: setParts,
      totalStockParts,
      partsOutOfStock,
      priceTotalParts,
      fullParts: parts,
    });
  }

  static getById(req, res) {
    const { id } = req.params;
    const part = Part.findOne({ _id: id });
    if (!part) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }
    return res.json(part);
  }

  static getByKeyAndValue(req, res) {
    const key = req.params.key.toLowerCase();
    const value = req.params.value;

    const parts = Part.find({ [key]: value });
    if (!parts || parts.length === 0) {
      return res
        .status(404)
        .json({ message: `No se encontraron repuestos con ${key}: ${value}` });
    }
    return res.json(parts);
  }

  static getByManufacturer(req, res) {
    const value = req.params.value.toUpperCase();

    const parts = Part.find({ manufacturer: value });
    if (!parts || parts.length === 0) {
      return res.status(404).json({
        message: `No se encontraron repuestos con el modelo: ${value}`,
      });
    }

    const listModels = [...new Set(parts.map((part) => part.model))];

    const stock_quantity = parts.reduce((acc, { quantity }) => {
      return acc + quantity;
    }, 0);

    const totalPrice = parts.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);

    res.json({
      numsModels: listModels.length,
      stock_quantity,
      totalPrice,
      data: parts,
    });
  }

  static getByModel(req, res) {
    const value = req.params.value.toUpperCase();

    const parts = Part.find({ model: value });
    if (!parts || parts.length === 0) {
      return res.status(404).json({
        message: `No se encontraron repuestos con el modelo: ${value}`,
      });
    }

    const stock_quantity = parts.reduce((acc, { quantity }) => {
      return acc + quantity;
    }, 0);

    let avrg_price = 0;
    if (parts.length > 2) {
      const copyParts = [...parts];
      const orderParts = copyParts.sort((a, b) => a.price - b.price);
      orderParts.splice(orderParts.length - 1, 1);
      orderParts.splice(0, 1);

      avrg_price =
        orderParts.reduce((acc, { price }) => {
          return acc + price;
        }, 0) / orderParts.length;
    } else {
      avrg_price =
        parts.reduce((acc, { price }) => {
          return acc + price;
        }, 0) / parts.length;
    }

    const totalPrice = parts.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);

    return res.json({
      stock_quantity,
      avrg_price,
      totalPrice,
      data: parts,
    });
  }

  static addPart(req, res) {
    let {
      name,
      model,
      manufacturer,
      truck_model,
      price,
      quantity,
      description,
    } = req.body;
    let { availability } = req.body;
    const create_at = new Date().toISOString();

    const result = validatePart(req.body);

    if (!result.success) {
      const errors = getErrorsZod(result);
      return res.status(400).json({ errors });
    }

    if (!availability) {
      availability = "DISPONIBLE";
    }

    const existPart = Part.findOne({
      model: model.toUpperCase(),
      manufacturer: manufacturer.toUpperCase(),
      truck_model: truck_model.toUpperCase(),
    });

    if (existPart) {
      name = existPart.name;
      manufacturer = existPart.manufacturer;
      truck_model = existPart.truck_model;
      description = existPart.description;
    }

    const newPart = Part.create({
      name: name.toUpperCase(),
      model: model.toUpperCase(),
      manufacturer: manufacturer.toUpperCase(),
      truck_model: truck_model.toUpperCase(),
      price,
      quantity,
      description,
      availability,
      create_at,
    }).save();

    return res.json({
      message: "Campos añadidos correctamente",
      data: newPart,
    });
  }

  static modifyPart(req, res) {
    const { id } = req.params;
    const partialData = req.body;
    const update_at = new Date().toISOString();

    const existPart = Part.findOne({ _id: id });

    if (!existPart) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }

    if (!partialData) {
      return res.status(400).json({ message: "No hay datos para modificar" });
    }

    Object.keys(partialData).forEach((key) => {
      if (["name", "model", "manufacter", "truck_model"].includes(key)) {
        partialData[key] = partialData[key].toUpperCase();
      }
    });

    const result = validatePartialPart(partialData);
    if (!result.success) {
      const errors = getErrorsZod(result);
      return res.status(400).json({ errors });
    }

    const updatedPart = Part.update(
      { _id: id },
      { ...partialData, update_at }
    ).save();

    return res.json({
      message: "Repuesto modificado correctamente",
      data: updatedPart,
    });
  }

  static deletePart(req, res) {
    const { id } = req.params;
    const existPart = Part.findOne({ _id: id });

    if (!existPart) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }
    existPart.remove();
    return res.json({ message: "Repuesto eliminado correctamente" });
  }
}
