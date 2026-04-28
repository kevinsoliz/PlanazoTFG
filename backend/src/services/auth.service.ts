// Service de autenticación.
// Contiene la lógica de negocio: queries SQL, hashing de contraseñas,
// generación de username, validación de credenciales.
// NO sabe nada de Express (no toca req/res). Esto permite testearlo
// con datos planos y separa claramente la capa HTTP de la lógica.

import bcrypt from "bcrypt";
import pool from "../db";
import { AppError } from "../AppError";

// Forma del usuario que devolvemos al exterior. No incluye password_hash!:
// la contraseña hasheada nunca debe salir del backend.
type AuthUser = {
  id: number;
  nombre: string;
  email: string;
};

// 1.Servicio de registro:

// Registra un nuevo usuario en la BBDD.
// Pasos: comprueba que el email es único, genera un @username único a partir
// del nombre, hashea la contraseña, inserta filas en `users` y `perfiles`.
// Devuelve el usuario creado (sin contraseña).
// Lanza AppError(409) si el email ya existe.

export async function registrar(
  nombre: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  // 1. Comprobar que el email no está ya registrado
  const existeEmail = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );

  if (existeEmail.rows.length > 0) {
    // Lanzamos AppError con 409 Conflict —> el controller lo traducirá a la response.
    throw new AppError(409, "El email ya está registrado");
  }

  // 2. Generar un @username único a partir del nombre
  // Quitamos espacios y pasamos a minúsculas para tener una base limpia
  const baseUsername = nombre.toLowerCase().replace(/\s+/g, "");
  let username = baseUsername;

  // Si ya existe, le añadimos un número aleatorio hasta que no choque
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

  // 3. Hashear la contraseña antes de guardarla
  // El segundo argumento son las rondas de sal: más rondas = más seguro pero más lento.
  // 10 es el estándar recomendado por bcrypt
  const hash = await bcrypt.hash(password, 10);

  // 4. Insertar en `users` y obtener el id generado
  // RETURNING nos devuelve los campos seleccionados de la fila recién creada
  // (Es específico de Postgres, evita un SELECT extra).
  const nuevo = await pool.query(
    "INSERT INTO users (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre, email",
    [nombre, email, hash],
  );

  // 5. Insertar el perfil asociado al usuario
  await pool.query(
    "INSERT INTO perfiles (user_id, nombre, username) VALUES ($1, $2, $3)",
    [nuevo.rows[0].id, nombre, username],
  );

  return nuevo.rows[0];
}


// 2.Servicio de Login:

// Comprueba las credenciales y devuelve el usuario si son correctas.
// Lanza AppError(401) si el email no existe o la contraseña no coincide.
// Importante: usamos el MISMO mensaje en ambos casos para no filtrar
// información a un atacante (si dijéramos "email no existe" vs "contraseña
// incorrecta", podría enumerar usuarios registrados).
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

  // bcrypt.compare hashea la password recibida y la compara con el hash guardado.
  const coincide = await bcrypt.compare(password, user.password_hash);

  if (!coincide) {
    throw new AppError(401, "Credenciales incorrectas");
  }

  // Devolvemos solo los campos públicos. El password_hash NO sale del service.
  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
  };
}


// 3. Servicio de comprobación de autenticación

// Devuelve el usuario por su id. Se usa en el endpoint /me
// para que el frontend sepa quién está autenticado.
// Lanza AppError(404) si el usuario no existe (caso raro: sesión válida
// apuntando a un user_id eliminado).
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
