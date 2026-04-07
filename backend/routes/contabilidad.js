import { Router }      from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// GET /api/contabilidad/cuentas
router.get("/cuentas", async (_req, res) => {
  const cuentas = await prisma.cuenta.findMany({ orderBy: { codCta: "asc" } });
  res.json(cuentas);
});

// PUT /api/contabilidad/cuentas/:id
router.put("/cuentas/:id", async (req, res) => {
  const c = await prisma.cuenta.update({
    where: { id: +req.params.id },
    data:  req.body
  });
  res.json(c);
});

export default router;