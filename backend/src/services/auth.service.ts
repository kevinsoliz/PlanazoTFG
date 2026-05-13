// Servicio de autenticación. No toca req/res (eso lo hace el controller).

import bcrypt from "bcrypt";
import pool from "../db";
import { AppError } from "../AppError";

// Forma del usuario que devolvemos. No incluye password_hash.
type AuthUser = {
  id: number;
  nombre: string;
  email: string;
};

const DESCRIPCION_POR_DEFECTO =
  "¡Hola! Te damos la bienvenida a Planazo. Edita tu perfil para contar algo de ti.";


export async function registrar(
  nombre: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  const existeEmail = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );

  if (existeEmail.rows.length > 0) {
    throw new AppError(409, "El email ya está registrado");
  }

  // Generamos el @username con el nombre en minúsculas y sin espacios.
  // Si ya existe, le añadimos un número aleatorio hasta que sea único.
  const baseUsername = nombre.toLowerCase().replace(/\s+/g, "");
  let username = baseUsername;

  let existeUsername = await pool.query(
    "SELECT id FROM perfiles WHERE username = $1",
    [username],
  );
  while (existeUsername.rows.length > 0) {
    username = baseUsername + Math.floor(Math.random() * 100);
    existeUsername = await pool.query(
      "SELECT id FROM perfiles WHERE username = $1",
      [username],
    );
  }

  // 10 rondas de sal: más rondas, más seguro pero más lento (10 es el default de bcrypt)
  const hash = await bcrypt.hash(password, 10);

  // RETURNING me devuelve la fila recién insertada sin tener que hacer un SELECT extra.
  const nuevo = await pool.query(
    "INSERT INTO users (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre, email",
    [nombre, email, hash],
  );

  await pool.query(
    "INSERT INTO perfiles (user_id, nombre, username, descripcion) VALUES ($1, $2, $3, $4)",
    [nuevo.rows[0].id, nombre, username, DESCRIPCION_POR_DEFECTO],
  );

  return nuevo.rows[0];
}


export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const resultado = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (resultado.rows.length === 0) {
    throw new AppError(401, "Credenciales incorrectas");
  }

  const user = resultado.rows[0];
  const coincide = await bcrypt.compare(password, user.password_hash);

  /* Mismo mensaje cuando falla el email y cuando falla la contraseña:
     si dijéramos cuál falla, alguien podría ir probando emails para
     ver cuáles están registrados. */
  if (!coincide) {
    throw new AppError(401, "Credenciales incorrectas");
  }

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
  };
}


export async function obtenerUsuario(userId: number): Promise<AuthUser> {
  const resultado = await pool.query(
    "SELECT id, nombre, email FROM users WHERE id = $1",
    [userId],
  );

  if (resultado.rows.length === 0) {
    throw new AppError(404, "Usuario no encontrado");
  }

  return resultado.rows[0];
}
