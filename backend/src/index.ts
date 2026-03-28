import express from "express";
import cors from "cors";
import pool from "./db";
                                                                    
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, //permite que las peticiones incluyan cookies
  }));


//json es un metodo estático de express que es una función y objeto a la vez.
  app.use(express.json()); //convierte los json a objetos

  app.get("/api/health", (req, res) => { // ruta para comprobar el estado del servidor
    res.json({ status: "ok" });
  });

  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en
  http://localhost:${PORT}`);
  });