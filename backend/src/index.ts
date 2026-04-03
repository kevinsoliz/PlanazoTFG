import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db";
import authRoutes from "./routes/auth";
import perfilRoutes from "./routes/perfiles";
import planRoutes from "./routes/planes";

const app = express();
const PORT = process.env.PORT || 4000;

const PGStore = connectPgSimple(session);

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || ""].filter(Boolean),
    credentials: true, //permite que las peticiones incluyan cookies
  }),
);

//json es un metodo estático de express que es una función y objeto a la vez.
app.use(express.json()); //convierte los json a objetos

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

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en
  http://localhost:${PORT}`);
});
