import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import pool from "../db";

const router = Router();

//crear plan
router.post("/", requireAuth, async (req, res) => {
  const { titulo, categoria, descripcion, fecha, ubicacion, aforo_max } =
    req.body;

  if (!titulo || !categoria || !fecha || !aforo_max) {
    res.status(400).json({ error: "Faltan campos." });
    return;
  }

  try {
    const planesActivos = await pool.query(
      "SELECT COUNT(*) FROM planes WHERE creator_id = $1 AND fecha > NOW()",
      [req.session.userId],
    );

    if (parseInt(planesActivos.rows[0].count) >= 3) {
      res
        .status(400)
        .json({ error: "Has alcanzado el límite de 3 planes activos" });
      return;
    }

    const nuevo = await pool.query(
      "INSERT INTO planes (creator_id, titulo, categoria, descripcion, fecha, ubicacion, aforo_max) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        req.session.userId,
        titulo,
        categoria,
        descripcion,
        fecha,
        ubicacion,
        aforo_max,
      ],
    );

    // el user que crea el plan ya forma parte de él automaticamente.
    await pool.query(
      "INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)",
      [nuevo.rows[0].id, req.session.userId],
    );

    res.status(201).json({ plan: nuevo.rows[0] });
  } catch (error) {
    console.log("Este es el error: ", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// listar planes
router.get("/", async (req, res) => {
  const { categoria } = req.query;

  try {
    let resultado;

    if (categoria) {
      resultado = await pool.query(
        `SELECT p.*, 
        (SELECT COUNT(*) FROM plan_participants 
        WHERE plan_id = p.id) AS participants FROM planes p 
        WHERE p.categoria = $1 AND p.fecha > NOW() 
        ORDER BY p.fecha 
        ASC`,
        [categoria],
      );
    } else {
      resultado = await pool.query(
        "SELECT p.*, (SELECT COUNT(*) FROM plan_participants WHERE plan_id = p.id) AS participants FROM planes p WHERE p.fecha > NOW() ORDER BY p.fecha ASC",
      );
    }

    res.json({ planes: resultado.rows });
  } catch (error) {
    console.log("Aqui esta el error: ", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// listar detalle del plan
router.get("/:id", async (req, res) => {
  try {
    const plan = await pool.query(
      "SELECT p.*, u.nombre AS creador_nombre FROM planes p JOIN users u ON p.creator_id = u.id WHERE p.id = $1",
      [req.params.id],
    );

    if (plan.rows.length === 0) {
      res.status(404).json({ error: "Plan no encontrado" });
    }

    const participantes = await pool.query(
      "SELECT u.id, u.nombre FROM plan_participants pp JOIN users u ON pp.user_id = u.id WHERE pp.plan_id = $1",
      [req.params.id],
    );

    const plazasDisponibles =
      plan.rows[0].aforo_max - participantes.rows.length;

    res.json({
      plan: plan.rows[0],
      participantes: participantes.rows,
      plazas_disponibles: plazasDisponibles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor " });
  }
});

// unirse al plan
router.post("/:id/join", requireAuth, async (req, res) => {
  try {
    const plan = await pool.query("SELECT * FROM planes WHERE id = $1", [
      req.params.id,
    ]);

    if (plan.rows.length === 0) {
      res.status(404).json({ error: "Plan no encontrado" });
      return;
    }

    if (plan.rows[0].creator_id === req.session.userId) {
      res.status(400).json({ error: "No puedes unirte a tu propio plan" });
      return;
    }

    const participantes = await pool.query(
      "SELECT COUNT(*) FROM plan_participants WHERE plan_id = $1",
      [req.params.id],
    );

    if (parseInt(participantes.rows[0].count) >= plan.rows[0].aforo_max) {
      res.status(400).json({ error: "El plan está completo" });
      return;
    }

    await pool.query(
      "INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)",
      [req.params.id, req.session.userId],
    );

    res.json({ message: "Te has unido al plan" });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(400).json({ error: "Ya estás apuntado a este plan" });
      return;
    }
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// desapuntarse del plan
router.delete("/:id/join", requireAuth, async (req, res) => {
  try {
    const plan = await pool.query(
      "SELECT creator_id FROM planes WHERE id = $1",
      [req.params.id],
    );
    if (
      plan.rows.length > 0 &&
      plan.rows[0].creator_id === req.session.userId
    ) {
      res.status(400).json({ error: "No puedes salir de tu propio plan" });
      return;
    }

    const resultado = await pool.query(
      "DELETE FROM plan_participants WHERE plan_id = $1 AND user_id = $2",
      [req.params.id, req.session.userId],
    );

    if (resultado.rowCount === 0) {
      res.status(400).json({ error: "No estabas en este plan" });
      return;
    }

    res.json({ message: "Has salido del plan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// borrar plan (solo el creador)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const plan = await pool.query(
      "SELECT creator_id FROM planes WHERE id = $1",
      [req.params.id],
    );

    if (plan.rows.length === 0) {
      res.status(404).json({ error: "Plan no encontrado" });
      return;
    }

    if (plan.rows[0].creator_id !== req.session.userId) {
      res.status(403).json({ error: "Solo el creador puede borrar el plan" });
      return;
    }

    await pool.query("DELETE FROM plan_participants WHERE plan_id = $1", [
      req.params.id,
    ]);
    await pool.query("DELETE FROM planes WHERE id = $1", [req.params.id]);

    res.json({ message: "Plan eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// editar plan (solo el creador)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const plan = await pool.query(
      "SELECT creator_id FROM planes WHERE id = $1",
      [req.params.id],
    );

    if (plan.rows.length === 0) {
      res.status(404).json({ error: "Plan no encontrado" });
      return;
    }

    if (plan.rows[0].creator_id !== req.session.userId) {
      res.status(403).json({ error: "Solo el creador puede editar el plan" });
      return;
    }

    const { titulo, categoria, descripcion, fecha, ubicacion, aforo_max } =
      req.body;

    const resultado = await pool.query(
      `UPDATE planes 
        SET titulo = $1, 
            categoria = $2, 
            descripcion = $3, 
            fecha = $4, 
            ubicacion = $5, 
            aforo_max = $6 
        WHERE id = $7 
        RETURNING *`,
      [
        titulo,
        categoria,
        descripcion,
        fecha,
        ubicacion,
        aforo_max,
        req.params.id,
      ],
    );

    res.json({ plan: resultado.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});
export default router;
