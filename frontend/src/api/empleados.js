
// ── api/empleados.js ──────────────────────────────────────────────────────
import { get, post, put, del } from "./client.js";

export const getEmpleados  = (search = "") => get(`/empleados${search ? `?search=${encodeURIComponent(search)}` : ""}`);
export const getEmpleado   = (id)          => get(`/empleados/${id}`);
export const createEmpleado= (data)        => post("/empleados", data);
export const updateEmpleado= (id, data)    => put(`/empleados/${id}`, data);
export const deleteEmpleado= (id)          => del(`/empleados/${id}`);