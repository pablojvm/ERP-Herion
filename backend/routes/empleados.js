import { Router }      from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// GET /api/empleados?search=xxx
router.get("/", async (req, res) => {
  const { search } = req.query;
  const empleados = await prisma.empleado.findMany({
    where: search ? {
      OR: [
        { nom:        { contains: search, mode: "insensitive" } },
        { delegacion: { contains: search, mode: "insensitive" } },
        { departamento:{ contains: search, mode: "insensitive" } },
        { cod:        { contains: search, mode: "insensitive" } },
      ]
    } : undefined,
    orderBy: { nom: "asc" }
  });
  res.json(empleados);
});

// GET /api/empleados/:id
router.get("/:id", async (req, res) => {
  const emp = await prisma.empleado.findUnique({
    where:   { id: +req.params.id },
    include: { nominas: { orderBy: { createdAt: "desc" }, take: 6 } }
  });
  if (!emp) return res.status(404).json({ error: "No encontrado" });
  res.json(emp);
});

// POST /api/empleados
router.post("/", async (req, res) => {
  const emp = await prisma.empleado.create({ data: req.body });
  res.status(201).json(emp);
});

// PUT /api/empleados/:id
router.put("/:id", async (req, res) => {
  const emp = await prisma.empleado.update({
    where: { id: +req.params.id },
    data:  req.body
  });
  res.json(emp);
});

// DELETE /api/empleados/:id
router.delete("/:id", async (req, res) => {
  await prisma.empleado.delete({ where: { id: +req.params.id } });
  res.status(204).send();
});

export default router;