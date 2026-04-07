import { Router }      from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// GET /api/nominas?mes=Marzo+2026
router.get("/", async (req, res) => {
  const { mes } = req.query;
  const nominas = await prisma.nomina.findMany({
    where:   mes ? { mes } : undefined,
    include: { empleado: { select: { nom: true, cod: true } } },
    orderBy: { createdAt: "desc" }
  });
  res.json(nominas);
});

// PUT /api/nominas/:id  — cambiar estado
router.put("/:id", async (req, res) => {
  const nom = await prisma.nomina.update({
    where: { id: +req.params.id },
    data:  req.body
  });
  res.json(nom);
});

// POST /api/nominas/calcular  — marca todas como "calculada"
router.post("/calcular", async (req, res) => {
  const { mes } = req.body;
  await prisma.nomina.updateMany({
    where: { mes, estado: { not: "pagada" } },
    data:  { estado: "calculada" }
  });
  res.json({ ok: true });
});

// POST /api/nominas/pagar  — marca todas como "pagada"
router.post("/pagar", async (req, res) => {
  const { mes } = req.body;
  await prisma.nomina.updateMany({
    where: { mes, estado: { not: "pagada" } },
    data:  { estado: "pagada" }
  });
  res.json({ ok: true });
});

export default router;