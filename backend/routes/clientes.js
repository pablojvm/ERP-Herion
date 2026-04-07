import { Router }      from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// GET /api/clientes?search=xxx
router.get("/", async (req, res) => {
  const { search } = req.query;
  const clientes = await prisma.cliente.findMany({
    where: search ? {
      OR: [
        { nombreCli:    { contains: search, mode: "insensitive" } },
        { codCli:       { contains: search, mode: "insensitive" } },
        { codProvincia: { contains: search, mode: "insensitive" } },
      ]
    } : undefined,
    orderBy: { nombreCli: "asc" }
  });
  res.json(clientes);
});

// GET /api/clientes/:id
router.get("/:id", async (req, res) => {
  const cli = await prisma.cliente.findUnique({ where: { id: +req.params.id } });
  if (!cli) return res.status(404).json({ error: "No encontrado" });
  res.json(cli);
});

// POST /api/clientes
router.post("/", async (req, res) => {
  const cli = await prisma.cliente.create({ data: req.body });
  res.status(201).json(cli);
});

// PUT /api/clientes/:id
router.put("/:id", async (req, res) => {
  const cli = await prisma.cliente.update({
    where: { id: +req.params.id },
    data:  req.body
  });
  res.json(cli);
});

export default router;