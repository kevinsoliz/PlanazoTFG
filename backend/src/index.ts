/**
 * ============================================================================
 * SERVIDOR BACKEND - PLANAZO TFG
 * ============================================================================
 * Este archivo es el punto de entrada principal del servidor backend.
 * Configura Express, Socket.IO, autenticación, sesiones y todas las rutas API.
 * ============================================================================
 */

// Este import es necesario para que TypeScript reconozca que req.session
// tiene una propiedad userId. Sin él, el tipo no se aplicaría correctamente.
// types/session.ts amplía SessionData de express-session con `userId`.
import "./types/session";

// IMPORTES - Dependencias principales del servidor
import express from "express";                        // Framework web
import cors from "cors";                              // Permitir peticiones desde otro dominio
import session from "express-session";                // Gestión de sesiones HTTP
import connectPgSimple from "connect-pg-simple";      // Almacena sesiones en PostgreSQL
import pool from "./db";                              // Conexión a la base de datos

// IMPORTES - Rutas API
import authRoutes from "./routes/auth";               // Rutas de login/registro
import perfilRoutes from "./routes/perfiles";         // Rutas de perfiles de usuario
import planRoutes from "./routes/planes";             // Rutas de planes
import { errorHandler } from "./middleware/errorHandler"; // Manejo central de errores

// CONFIGURACIÓN BÁSICA
const app = express();                                // Crear aplicación Express
const PORT = process.env.PORT || 4000;                // Puerto del servidor (default 4000)

// ============================================================================
// CONFIGURACIÓN DE SOCKET.IO - Chat en tiempo real
// ============================================================================
// Socket.IO permite comunicación bidireccional en tiempo real entre el servidor
// y los clientes (navegadores). Se usa para el chat de los planes.
// 
// IMPORTANTE: Socket.IO necesita un servidor HTTP nativo (http.Server)
// en lugar de usar app.listen() directamente. Por eso creamos 'server'.
// ============================================================================

import http from 'http';                              // Servidor HTTP nativo de Node
import { Server } from 'socket.io';                  // Socket.IO para comunicación en tiempo real
import { registerChatHandlers } from './controllers/chat.controller'; // Lógica del chat

// Envolver Express en un servidor HTTP nativo (requerido por Socket.IO)
const server = http.createServer(app);

// Crear instancia de Socket.IO con configuración
const io = new Server(server, {
  connectionStateRecovery: {},                        // Recuperar conexiones perdidas automáticamente
  cors: {                                             // Permitir conexiones desde el frontend
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
  }
});

// Cuando un cliente se conecta a Socket.IO, registrar los manejadores del chat
io.on('connection', (socket) => {
  registerChatHandlers(io, socket);
});

// ============================================================================

// Almacén de sesiones en PostgreSQL en lugar de memoria
const PGStore = connectPgSimple(session);

// ============================================================================
// MIDDLEWARES - Procesamiento de todas las peticiones HTTP
// ============================================================================
// Los middlewares se ejecutan en orden antes de llegar a las rutas.
// ============================================================================

// MIDDLEWARE 1: CORS (Control de Acceso de Origen Cruzado)
// Permite que peticiones desde el frontend lleguen al backend.
// Sin esto, los navegadores bloquearían las peticiones por razones de seguridad.
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || ""].filter(Boolean),
    credentials: true, // Permite que se envíen cookies con las peticiones
  }),
);

// MIDDLEWARE 2: JSON Parser
// Convierte el body de las peticiones (texto) en objetos JavaScript.
// Necesario para procesar datos JSON que envía el cliente.
app.use(express.json());

// MIDDLEWARE 3: Trust Proxy
// Necesario cuando el servidor está detrás de un proxy (como en Docker).
// Permite que Express confíe en los headers del proxy.
app.set("trust proxy", 1);

// TODO: Agregar helmet (cabeceras de seguridad) y morgan (logs de peticiones)

// MIDDLEWARE 4: Sesiones HTTP
// Las sesiones almacenan información del usuario logueado en PostgreSQL.
// Cada cliente recibe un session_id en una cookie que lo identifica.
app.use(
  session({
    store: new PGStore({
      pool,                         // Usar la conexión a PostgreSQL
      createTableIfMissing: true,   // Crear tabla de sesiones automáticamente
    }),
    secret: process.env.SESSION_SECRET || "secreto_desarrollo", // Clave para firmar sesiones
    name: "session_id",             // Nombre de la cookie
    resave: false,                  // No guardar sesión si no cambió
    saveUninitialized: false,       // No crear sesión hasta que sea necesario
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // Expirar en 30 días
      httpOnly: true,               // Solo accesible via HTTP, no JavaScript
      secure: process.env.NODE_ENV === "production", // HTTPS en producción
      sameSite: "lax",              // Protección contra CSRF
    },
  }),
);

// ============================================================================

app.use("/api/auth", authRoutes);        // Rutas de autenticación (login, registro)
app.use("/api", perfilRoutes);           // Rutas de perfiles de usuario
app.use("/api/planes", planRoutes);      // Rutas de planes

// Ruta especial: Health Check
// Devuelve el estado del servidor. Útil para verificar que el servidor está vivo.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ============================================================================
// MIDDLEWARE DE MANEJO DE ERRORES - Procesamiento de errores
// ============================================================================
// IMPORTANTE: Este middleware DEBE ir al FINAL, después de todas las rutas.
// Si va antes, no captuará los errores que se lancen en las rutas.
// Express identifica middleware de errores por su firma de 4 argumentos.
// ============================================================================
app.use(errorHandler);

// ============================================================================
// INICIAR SERVIDOR
// ============================================================================
// Usamos server.listen() en lugar de app.listen() porque:
// 1. Socket.IO necesita un servidor HTTP nativo (http.Server)
// 2. server = http.createServer(app) envuelve Express
// 3. Ambos (Express HTTP y Socket.IO) escuchan en el mismo puerto
// 4. Si usáramos app.listen(), Socket.IO no funcionaría
// ============================================================================
server.listen(PORT, () => {
  console.log(`✓ Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`  - API REST disponible en http://localhost:${PORT}/api`);
  console.log(`  - Socket.IO disponible en http://localhost:${PORT}`);
});
