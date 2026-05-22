import "./types/session"; // extiende SessionData con userId

import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import pool from "./db";
import authRoutes from "./routes/auth";
import perfilRoutes from "./routes/perfiles";
import planRoutes from "./routes/planes";
import { errorHandler } from "./middleware/errorHandler";
import { registerChatHandlers } from "./controllers/chat.controller";

const app = express();
const PORT = process.env.PORT || 4000;

// Socket.IO necesita el http.Server nativo, no vale app.listen()
const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}, // {} = activa la recuperación de conexiones caídas con defaults
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  registerChatHandlers(io, socket);
});

/* El orden de los middlewares importa: cors antes que nada para no
   bloquear peticiones del frontend, y session antes de las rutas para
   que req.session esté disponible en los controladores. */
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || ""].filter(Boolean), 
    credentials: true, // para que el navegador envíe la cookie de sesión
  }),
);

app.use(express.json());

// detrás de un proxy en Railway o Docker (necesario para que las cookies secure funcionen)
app.set("trust proxy", 1);

// connectPgSimple es una fábrica: hay que llamarla con 'session' para
// que devuelva la clase Store que luego se instancia con 'new PGStore()'.
const PGStore = connectPgSimple(session);

const mySessionConfig = session({
      store: new PGStore({
        pool,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "secreto_desarrollo", // el fallback solo vale en dev; en producción la env var es obligatoria
      name: "session_id",
      resave: false,         // no reescribir la sesión en cada request si no ha cambiado
      saveUninitialized: false, // no crear sesión vacía para visitantes anónimos
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    });

app.use(mySessionConfig);
app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);
app.use("/api/planes", planRoutes);

io.engine.use(mySessionConfig); // Compartimos la configuración de sesión con Socket.IO para acceder a req.session en los handlers de Socket.IO

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// el errorHandler tiene que ir el último, después de las rutas
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
