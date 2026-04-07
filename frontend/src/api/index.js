import { api } from "./client.js";

// ── AUTH ──────────────────────────────────────────────────────────────────
export const login = (username, password) =>
  api.post("/auth/login", { username, password });

// ── EMPLEADOS ─────────────────────────────────────────────────────────────
export const getEmpleados = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return api.get(`/empleados${q ? "?" + q : ""}`);
};
export const getEmpleado    = (id)       => api.get(`/empleados/${id}`);
export const createEmpleado = (data)     => api.post("/empleados", data);
export const updateEmpleado = (id, data) => api.put(`/empleados/${id}`, data);
export const deleteEmpleado = (id)       => api.delete(`/empleados/${id}`);

// ── CLIENTES ──────────────────────────────────────────────────────────────
export const getClientes = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return api.get(`/clientes${q ? "?" + q : ""}`);
};
export const getCliente    = (id)       => api.get(`/clientes/${id}`);
export const createCliente = (data)     => api.post("/clientes", data);
export const updateCliente = (id, data) => api.put(`/clientes/${id}`, data);
export const deleteCliente = (id)       => api.delete(`/clientes/${id}`);

// ── NÓMINAS ───────────────────────────────────────────────────────────────
export const getNominas    = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return api.get(`/nominas${q ? "?" + q : ""}`);
};
export const getNominasKpis  = (mes) => api.get(`/nominas/kpis?mes=${mes}`);
export const calcularNominas = (mes) => api.post("/nominas/calcular", { mes });
export const pagarNominas    = (mes) => api.post("/nominas/pagar", { mes });
export const updateNomina    = (id, data) => api.put(`/nominas/${id}`, data);

// ── CUADRANTES ────────────────────────────────────────────────────────────
export const getCuadrantes = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return api.get(`/cuadrantes${q ? "?" + q : ""}`);
};
export const getCuadrantesKpis  = (fecha) => api.get(`/cuadrantes/kpis?fecha=${fecha}`);
export const updateCuadrante    = (id, estado) => api.put(`/cuadrantes/${id}`, { estado });

// ── CONTABILIDAD ──────────────────────────────────────────────────────────
export const getCuentas = () => api.get("/contabilidad/cuentas");

// ── ALERTAS ───────────────────────────────────────────────────────────────
export const getAlertas   = ()   => api.get("/alertas");
export const leerAlerta   = (id) => api.put(`/alertas/${id}/leer`);