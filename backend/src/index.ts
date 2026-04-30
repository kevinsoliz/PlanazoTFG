// types/session.ts amplía SessionData de express-session con `userId`.
// Aunque está dentro del "include" del tsconfig, ts-node bajo Docker
// solo procesa los ficheros que entran en el grafo de imports en runtime.
// Si nadie lo importa, el augmentation no se aplica y todos los
// `req.session.userId` del proyecto fallan con TS2339. Este side-effect
// import lo mete en el grafo: no carga código (compila a JS vacío),
// pero garantiza que TS aplica los tipos.
import "./types/session";

import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db";
import authRoutes from "./routes/auth";
import perfilRoutes from "./routes/perfiles";
import planRoutes from "./routes/planes";
// errorHandler: middleware central de errores. Se monta DESPUÉS de las routes.
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 4000;

//* Socket.IO
import http from 'http';
import { Server } from 'socket.io';
import { registerChatHandlers } from './controllers/chat.controller';

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: { origin: process.env.FRONTEND_URL || "http://localhost:3000" }
});

io.on('connection', (socket) => {
  registerChatHandlers(io, socket);
});
//* Fin Socket.IO

const PGStore = connectPgSimple(session);

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || ""].filter(Boolean),
    credentials: true, //permite que las peticiones incluyan cookies
  }),
);

//json es un metodo estático de express que es una función y objeto a la vez.
app.use(express.json()); //convierte los json a objetos
app.set("trust proxy", 1);

// TODO: agregar helmet (cabeceras de seguridad) y morgan (logs de   peticiones)

app.use(
  session({
    store: new PGStore({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "secreto_desarrollo",
    name: "session_id",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);
app.use("/api/planes", planRoutes)

app.get("/api/health", (req, res) => {
  // ruta para comprobar el estado del servidor
  res.json({ status: "ok" });
});

// Middleware central de manejo de errores.
// IMPORTANTE: debe ir AL FINAL, después de todas las routes/middlewares.
// Si va antes, no captura los errores que se lancen aguas abajo.
// Express lo identifica como handler de errores por su firma de 4 args.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en
  http://localhost:${PORT}`);
});


// * Reemplazamos app.listen por server.listen para usar Socket.IO
server.listen(PORT, () => {
  console.log(`Servidor backend corriendo en
  http://localhost:${PORT}`);
});
