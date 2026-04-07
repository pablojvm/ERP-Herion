import { get, put } from "./client.js";

export const getCuentas     = ()        => get("/contabilidad/cuentas");
export const updateCuenta   = (id, data)=> put(`/contabilidad/cuentas/${id}`, data);