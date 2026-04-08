import { Router }      from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt           from "bcryptjs";
import jwt              from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Credenciales requeridas" });

  const user = await prisma.usuario.findUnique({ where: { username } });
  if (!user || !user.activo)
    return res.status(401).json({ error: "Usuario no encontrado" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: user.id, username: user.username, rol: user.rol, nombre: user.nombre },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, user: { id: user.id, username: user.username, nombre: user.nombre, rol: user.rol } });
});

// GET /api/auth/me  (requiere token)
router.get("/me", async (req, res) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ error: "Token requerido" });
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    const user    = await prisma.usuario.findUnique({ where: { id: payload.id }, select: { id: true, username: true, nombre: true, rol: true } });
    res.json(user);
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

export default router;