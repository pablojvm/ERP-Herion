import { get, post, put } from "./client.js";
// ── api/clientes.js ───────────────────────────────────────────────────────
export const getClientes  = (search = "") => get(`/clientes${search ? `?search=${encodeURIComponent(search)}` : ""}`);
export const getCliente   = (id)          => get(`/clientes/${id}`);
export const createCliente= (data)        => post("/clientes", data);
export const updateCliente= (id, data)    => put(`/clientes/${id}`, data);