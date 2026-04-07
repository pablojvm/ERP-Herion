import { get, post, put } from "./client.js";

export const getNominas      = (mes = "") => get(`/nominas${mes ? `?mes=${encodeURIComponent(mes)}` : ""}`);
export const updateNomina    = (id, data) => put(`/nominas/${id}`, data);
export const calcularNominas = (mes)      => post("/nominas/calcular", { mes });
export const pagarNominas    = (mes)      => post("/nominas/pagar",    { mes });