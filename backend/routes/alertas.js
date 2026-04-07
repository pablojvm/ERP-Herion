import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const alertas = await prisma.alerta.findMany({ orderBy: { createdAt: "desc" } });
  res.json(alertas);
});

router.put("/:id/leer", async (req, res) => {
  const a = await prisma.alerta.update({ where: { id: +req.params.id }, data: { leida: true } });
  res.json(a);
});

export default router;