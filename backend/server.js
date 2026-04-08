import express       from "express";
import cors          from "cors";
import "dotenv/config";

import authRouter          from "./routes/auth.js";
import empleadosRouter     from "./routes/empleados.js";
import clientesRouter      from "./routes/clientes.js";
import nominasRouter       from "./routes/nominas.js";
import cuadrantesRouter    from "./routes/cuadrantes.js";
import contabilidadRouter  from "./routes/contabilidad.js";

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth",         authRouter);
app.use("/api/empleados",    empleadosRouter);
app.use("/api/clientes",     clientesRouter);
app.use("/api/nominas",      nominasRouter);
app.use("/api/cuadrantes",   cuadrantesRouter);
app.use("/api/contabilidad", contabilidadRouter);

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));