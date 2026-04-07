import { get, post, put } from "./client.js";

export const getCuadrantes  = (fecha = "") => get(`/cuadrantes${fecha ? `?fecha=${encodeURIComponent(fecha)}` : ""}`);
export const updateCuadrante= (id, data)   => put(`/cuadrantes/${id}`, data);
export const createCuadrante= (data)       => post("/cuadrantes", data);