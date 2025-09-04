import axios from "./axios.js";

export const loginUser = async (data) => axios.post("/auth/login", data);
export const registerUser = async (data) => axios.post("/auth/register", data);

export const verifyToken = async () => axios.get("/auth/verify");
export const logoutUser = async () => axios.get("/auth/logout");
