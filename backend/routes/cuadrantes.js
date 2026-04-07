import { Router }      from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// GET /api/cuadrantes?fecha=28/03/2026
router.get("/", async (req, res) => {
  const { fecha } = req.query;
  const cuadrantes = await prisma.cuadrante.findMany({
    where:   fecha ? { fecha } : undefined,
    include: {
      empleado: { select: { nom: true, cod: true } },
      cliente:  { select: { nombreCli: true } }
    },
    orderBy: { createdAt: "asc" }
  });
  res.json(cuadrantes);
});

// PUT /api/cuadrantes/:id  — cambiar estado
router.put("/:id", async (req, res) => {
  const c = await prisma.cuadrante.update({
    where: { id: +req.params.id },
    data:  req.body
  });
  res.json(c);
});

// POST /api/cuadrantes
router.post("/", async (req, res) => {
  const c = await prisma.cuadrante.create({ data: req.body });
  res.status(201).json(c);
});

export default router;