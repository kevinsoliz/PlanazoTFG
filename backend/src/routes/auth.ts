import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import { requireAuth } from "../middleware/auth";
import { RegistroSchema, LoginSchema } from "../schemas/authSchema";
import { validateRequest } from "../middleware/validate";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const router = Router();

// Registro con validación de datos usando Zod
router.post("/registro", validateRequest(RegistroSchema), async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
    return;
  }

  
  try {
    const resultado = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    
    if (resultado.rows.length > 0) {
      res.status(409).json({ error: "El email ya está registrado" });
      return;
    }

    //lógica para generar un @username a partir del nombre:
    const baseUsername = nombre.toLowerCase().replace(/\s+/g, "");
    let username = baseUsername;
  
    let existe = await pool.query("SELECT id FROM perfiles WHERE username = $1", [username]);
  
    while (existe.rows.length > 0) {
      username = baseUsername + Math.floor(Math.random() * 100);
      existe = await pool.query("SELECT id FROM perfiles WHERE username = $1", [username]);
    }

    const hash = await bcrypt.hash(password, 10); // el segundo arg son rondas de sal, cuantas mas rondas mas seguro

    const nuevo = await pool.query(
      "INSERT INTO users (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre, email",
      [nombre, email, hash], //la contrasena nunca va a la base de datos
    );

    await pool.query(
      "INSERT INTO perfiles (user_id, nombre, username) VALUES ($1, $2, $3)",
      [nuevo.rows[0].id, nombre, username]
    )

    req.session.userId = nuevo.rows[0].id;

    res.status(201).json({ user: nuevo.rows[0] });
  } catch (error) {
    console.log("Aqui esta el error:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Login con validación de datos usando Zod
router.post("/login", validateRequest(LoginSchema), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
    return;
  }

  try {
    const resultado = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (resultado.rows.length === 0) {
      res.status(401).json({ error: "Credenciales incorrectas" });
      return;
    }

    const user = resultado.rows[0];
    const coincide = await bcrypt.compare(password, user.password_hash);

    if (!coincide) {
      res.status(401).json({ error: "Credenciales incorrectas" });
      return;
    }

    req.session.userId = user.id;

    res.json({ user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Logout
router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Error al cerrar sesión" });
      return;
    }
    res.clearCookie("session_id");
    res.json({ message: "Sesión cerrada" });
  });
});

// Me (quien soy)
router.get("/me", requireAuth, async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }

  try {
    const resultado = await pool.query(
      "SELECT id, nombre, email FROM users WHERE id = $1",
      [req.session.userId],
    );

    if (resultado.rows.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json({ user: resultado.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

export default router;
