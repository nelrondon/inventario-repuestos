import axios from "./axios.js";

// GETS
export const getRepuestosApi = async () => axios.get("/stock");
export const getRepuestoXIdApi = async (id) => axios.get(`/stock/${id}`);

export const getRepuestosXModelApi = async (modelo) =>
  axios.get(`/stock/search/model/${modelo}`);
export const getRepuestosXFabricanteApi = async (fabricante) =>
  axios.get(`/stock/search/manufacturer/${fabricante}`);

// POST
export const addRepuestosApi = async (data) => axios.post("/stock", data);

// DELETE
export const deleteRepuestosApi = async (id) => axios.delete(`/stock/${id}`);

// PUT
export const updateRepuestoApi = async (id, data) =>
  axios.put(`/stock/${id}`, data);
